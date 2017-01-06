# celestial

Celestial combat. Conquer the universe sector by sector.

## todo

- rockets
- homing missiles
- filter collision testing by grids


- production ability
- flag planting
- gamefield generation

- multiple fighters
- asteroids / uninhabitable worlds
- capital ships
- gamepad support
- different mission objectives
- memoize math funcs
- implement galcon-like gameplay now that there is a boid entity behavior

## Custom pixijs build

Via [How to build](https://github.com/pixijs/pixi.js#how-to-build), we exclude
portions of this render framework to minimize compiled code.

```bash
npm run dist -- \
  -e loaders \
  -e extract \
  -e accessibility \
  -e interaction \
  -e filters
```

Filesize comparison

```
Custom build    pixi.min.js     305KB
                pixi.js         912KB

Pre-built       pixi.min.js     390KB
                pixi.js        1141KB

```
