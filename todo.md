# Todos for Celestial Combat

## Critical priority

- win / loss tally
- kill statistics (entity killed by XXX)
- score (total battle value of enemies killed)
- health bars for units receiving damage
- save / load games

- Economy that matters
    - raw materials and finished materials need affect gameplay
    - ordering construction of Fighters and Freighters, significantly affecting material supply
    - can run out of materials on planet
    - can move materials from one planet to another via freighter
    - freighter has 2 types of cargo: 
        - finished materials (can be used for colonization)
        - raw materials (cannot be used for colonization, but can be used to supply)

- hardcore mode?

## High priority

- geometry editor upgrades
    - save /load geometry with localstorage
    - set grid cell size
    - mouse wheel zoom for preview scaling 

- networked gameplay
    - sectors fought over (rooms)
    - factions
    - kill ratios
    - veterancy
    - leaderboard
    - heroku host?
    - firebase host?

## BACKLOG

- galactic radar is ranged (update radius from comm centers)

- fix for higher-pixel density displays
https://github.com/pixijs/pixi.js/issues/1841

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


- better HUD
    - landing speed indicator
    - nearest star / nearest planet is like the enemy indicator from XEvil (screen borders)
    - make a more advanced galaxy radar

- special button when near non-friendly planet
    - negotiate treaty
    - buy / sell resources

- cloaking device
    - one time use (actively cloaked until ship is damaged or fires a weapon)

- vector win / loss symbols    

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

- Options screen + Custom key mapping
    - keyboard
    - gamepad calibration