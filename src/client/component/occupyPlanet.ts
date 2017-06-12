/**
 * Takes on occupied planet's position
 */
function process(entity) {
    entity.x = entity.planet.x;
    entity.y = entity.planet.y;
}

export default {
    componentFlag: 'canOccupyPlanet',
    process
}
