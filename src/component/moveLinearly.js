var DEFAULTS = {
    dx : 0,
    dy : 0
};

/**
 * Moves linearly
 * @param entity
 */
function process(entity) {
    if (!entity.isDockedPlanet) {
        entity.x += entity.dx;
        entity.y += entity.dy;
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};