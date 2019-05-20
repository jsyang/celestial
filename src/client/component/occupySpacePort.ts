/**
 * Takes on occupied space port's position and rotation
 */

import Entity from '../Entity';

function process(entity) {
    const {x, y, rotation, hp} = entity.spaceport;

    if (hp > 0) {
        entity.x        = x;
        entity.y        = y;
        entity.rotation = rotation;
    } else {
        if (entity.explode) {
            entity.explode(entity);
        }

        Entity.destroy(entity);
    }
}

export default {
    componentFlag: 'canOccupySpacePort',
    process
}