var DEFAULTS = {
    HARVEST_RATE_RAW      : 35,
    HARVEST_RATE_FINISHED : 25,
    HARVEST_TIME          : 10,
    harvestTime           : 0
};

/**
 * Harvest materials present on planet to put in its own stores
 * @param {object} entity
 */
function process(entity) {
    if (entity.harvestTime > 0) {
        entity.harvestTime--;
    } else {
        entity.harvestTime = entity.HARVEST_TIME;

        if (entity.planet.materialsRaw > 0 && entity.materialsRaw < entity.MAX_RAW_MATERIALS) {

            if (entity.MAX_RAW_MATERIALS - entity.materialsRaw < entity.HARVEST_RATE_RAW) {
                entity.planet.materialsRaw = 0;
                entity.materialsRaw += entity.MAX_RAW_MATERIALS - entity.materialsRaw;
            } else {
                entity.planet.materialsRaw -= entity.HARVEST_RATE_RAW;
                entity.materialsRaw += entity.HARVEST_RATE_RAW;
            }
        }

        if (entity.planet.materialsFinished > 0 && entity.materialsFinished < entity.MAX_FINISHED_MATERIALS) {

            if (entity.MAX_FINISHED_MATERIALS - entity.materialsFinished < entity.HARVEST_RATE_FINISHED) {
                entity.planet.materialsFinished = 0;
                entity.materialsFinished += entity.MAX_FINISHED_MATERIALS - entity.materialsFinished;
            } else {
                entity.planet.materialsFinished -= entity.HARVEST_RATE_FINISHED;
                entity.materialsFinished += entity.HARVEST_RATE_FINISHED;
            }
        }
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};