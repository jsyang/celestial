# Todos for Celestial Combat



## BACKLOG

- networked gameplay
    - sectors fought over (rooms)
    - factions
    - kill ratios
    - veterancy
    - leaderboard
    - heroku host?
    - firebase host?

- health bars for units receiving damage

- kill statistics (entity killed by XXX)

- fix for higher-pixel density displays
https://github.com/pixijs/pixi.js/issues/1841

- drop off ground forces (probes) to attack enemy planet facilities
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

- Custom key mapping

- better HUD
    - landing speed indicator
    - nearest star / nearest planet is like the enemy indicator from XEvil (screen borders)
    - make a more advanced galaxy radar

- special button when docked to planet:
    - pick up unused upgrades
    - drop unused upgrades

- special button when near non-friendly planet
    - negotiate treaty
    - buy / sell resources

- cloaking device
    - one time use (actively cloaked until ship is damaged or fires a weapon)

- vector win / loss symbols    

- save / load games

- probes (alien craft?)

- more spacecraft
    - light fighter
    - escort guard 
    - heavy fighter
    - capital ships
    - viral (T4) shaped ships

- mercenary gameplay
    - bid / accept jobs
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
 

- implement structure status displays
- asteroids / uninhabitable worlds
- ability to destroy planets