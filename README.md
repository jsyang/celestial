# celestial

Celestial combat. Conquer the universe sector by sector.

## todo

- freighters move to colonize planets
- production ability
- planet base defences
- planet automated build tree

- multiple fighters
- strategic enemy AI
- different mission objectives
- memoize math funcs
- implement galcon-like gameplay now that there is a boid entity behavior
- generate a game state based from pre-exising saved data

## nice to haves

- capital ships
- rockets
- homing missiles
- asteroids / uninhabitable worlds
- ability to destroy planets

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
