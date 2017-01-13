var Audio      = require('../audio');
var Entity     = require('../entity');
var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');

var Projectile = require('../entity/projectile');

var PRODUCTION_RATE_RAW_TO_FINISHED = 0.5;
var MAX_FINISHED_MATERIALS          = 500;
var MAX_RAW_MATERIALS               = 1000;

// "Build tree"
var SEQUENCE_BUILD_PRIORITY = [
    { type : 'PLab', cost : 100 },
    { type : 'PComm', cost : 200 }
];

function construct(construction) {
    var planetEntityType = construction.type.toLowerCase();
    if (!this.planet[planetEntityType] && this.materialsFinished >= construction.cost) {
        this.planet[planetEntityType] = Entity.create(construction.type, {
            planet : this.planet,
            team   : this.team
        });

        this.materialsFinished -= construction.cost;
    }
}

function build(pbase) {
    if (pbase.materialsFinished > 0) {
        SEQUENCE_BUILD_PRIORITY.forEach(construct.bind(pbase));
    }
}

var REPAIR_COST_FINISHED = 25;
var REPAIR_TIME          = 30;

/**
 * Repairs itself if damaged
 * @param pbase
 */
function repair(pbase) {
    var needsRepair =
            pbase.hp < pbase.maxHp &&
            pbase.materialsFinished > REPAIR_COST_FINISHED &&
            pbase.materialsFinished > 0;

    if (needsRepair) {
        if (pbase.repairTime > 0) {
            pbase.repairTime--;
        } else {
            pbase.hp++;
            pbase.materialsFinished -= REPAIR_COST_FINISHED;
            pbase.repairTime = REPAIR_TIME;
        }
    }
}

/**
 * Manufactures finished materials from raw materials
 * @param pbase
 */
function manufacture(pbase) {
    if (pbase.materialsFinished < MAX_FINISHED_MATERIALS) {
        if (pbase.materialsRaw > 0) {
            pbase.materialsFinished += PRODUCTION_RATE_RAW_TO_FINISHED;
            pbase.materialsRaw--;
        }
    }
}

var SUPPLY_RATE_RAW      = 50;
var SUPPLY_RATE_FINISHED = 25;
var SUPPLY_TIME          = 10;

/**
 * Gather supplies dropped on planet
 * @param {object} pbase
 */
function supply(pbase) {
    if (pbase.planet.materialsRaw > 0 && pbase.materialsRaw < MAX_RAW_MATERIALS) {
        if (pbase.supplyTimeRaw > 0) {
            pbase.supplyTimeRaw--;
        } else {
            pbase.supplyTimeRaw = SUPPLY_TIME;

            if (MAX_RAW_MATERIALS - pbase.materialsRaw < SUPPLY_RATE_RAW) {
                pbase.planet.materialsRaw = 0;
                pbase.materialsRaw += MAX_RAW_MATERIALS - pbase.materialsRaw;
            } else {
                pbase.planet.materialsRaw -= SUPPLY_RATE_RAW;
                pbase.materialsRaw += SUPPLY_RATE_RAW;
            }
        }
    }

    if (pbase.planet.materialsFinished > 0 && pbase.materialsFinished < MAX_FINISHED_MATERIALS) {
        if (pbase.supplyTimeFinished > 0) {
            pbase.supplyTimeFinished--;
        } else {
            pbase.supplyTimeFinished = SUPPLY_TIME;

            if (MAX_RAW_MATERIALS - pbase.materialsRaw < SUPPLY_RATE_FINISHED) {
                pbase.planet.materialsRaw = 0;
                pbase.materialsRaw += MAX_RAW_MATERIALS - pbase.materialsRaw;
            } else {
                pbase.planet.materialsRaw -= SUPPLY_RATE_FINISHED;
                pbase.materialsRaw += SUPPLY_RATE_FINISHED;
            }
        }
    }
}

function processPBase(pbase) {
    if (pbase.hp > 0) {
        pbase.x = pbase.planet.x;
        pbase.y = pbase.planet.y;

        supply(pbase);
        manufacture(pbase);
        repair(pbase);
        build(pbase);

        EntityGrid.add(pbase);
    } else {
        Audio.play('collide');
        Projectile.explode(pbase, 6);
        EntityDB.remove(pbase);
    }
}

function process() {
    var pbase = EntityDB.getByType('PBase');
    if (pbase) {
        pbase.forEach(processPBase);
    }
}

module.exports = {
    process : process
};