var DEFAULTS = {
    MINE_RATE : 50,
    MINE_TIME : 20,
    mineTime  : 0
};

/**
 * Harvest materials present on planet to put in its own stores
 * @param {object} entity
 */
function process(entity) {
    if (entity.mineTime > 0) {
        entity.mineTime--;
    } else {
        entity.mineTime = entity.MINE_TIME;
        entity.planet.materialsRaw += entity.MINE_RATE;
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};