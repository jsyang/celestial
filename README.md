# Celestial Combat ![](favicon.png)

Celestial Combat is a game of galactic conquest and colonization. 

See this page for [How to Play](http://jsyang.ca/celestial/how-to-play) this game or
dive right in and [play with a keyboard + mouse](http://jsyang.ca/celestial) or
[play a gamepad](http://jsyang.ca/celestial?gamepad).

## List of things currently being worked on 

- net code to sync states for p2p
- use pixijs pointer events rather than mouse/tap
https://pixijs.download/v4.6.2/docs/PIXI.interaction.InteractionManager.html

## For Developers

Some specifics about the game:
- game implements ECS
- custom game engine: uses only vector graphics
- collision detection is done within an entity grid and via SAT (Separating Axis Theorem)

Additional detail about how the game was coded can be found in `devlogs/`:
- [Implementing saved games](saved-games.md)

#### Feature toggles

You have the option of toggling game functionality via the URL you use to access the game.
The toggles are activated by the presence / absence of URL query strings: for instance,
to turn off all game audio you may do:
 
1. `yarn watch`
1. http://localhost:3000/?mute

or if you want to turn off all audio AND skip the title screen:

1. `yarn watch`
1. http://localhost:3000/?mute&game

See `src/client/startupOptions.ts` for a full list of feature toggles.

#### Scenario tests

Often times it is difficult to reliably recreate a situation or circumstance
within the regular gameplay where a certain class of behaviors presents itself.

Using the scenario test mode of the game, you can establish a controlled environment 
where you can set exactly what the starting state is and see the emergent behaviors of
your system unfold.

1. `yarn watch`
2. http://localhost:3000/?test
3. Edit `src/client/TestScreen/ScenarioSystem.ts` to create the scenario's initial conditions
4. Edit `src/client/component/*.ts` to tweak components that implement the behavior 

#### Geometry editor

You can use the geometry editor to create polygons to be displayed inside the game engine.
See `LETTERS` within `src/client/constants.ts` for an example. 

- [Start Geometry editor](http://jsyang.ca/celestial?editor)<br><br><img src="how-to-play/editor.png">

1. `yarn watch`
2. http://localhost:3000/?editor

---

Copyright (c) jsyang.ca@gmail.com