# celestial

Celestial combat. Conquer the universe sector by sector.

## todo

- implement galcon-ish gameplay now that there is a boid-like entity

- filter collision testing by grids
- starfield for movement intuition
- star collisions
- homing missiles
- rockets
- multiple fighters
- production ability
- flag planting
- gamefield generation
- asteroids / uninhabitable worlds
- capital ships
- gamepad support
- different mission objectives
- memoize math funcs

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
