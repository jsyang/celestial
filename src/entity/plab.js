var Audio      = require('../audio');
var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');
var Random     = require('../random');
var Entity     = require('../entity');

var Fighter    = require('../entity/fighter');
var Freighter  = require('../entity/freighter');
var Projectile = require('../entity/projectile');

var REPAIR_COST_FINISHED = 5;
var REPAIR_TIME          = 10;

/**
 * Repairs itself if damaged
 * @param plab
 */
function repair(plab) {
    var needsRepair =
            plab.hp < plab.maxHp &&
            plab.planet.pbase &&
            plab.planet.pbase.materialsFinished > REPAIR_COST_FINISHED;

    if (needsRepair) {
        if (plab.repairTime > 0) {
            plab.repairTime--;
        } else {
            plab.hp++;
            plab.planet.pbase.materialsFinished -= REPAIR_COST_FINISHED;
            plab.repairTime = REPAIR_TIME;
        }
    }
}

var CONSTRUCTION = {
    Freighter : { cost : 300, time : 70 },
    Fighter   : { cost : 500, time : 60 },
    Probe     : { cost : 15, time : 10 }
};

function construct(plab) {
    if (plab.isConstructing) {
        var canConstruct =
                plab.planet.pbase &&
                plab.planet.pbase.materialsFinished >= CONSTRUCTION[plab.constructionType].cost;

        if (canConstruct) {
            if (plab.constructionTime > 0) {
                plab.constructionTime--;
            } else {
                var entityOptions = {
                    x : plab.x + Random.float(-1, 1),
                    y : plab.y + Random.float(-1, 1),
                    team : plab.team
                };

                var entity = Entity.create(plab.constructionType, entityOptions);

                if (plab.constructionType === 'Fighter') {
                    Fighter.dockTo(entity, plab.planet);
                } else if (plab.constructionType === 'Freighter') {
                    Freighter.dockTo(entity, plab.planet);
                }

                plab.isConstructing   = false;
                plab.constructionType = undefined;
            }
        }
    }
}

function orderConstruction(plab, type) {
    plab.isConstructing   = true;
    plab.constructionTime = CONSTRUCTION[type].time;
    plab.constructionType = type;

}

function processPLab(plab) {
    if (plab.hp > 0) {
        plab.x = plab.planet.x;
        plab.y = plab.planet.y;

        repair(plab);
        construct(plab);

        EntityGrid.add(plab);
    } else {
        Audio.play('collide');
        Projectile.explode(plab, 6);
        EntityDB.remove(plab);
    }
}

function process() {
    var plab = EntityDB.getByType('PLab');
    if (plab) {
        plab.forEach(processPLab);
    }
}

module.exports = {
    process           : process,
    orderConstruction : orderConstruction
};