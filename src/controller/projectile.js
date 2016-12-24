var Entity   = require('../entity');
var EntityDB = require('../entityDB');

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