/**
 * Takes on occupied planet's position
 * @param entity
 */
function process(entity) {
    entity.x = entity.planet.x;
    entity.y = entity.planet.y;
}

module.exports = {
    process  : process
};