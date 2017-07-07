[![Build Status](https://travis-ci.org/dhershman1/sass-pack.svg?branch=master)](https://travis-ci.org/dhershman1/sass-pack)

# Sass-Pack

A simple CLI system for compiling sass down to css. Runs async, optionally builds a css manifest.

Install:
`npm i -D sass-pack`

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
* `minify` - minify type
* `hardquit` - kill process if `reject` is triggered
* `sourcemaps` - path to sourcemaps

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
