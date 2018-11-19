<img src="how-to-play/title.png" align="center">

# Celestial Combat

Celestial Combat is a game of galactic /* trade */, conquest, and colonization. 

See this page for [How to Play](http://jsyang.ca/celestial/how-to-play) this game.

## Launching the game

- [Play Celestial Combat with keyboard](http://jsyang.ca/celestial)
- [Play Celestial Combat with a game pad](http://jsyang.ca/celestial?gamepad)

## Development

This game implements the Entity-Component-System model of dealing with data and interactions
between game pieces.

#### Geometry Editor

You can use the geometry editor to create polygons to be display inside the game engine.
See `LETTERS` within `src/client/constants.ts` for example. 

- [Start Geometry editor](http://jsyang.ca/celestial?editor)<br><img src="how-to-play/editor.png">

## TODO for v1.1

- add hotkey for targeting (enemy units and structures)

- improve fighter AI
    - retarget when current attackTarget is dead
    - avoid hovering too long near planet when attacking
    - different attack patterns for different targets
    - avoid stars
    - land on planet

## TODO for v1.2
- add rank insignia
- unified UX model for game

- score tied to lifetime of pilot? (instead of full team)
- radar not available when comm center is destroyed

- extend fighter AI
    - land on spaceport
    - traits of pilots
    - aggression (proximity to attack target)
    - self-preservation (health threshold before retreating for repair)

---

Copyright (c) 2018 Jim Yang <jsyang.ca@gmail.com>