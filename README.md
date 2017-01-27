**Sass-Pack**
=============

A simple CLI system for compiling sass down to CSS and builds a cssmanifest this will run completely async and uses promise based calls to compile our sass to css

Since this module is not run on npm yet, you have to use `npm ln` in the sasspack directory to make sure it creates a link to your project.

Command & Options
--------

 - `sass-pack [options]` - Run sass-pack using your options
 - `-s` - Set the source path of page based scss `Required`
 - `-t` - Set the path to your `theme` scss `Required`
 - `-m`  - Set the path of your `css_manifest.json` `Required`
 - `-o` - Set the path for the output css `Required`

Example:
> sass-pack -o public/css -s src/app -t public/scss/themes -m src/config/css_manifest.json

Requirements
------------

 - `node-sass` - the node scss compiler library
 - `minimist` - module to setup cli support
 - `fs-promise` - module to use promises with the file system library, also include `fs-extra`
 - `globby` - module to allow us to use promise based globs
 - `progress` - module to keep track of progress in our terminal