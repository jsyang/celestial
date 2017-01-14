var Audio      = require('../audio');
var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');

var Projectile = require('../entity/projectile');

var REPAIR_COST_FINISHED = 2;
var REPAIR_TIME          = 10;

/**
 * Repairs itself if damaged
 * @param pcomm
 */
function repair(pcomm) {
    var needsRepair =
            pcomm.hp < pcomm.maxHp &&
            pcomm.planet.pbase &&
            pcomm.planet.pbase.materialsFinished > REPAIR_COST_FINISHED;

    if (needsRepair) {
        if (pcomm.repairTime > 0) {
            pcomm.repairTime--;
        } else {
            pcomm.hp++;
            pcomm.planet.pbase.materialsFinished -= REPAIR_COST_FINISHED;
            pcomm.repairTime = REPAIR_TIME;
        }
    }
}

function processPComm(pcomm) {
    if (pcomm.hp > 0) {
        pcomm.x = pcomm.planet.x;
        pcomm.y = pcomm.planet.y;

        repair(pcomm);

        EntityGrid.add(pcomm);
    } else {
        Audio.play('collide');
        Projectile.explode(pcomm, 4);
        EntityDB.remove(pcomm);
    }
}

function process() {
    var pcomm = EntityDB.getByType('PComm');
    if (pcomm) {
        pcomm.forEach(processPComm);
    }
}

module.exports = {
    process : process
};