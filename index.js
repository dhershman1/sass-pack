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
 * @param		{String}	opts.t The Theme string path
 * @param		{String}	opts.o The output string path
 * @param		{String}	opts.s The source file string paths
 * @param		{String}	opts.m The manifest string path
 * @return {Promise}      Returns the globby promise object
 */
function sassPack(opts) {

	const globbyPaths = (opts.s) ? [opts.t, opts.s] : opts.t;
	let bar = {};

// Make sure our output directory is a thing before we start running stuff
	fsp.mkdirp(opts.o, err => {
		if (err) {
			throw err;
		}
	});

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
		return fsp.writeJson(opts.m, obj);
	}

	return globby(globbyPaths)
		.then(paths => {
			// We need to Filter out any framework folders that might be lingering
			const filteredPaths = paths.filter(file => {
				return !file.includes('framework');
			});

			// Create our progress bar
			bar = new ProgressBar('Compiling SASS [:bar] :current/:total :elapsed :percent', {
				total: filteredPaths.length,
				width: 20
			});

			// Return a promise array full of fun compiler promises
			return Promise.all(filteredPaths.map(file => {
				return compile(file);
			}));
		})
		.then(data => {
			// Return a promise array of creating the css files and running our progress bar
			return Promise.all(data.map(({name, result}) => {
				bar.tick();

				return fsp.writeFile(path.resolve(opts.o, `${name}.css`), result.css);
			}));
		})
		.then(() => {
			// If a manifest path is set then we will need to grab all of the paths in our outputs folder
			if (opts.m) {
				return globby(path.join(`${opts.o}`, '*.css'));
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
// If neither outputs or theme are present in the parsed arguments then we must be getting required somewhere.
if (parsedArgs.o && parsedArgs.t) {
	sassPack(parsedArgs);
}
module.exports = sassPack;
