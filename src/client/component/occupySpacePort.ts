/**
 * Takes on occupied space port's position and rotation
 */
function process(entity) {
    entity.x        = entity.spaceport.x;
    entity.y        = entity.spaceport.y;
    entity.rotation = entity.spaceport.rotation;
}

export default {
    componentFlag: 'canOccupySpacePort',
    process
}