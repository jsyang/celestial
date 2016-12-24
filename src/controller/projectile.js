var Entity   = require('../entity');
var EntityDB = require('../entityDB');
var Audio    = require('../audio');
var Random   = require('../random');

var SAT = require('sat');

var LIFESPAN_SHOT_NORMAL = 50;

function shoot(type, muzzle, shooter, projectileSpeed) {
    var dx = Math.cos(shooter.rotation) * projectileSpeed;
    var dy = Math.sin(shooter.rotation) * projectileSpeed;

    Entity.create(type, {
        x        : muzzle.x + shooter.x,
        y        : muzzle.y + shooter.y,
        team     : shooter.team,
        dx       : dx + (shooter.dx || 0),
        dy       : dy + (shooter.dy || 0),
        lifespan : LIFESPAN_SHOT_NORMAL
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

function explode(entity, fragmentCount) {
    for (; fragmentCount > 0; fragmentCount--) {
        entity.rotation = Random.float(-Math.PI, Math.PI);
        var muzzle      = {
            x : Random.float(-10, 10),
            y : Random.float(-10, 10)
        };
        shoot('ShotCannonNormal', muzzle, entity, Random.float(0, 2));
    }
}

function getFocalPoint() {}

module.exports = {
    shoot         : shoot,
    process       : process,
    explode       : explode,
    getFocalPoint : getFocalPoint
};