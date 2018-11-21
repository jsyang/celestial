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

- add functionality for targeting (enemy units and structures)
    - add HomingMissile functionality for targeting

- set up querystring for "testing sector"
    - load different sectors in?
    - briefing text? 
    - contains entities used for testing
    
- improve fighter AI
    - retarget when current attackTarget is dead
    - avoid hovering too long near planet when attacking
    - aggression (proximity to attack target)
    - avoid stars
    - land on planet

## TODO for v1.2

- make small RadarGalaxy more useful for controlledEntity

- unified UX model for game

- radar not available when comm center is destroyed

- extend fighter AI
    - land on spaceport
    - traits of pilots
    - different attack patterns for different targets
    - self-preservation (health threshold before retreating for repair)

---

Copyright (c) 2018 Jim Yang <jsyang.ca@gmail.com>