const DEFAULTS = {
    dx : 0,
    dy : 0
};

/**
 * Moves linearly
 */
function process(entity) {
    if (!entity.isDockedPlanet) {
        entity.x += entity.dx;
        entity.y += entity.dy;
    }
}

export default {
    componentFlag: 'canMoveLinearly',
    DEFAULTS,
    process
}
