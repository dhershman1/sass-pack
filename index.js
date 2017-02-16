#! /usr/bin/env node

const fsp = require('fs-promise');
const sass = require('node-sass');
const path = require('path');
const parsedArgs = require('minimist')(process.argv.slice(2));
const ProgressBar = require('progress');
const globby = require('globby');

/**
 * Our main factory function to run sass-pack
 * @module sassPack
 * @param  {Object} opts an object containing our paths
 * @param		{String}	opts.theme The Theme string path
 * @param		{String}	opts.output The output string path
 * @param		{String}	opts.source The source file string paths
 * @param		{String}	opts.manifest The manifest string path
 * @return {Promise}      Returns the globby promise object
 */

function sassPack(options) {

	const opts = {
		theme: options.theme || options.t,
		source: options.source || options.s,
		manifest: options.manifest || options.m,
		output: options.output || options.o
	};
	const globbyPaths = (opts.source) ? [opts.theme, opts.source] : opts.theme;
	let bar = {};

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
				file: file
			}, (compileErr, result) => {
				if (compileErr) {
					reject(compileErr);
				}
				resolve({
					name,
					result
				});
			});
		});
	}

	/**
	 * Write our manifest json file to our manifest path.
	 * @function writeManifest
	 * @param  {Array} paths An array of paths we need to write into our manifest
	 * @return {Promise}      Returns the promise set by the fsp.writeJson method
	 */
	function writeManifest(paths) {
		let obj = {};

		// Map our files to an object we can set in our json manifest
		paths.map(file => {
			obj[path.parse(file).name] = file;

			return obj;
		});

		// Write our json file
		return fsp.writeJson(opts.manifest, obj);
	}

	// Make sure our output directory is a thing before we start running stuff
	return fsp.mkdirp(opts.output)
		.then(() => {
			return globby(globbyPaths);
		})
		.then(paths => {
			// Create our progress bar
			bar = new ProgressBar('Compiling SASS [:bar] :current/:total :elapsed :percent', {
				total: paths.length,
				width: 20
			});

			// Return a promise array full of fun compiler promises
			return Promise.all(paths.map(file => {
				return compile(file);
			}));
		})
		.then(data => {
			// Return a promise array of creating the css files and running our progress bar
			return Promise.all(data.map(({ name, result }) => {
				bar.tick();

				return fsp.writeFile(path.resolve(opts.output, `${name}.css`), result.css);
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
			throw err;
		});
}

(function() {
	if (!module.parent) {
		sassPack(parsedArgs);
	}

	module.exports = sassPack;
}());
