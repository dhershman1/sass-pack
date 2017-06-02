[![Build Status](https://travis-ci.org/dhershman1/sass-pack.svg?branch=master)](https://travis-ci.org/dhershman1/sass-pack)

# Sass-Pack

A simple CLI system for compiling sass down to css. Runs async, optionally builds a css manifest.

Install:
`npm i -D sass-pack`

### Changelog

You can view the changelog here: https://github.com/dhershman1/sass-pack/blob/master/changelog.md

### CLI Usage

 - `sass-pack [options]` - Run sass-pack using your options
 - `-s --source <path>` - Set the source path of page based scss (If you have floating sass files with your pages) - `optional`
 - `-t --theme <path>` - Set the path to your `theme` scss - `Required`
 - `-m --manifest <path>`  - Set the path of your `css manifest json` - `optional` default: `/`
 - `-o --output <path>` - Set the path for the output css - `optional` default: `/`
 - `-n --minify <minifyType>` - Set the style of minifying can be `nested`, `expanded`, `compact`, or `compressed` - `optional` default: `nested`
 - `-e --error` - Tell Sass pack if you want to terminate the process when there is sass errors (undefined variables, bad properties, etc.) - `optional` default: `false`
 - `-x --sourcemaps <path>` - Tell sass pack if you want to generate sourcemaps as well - `optional` default: `false`

Example:
> sass-pack -o public/css -s src/app -t public/scss/themes -m src/config/css_manifest.json

OR

> sass-pack --output public/css --source src/app --theme public/scss/themes --manifest src/config/css_manifest.json

### API Usage

Sass-Pack can now be used as a simple function call, it will return a promise and once everything is finished it will resolve said promise

the options are the same as if using the cli

* `t, theme` - Theme path
* `o, output` - Output path
* `m, manifest` - Manifest path
* `s, source` - Source file paths (page sass)
* `n, minify` - minify type
* `e, error` - kill process
* `x, sourcemaps` - path to sourcemaps

Example:
```js
const sassPack = require('sass-pack');
sassPack({
  t: path.join('tests', '*.scss'),
  o: path.join('tests', 'outputs'),
  m: path.join('tests', 'outputs', 'cssmanifest.json'),
  s: path.join('tests', 'srcTest', '*.scss')
}).then(() => {
  //Do some things once sass pack is finished
});
// You can also use the actual variable names:
sassPack({
  theme: path.join('tests', '*.scss'),
  output: path.join('tests', 'outputs'),
  manifest: path.join('tests', 'outputs', 'cssmanifest.json'),
  source: path.join('tests', 'srcTest', '*.scss')
}).then(() => {
  //Do some things once sass pack is finished
});
```
