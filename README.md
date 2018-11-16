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

## TODOs to finish v1

- win streak tally
    - lose fully when 2 sectors have been lost

- complete basic fighter AI
    - retarget when current attackTarget is dead
    - avoid stars
    - land on spaceport
    - land on planet
    
- unified UX model for game
---

Copyright (c) 2018 Jim Yang <jsyang.ca@gmail.com>