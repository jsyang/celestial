var Audio      = require('../audio');
var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');

var Projectile = require('../entity/projectile');

function processPBase(pbase) {
    if (pbase.hp > 0) {
        pbase.x = pbase.planet.x;
        pbase.y = pbase.planet.y;
        EntityGrid.add(pbase);
    } else {
        Audio.play('collide');
        Projectile.explode(pbase, 6);
        EntityDB.remove(pbase);
    }
}

function process() {
    var pbases = EntityDB.getByType('PBase');
    if (pbases) {
        pbases.forEach(processPBase);
    }
}

module.exports = {
    process : process
};