var Audio  = require('../audio');
var Entity = require('../entity');

var ProjectileController = require('../controller/projectile');

var fighter;

function init() {
    fighter = Entity.create('Fighter', {
        x    : 250,
        y    : -20,
        team : Entity.TEAM.BLUE
    });
}

var TIME_BETWEEN_SHOTS = 100;
var lastShotTime       = 0;

function shoot() {
    var now = Date.now();

    if (now - lastShotTime > TIME_BETWEEN_SHOTS) {
        ProjectileController.shoot(
            'ShotCannonNormal',
            fighter.collision.calcPoints[1],
            fighter,
            4
        );

        Audio.play('fire');

        lastShotTime = now;
    }

    return this;
}

var DOCK_DISTANCE_PLANET = 105;

function process() {
    if(fighter.hp > 0) {
        if (fighter.isDocked) {
            if (fighter.dockedTo) {
                var dock  = fighter.dockedTo;
                fighter.x = Math.cos(fighter.rotation) * DOCK_DISTANCE_PLANET + dock.x;
                fighter.y = Math.sin(fighter.rotation) * DOCK_DISTANCE_PLANET + dock.y;
            }
        } else {
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
    var dx           = entity.x - fighter.x;
    var dy           = entity.y - fighter.y;
    fighter.dx       = 0;
    fighter.dy       = 0;
    fighter.rotation = Math.atan2(-dy, -dx);
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