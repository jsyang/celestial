var Audio      = require('../audio');
var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');

var Projectile = require('../entity/projectile');

function processPComm(pcomm) {
    if (pcomm.hp > 0) {
        pcomm.x = pcomm.planet.x;
        pcomm.y = pcomm.planet.y;

        EntityGrid.add(pcomm);
    } else {
        Audio.play('collide');
        Projectile.explode(pcomm, 6);
        EntityDB.remove(pcomm);
    }
}

function process() {
    var pcomm = EntityDB.getByType('PComm');
    if (pcomm) {
        pcomm.forEach(processPComm);
    }
}

module.exports = {
    process : process
};