var Entity = require('../entity');

function dockPlanet(planet) {
    this.isDockedPlanet = true;
    this.dx             = 0;
    this.dy             = 0;
    this.rotation       = Entity.getAngleFromTo(planet, this);
    this.planet         = planet;

    planet.setPlanetFlag(this.team);
}

function undockPlanet() {
    this.isDockedPlanet = false;
    this.planet         = undefined;
}

var DIST_PLANET_DOCK = 105;

var DEFAULTS = {
    isDockedPlanet : false,
    dockPlanet     : dockPlanet,
    undockPlanet   : undockPlanet
};

/**
 * Sits docked on planet
 * @param entity
 */
function process(entity) {
    if (entity.isDockedPlanet) {
        entity.x = Math.cos(entity.rotation) * DIST_PLANET_DOCK + entity.planet.x;
        entity.y = Math.sin(entity.rotation) * DIST_PLANET_DOCK + entity.planet.y;
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};