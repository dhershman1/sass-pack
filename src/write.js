const path = require('path')
const globby = require('globby')
const { mkdirp, writeFile, writeJson } = require('fs-extra')

const write = opts => fileList => mkdirp(opts.output)
  .then(() => {
    fileList.forEach(f => {
      if (opts.sourcemaps && f.map) {
        writeFile(path.resolve(opts.output, `${f.name}.map`), f.map)
      }

      writeFile(path.resolve(opts.output, `${f.name}.${f.ext}`), f.css)
    })
  })
  .then(() => {
    if (opts.manifest) {
      return globby(path.join(opts.output, '*.css'))
    }
  })
  .then(cssPaths => {
    if (!opts.manifest) {
      return false
    }

    const manifestJSON = cssPaths.reduce((acc, file) => {
      const { ext, name } = path.parse(file)

      if (ext !== '.map') {
        acc[name.replace('.min', '')] = file
      }

      return acc
    }, {})

    return writeJson(opts.manifest, manifestJSON)
  })
  .catch(err => {
    console.error(err)
    if (opts.hardquit) {
      process.exitCode = 1
    }
  })

module.exports = write
