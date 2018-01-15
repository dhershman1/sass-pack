[![Build Status](https://img.shields.io/travis/dhershman1/sass-pack.svg?style=for-the-badge)](https://travis-ci.org/dhershman1/sass-pack)
[![npm](https://img.shields.io/npm/v/sass-pack.svg?style=for-the-badge)](https://www.npmjs.com/package/sass-pack)
[![Downloads](https://img.shields.io/npm/dm/sass-pack.svg?style=for-the-badge)](https://www.npmjs.com/package/sass-pack)
[![dependencies Status](https://img.shields.io/david/dhershman1/sass-pack.svg?style=for-the-badge)](https://david-dm.org/dhershman1/sass-pack)
[![devDependencies Status](https://img.shields.io/david/dev/dhershman1/sass-pack.svg?style=for-the-badge)](https://david-dm.org/dhershman1/sass-pack?type=dev)

# Sass-Pack

A simple CLI system for compiling sass down to css with additional support for other options and features

## Changelog

You can view the changelog here: https://github.com/dhershman1/sass-pack/blob/master/changelog.md

## CLI Usage

**PLEASE NOTE: `theme` is now depricated, source is now the main option to use as it should be please convert asap**

 - `sass-pack [options]` - Run sass-pack using your options
 - `-s --source <path>` - Set the source path of page based scss (If you have floating sass files with your pages) - `optional`
 - `-m --manifest <path>`  - Set the path of your `css manifest json` - `optional` default: `/`
 - `-o --output <path>` - Set the path for the output css - `optional` default: `/`
 - `-n --minify <minifyType>` - Set the style of minifying can be `nested`, `expanded`, `compact`, or `compressed` - `optional` default: `nested`
 - `-x --sourcemaps <path>` - Tell sass pack if you want to generate sourcemaps as well - `optional` default: `false`
 - `-q --hardquit` - Add this tag if when sass-pack runs into a Sass syntax error you would like it to hard quit the process, if you're using a watch tool you can leave this off and sass-pack will await changes and try again.
 - `-a --alias <path>` - The path to replace the alias with
 - `-e --external <path>` - Path to read for your external files can accept a glob
 - `-f --folders` - `boolean` style argument that tells sass-pack to use folder/dir names containing themes instead of file names

Example:
> sass-pack -o public/css -s src/app,public/scss/themes -m src/config/css_manifest.json

OR

> sass-pack --output=public/css --source=src/app,public/scss/themes --manifest=src/config/css_manifest.json

## API Usage

Sass-Pack can now be used as a simple function call, it will return a promise and once everything is finished it will resolve said promise

The options are the same as if using the cli to send a list of paths when using the API put the paths into an array of strings

**AS OF v1.5.0 using single letter property names is NO LONGER supported**

* `source` - Source file paths (page sass)
* `output` - Output path
* `manifest` - Manifest path
* `minify` - Minify type
* `hardquit` - Kill process if `reject` is triggered
* `sourcemaps` - Path to sourcemaps
* `alias` - Path to replace alias with

Example:
```js
const sassPack = require('sass-pack');
sassPack({
  source: [path.join('tests', '*.scss'), path.join('tests', 'srcTest', '*.scss')],
  output: path.join('tests', 'outputs'),
  manifest: path.join('tests', 'outputs', 'cssmanifest.json'),
}).then(() => {
  //Do some things once sass pack is finished
});
```
## Using Hard Quit

The hard quit option was added if the user wishes for `sass-pack` to perform a `process.exit(1)` if any issue at all (including sass syntax errors) triggers a `reject` in the `promise chain`

> sass-pack -o public/css -s src/app,public/scss/themes -m src/config/css_manifest.json -q

OR

> sass-pack --output=public/css --source=src/app,public/scss/themes --manifest=src/config/css_manifest.json --hardquit

If using the `API` just add `hardquit: true` to your options object

## Using Alias

Alias adds the ability to shorten common paths down so you can have a cleaner import setup in your sass I added this because sass doesn't seem to support dynamic import support like LESS.

So assuming my `test_home.scss` lived two dirs above my importer I'd have this:

```scss
@import '../../test_home.scss';

a {
	margin: 1rem;
	.testing {
		font-weight: 400;
	}
}

```
But if I set my alias to `-a tests/srcTest/` and then change the import to: `@import @/test_home.scss` sass-pack will auto convert the alias before compiling down to css

you would do the same thing in the API
```js
const sassPack = require('sass-pack');
sassPack({
  source: [path.join('tests', '*.scss'), path.join('tests', 'srcTest', '*.scss')],
  output: path.join('tests', 'outputs'),
  manifest: path.join('tests', 'outputs', 'cssmanifest.json'),
  alias: 'my/alias/path'
}).then(() => {
  //Do some things once sass pack is finished
});
```

## External and Folders

With v2.1.0 there are 2 new options introduced, the ability to set a folders boolean, and the ability to set a path to some external files

### Folders

So with this option sass-pack will read the folder that the file lives in and use it as the theme name, instead of the actual file name itself.

Example:

```
/themes
| /default
  | /thing.scss
| /theme2
  | /index.scss

sass-pack -o output -s themes/**/*.scss -f

then:

/output
| /default.css
| /theme2.css
```

### Externals

The external option allows you to bring in scss files that you want to have their own css output after compile.

Example:

```
/themes
| /default
  | /thing.scss
  | /thing-email.scss
| /theme2
  | /index.scss
  | /theme2-email.scss

sass-pack -o output -s themes/**/!(*-email).scss -f -e themes/**/*-email.scss

then:

/output
| /default.css
| /theme2.css
| /theme2-email.css
| /thing-email.css
```

