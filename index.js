#! /usr/bin/env node

'use strict';

const fsp = require('fs-promise');
const sass = require('node-sass');
const path = require('path');
const parsedArgs = require('minimist')(process.argv.slice(2));
const ProgressBar = require('progress');
const globby = require('globby');

function sassPack(opts) {

	fsp.mkdirp(opts.o, err => {
		if (err) {
			throw err;
		}
	});
	let bar = {};

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


	globby([opts.t, opts.s])
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
			return Promise.all(data.map(({ name, result }) => {
				bar.tick();

				return fsp.writeFile(path.resolve(opts.o, `${name}.css`), result.css);
			}));
		})
		.then(() => {
			return globby(path.join(`${opts.o}`, '*.css'));
		})
		.then(paths => {
			let obj = {};


			paths.map(file => {
				obj[path.parse(file).name] = file;

				return obj;
			});

			return fsp.writeJson(opts.m, obj);
		})
		.catch(err => {
			throw err;
		});
}

sassPack(parsedArgs);
module.exports = sassPack;

