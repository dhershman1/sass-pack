const path = require('path');
const fsa = require('fs-extra');
const sass = require('node-sass');
const globby = require('globby');

const compatability = options => {
	// If a theme value still exists attach it to the source list
	if (options.theme) {
		console.warn('WARNING: Using options --theme or -t is now depricated.');
		console.warn('WARNING: Please switch these to use --source or -s');
		console.warn('WARNING: In a later version compatibility for --theme and -t may be removed.');
		options.source += `,${options.theme}`;
	}

	return options;
};

/**
 * Our main factory function to run sass-pack
 * @module sassPack
 * @param  {Object} opts an object containing our paths
 * @param		{String}	opts.output The output string path
 * @param		{String}	opts.source The source file string paths
 * @param		{String}	opts.manifest The manifest string path
 * @param		{String}	opts.minify The level of minify to use (defaults to none)
 * @param		{String}	opts.sourceMaps Boolean to determine if source maps should be created
 * @return {Promise}      Returns the globby promise object
 */

export default options => {

	// Run compatability in case someone upgraded without swapping out their theme options
	const opts = compatability(options);

	// Split a list of paths into an array if it isn't one already
	if (!Array.isArray(opts.source)) {
		opts.source = opts.source.split(',');
	}

	const mapAlias = file => new Promise((resolve, reject) => {

	});

	/**
	 * Compiles Sass down to CSS
	 * @function compile
	 * @param  {String} file String path of our sass file
	 * @return {Promise}      Returns a promise object back to our chain
	 */
	const compile = file => new Promise((resolve, reject) => {
		const {name} = path.parse(file);

		mapAlias(file).then(sassData => {
			sass.render({
				data: sassData,
				outFile: opts.output,
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
	});

	/**
	 * Write our manifest json file to our manifest path.
	 * @function writeManifest
	 * @param  {Array} paths An array of paths we need to write into our manifest
	 * @return {Promise}      Returns the promise set by the fsa.writeJson method
	 */
	const writeManifest = paths => {
		if (!paths) {
			return false;
		}

		const obj = {};

		// Map our files to an object we can set in our json manifest
		paths.map(file => {
			const parsedPath = path.parse(file);

			if (parsedPath.ext !== '.map') {
				obj[parsedPath.name.replace('.min', '')] = file;
			}

			return obj;
		});

		// Write our json file
		return fsa.writeJson(opts.manifest, obj);
	};

	// Make sure our output directory is a thing before we start running stuff
	return fsa.mkdirp(opts.output)
		.then(() => globby(opts.source))
		.then(paths => Promise.all(paths.map(file => compile(file))))
		.then(data => Promise.all(data.map(results => {
			if (opts.sourcemaps) {
				fsa.writeFile(path.resolve(opts.output, `${results.name}.map`), results.map);
			}

			return fsa.writeFile(path.resolve(opts.output, `${results.name}.${results.ext}`), results.css);
		})))
		.then(() => {
			// If a manifest path is set then we will need to grab all of the paths in our outputs folder
			if (opts.manifest) {
				return globby(path.join(`${opts.output}`, '*.css'));
			}

			return false;
		})
		.then(paths => writeManifest(paths))
		.catch(err => {
			console.error(err);
			if (opts.hardquit) {
				process.exit(1);
			}
		});
};
