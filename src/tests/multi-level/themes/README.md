# CSS Codebase for B2C

## Methodology
Structure your SASS classes following the BEM methodology.

https://css-tricks.com/bem-101/

## Build Tools
The CSS is built by using SASS with Bootstrap 4

1. http://sass-lang.com/
2. https://getbootstrap.com/

### Defaults
RightTurn serves as the default stylesheet for all skins and based off the bootstrap 4 grid system.
All OEM skinned stylesheets pull in the defaults and override them where necessary (hopefully just colors).


### Creating A New Skin
Duplicate the `default.scss` file and name it after the variable of the OEM that'll be passed to the main template.
In your newly created file you'll override any of the variables used throughout the files that `framework.scss` imports.

You do not need to override all the variables as they'll be inherited from `_default-variables.scss` - only the ones that change based on the design.

If your theme file starts to get out of hand (read long) then think about creating a directory with the same OEM name and make modular imports - like `framework.scss` does.

### Icons
Icons are built from the b2c font-icons repo. Refer to that repo's README on how to add new icons.
https://bitbucket.dealertire.com/projects/B2C/repos/font-icons/browse

### Color Variables
When adding a new color use the hex value to get a proper
name from the link below. Do not name it yourself.

http://chir.ag/projects/name-that-color/

`$purple-heart: hsl(274, 58%, 50%);`

#### Alpha Channels
If you need an alpha channel append the alpha value to the end of the name.


`$purple-heart-55: hsla(274, 58%, 50%, 0.55);`
