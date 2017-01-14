var Audio      = require('../audio');
var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');

var Projectile = require('../entity/projectile');

var HARVEST_RATE_RAW = 50;
var HARVEST_TIME     = 20;

/**
 * Harvest raw materials on the planet
 * @param {object} pcolony
 */
function harvest(pcolony) {
    if (pcolony.harvestTime > 0) {
        pcolony.harvestTime--;
    } else {
        pcolony.harvestTime = HARVEST_TIME;
        pcolony.planet.materialsRaw += HARVEST_RATE_RAW;
    }
}

var REPAIR_COST_FINISHED = 10;
var REPAIR_TIME          = 20;

/**
 * Repairs itself if damaged
 * @param pcolony
 */
function repair(pcolony) {
    var needsRepair =
            pcolony.hp < pcolony.maxHp &&
            pcolony.planet.pbase &&
            pcolony.planet.pbase.materialsFinished > REPAIR_COST_FINISHED;

    if (needsRepair) {
        if (pcolony.repairTime > 0) {
            pcolony.repairTime--;
        } else {
            pcolony.hp++;
            pcolony.planet.pbase.materialsFinished -= REPAIR_COST_FINISHED;
            pcolony.repairTime = REPAIR_TIME;
        }
    }
}

function processPColony(pcolony) {
    if (pcolony.hp > 0) {
        pcolony.x = pcolony.planet.x;
        pcolony.y = pcolony.planet.y;

        harvest(pcolony);
        repair(pcolony);

        EntityGrid.add(pcolony);
    } else {
        Audio.play('collide');
        Projectile.explode(pcolony, 6);
        EntityDB.remove(pcolony);
    }
}

function process() {
    var pcolony = EntityDB.getByType('PColony');
    if (pcolony) {
        pcolony.forEach(processPColony);
    }
}

module.exports = {
    process : process
};