<img src="how-to-play/title.png" align="center">

# Celestial Combat

Celestial Combat is a game of galactic /* trade */, conquest, and colonization. 

See this page for [How to Play](http://jsyang.ca/celestial/how-to-play) this game.

## Launching the game

- [Play Celestial Combat with keyboard](http://jsyang.ca/celestial)
- [Play Celestial Combat with a game pad](http://jsyang.ca/celestial?gamepad)

## Development

- [Start Geometry editor](http://jsyang.ca/celestial?editor)<br><img src="how-to-play/editor.png">
You can use the geometry editor to create polygons to be display inside the game engine.
See `LETTERS` within `src/client/constants.ts` for example. 

## TODOs to finish v1

- expanded galactic radar should take you to selection rect's location in freelook

- win streak tally
    - lose fully when 2 sectors have been lost

- complete basic fighter AI
    - retarget when current attackTarget is dead
    - land on spaceport
    - land on planet

- tutorial sector
    - only planet to colonize is a planet with defunct colony and fighter 

---

Copyright (c) 2018 Jim Yang <jsyang.ca@gmail.com>