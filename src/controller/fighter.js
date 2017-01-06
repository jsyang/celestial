var Audio  = require('../audio');
var Entity = require('../entity');

var ProjectileController = require('../controller/projectile');

var fighter;

function init() {
    fighter = Entity.create('Fighter', {
        x        : 250,
        y        : 120,
        team     : Entity.TEAM.MAGENTA,
        isDocked : true
    });
}

var TIME_BETWEEN_SHOTS = 100;
var lastShotTime       = 0;

function shoot() {
    if (fighter.hp > 0) {
        var now = Date.now();

        if (now - lastShotTime > TIME_BETWEEN_SHOTS) {
            ProjectileController.shoot(
                'ShotCannonHeavy',
                fighter.collision.calcPoints[1],
                fighter,
                4
            );

            Audio.play('fire');

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