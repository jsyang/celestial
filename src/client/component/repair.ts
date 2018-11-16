/** Self repair **/

const DEFAULTS = {
    REPAIR_COST_FINISHED: 25,
    REPAIR_TIME:          30,
    repairTime:           0
};

function process(entity) {
    const needsRepair =
              entity.hp < entity.maxHp &&
              entity.materialsFinished > entity.REPAIR_COST_FINISHED &&
              entity.materialsFinished > 0;

    if (needsRepair) {
        if (entity.repairTime > 0) {
            entity.repairTime--;
        } else {
            entity.hp++;
            entity.materialsFinished -= entity.REPAIR_COST_FINISHED;
            entity.repairTime = entity.REPAIR_TIME;
        }
    }
}

export default {
    componentFlag: 'canRepair',
    DEFAULTS,
    process
}