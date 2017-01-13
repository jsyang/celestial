var Audio      = require('../audio');
var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');

var Projectile = require('../entity/projectile');

function processPLab(plab) {
    if (plab.hp > 0) {
        plab.x = plab.planet.x;
        plab.y = plab.planet.y;

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
    process : process
};