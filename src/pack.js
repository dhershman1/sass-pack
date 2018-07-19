const path = require('path')
const sass = require('node-sass')
const globby = require('globby')
const { readFileSync } = require('fs-extra')
const write = require('./write')

/**
 * Our main factory function to run sass-pack
 * @name sassPack
 * @param {object} opts an object containing our paths
 * @param {string} opts.output The output string path
 * @param {string} opts.source The source file string paths
 * @param {string} opts.manifest The manifest string path
 * @param {string} opts.minify The level of minify to use (defaults to none)
 * @param {string} opts.sourcemaps path of where to put source
 * @param {boolean} opts.hardquit Boolean to determine if source maps should be created
 * @param {string} opts.alias String path with which to replace @/ in sass files
 * @param {string} opts.external String path to tell sass-pack where to get external sass from
 * @param {boolean} opts.folders Boolean to tell sass pack to use folder/dir names
 * @return {null} returns the executed promise from globby
 */
const pack = opts => {
  const sources = opts.source.split(',')
  const external = opts.external ? opts.external.split(',') : ''

  const compile = (file, isExternal) => new Promise((resolve, reject) => {
    const { name, dir, ext } = path.parse(file)

    sass.render({
      file,
      importer (url, _, done) {
        const reg = /@\/|@\\/g

        if (reg.test(url)) {
          const [, origPath = ''] = url.split(reg)
          let fixedUrl = path.join(opts.alias, origPath)

          if (!fixedUrl.includes(ext)) {
            fixedUrl += ext
          }

          return done({
            file: fixedUrl,
            contents: readFileSync(fixedUrl, 'utf8')
          })
        }

        return done()
      },
      outFile: opts.output,
      includePaths: [dir],
      outputStyle: opts.minify || 'nested',
      sourceMap: opts.sourcemaps
    }, (err, result) => {
      if (err) {
        return reject(err)
      }

      const dirArr = dir.split('/')

      return resolve({
        name: opts.folders && !isExternal ? dirArr[dirArr.length - 1] : name,
        ext: opts.minify === 'compressed' ? 'min.css' : 'css',
        css: result.css,
        map: result.map
      })
    })
  })

  return globby([...sources, ...external])
    .then(filePaths => Promise.all(filePaths.map(file => compile(file))))
    .then(write(opts))
    .catch(err => {
      console.error(err)
      if (opts.hardquit) {
        process.exitCode = 1
      }
    })
}

module.exports = pack
