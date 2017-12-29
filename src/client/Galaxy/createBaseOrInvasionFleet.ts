import TEAM from '../Entity/_Team';
import Entity from '../Entity';
import Random from '../Random';

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
            x: fleetPosition.x + Random.int(-100, 100),
            y: fleetPosition.y + Random.int(-100, 100),
            team
        });

        Entity.create('Freighter', {
            x:                 fleetPosition.x + Random.int(-100, 100),
            y:                 fleetPosition.y + Random.int(-100, 100),
            team,
            target:            fighter,
            isOrbitingPlanet:  false,
            materialsFinished: 500
        });

        Entity.create('Freighter', {
            x:                 fleetPosition.x + Random.int(-100, 100),
            y:                 fleetPosition.y + Random.int(-100, 100),
            team,
            target:            fighter,
            isOrbitingPlanet:  false,
            materialsFinished: 500
        });

        Entity.create('Freighter', {
            x:                 fleetPosition.x + Random.int(-100, 100),
            y:                 fleetPosition.y + Random.int(-100, 100),
            team,
            target:            fighter,
            isOrbitingPlanet:  false,
            materialsFinished: 500
        });

        Entity.create('Freighter', {
            x:                 fleetPosition.x + Random.int(-100, 100),
            y:                 fleetPosition.y + Random.int(-100, 100),
            team,
            target:            fighter,
            isOrbitingPlanet:  false,
            materialsFinished: 500
        });

    } else {

        const planetStructureParams = {
            team,
            planet: startingLocation
        };

        const fighter = Entity.create('Fighter', {team});
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