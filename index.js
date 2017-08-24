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
			-x, --sourcempas [path]  set the path to generate sourcemaps to
			-n, --minify [option]    level of minification to apply
			-a, --alias [option]    the alias to use while looking for imports

		Examples
			$ sass-pack --output=dist/css --source=src/sass/*.scss
			$ sass-pack -o dist/css -s src/sass/*.scss
`, {
		alias: {
			h: 'help',
			v: 'version',
			t: 'theme',
			s: 'source',
			m: 'manifest',
			o: 'output',
			q: 'hardquit',
			x: 'sourcemaps',
			n: 'minify',
			a: 'alias'
		},
		boolean: ['hardquit'],
		default: {
			hardquit: false,
			minify: 'nested'
		}
	});

(function moduleCheck() {
	if (require.main === module) {
		sassPack(cli.flags);
	}

	module.exports = sassPack;
}());
