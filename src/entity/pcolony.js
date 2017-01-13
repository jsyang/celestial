var Audio      = require('../audio');
var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');

var Projectile = require('../entity/projectile');

function processPColony(pcolony) {
    if (pcolony.hp > 0) {
        pcolony.x = pcolony.planet.x;
        pcolony.y = pcolony.planet.y;

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