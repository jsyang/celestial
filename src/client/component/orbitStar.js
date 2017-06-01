var DEFAULTS = {
    D_ROTATION    : 0.0001,
    orbitDistance : 1800,
    orbitRotation : 0
};

/**
 * Orbits star
 * @param entity
 */
function process(entity) {
    entity.orbitRotation += entity.D_ROTATION;
    entity.x     = Math.cos(entity.orbitRotation) * entity.orbitDistance + entity.star.x;
    entity.y     = Math.sin(entity.orbitRotation) * entity.orbitDistance + entity.star.y;
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};