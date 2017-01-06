var GamePad = require('../gamepad');
var FighterController = require('./fighter');
var EntityDB = require('../entityDB');

var focalPoint;

function init() {
    focalPoint = EntityDB.getByType('Fighter')[0];

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

var DROTATION = 0.05;
var ACCELERATION = 0.2;
var DOCKED_ACCELERATION = 0.4;

function process() {
    var gamepad = GamePad.getState();
    var isDocked = FighterController.isDocked();

    if (!isDocked) {
        if (keyDown.left_arrow) {
            FighterController.rotate(-DROTATION);
        } else if (keyDown.right_arrow) {
            FighterController.rotate(DROTATION);
        }

        if (gamepad.analogAngle !== false) {
            var rotation = FighterController.getRotation();
            var desiredRotation = gamepad.analogAngle;

            FighterController.rotate(desiredRotation - rotation);
        }
    }

    if(gamepad.button3 && gamepad.button1) {
        location.reload();
    }

    if (keyDown.f || gamepad.button0) {
        FighterController.shoot();
    }

    if (keyDown.up_arrow || gamepad.button2) {
        FighterController.undock();
        var rotation = FighterController.getRotation();

        FighterController.flameOn();

        if (isDocked) {
            FighterController.applyForce(
                Math.cos(rotation) * DOCKED_ACCELERATION,
                Math.sin(rotation) * DOCKED_ACCELERATION
            );
        } else {
            FighterController.applyForce(
                Math.cos(rotation) * ACCELERATION,
                Math.sin(rotation) * ACCELERATION
            );
        }

    } else {
        FighterController.flameOff();
    }

}

function getFocalPoint() {
    return focalPoint;
}

module.exports = {
    init: init,
    process: process,
    getFocalPoint: getFocalPoint
};