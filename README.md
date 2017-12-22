[![Build Status](https://travis-ci.org/jsxc/consistent-color-generation.svg?branch=master)](https://travis-ci.org/jsxc/consistent-color-generation)
[![codecov](https://codecov.io/gh/jsxc/consistent-color-generation/branch/master/graph/badge.svg)](https://codecov.io/gh/jsxc/consistent-color-generation)

# Consistent Color Generation
This node script generates colors given a string according to [XEP-0392 0.4](https://xmpp.org/extensions/xep-0392.html#constants-ycbcr).

## Features
### Implemented
- RGB color generation
- Red/Blue-blindness correction
- Blue-blindness correction

### Not yet implemented
- Adapting colors for a specific background color
- Mapping to a color palette

## How to use
Install all dependencies with `npm install` and import the script as usual:
```
var getRGB = require('./consistent-color-generation');
```

Generate color without Color Vision Deficiency correction:
```
var color = getRGB('Foobar');
// color.r, color.g, color.b
```

Generate color with Red/Green-blindness correction:
```
var color = getRGB('Foobar', 'redgreen');
```

Generate color with Blue-blindness correction:
```
var color = getRGB('Foobar', 'blue');
```

You can also adjust the luminance:
```
var color = getRGB('Foobar', undefined, 0.5);
```

## Development
Install all dependencies with `npm install --dev` and run `npm test` before every commit.
