# Changelog

## v2.0.0

> * Fix for Alias bug if file name existed in the folder path it caused issues
> * Performance improvements
> * Code optimizations
> * Brought all of the dependencies up to date
> * Removed backwards compatibility for depricated `--theme` flag **BREAKING CHANGE**
> * Add dynamic support for extensions when importing alias (it goes based on the extension of the file the import is being called from)
> * Better overall path handling for cross system stabilization
> * Added a large Sass Theme for performance testing

## v1.6.2

> * Switched to using `LibSass` Importer function for more stable support
> * Should fix the issue of aliased imports failing on importing other aliased imports
> * Improved performance

## v1.6.1

> * Code Cleanup in functions
> * Cleaned up the promise chain a bit
> * README tweaks
> * Fixed losing working directory if using alias imports that don't use alias should still be working now
> * Better Manifest building in promise chain

## v1.6.0

> * Added Alias Support for paths since sass does not have dynamic import support
>   * Use the `@` sign at the start of your path
>   * You can use `-a` or `--alias` to set the alias path\
> * Added `-a` and `--alias` options to cli to support this
> * With how new this feature is please report any and everything to issues when you find it

## v1.5.1

> * Updated `node-sass` to `4.5.3` for Node 8 support

## v1.5.0

> * Code clean up and optimizations
> * `--theme` and `-t` are now depricated it is recommended to switch to just `--source` or `-s`
>    * Backwards compatability is in place for now, the theme path gets attached to the source string list
> * `--error` and `-e` switched over to now be `--hardquit` and `-q`
> * Swapped out `minimist` package for `meow`
>   * Adds the `-h` and `--help` option
>   * Adds the `-v` and `--version` option
> * Removed the ability to use the single letter style porperty names
> * Added support for comma delimited list in source so users can now do `path1,path2,path3` etc..

## v1.4.2

> * Fixed source maps showing up in manifests
> * Fixed manifest saving with .min in name

## v1.4.1

> * Code Cleanup

## v1.4.0

> * Added the ability to have sass-pack minify css for you through `node-sass`
>   * Use either `-n <minifyType>` or `--minify <minifyType>` in your command
> * Removed process exit on a compile error, running like the library should run
> * Added the ability to have sass-pack create source maps for the css
>   * Use eitehr `-x <path>` or `--sourcemaps <path>` in your command
> * Some general code cleanup
> * Switched the public repo over to github

## v1.3.1

> * Now exists with code 1 if sass fails to compile
> * Fixed some unit tests
> * Re-orged changelog

## v1.3.0

> * Removed Progress module
> * Code cleanup
> * Performance improvements

## v1.2.0

> * Changed api vs cli usage check
> * Better option vars for api use
> * Added the ability to use full var name in cli with -- style

## v1.1.2

> * Code Cleanup
> * Broke functionality out into seperate functions
> * Removed debugging tools
> * Added some code comments

## v1.1.1

> * Optimization improvements
> * Removed unneeded promise wrapper
> * Promise now correctly skips steps if no manifest is declared

## v1.1.0

> * Can be used as a function
> * Added tests
> * Manifest is now optional
> * Source files are now optional
