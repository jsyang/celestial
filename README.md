# celestial

Celestial combat. Conquer the universe sector by sector.

## todo

- rockets
- homing missiles
- gamefield limit
- speed limit on fighter ship
- filter collision testing by grids

- gamefield generation
- production ability
- flag planting
- freighters move to colonize planets
- planet base defences

- multiple fighters
- strategic enemy AI
- asteroids / uninhabitable worlds
- capital ships
- different mission objectives
- memoize math funcs
- implement galcon-like gameplay now that there is a boid entity behavior
- galaxy radar

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
