const path = require('path');
const { mkdirp, readFile, writeFile, writeJson } = require('fs-extra');
const sass = require('node-sass');
const globby = require('globby');

/**
 * Our main factory function to run sass-pack
 * @module sassPack
 * @param		{object} opts an object containing our paths
 * @param		{string}	opts.output The output string path
 * @param		{string}	opts.source The source file string paths
 * @param		{string}	opts.manifest The manifest string path
 * @param		{string}	opts.minify The level of minify to use (defaults to none)
 * @param		{string}	opts.sourcemaps path of where to put source
 * @param		{boolean}	opts.hardquit Boolean to determine if source maps should be created
 * @param		{string}	opts.alias string path with which to replace @/ in sass files
 * @return	{null} returns the executed promise from globby
 */

module.exports = opts => {

	if (opts.theme) {
		console.error(new Error('--theme and -t are no longer supported please use -s or --source'));

		return process.exit(1);
	}

	// Split a list of paths into an array if it isn't one already
	if (!Array.isArray(opts.source)) {
		opts.source = opts.source.split(',');
	}

	/**
	 * Compiles Sass down to CSS
	 * @function compile
	 * @param  {String} file String path of our sass file
	 * @return {Promise}      Returns a promise object back to our chain
	 */
	const compile = file => new Promise((resolve, reject) => {
		const { name, dir, ext } = path.parse(file);

		sass.render({
			file,
			importer: (url, prev, done) => {
				const reg = /@\/|@\\/g;

				if (reg.test(url)) {
					const [, origPath] = url.split(reg);
					let fixedUrl = path.join(opts.alias, origPath);

					if (!fixedUrl.includes(ext)) {
						fixedUrl += ext;
					}
					readFile(fixedUrl, 'utf8', (err, data) => {
						if (err) {
							return reject(err);
						}

						return done({
							file: fixedUrl,
							contents: data
						});
					});
				} else {
					done();
				}
			},
			outFile: opts.output,
			includePaths: [dir],
			outputStyle: opts.minify || 'nested',
			sourceMap: opts.sourcemaps
		}, (compileErr, result) => {
			if (compileErr) {
				return reject(compileErr);
			}

			return resolve({
				name,
				ext: opts.minify === 'compressed' ? 'min.css' : 'css',
				css: result.css,
				map: result.map
			});
		});
	});

	/**
	 * Write our manifest json file to our manifest path.
	 * @function writeManifest
	 * @param  {Array} paths An array of paths we need to write into our manifest
	 * @return {Promise}      Returns the promise set by the writeJson method
	 */
	const writeManifest = () => {
		if (opts.manifest) {
			return globby(path.join(opts.output, '*.css')).then(cssPaths => {
				// Map our files to an object we can set in our json manifest
				const manifestJSON = cssPaths.reduce((acc, file) => {
					const { ext, name } = path.parse(file);

					if (ext !== '.map') {
						acc[name.replace('.min', '')] = file;
					}

					return acc;
				}, {});

				return writeJson(opts.manifest, manifestJSON);
			});
		}

		return false;
	};

	const writeOutput = fileList => {
		const { sourcemaps } = opts;

		fileList.forEach(d => {
			if (sourcemaps) {
				writeFile(path.resolve(opts.output, `${d.name}.map`), d.map);
			}

			writeFile(path.resolve(opts.output, `${d.name}.${d.ext}`), d.css);
		});

		return false;
	};

	// Make sure our output directory is a thing before we start running stuff
	return mkdirp(opts.output)
		// Then grab all of our sass file paths
		.then(() => globby(opts.source))
		// Then compile all of these down to css
		.then(srcPaths => Promise.all(srcPaths.map(file => compile(file))))
		// Then create sourcemaps if needed, and write the new CSS file
		.then(writeOutput)
		// Then build and write our manifest if one is asked for
		.then(writeManifest)
		.catch(err => {
			console.error(err);
			if (opts.hardquit) {
				process.exit(1);
			}
		});
};
