# Celestial Combat ![](favicon.png)

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

## TODO for v1.2

- improve + extend fighter AI
    - land on planet
    - land on spaceport
    - move to point and be at rest

## TODO for v1.3

- friendly units show stats
    - indicator to show currently active wingmates (and their objectives)
    - activity indicator?
        - producing
        - repairing
        - manufacturing
        - developing
    - receiving damage = show health bars
    - manufacturing / refining = show progress bar

- improve + extend fighter AI
    - aggression level (proximity to target)
    - retarget when current attackTarget is dead / objective met
    - avoid stars
    - different attack patterns for different targets
    - self-preservation (health threshold before retreating for repair)
    - preferred weapon

## TODO for v1.4

- sectors are generated before game begins
    - retreat / advance / develop sector

- save game / load games
    - from cloud?

- strategic AI
    - combined arms
    - spearhead operations
    - logistically minded

---

Copyright (c) jsyang.ca@gmail.com