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
      -f, --folders  tell sass-pack to use folder/dir names for theme naming
      -e, --external [path]  comma list of paths to treat as external css (they get their own .css file)

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
      folders: {
        type: 'boolean',
        alias: 'f',
        default: false
      },
      external: {
        type: 'string',
        alias: 'e'
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
