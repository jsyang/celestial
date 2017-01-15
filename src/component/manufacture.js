var Random = require('../random');
var Entity = require('../entity');

var DockPlanetComponent = require('../component/dockPlanet');

var Freighter = require('../entity/freighter');
var Probe     = require('../entity/probe');

var PRODUCT = {
    Freighter : { cost : 300, time : 120 },
    Fighter   : { cost : 500, time : 90 }
};

var DEFAULTS = {
    PRODUCT          : PRODUCT,
    orderManufacture : orderManufacture,
    isManufacturing  : false,
    manufactureTime  : 0,
    manufactureType  : undefined
};

function orderManufacture(type) {
    this.isManufacturing = true;
    this.manufactureTime = this.PRODUCT[type].time;
    this.manufactureType = type;
}

/**
 * Manufactures spacecraft
 * @param {object} entity
 */
function process(entity) {
    if (entity.isManufacturing) {

        var shouldManufacture =
                entity.planet.pbase &&
                entity.planet.pbase.materialsFinished >= entity.PRODUCT[entity.manufactureType].cost;

        if (shouldManufacture) {
            if (entity.manufactureTime > 0) {
                entity.manufactureTime--;
            } else {
                var productOptions = {
                    x    : entity.x + Random.float(-1, 1),
                    y    : entity.y + Random.float(-1, 1),
                    team : entity.team
                };

                var product = Entity.create(entity.manufactureType, productOptions);

                if (entity.manufactureType === 'Fighter') {
                    if(entity.type === 'SpacePort') {
                        // todo: Dock in SpacePort
                        DockPlanetComponent.DEFAULTS
                            .dockPlanet.call(product, entity.planet);
                    } else {
                        DockPlanetComponent.DEFAULTS
                            .dockPlanet.call(product, entity.planet);
                    }

                } else if (entity.manufactureType === 'Freighter') {
                    Freighter.dockTo(product, entity.planet);
                }

                entity.isManufacturing = false;
                entity.manufactureType = undefined;
            }
        }
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};