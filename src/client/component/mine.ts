const DEFAULTS = {
    MINE_RATE : 25,
    MINE_TIME : 20,
    mineTime  : 20
};

/**
 * Harvest materials present on planet to put in its own stores
 */
function process(entity) {
    if (entity.mineTime > 0) {
        entity.mineTime--;
    } else {
        entity.mineTime = entity.MINE_TIME;
        entity.planet.materialsRaw += entity.MINE_RATE;
    }
}

export default {
    componentFlag: 'canMine',
    DEFAULTS,
    process
}
