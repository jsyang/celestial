var Entity = require('../entity');

var DEFAULTS = {
    D_ROTATION    : 0.0001,
    orbitDistance : 105,
    orbitRotation : 0
};

/**
 * Orbits planet
 * @param entity
 */
function process(entity) {
    if (entity.type === 'SpacePort') {
        entity.rotation = Entity.getAngleFromTo(entity.planet, entity);
    }

    entity.orbitRotation += entity.D_ROTATION;
    entity.x = Math.cos(entity.orbitRotation) * entity.orbitDistance + entity.planet.x;
    entity.y = Math.sin(entity.orbitRotation) * entity.orbitDistance + entity.planet.y;
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};