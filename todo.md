# Todo / idea list

### Core Gameplay
- Economy that matters
    - raw materials and finished materials need to affect gameplay (they do already but invisibly)
    - ordering construction of Fighters and Freighters, significantly affecting material supply
    - can run out of materials on planet
    - can move materials from one planet to another via freighter
    - freighter has 2 types of cargo: 
        - finished materials (can be used for colonization)
        - raw materials (cannot be used for colonization, but can be used to supply)

- galactic radar is ranged (update radius from comm centers)
- drop off ground forces (probes) to attack enemy planet facilities
    - ground forces cannot leave planet unless picked up
    - dedicated drop-ship unit
    - armies bounded to surface of a planet

- structured strategic enemy AI (possibly use btrees here)
    - 1st order
        - move to point
        - move to point + maintain distance away from point (radius)
        - move, avoiding stars and planets
    - 2nd order
        - attack planet
        - attack enemy fighter
        - intercept enemy colonization attempt
        - retreat to nearest friendly planet
        - dock on friendly planet
        - dock on friendly spaceport
        - request backup
        - defend entity (move + maintain dist, + attack enemies within range)
        - seek unoccupied planets to land on
        - coordinated attack with fighters in groups
        - assign priority to targets

### Persistence
- save / load games
- networked gameplay
    - sectors fought over (rooms)
    - factions
    - kill ratios
    - veterancy
    - leaderboard
    - heroku host?
    - firebase host?
- Options screen + Custom key mapping
    - keyboard
    - gamepad calibration

### Score
- score tied to lifetime of pilot? (instead of full team)
- add rank insignia

### Display
- health bars for units receiving damage
- comm center provides radar galaxy (no functionality if destroyed!)
- fix for higher-pixel density displays
https://github.com/pixijs/pixi.js/issues/1841
- vector win / loss symbols

### Nebulous 
- special button when near non-friendly (but not hostile) planet
    - negotiate treaty
    - buy / sell resources

- cloaking device
    - one time use (actively cloaked until ship is damaged or fires a weapon)

- alien craft that is hostile to all factions?
- more spacecraft
    - light fighter
    - escort guard 
    - heavy fighter
    - assault carrier
        - long range cluster rocket attacks
    - capital ships
    - viral (T4) shaped ships

- mercenary gameplay
    - bid / accept jobs
    - switch allegiances
    - become a pirate (gray color?)!
    - manage fleet
    - purchase / upgrade facilities

- different mission objectives
    - raiding
        - steal weapon from enemy PLab
        - steal finished goods
    - vengeance
    - infiltration
        - hijack spaceport and use it to destroy planet facilities
        - land saboteurs on planet to reduce production
        - land saboteurs on planet to reduce production
 
- asteroids / uninhabitable worlds
- ability to destroy planets