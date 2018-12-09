import {isHumanTeam, TEAM} from '../constants';
import Entity from '../Entity';
import Random from '../Random';
import HUD from '../GameScreen/HUD';

const startingWeapons = [
    'Cannon',
    'HeavyCannon',
    'LaserBolt',
    'HomingMissile',
    'ClusterRocket'
];

export function createBaseOrInvasionFleet(teamName, startingLocation) {
    const team = TEAM[teamName];

    if (startingLocation.type === 'Star') {
        // Create an invasion fleet if no planet is given

        const randomOrbit = Random.float(-Math.PI, Math.PI);
        const distance    = 1000;

        const fleetPosition = {
            x: startingLocation.x + Math.cos(randomOrbit) * distance,
            y: startingLocation.y + Math.sin(randomOrbit) * distance
        };

        const fighter = Entity.create('Fighter', {
            x:                        fleetPosition.x + Random.int(-100, 100),
            y:                        fleetPosition.y + Random.int(-100, 100),
            attackWeapon:             Random.arrayElement(startingWeapons),
            isFighterAutoAccelerated: !isHumanTeam(team),
            reloadTime_HeavyCannon:   60,
            team
        });

        fighter.shield = Entity.create(
            'Shield',
            {
                x:      fighter.x,
                y:      fighter.y,
                team,
                anchor: fighter
            }
        );

        Entity.create('Freighter', {
            x:                 fleetPosition.x + Random.int(-100, 100),
            y:                 fleetPosition.y + Random.int(-100, 100),
            team,
            isOrbitingPlanet:  false,
            materialsFinished: 500
        });

        Entity.create('Freighter', {
            x:                  fleetPosition.x + Random.int(-100, 100),
            y:                  fleetPosition.y + Random.int(-100, 100),
            team,
            attackWeapon:       'HomingMissile',
            ammo_HomingMissile: 240,
            target:             fighter,
            isOrbitingPlanet:   false,
            materialsFinished:  500
        });

        Entity.create('Freighter', {
            x:                 fleetPosition.x + Random.int(-100, 100),
            y:                 fleetPosition.y + Random.int(-100, 100),
            team,
            attackWeapon:      'HomingMissile',
            isOrbitingPlanet:  false,
            materialsFinished: 500
        });

        Entity.create('Freighter', {
            x:                 fleetPosition.x + Random.int(-100, 100),
            y:                 fleetPosition.y + Random.int(-100, 100),
            team,
            isOrbitingPlanet:  false,
            materialsFinished: 500
        });

        HUD.displayText(team, 'Invasion fleet en route to hostile world.');

    } else {

        const planetStructureParams = {
            team,
            planet: startingLocation
        };

        startingLocation.team = team;
        startingLocation.updateFlagColor();

        const fighter = Entity.create('Fighter', {
            isFighterAutoAccelerated: !isHumanTeam(team),
            team
        });
        fighter.dockPlanet(startingLocation);

        let SHIELDED_CHANCE    = 0.4;
        startingLocation.pbase = Entity.create('PBase', planetStructureParams);
        if (Math.random() < SHIELDED_CHANCE) {
            startingLocation.pbase.shield = Entity.create(
                'PShield',
                {
                    team,
                    anchor: startingLocation.pbase
                }
            );
        }

        startingLocation.pcolony = Entity.create('PColony', planetStructureParams);
        startingLocation.plab    = Entity.create('PLab', planetStructureParams);

        SHIELDED_CHANCE            = 0.15;
        startingLocation.pcomm     = Entity.create('PComm', planetStructureParams);
        if (Math.random() < SHIELDED_CHANCE) {
            startingLocation.pcomm.shield = Entity.create(
                'PShield',
                {
                    team,
                    anchor: startingLocation.pcomm
                }
            );
        }
        startingLocation.spaceport = Entity.create('SpacePort', planetStructureParams);

        const spaceportStructureParams = {
            ...planetStructureParams,
            spaceport: startingLocation.spaceport
        };

        startingLocation.spacedock   = Entity.create('SpaceDock', spaceportStructureParams);
        startingLocation.sensorarray = Entity.create('SensorArray', spaceportStructureParams);


        // Find other planets in solar system and mark them as friendly
        Entity.getByType('Planet')
            .filter(p => p.star === startingLocation.star && p !== startingLocation)
            .forEach(p => {
                p.team = team;
                p.updateFlagColor();
            });
    }
}