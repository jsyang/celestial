import TEAM from '../Entity/_Team';
import Entity from '../Entity';
import Random from '../random';

export function createBaseOrInvasionFleet(teamName, startingLocation) {
    const team = TEAM[teamName];

    if (startingLocation.type === 'Star') {
        // Create an invasion fleet if no planet is given
        Entity.create('Freighter', {
            x:                 startingLocation.x + Random.int(-100, 100),
            y:                 startingLocation.y + Random.int(-100, 100),
            team,
            isOrbitingPlanet:  false,
            materialsFinished: 500
        });

    } else {

        const planetStructureParams = {
            team,
            planet: startingLocation
        };

        startingLocation.pbase       = Entity.create('PBase', planetStructureParams);
        startingLocation.pcolony     = Entity.create('PColony', planetStructureParams);
        startingLocation.plab        = Entity.create('PLab', planetStructureParams);
        startingLocation.pcomm       = Entity.create('PComm', planetStructureParams);
        startingLocation.spaceport   = Entity.create('SpacePort', planetStructureParams);

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