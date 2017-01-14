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
 * @param spaceport
 */
function repair(spaceport) {
    var needsRepair =
            spaceport.hp < spaceport.maxHp &&
            spaceport.planet.pbase &&
            spaceport.planet.pbase.materialsFinished > REPAIR_COST_FINISHED;

    if (needsRepair) {
        if (spaceport.repairTime > 0) {
            spaceport.repairTime--;
        } else {
            spaceport.hp++;
            spaceport.planet.pbase.materialsFinished -= REPAIR_COST_FINISHED;
            spaceport.repairTime = REPAIR_TIME;
        }
    }
}

var CONSTRUCTION = {
    Fighter : { cost : 200, time : 40 },
    Probe   : { cost : 5, time : 10 }
};

function construct(spaceport) {
    if (spaceport.isConstructing) {
        var canConstruct =
                spaceport.planet.pbase &&
                spaceport.planet.pbase.materialsFinished >= CONSTRUCTION[spaceport.constructionType].cost;

        if (canConstruct) {
            if (spaceport.constructionTime > 0) {
                spaceport.constructionTime--;
            } else {
                var entityOptions = {
                    x    : spaceport.x + Random.float(-1, 1),
                    y    : spaceport.y + Random.float(-1, 1),
                    team : spaceport.team
                };

                var entity = Entity.create(spaceport.constructionType, entityOptions);

                if (spaceport.constructionType === 'Fighter') {
                    Fighter.dockTo(entity, spaceport.planet);
                } else if (spaceport.constructionType === 'Freighter') {
                    Freighter.dockTo(entity, spaceport.planet);
                }

                spaceport.isConstructing   = false;
                spaceport.constructionType = undefined;
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