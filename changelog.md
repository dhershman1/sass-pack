# v1.4.0

> * Added the ability to have sass-pack minify css for you through `node-sass`
>   * Use either `-n <minifyType>` or `--minify <minifyType>` in your command
> * Removed process exit on a compile error, running like the library should run
> * Added the ability to have sass-pack create source maps for the css
>   * Use eitehr `-x <path>` or `--sourcemaps <path>` in your command
> * Some general code cleanup
> * Switched the public repo over to github

# v1.3.1

> * Now exists with code 1 if sass fails to compile
> * Fixed some unit tests
> * Re-orged changelog

# v1.3.0

> * Removed Progress module
> * Code cleanup
> * Performance improvements

# v1.2.0

> * Changed api vs cli usage check
> * Better option vars for api use
> * Added the ability to use full var name in cli with -- style

# v1.1.2

> * Code Cleanup
> * Broke functionality out into seperate functions
> * Removed debugging tools
> * Added some code comments

# v1.1.1

> * Optimization improvements
> * Removed unneeded promise wrapper
> * Promise now correctly skips steps if no manifest is declared

# v1.1.0

> * Can be used as a function
> * Added tests
> * Manifest is now optional
> * Source files are now optional
