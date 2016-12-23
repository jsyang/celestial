var Audio    = require('../audio');
var Entity   = require('../entity');
var Graphics = require('../graphics');

var fighter;

function init() {
    fighter = Entity.create('Fighter', {
        x        : 20,
        y        : 0,
        rotation : 0,
        team     : Entity.TEAM.BLUE
    });

    Graphics.addChild(fighter.graphics);

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
        Audio.play('hit');
    }
}

var DROTATION = 0.05;
var SPEED     = 3;

function process() {
    if (keyDown.left_arrow) {
        fighter.rotation -= DROTATION;
    } else if (keyDown.right_arrow) {
        fighter.rotation += DROTATION;
    }

    if (keyDown.down_arrow) {
        // shoot
    }

    if (keyDown.up_arrow) {
        fighter.x += Math.cos(fighter.rotation) * SPEED;
        fighter.y += Math.sin(fighter.rotation) * SPEED;
        fighter.flame1On();
        fighter.flame2On();
    } else {
        fighter.flame1Off();
        fighter.flame2Off();
    }
}

function getFocalPoint() {
    return fighter;
}

module.exports = {
    init          : init,
    process       : process,
    getFocalPoint : getFocalPoint
};