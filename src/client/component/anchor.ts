import Entity from '../Entity';

/**
 * Takes on the anchor's position
 * Currently identical to occupyPlanet component, separated due to
 * more human-friendly "anchor" name for Entities that use occupyPlanet
 */
function process(entity) {
    if (entity.anchor.hp > 0) {
        entity.x = entity.anchor.x;
        entity.y = entity.anchor.y;
    } else {
        Entity.destroy(entity);
    }

}

export default {
    componentFlag: 'canAnchor',
    process
}
