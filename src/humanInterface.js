var GamePad  = require('./gamepad');
var Fighter  = require('./entity/fighter');
var EntityDB = require('./entityDB');

var Radar = require('./radar');

var fighter;

function init() {
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
    } else if (e.which === 82) {
        keyDown.r = false;
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
    } else if (e.which === 82) {
        // R
        keyDown.r = true;

    } else if (e.which === 70) {
        // F
        keyDown.f = true;
    }

}

var DROTATION           = 0.05;
var ACCELERATION        = 0.2;
var DOCKED_ACCELERATION = 0.4;

function process() {
    var gamepad  = GamePad.getState();

    if (fighter) {
        var isDocked = Fighter.isDocked(fighter);

        if (fighter.hp > 0) {
            if (!isDocked) {
                if (keyDown.left_arrow) {
                    fighter.rotation -= DROTATION;
                } else if (keyDown.right_arrow) {
                    fighter.rotation += DROTATION;
                }

                if (typeof gamepad.analogAngle === 'number') {
                    fighter.rotation = gamepad.analogAngle;
                }
            }

            if (keyDown.f || gamepad.button0) {
                Fighter.shoot(fighter);
            }

            // Hold button down for radar
            Radar.isEnabled = keyDown.r || gamepad.button3;

            if (keyDown.up_arrow || gamepad.button2) {
                Fighter.undock(fighter);
                var rotation = fighter.rotation;

                Fighter.flameOn(fighter);

                if (isDocked) {
                    Fighter.applyForce(
                        fighter,
                        Math.cos(rotation) * DOCKED_ACCELERATION,
                        Math.sin(rotation) * DOCKED_ACCELERATION
                    );
                } else {
                    Fighter.applyForce(
                        fighter,
                        Math.cos(rotation) * ACCELERATION,
                        Math.sin(rotation) * ACCELERATION
                    );
                }

            } else {
                Fighter.flameOff(fighter);
            }
        } else {
            fighter = undefined;
        }
    }

    if (gamepad.button3 && gamepad.button1) {
        location.reload();
    }
}

function getFocalPoint() {
    return fighter;
}

function setFocalPoint(entity) {
    fighter = entity;
}

module.exports = {
    init          : init,
    process       : process,
    getFocalPoint : getFocalPoint,
    setFocalPoint : setFocalPoint
};