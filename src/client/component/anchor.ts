import Entity from '../Entity';

const DEFAULTS = {
    anchorOffsetX: 0,
    anchorOffsetY: 0
};

/**
 * Takes on the anchor's position
 * Currently identical to occupyPlanet component, separated due to
 * more human-friendly "anchor" name for Entities that use occupyPlanet
 */
function process(entity) {
    if (entity.anchor.hp > 0) {
        entity.x = entity.anchor.x + entity.anchorOffsetX;
        entity.y = entity.anchor.y + entity.anchorOffsetY;
    } else {
        Entity.destroy(entity);
    }
}

export default {
    DEFAULTS,
    componentFlag: 'canAnchor',
    process
}
