var Audio  = require('../audio');
var Entity = require('../entity');

var ProjectileController = require('../controller/projectile');

var fighter;

function init() {
    fighter = Entity.create('Fighter', {
        x        : 20,
        y        : 0,
        dx       : 0,
        dy       : 0,
        rotation : 0,
        team     : Entity.TEAM.BLUE
    });

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

var keyDown = {};

function onKeyUp(e) {
    if (e.which === 37) {
        keyDown.left_arrow = false;
    } else if (e.which === 39) {
        keyDown.right_arrow = false;
    } else if (e.which === 38) {
        keyDown.up_arrow = false;
    } else if (e.which === 40) {
        keyDown.down_arrow = false;
    } else if (e.which === 70) {
        keyDown.f = false;
    }
}

function onKeyDown(e) {
    if (e.which === 37) {
        // Left arrow
        keyDown.left_arrow = true;

    } else if (e.which === 39) {
        // Right arrow
        keyDown.right_arrow = true;

    } else if (e.which === 38) {
        // Up arrow
        keyDown.up_arrow = true;

    } else if (e.which === 40) {
        // Down arrow
        keyDown.down_arrow = true;

    } else if (e.which === 70) {
        // F
        keyDown.f = true;
    }

}

var DROTATION    = 0.05;
var ACCELERATION = 0.2;

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
}

function process() {
    if (keyDown.left_arrow) {
        fighter.rotation -= DROTATION;
    } else if (keyDown.right_arrow) {
        fighter.rotation += DROTATION;
    }

    if (keyDown.f) {
        shoot();
    }

    if (keyDown.up_arrow) {
        fighter.dx += Math.cos(fighter.rotation) * ACCELERATION;
        fighter.dy += Math.sin(fighter.rotation) * ACCELERATION;
        fighter.flame1On();
        fighter.flame2On();
    } else {
        fighter.flame1Off();
        fighter.flame2Off();
    }

    fighter.x += fighter.dx;
    fighter.y += fighter.dy;
}

function getFocalPoint() {
    return fighter;
}

module.exports = {
    init          : init,
    process       : process,
    getFocalPoint : getFocalPoint
};