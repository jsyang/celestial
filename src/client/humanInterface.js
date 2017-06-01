var GamePad = require('./gamepad');

function init() {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

var focus;

function getFocalPoint() {
    return focus;
}

function setFocalPoint(entity) {
    focus = entity;
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

function process() {
    var gamepad = GamePad.getState();

    if (focus && focus.type === 'Fighter') {
        var isDocked = focus.isDockedPlanet;

        if (focus.hp > 0) {
            if (!isDocked) {
                if (keyDown.left_arrow) {
                    focus.rotation -= DROTATION;
                } else if (keyDown.right_arrow) {
                    focus.rotation += DROTATION;
                }

                if (typeof gamepad.analogAngle === 'number') {
                    focus.rotation = gamepad.analogAngle;
                }
            }

            focus.isShooting = keyDown.f || gamepad.button0;

            if (keyDown.up_arrow || gamepad.button2) {
                if(isDocked){
                    focus.undockPlanet();
                }

                focus.flameOn();
                focus.accelerate(ACCELERATION);

            } else {
                focus.flameOff();
            }
        } else {
            focus = undefined;
        }
    }

    if (gamepad.button3 && gamepad.button1) {
        location.reload();
    }
}

module.exports = {
    init          : init,
    process       : process,
    getFocalPoint : getFocalPoint,
    setFocalPoint : setFocalPoint
};