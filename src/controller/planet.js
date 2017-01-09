var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');

var D_ROTATION_ORBIT = 0.0001;

function orbitStar(planet) {
    planet.rotation += D_ROTATION_ORBIT;

    var rotation = planet.rotation;
    planet.x     = Math.cos(rotation) * planet.orbitDistance + planet.star.x;
    planet.y     = Math.sin(rotation) * planet.orbitDistance + planet.star.y;

    EntityGrid.add(planet);
}

function process() {
    var planets = EntityDB.getByType('Planet');
    if (planets) {
        planets.forEach(orbitStar);
    }
}

module.exports = {
    process : process
};