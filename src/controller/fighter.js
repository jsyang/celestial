var Audio    = require('../audio');
var Entity   = require('../entity');
var EntityDB = require('../entityDB');
var Radar    = require('../radar');

var ProjectileController = require('../controller/projectile');

var fighter;

function init() {
    fighter = Entity.create('Fighter', {
        x        : 2050,
        y        : 1200,
        team     : Entity.TEAM.MAGENTA,
        isDocked : true
    });
}

var TIME_BETWEEN_SHOTS = 100;
var lastShotTime       = 0;

var shotType   = 'ShotCannonNormal';
var AUDIO_SHOT = {
    'ShotCannonHeavy'  : 'fire-heavy',
    'ShotCannonNormal' : 'fire'
};

function shoot() {
    if (fighter.hp > 0) {
        var now = Date.now();

        if (now - lastShotTime > TIME_BETWEEN_SHOTS) {
            ProjectileController.shoot(
                shotType,
                fighter.collision.calcPoints[1],
                fighter,
                4
            );

            Audio.play(AUDIO_SHOT[shotType]);

            lastShotTime = now;
        }
    }
}

var DOCK_DISTANCE_PLANET = 105;
var FIGHTER_MAX_SPEED    = 20;
var FIGHTER_MAX_SPEED2   = FIGHTER_MAX_SPEED * FIGHTER_MAX_SPEED;

function limitSpeed() {
    var dx2 = fighter.dx * fighter.dx;
    var dy2 = fighter.dy * fighter.dy;

    var speed2 = dx2 + dy2;
    if (speed2 > FIGHTER_MAX_SPEED2) {
        var limitFactor = FIGHTER_MAX_SPEED * Math.pow(speed2, -0.5);
        fighter.dx *= limitFactor;
        fighter.dy *= limitFactor;
    }
}

function process() {
    if (fighter.hp > 0) {
        if (fighter.isDocked) {
            if (fighter.dockedTo) {
                var dock  = fighter.dockedTo;
                fighter.x = Math.cos(fighter.rotation) * DOCK_DISTANCE_PLANET + dock.x;
                fighter.y = Math.sin(fighter.rotation) * DOCK_DISTANCE_PLANET + dock.y;
            }
        } else {
            limitSpeed();

            fighter.x += fighter.dx;
            fighter.y += fighter.dy;
        }

        if (Radar.isEnabled) {
            updateRadar();
        }
    }
}

var RADAR_REFRESH_RATE = 10;
var radarRefreshTime   = 10;

function updateRadar() {
    radarRefreshTime++;

    if (radarRefreshTime > RADAR_REFRESH_RATE) {
        var planet    = EntityDB.getByType('Planet')[0];
        var star      = EntityDB.getByType('Star')[0];
        var freighter = EntityDB.getByType('Freighter')[0];

        Radar.setRotations({
            nearestEnemy  : freighter ? Entity.getAngleFromTo(fighter, freighter) : undefined,
            nearestPlanet : Entity.getAngleFromTo(fighter, planet),
            nearestStar   : Entity.getAngleFromTo(fighter, star)
        });

        radarRefreshTime = 0;
    }
}

function flameOn() {
    fighter.flame1On();
    fighter.flame2On();
}

function flameOff() {
    fighter.flame1Off();
    fighter.flame2Off();
}

function applyForce(dx, dy) {
    fighter.dx += dx;
    fighter.dy += dy;
}

function rotate(dRotation) {
    fighter.rotation += dRotation;
}

function getRotation() {
    return fighter.rotation;
}

function dockTo(entity) {
    fighter.isDocked = true;
    fighter.dockedTo = entity;
    fighter.dx       = 0;
    fighter.dy       = 0;
    fighter.rotation = Entity.getAngleFromTo(entity, fighter);
}

function undock() {
    fighter.isDocked = false;
    fighter.dockedTo = undefined;
}

function isDocked() {
    return fighter.isDocked;
}

module.exports = {
    init        : init,
    process     : process,
    flameOn     : flameOn,
    flameOff    : flameOff,
    applyForce  : applyForce,
    rotate      : rotate,
    getRotation : getRotation,
    shoot       : shoot,
    dockTo      : dockTo,
    undock      : undock,
    isDocked    : isDocked
};