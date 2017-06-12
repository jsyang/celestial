# celestial

Celestial combat. Conquer the universe sector by sector.

```
yarn
yarn dev

# --> http://localhost:3000
```

## Controls

- Arrow keys to thrust and move
- F to shoot

Reload if you lost your only Fighter without planetary Fighter production capabilities.

Works well with game pads:

- Analog stick to set heading
- Button 0 for shoot
- Button 2 for thrust
- Button 1 AND Button 3 together to reload the game

## Bugs

- cannon shots are not correctly affected by shooter's dx/dy

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
