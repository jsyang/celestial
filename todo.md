# TODOs 

## v1.3

- user accounts
    - persist games
    - maximum of 3 saved games
    - persist settings
    - leaderboards (highest, lowest score per playtime)
    - playtime of saved game (in real elapsed time, only count minutes)
    - upload avatar
    - site to browse saved games
        - simple forum
    - statistics
        - total X killed

- game controls modal
    - volume controls
    - key remap
    - save preferences to account / localstorage

## v1.4

- friendly units show stats
    - indicator to show currently active wingmates (and their objectives)
    - activity indicator?
        - producing
        - repairing
        - manufacturing
        - developing
    - receiving damage = show health bars
    - manufacturing / refining = show progress bar

## v1.5

- improve + extend fighter AI
    - pilot characteristics 
        - aggression level (proximity to target)
        - different attack patterns for different targets
        - self-preservation (health threshold before retreating for repair)
        - preferred weapon
    - land on spaceport
    - move to point and be at rest
    - retarget when current attackTarget is dead / objective met
    - avoid stars

## v2.0

- sectors are generated before game begins
    - retreat / advance / develop sector


- strategic AI
    - combined arms
    - spearhead operations
    - logistically minded


## Concepts for improving the game

### Core Gameplay
- unified UX model for game
- radar not available when comm center is destroyed

- upgrade PBase weaponry
- upgrade structures to have shields
- upgrade spaceport: spaceport 2 (larger)
- show all options available to all ranks (but cannot execute if not high enough)
- wingmen control
    - traits of pilots: antagonistic, neutral, submissive (will they listen to your commands?)
- ammo supply freighter
- repair ship
- planets have finite resources?
    - resources regenerate at a linear rate?

- Economy that matters
    - raw materials and finished materials need to affect gameplay (they do already but invisibly)
    - ordering construction of Fighters and Freighters, significantly affecting material supply
    - can run out of materials on planet
    - can move materials from one planet to another via freighter
    - freighter has 2 types of cargo: 
        - finished materials (can be used for colonization)
        - raw materials (cannot be used for colonization, but can be used to supply)

- galactic radar is ranged
    - update radius from comm centers (if < global coverage threshold)
    - completely covered if > 3 comm centers
    - localized Radar for immediate area around ship if no comm center
     
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


## Research

### Similar games
- https://www.myabandonware.com/game/conquest-frontier-wars-cvk
- https://www.myabandonware.com/game/dark-star-6ye

- https://en.wikipedia.org/wiki/Starflight
- https://www.mobygames.com/game/starflight-2-trade-routes-of-the-cloud-nebula/screenshots

Star control

- http://wiki.uqm.stack.nl/Main_Page
- https://www.myabandonware.com/game/star-control-1w1
- https://www.myabandonware.com/game/star-control-ii-1ve
- https://www.myabandonware.com/game/star-control-3-c9u

- http://zero-k.info/

### Game UI blogs / repos
- http://freegamer.blogspot.com/
- http://www.polarorbit.net/2015/02/building-a-better-rts-introduction/
- http://www.indieretronews.com/search/label/OPEN%20SOURCE


### Software
- re-organize HUD components that are shown in the 4 corners to be stackable (vs hard-coded X,Y)
- `webpack-bundle-analyzer` to pare down dependencies
    - dependencies: especially pixi.js is not being tree-shaken correctly
    - use parcel instead?
- profile funcs using most CPU time
- find out how to reduce major GC events
    - avoid creating destroying objects
    - https://stackoverflow.com/questions/18364175
    - https://stackoverflow.com/questions/18800440    
- use gpu.js for parallel ops
