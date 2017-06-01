var Entity      = require('../entity');
var EntityDB    = require('../entityDB');
var Audio       = require('../audio');

function createPBase() {
    var planet = this.planet;

    Audio.play('nav');

    planet.pbase = Entity.create('PBase', {
        x      : planet.x,
        y      : planet.y,
        planet : planet,
        team   : this.team
    });

    EntityDB.remove(this);
}

function createPColony() {
    var planet = this.planet;

    Audio.play('nav');

    planet.pcolony = Entity.create('PColony', {
        x      : planet.x,
        y      : planet.y,
        planet : planet,
        team   : this.team
    });

    EntityDB.remove(this);
}

var DEFAULTS = {
    /** How long it takes before cargo can be used after reaching orbit **/
    TIME_OFFLOAD_SUPPLY     : 200,
    MAX_MATERIALS_FINISHED  : 500,
    createPBase             : createPBase,
    createPColony           : createPColony,
    loadOrDumpSupply        : loadOrDumpSupply
};

function loadOrDumpSupply() {
    var pbase = this.planet.pbase;

    if (pbase.materialsFinished === 0) {
        pbase.materialsFinished += this.materialsFinished;
        this.materialsFinished = 0;

        var diffMaterials = 0;
        if (pbase.materialsFinished > pbase.MAX_FINISHED_MATERIALS) {
            diffMaterials               = pbase.materialsFinished - pbase.MAX_FINISHED_MATERIALS;
            pbase.materialsFinished     = pbase.MAX_MATERIALS_FINISHED;
            this.materialsFinished = diffMaterials;
            this.unloadSupply();
        } else {
            EntityDB.remove(this);
        }

    } else if (this.planet.materialsFinished > 0 && this.materialsFinished < this.MAX_MATERIALS_FINISHED) {
        var materialsToLoad = this.MAX_MATERIALS_FINISHED - this.materialsFinished;
        if (materialsToLoad >= this.planet.materialsFinished) {
            this.materialsFinished += this.planet.materialsFinished;
            this.planet.materialsFinished = 0;
        } else {
            this.materialsFinished += materialsToLoad;
            this.planet.materialsFinished -= materialsToLoad;
        }

        this.loadSupply();
    }
}

/**
 * Constructs PBase and PColony on friendly planet if neither exists
 * Supplies friendly planet with finished materials if no construction required
 * @param entity
 */
function process(entity) {
    if (entity.canOrbitPlanet && entity.isOrbitingPlanet) {
        if (entity.materialsFinished > 0) {
            if (entity.supplyTime === undefined) {
                entity.supplyTime = entity.TIME_OFFLOAD_SUPPLY;
            } else if (entity.supplyTime > 0) {
                entity.supplyTime--;
            } else if (entity.supplyTime === 0) {
                if (!entity.planet.pbase) {
                    entity.createPBase();
                } else if (!entity.planet.pcolony) {
                    entity.createPColony();
                } else {
                    entity.loadOrDumpSupply();
                }
            }
        }
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};