**Sass-Pack**
=============

A simple CLI system for compiling sass down to css. Runs async, optionally builds a css manifest.

Install:
`npm i -D sass-pack`

CLI Usage
--------

 - `sass-pack [options]` - Run sass-pack using your options
 - `-s` - Set the source path of page based scss
 - `-t` - Set the path to your `theme` scss `Required`
 - `-m`  - Set the path of your `css manifest json`
 - `-o` - Set the path for the output css

Example:
> sass-pack -o public/css -s src/app -t public/scss/themes -m src/config/css_manifest.json

API Usage
--------
Sass-Pack can now be used as a simple function call, it will return a promise and once everything is finished it will resolve said promise

the options are the same as if using the cli

* `t` - Theme path
* `o` - Output path
* `m` - Manifest path
* `s` - Source file paths (page sass)

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
```

Requirements
------------

 - `node-sass` - the node scss compiler library
 - `minimist` - module to setup cli support
 - `fs-promise` - module to use promises with the file system library, also include `fs-extra`
 - `globby` - module to allow us to use promise based globs
 - `progress` - module to keep track of progress in our terminal


 Running Tests
 ------------
 To run the tests install the module, run an `npm i` within sass pack and then `npm test`

 #### Changelog v1.1.0

 * Can be used as a function
 * Added tests
 * Manifest is now optional
 * Source files are now optional


  #### Changelog v1.1.1

  * Optimization improvements
  * Removed unneeded promise wrapper
  * Promise now correctly skips steps if no manifest is declared
