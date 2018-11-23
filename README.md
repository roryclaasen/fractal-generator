# Fractal Generator

> [roryclaasen.github.io/fractal-generator](https://roryclaasen.github.io/fractal-generator)

Mandelbrot Fractal Generator

## Contents

- [Instructions](#instructions)
- [Options](#options)
- [Branches](#branches)
- [License](#license)

## Instructions

- `Right Click` to zoom in and center on part of the graphic.
- Holding `control` will zoom out.
- Holding `shift` will just center on the the part of the graphic

## Options

- [Max_Iterations](#max_iterations)
- [Zoom](#zoom)
- Offset
  - [Offset.X_Pan](#offsetx_pan)
  - [Offset.Y_Pan](#offsety_pan)
- Image Options
  - [Image_Options.Quality](#image_optionsquality)
- [Draw](#draw)
- [Reset](#reset)

### Max_Iterations

| Type   | Default | Min |
|:------:|:-------:|:---:|
| Number | `250`   | `1` |

### Zoom

| Type   | Default | Min   |
|:------:|:-------:|:-----:|
| Number | `250`   | `100` |

Current zoom level

### Offset.X_Pan

| Type   | Default |
|:------:|:-------:|
| Number | `-100`  |

Relative X Offset

### Offset.Y_Pan

| Type   | Default |
|:------:|:-------:|
| Number | `0`     |

Relative X Offset

### Image_Options.Quality

| Type   | Default | Min   | Max |
|:------:|:-------:|:-----:|:---:|
| Number | `0.9`   | `0.1` | `1` |

Image quality

### Draw

| Type   |
|:------:|
| Button |

Force Redraw

### Reset

| Type   |
|:------:|
| Button |

Reset's any changed options back to default

## Branches

| Branch | Travis CI | Server |
|:-------|:----------|:-------|
| [Master](https://github.com/roryclaasen/fractal-generator/tree/master) | [![Build Status][CI-master]](https://travis-ci.com/roryclaasen/fractal-generator) | [GitHub Pages](https://roryclaasen.github.io/fractal-generator) |

## License

This project is licensed under the MIT License - see the [license file](LICENSE) for details

[CI-master]: https://travis-ci.com/roryclaasen/fractal-generator.svg?branch=master "Travis CI"
