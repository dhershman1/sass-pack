#! /usr/bin/env node
const sassPack = require('./pack.js');
const cli = require('meow')(`
		Usage
			$ sass-pack [options]

		Options
			-h, --help            show usage information
			-v, --version         show version info and exit
			-q, --hardquit        process.exit if a sass syntax error happens
			-s, --source [path]   set the path to your source sass file(s)
			-m, --manifest [path] path of where to write the manifest
			-o, --output [path]   the output path for your css
			-x, --sourcemaps [path]  set the path to generate sourcemaps to
			-n, --minify [option]    level of minification to apply
			-a, --alias [option]    the alias to use while looking for imports

		Examples
			$ sass-pack --output=dist/css --source=src/sass/*.scss
			$ sass-pack -o dist/css -s src/sass/*.scss
`, {
		flags: {
			help: {
				alias: 'h'
			},
			version: {
				alias: 'v'
			},
			theme: {
				type: 'string',
				alias: 't'
			},
			source: {
				type: 'string',
				alias: 's'
			},
			manifest: {
				type: 'string',
				alias: 'm'
			},
			output: {
				type: 'string',
				alias: 'o'
			},
			sourcemaps: {
				type: 'string',
				alias: 'x'
			},
			alias: {
				type: 'string',
				alias: 'a'
			},
			hardquit: {
				type: 'boolean',
				alias: 'q',
				default: false
			},
			minify: {
				type: 'string',
				alias: 'n',
				default: 'nested'
			}
		}
	});

(function moduleCheck() {
	if (require.main === module) {
		sassPack(cli.flags);
	}

	module.exports = sassPack;
}());
