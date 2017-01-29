#! /usr/bin/env node

const fsp = require('fs-promise');
const sass = require('node-sass');
const path = require('path');
const parsedArgs = require('minimist')(process.argv.slice(2));
const ProgressBar = require('progress');
const globby = require('globby');

function sassPack(opts) {

	const globbyPaths = (opts.s) ? [opts.t, opts.s] : opts.t;
	let bar = {};

	fsp.mkdirp(opts.o, err => {
		if (err) {
			throw err;
		}
	});

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

	function writeManifest(paths) {
		let obj = {};

		paths.map(file => {
			obj[path.parse(file).name] = file;

			return obj;
		});

		return fsp.writeJson(opts.m, obj);
	}

	return globby(globbyPaths)
		.then(paths => {
			const filteredPaths = paths.filter(file => {
				return !file.includes('framework');
			});

			bar = new ProgressBar('Compiling SASS [:bar] :current/:total :elapsed :percent', {
				total: filteredPaths.length,
				width: 20
			});

			return Promise.all(filteredPaths.map(file => {
				return compile(file);
			}));
		})
		.then(data => {
			return Promise.all(data.map(({
				name,
				result
			}) => {
				bar.tick();

				return fsp.writeFile(path.resolve(opts.o, `${name}.css`), result.css);
			}));
		})
		.then(() => {
			if (opts.m) {
				return globby(path.join(`${opts.o}`, '*.css'));
			}

			return null;
		})
		.then(paths => {
			if (!paths) {
				return;
			}

			return writeManifest(paths);
		})
		.catch(err => {
			throw err;
		});
}

if (parsedArgs.o && parsedArgs.t) {
	sassPack(parsedArgs);
}
module.exports = sassPack;
