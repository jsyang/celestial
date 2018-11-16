<style>
    body {
        background: #121212;
        color: #c8c8c8;
        font-family: sans-serif;
    }
    
    section {
        padding-left: 2em;
        transition: all 0.3s ease;
        overflow: hidden;
    }
    
    section.hide {
        height: 0px;
    }
    
    h2 {
        user-select: none;
        cursor: pointer;
        color: #2288aa;
        margin-bottom: 0;
    }
    
    h2:before {
        content: '↑ ';
    }
    
    h2.hide:before {
        content: '↓ ';
    }
</style>

<center>
    <img src="title.png"/>
</center>

_Celestial Combat is a game of galactic conquest and colonization._ 

## Player controls

```
    KEYBOARD........... ACTION.............
    Left arrow key      Turn left
    Right arrow key     Turn right
    Up arrow key        Accelerate
    F                   Fire primary weapon
    E                   Special action (when docked)
    P                   Pause / resume game
    , (<)               Focus on previous fighter spaceship 
    . (>)               Focus on next fighter spaceship

    
    GAMEPAD............ ACTION.............
    Analog stick        Set craft direction
    Button 0            Fire primary weapon
    Button 1            Special action (when docked)
    Button 2            Accelerate
    Button 3            Pause / resume game
```

### HUD (Heads Up Display)

You can see vital information about the current situation in these regions of the
game screen:

![1](hud.png)

1. Galaxy radar is provided by friendly planets with Communications Centers. Markers indicate
the positions of planets, stars, and spaceships: green, yellow, and other colors, respectively.
You can click on this small display to expand the display to fill your screen.

2. Tactical radar is provided by the current spaceship being piloted by the player. Yellow and green
arcs show the heading from the spaceship's location to the nearest star and planet.

3. Spaceship type

4. Spaceship health

5. Active weapon: if the weapon requires an ammo supply, it is shown as a tally underneath the weapon name 

6. Message log: as the battle wages on, you will receive progress messages here from the parts of your faction's
war machine. Most recent messages are displayed at towards the top, leaving older messages to drop off below.

## Game play

You begin with either an invasion fleet (1 x Fighter + 4 invasion Freighters) or
a single occupied planet.

To colonize planets, you must land on them when they are unoccupied with your 
Fighter. The landing will plant a beacon, starting the flow of Freighters 
and raw materials sent to construct facilities on the planet. 

To win, you need to destroy all enemy production, combat facilities, and spacecraft.

#### Landing on planets
Before colonization can begin, you must land on a planet to secure your colonization
beacon. Approach the planet at slow speed and rotate the craft to face outwards from 
the planet's center. Failing to do this the Fighter will be destroyed.

**When you land on a friendly planet, your weapons will be rearmed and your ship repaired.**

Note: you cannot land on stars. Fighters are affected by gravity from planets and stars. 

#### Landing on a friendly spaceport
Much like landing on a planet, you must approach the spaceport slowly and aim for the center of
the spaceport to trigger the docking sequence. Once this is achieved, the spaceport will
catch your fighter craft. Rearming and repairing aboard the spaceport is much faster than on a planet surface.

## Weapons

- **Cannon**<br>The standard energy weapon supplied by the same power plant that drives
 a spacecraft's propulsion system.<br>`Damage: 1 per hit`
 
- **Heavy Cannon**<br>Focusing the emitters of the standard cannon allowed us to create a weapon that 
delivers twice the energy per projectile.<br>`Damage: 2 per hit`
  
- **Cluster Rocket**<br>Packed with high explosive shells, this unguided rocket can deliver 20
shells to the recipient for maximum destruction.<br>`Damage: 1 per hit x 20 shells + 0.5 impact damage`
   
- **Homing Missile**<br>We have developed cheap, miniaturized, biological prey-seeking intelligence
that is installed into every mass produced homing missile; a highly destructive weapon.<br>`Damage: 6 per hit`
    
- **Laser Bolt**<br>Fast discharge ultra-capacitors have enabled our technicians to pack a devastating laser weapon
into a small space.<br>`Damage: 30 per hit, ranged` 

## Units

##### Fighter

![1](fighter.png)

The backbone of an offensive fighting force is the standard GHX-12 Fighter
craft armed with a rapid-fire cannon. Fighters can lay claim to unoccupied
planets.

```
Speed           ||||||||||
Firepower       |||||||...
Armor           |||.......
Storage         |.........
```

##### Freighter 

![1](freighter.png)

Transport for raw and finished materials is provided primarily by Freighters.
They carry the capability to speed up construction of essential 
fortifications and facilities. Freighters are the only craft capable of constructing
a Planetary Base (PBase).

```
Speed           ||........
Firepower       |||....... 
Armor           ||||......
Storage         ||||||||||
```

## Facilities

![1](planet.png)

A typical planet with a full complement of facilities.

##### PBase

![1](pbase.png)

A Planetary Base (PBase) provides a planet with basic production and mining operations.
It can harvest and store raw materials on the planet. It can construct a Communications
Center and a Planetary Lab. It also provides defensive weapons, allowing the planet to 
defend itself from attackers. 

```
Speed           ..........
Firepower       |||||..... 
Armor           ||||||||..
Storage         ||||......
```

##### PColony

![1](pcolony.png)

A Planetary Colony (PColony) is the most efficient way for a planet to produce finished
materials from raw materials. It can construct spacecraft and other facilities; its operation
is critical to the maintenance demands of a planet. 

```
Speed           ..........
Firepower       .......... 
Armor           |||.......
Storage         |||||||...
```

#### PComm

![1](pcomm.png)

Galactic scanners installed in the Planetary Communications (PComm) allow
empires to track precise locations of other worlds. A galactic radar display is
active when your faction owns at least one functional PComm.

```
Speed           ..........
Firepower       .......... 
Armor           ||........
Storage         ..........
```
 
#### PLab

![1](plab.png)

Weapons technology research and new weapon installation is carried out from the 
Planetary Lab.

```
Speed           ..........
Firepower       .......... 
Armor           |.........
Storage         ||........
```  

#### Spaceport, SpaceDock, SensorArray

![1](spaceport.png)

The orbital Spaceport and its facilities allow the Fighter craft to be swiftly repaired and
rearmed. As it is the first point of defense for a planet, it is heavily armed and armored.  

```
Speed           |.........
Firepower       ||||||.... 
Armor           |||||||...
Storage         ||||......
```  

## Acknowledgements

Gameplay inspired by [Gravity Well v2.2](https://archive.org/details/GWELL22), the planetary 
conquest game by David H. Hoeft of Software Engineering Inc. Celestial Combat owes its existence to this
classic 1995 masterpiece. 

<script>

// Collapse into section accordions

var insertAfter = function(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var $ = document.querySelectorAll.bind(document);

Array.from($('h2'))
    .forEach(function(h2) {
        var section = document.createElement('section');
        var sectionEls = [];
        var el = h2;
        
        while(1) {
            el = el.nextElementSibling;
        
            if(!el || el.tagName === 'H2' || el.tagName === 'SCRIPT') {
                break;
            } else {
                section.innerHTML += el.outerHTML;
                sectionEls.push(el);
            }
        }

        section.classList.toggle('hide');
        insertAfter(section, h2);
        sectionEls.forEach(function(r){ r.remove();});
        
        h2.classList.add('hide');
        
        h2.onclick = function(e) {
            e.target.nextElementSibling.classList.toggle('hide');
            e.target.classList.toggle('hide');
        };
    });

</script> 