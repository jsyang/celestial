var Entity = require('../entity');

function enterPlanetOrbit(planet) {
    this.isOrbitingPlanet = true;
    this.dx             = 0;
    this.dy             = 0;
    this.orbitRotation  = Entity.getAngleFromTo(planet, this);
    this.rotation       = this.orbitRotation + DEGREES90;
    this.planet         = planet;
    this.target         = undefined;
    
    this.flameOff && this.flameOff();
}

function exitPlanetOrbit() {
    this.isOrbitingPlanet = false;
    this.planet         = undefined;
    
    this.flameOn && this.flameOn();
}

var DEFAULTS = {
    enterPlanetOrbit : enterPlanetOrbit,
    exitPlanetOrbit : exitPlanetOrbit,
    isOrbitingPlanet : true,
    D_ROTATION    : 0.0001,
    orbitDistance : 105,
    orbitRotation : 0
};

var DEGREES90 = Math.PI * 0.5;

/**
 * Orbits planet
 * @param entity
 */
function process(entity) {
    if(entity.isOrbitingPlanet && entity.planet) {
        if (entity.type === 'SpacePort') {
            entity.rotation = Entity.getAngleFromTo(entity.planet, entity);
        } else if(entity.type === 'Freighter') {
            entity.rotation += entity.D_ROTATION;
        }

        entity.orbitRotation += entity.D_ROTATION;
        entity.x = Math.cos(entity.orbitRotation) * entity.orbitDistance + entity.planet.x;
        entity.y = Math.sin(entity.orbitRotation) * entity.orbitDistance + entity.planet.y;
    }    
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};