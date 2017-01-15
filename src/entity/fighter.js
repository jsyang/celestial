var Audio      = require('../audio');
var Entity     = require('../entity');
var EntityDB   = require('../entityDB');
var EntityGrid = require('../entityGrid');
var Radar      = require('../radar');

var shotType = 'ShotCannonNormal';

var AUDIO_SHOT = {
    'ShotCannonHeavy'  : 'fire-heavy',
    'ShotCannonNormal' : 'fire'
};

var TIME_BETWEEN_SHOTS = 100;
var lastShotTime       = 0;

function _shoot(type, muzzle, shooter, projectileSpeed) {
    var dx = Math.cos(shooter.rotation) * projectileSpeed;
    var dy = Math.sin(shooter.rotation) * projectileSpeed;

    Entity.create(type, {
        x    : muzzle.x + shooter.x,
        y    : muzzle.y + shooter.y,
        team : shooter.team,
        dx   : dx + (shooter.dx || 0),
        dy   : dy + (shooter.dy || 0)
    });
}

function shoot(f) {
    if (f.hp > 0) {
        var now = Date.now();

        if (now - lastShotTime > TIME_BETWEEN_SHOTS) {

            _shoot(
                shotType,
                f.collision.calcPoints[1],
                f,
                4
            );

            Audio.play(AUDIO_SHOT[shotType]);
            lastShotTime = now;
        }
    }
}

var DOCK_DISTANCE_PLANET = 105;
var FIGHTER_MAX_SPEED    = 40;
var FIGHTER_MAX_SPEED2   = FIGHTER_MAX_SPEED * FIGHTER_MAX_SPEED;

function limitSpeed(f) {
    var dx2 = f.dx * f.dx;
    var dy2 = f.dy * f.dy;

    var speed2 = dx2 + dy2;
    if (speed2 > FIGHTER_MAX_SPEED2) {
        var limitFactor = FIGHTER_MAX_SPEED * Math.pow(speed2, -0.5);
        f.dx *= limitFactor;
        f.dy *= limitFactor;
    }
}

function processFighter(f) {
    if (f.hp > 0) {
        if (f.isDocked) {
            if (f.dockedTo) {
                f.x = Math.cos(f.rotation) * DOCK_DISTANCE_PLANET + f.dockedTo.x;
                f.y = Math.sin(f.rotation) * DOCK_DISTANCE_PLANET + f.dockedTo.y;
            }
        } else {
            limitSpeed(f);

            f.x += f.dx;
            f.y += f.dy;
        }

        if (Radar.isEnabled) {
            updateRadar(f);
        }

        EntityGrid.add(f);
    }
}

function process() {
    var fighters = EntityDB.getByType('Fighter');

    if (fighters) {
        fighters.forEach(processFighter);
    }
}

var RADAR_REFRESH_RATE = 10;
var radarRefreshTime   = 10;

function updateRadar(f) {
    radarRefreshTime++;

    if (radarRefreshTime > RADAR_REFRESH_RATE) {
        var nearestPlanet = EntityDB.getAbsoluteNearestByType(f, 'Planet');
        var nearestStar   = EntityDB.getAbsoluteNearestByType(f, 'Star');

        Radar.setRotations({
            nearestEnemy  : undefined,
            nearestPlanet : nearestPlanet ? Entity.getAngleFromTo(f, nearestPlanet) : undefined,
            nearestStar   : nearestStar ? Entity.getAngleFromTo(f, nearestStar) : undefined
        });

        radarRefreshTime = 0;
    }
}

function flameOn(f) {
    f.flame1On();
    f.flame2On();
}

function flameOff(f) {
    f.flame1Off();
    f.flame2Off();
}

function applyForce(f, dx, dy) {
    f.dx += dx;
    f.dy += dy;
}

function dockTo(f, entity) {
    f.isDocked = true;
    f.dockedTo = entity;
    f.dx       = 0;
    f.dy       = 0;
    f.rotation = Entity.getAngleFromTo(entity, f);

    if (entity.type === 'Planet') {
        if (entity.team !== f.team) {
            entity.setPlanetFlag(f.team);
        }
    }
}

function undock(f) {
    f.isDocked = false;
    f.dockedTo = undefined;
}

function isDocked(f) {
    return f.isDocked;
}

function crash(f) {
    EntityDB.remove(f);
    Audio.play('collide');
}

module.exports = {
    process    : process,
    flameOn    : flameOn,
    flameOff   : flameOff,
    applyForce : applyForce,
    shoot      : shoot,
    dockTo     : dockTo,
    undock     : undock,
    isDocked   : isDocked,
    crash      : crash
};