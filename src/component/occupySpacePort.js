/**
 * Takes on occupied space port's position and rotation
 * @param entity
 */
function process(entity) {
    entity.x        = entity.spaceport.x;
    entity.y        = entity.spaceport.y;
    entity.rotation = entity.spaceport.rotation;
}

module.exports = {
    process : process
};