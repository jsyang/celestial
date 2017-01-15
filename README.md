# celestial

Celestial combat. Conquer the universe sector by sector.

## Controls

- Arrow keys to thrust and move
- F to shoot

Reload if you lost your only Fighter without planetary Fighter production capabilities.

Works well with game pads:

- Analog stick to set heading
- Button 0 for shoot
- Button 2 for thrust
- Button 1 AND Button 3 together to reload the game

## TODOs

- title screen
    - new game button
    - about button
- about screen / link to github

- strategic enemy AI

- projectiles damage enemy entities
- freighters use ECS
- probes use ECS

- multiple fighters
- strategic enemy AI
- different mission objectives

- implement galcon-like gameplay now that there is a boid entity behavior
- generate a game state based from pre-exising saved data


## Nice-to-haves

- add unit tests
- implement structure status displays
- capital ships
- rockets
- homing missiles
- asteroids / uninhabitable worlds
- ability to destroy planets
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
