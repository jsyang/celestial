var Entity   = require('../entity');
var EntityDB = require('../entityDB');
var Audio    = require('../audio');

var SAT = require('sat');

function shoot(type, muzzle, shooter, projectileSpeed) {
    var dx = Math.cos(shooter.rotation) * projectileSpeed;
    var dy = Math.sin(shooter.rotation) * projectileSpeed;

    Entity.create(type, {
        x        : muzzle.x + shooter.x,
        y        : muzzle.y + shooter.y,
        team     : shooter.team,
        dx       : dx + shooter.dx,
        dy       : dy + shooter.dy,
        lifespan : 100
    });
}

function move(p) {
    p.x += p.dx;
    p.y += p.dy;

    if (p.lifespan > 0) {
        var freighter = EntityDB.getByType('Freighter')[0];
        if (freighter && SAT.pointInPolygon(p, freighter.collision)) {
            p.lifespan = 0;

            freighter.hitTime = 5;
            Audio.play('hit');

            freighter.hp--;
        }

        p.lifespan--;
    } else {
        EntityDB.remove(p);
    }
}

function process() {
    var shotCannonNormal = EntityDB.getByType('ShotCannonNormal');

    if (shotCannonNormal) {
        shotCannonNormal.forEach(move);
    }
}

function getFocalPoint() {}

module.exports = {
    shoot         : shoot,
    process       : process,
    getFocalPoint : getFocalPoint
};