var DEFAULTS = {
    REPAIR_COST_FINISHED : 25,
    REPAIR_TIME          : 30,
    repairTime           : 0
};

/**
 * Repairs itself if damaged
 * @param entity
 */
function process(entity) {
    var needsRepair =
            entity.hp < entity.maxHp &&
            entity.materialsFinished > Entity.REPAIR_COST_FINISHED &&
            entity.materialsFinished > 0;

    if (needsRepair) {
        if (entity.repairTime > 0) {
            entity.repairTime--;
        } else {
            entity.hp++;
            entity.materialsFinished -= Entity.REPAIR_COST_FINISHED;
            entity.repairTime = Entity.REPAIR_TIME;
        }
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};