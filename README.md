<img style="filter: invert(1);" src="how-to-play/title.png" align="center">

# Celestial Combat

Celestial Combat is a game of galactic conquest and colonization. 

See this page for [How to Play](http://jsyang.ca/celestial/how-to-play) this game.

## Launching the game

- [Play Celestial Combat with keyboard + mouse](http://jsyang.ca/celestial)
- [Play Celestial Combat with a game pad](http://jsyang.ca/celestial?gamepad)

## Development

This game implements the Entity-Component-System model of dealing with data and interactions
between game pieces.

#### Feature toggles

You have the option of toggling game functionality via the URL you use to access the game.
The toggles are activated by the presence / absence of URL query strings: for instance,
to turn off all game audio you may do:
 
1. `yarn dev`
1. http://localhost:3000/?mute

or if you want to turn off all audio AND skip the title screen:

1. `yarn dev`
1. http://localhost:3000/?mute&game

See `src/client/startupOptions.ts` for a full list of feature toggles.

#### Scenario tests

Often times it is difficult to reliably recreate a situation or circumstance
within the regular gameplay where a certain class of behaviors presents itself.

Using the scenario test mode of the game, you can establish a controlled environment 
where you can set exactly what the starting state is and see the emergent behaviors of
your system unfold.

1. `yarn dev`
2. http://localhost:3000/?test
3. Edit `src/client/TestScreen/ScenarioSystem.ts` to create the scenario's initial conditions
4. Edit `src/client/component/*.ts` to tweak components that implement the behavior 

#### Geometry editor

You can use the geometry editor to create polygons to be displayed inside the game engine.
See `LETTERS` within `src/client/constants.ts` for an example. 

- [Start Geometry editor](http://jsyang.ca/celestial?editor)<br><br><img src="how-to-play/editor.png">

1. `yarn dev`
2. http://localhost:3000/?editor

---

## TODO for v1.2

- make small RadarGalaxy more useful for controlledEntity
    - blinking dot to indicate player entity
    - border blinking when player is dead?

- improve + extend fighter AI
    - retarget when current attackTarget is dead
    - aggression level (proximity to target)
    - land on planet
    - land on spaceport
    - different attack patterns for different targets
    - self-preservation (health threshold before retreating for repair)
    - preferred weapon

## TODO for v1.3

- units receiving damage show health bars
- improve + extend fighter AI
    - avoid stars

---

Copyright (c) jsyang.ca@gmail.com