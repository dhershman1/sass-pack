#! /usr/bin/env node
const fsa = require('fs-extra');
const sass = require('node-sass');
const path = require('path');
const parsedArgs = require('minimist')(process.argv.slice(2));
const globby = require('globby');

function normalizeOpts(options) {
	return {
		theme: options.theme || options.t,
		source: options.source || options.s,
		manifest: options.manifest || options.m,
		output: options.output || options.o,
		minify: options.minify || options.n,
		hardQuit: options.error || options.e,
		sourceMaps: options.sourcemaps || options.x
	};
}

/**
 * Our main factory function to run sass-pack
 * @module sassPack
 * @param  {Object} opts an object containing our paths
 * @param		{String}	opts.theme The Theme string path
 * @param		{String}	opts.output The output string path
 * @param		{String}	opts.source The source file string paths
 * @param		{String}	opts.manifest The manifest string path
 * @param		{String}	opts.minify The level of minify to use (defaults to none)
 * @param		{String}	opts.sourceMaps Boolean to determine if source maps should be created
 * @return {Promise}      Returns the globby promise object
 */

function sassPack(options) {

	const opts = normalizeOpts(options) || normalizeOpts(parsedArgs);
	const globbyPaths = (opts.source) ? [opts.theme, opts.source] : opts.theme;

	/**
	 * Compiles Sass down to CSS
	 * @function compile
	 * @param  {String} file String path of our sass file
	 * @return {Promise}      Returns a promise object back to our chain
	 */
	function compile(file) {
		return new Promise((resolve, reject) => {
			let name = path.parse(file).name;

			sass.render({
				file: file,
				outFile: opts.output,
				outputStyle: opts.minify || 'nested',
				sourceMap: opts.sourceMaps
			}, (compileErr, result) => {
				if (compileErr) {
					return reject(compileErr);
				}

				return resolve({
					name,
					ext: (opts.minify === 'compressed') ? 'min.css' : 'css',
					css: result.css,
					map: result.map
				});
			});
		});
	}

	/**
	 * Write our manifest json file to our manifest path.
	 * @function writeManifest
	 * @param  {Array} paths An array of paths we need to write into our manifest
	 * @return {Promise}      Returns the promise set by the fsa.writeJson method
	 */
	function writeManifest(paths) {
		let obj = {};

		// Map our files to an object we can set in our json manifest
		paths.map(file => {
			obj[path.parse(file).name] = file;

			return obj;
		});
		// Write our json file

		return fsa.writeJson(opts.manifest, obj);
	}

	// Make sure our output directory is a thing before we start running stuff
	return fsa.mkdirp(opts.output)
		.then(() => {
			return globby(globbyPaths);
		})
		.then(paths => {

			// Return a promise array full of fun compiler promises
			return Promise.all(paths.map(file => {
				return compile(file);
			}));
		})
		.then(data => {
			// Return a promise array of creating the css files
			return Promise.all(data.map((results) => {
				if (opts.sourceMaps) {
					fsa.writeFile(path.resolve(opts.output, `${results.name}.map`), results.map);
				}

				return fsa.writeFile(path.resolve(opts.output, `${results.name}.${results.ext}`), results.css);
			}));
		})
		.then(() => {
			// If a manifest path is set then we will need to grab all of the paths in our outputs folder
			if (opts.manifest) {
				return globby(path.join(`${opts.output}`, '*.css'));
			}

			return false;
		})
		.then(paths => {
			// If nothing comes back then just get us out of here.
			if (paths) {
				return writeManifest(paths);
			}

			return false;
		})
		.catch(err => {
			console.error(err);
		});
}

(function() {
	if (!module.parent) {
		sassPack(parsedArgs);
	}

	module.exports = sassPack;
}());
