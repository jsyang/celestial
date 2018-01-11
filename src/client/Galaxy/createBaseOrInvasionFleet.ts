import TEAM from '../Entity/TEAM';
import Entity from '../Entity';
import Random from '../Random';

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
            isFighterAutoAccelerated: team !== Entity.TEAM.MAGENTA,
            reloadTime_HeavyCannon:   60,
            team
        });

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

    } else {

        const planetStructureParams = {
            team,
            planet: startingLocation
        };

        const fighter = Entity.create('Fighter', {
            isFighterAutoAccelerated: team !== Entity.TEAM.MAGENTA,
            team
        });
        fighter.dockPlanet(startingLocation);


        startingLocation.pbase     = Entity.create('PBase', planetStructureParams);
        startingLocation.pcolony   = Entity.create('PColony', planetStructureParams);
        startingLocation.plab      = Entity.create('PLab', planetStructureParams);
        startingLocation.pcomm     = Entity.create('PComm', planetStructureParams);
        startingLocation.spaceport = Entity.create('SpacePort', planetStructureParams);

        const spaceportStructureParams = {
            ...planetStructureParams,
            spaceport: startingLocation.spaceport
        };

        startingLocation.spacedock   = Entity.create('SpaceDock', spaceportStructureParams);
        startingLocation.sensorarray = Entity.create('SensorArray', spaceportStructureParams);

        startingLocation.team = team;
        startingLocation.updateFlagColor();
    }
}