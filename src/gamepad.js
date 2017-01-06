var NO_DATA = {};

var AXES_ACTIVATION_VALUE = 0.1;
var AXES_MIN_VALUE        = 0.000001;

function getState() {
    var gp = navigator.getGamepads()[0];

    if (gp) {
        var dx        = gp.axes[0];
        var dy        = gp.axes[1];
        var isXActive = Math.abs(dx) > AXES_ACTIVATION_VALUE;
        var isYActive = Math.abs(dy) > AXES_ACTIVATION_VALUE;

        var isAnalogEngaged = isXActive || isYActive;
        var analogAngle     = false;

        if (isAnalogEngaged) {
            if (!isXActive) {
                dx = dx > 0 ? AXES_MIN_VALUE : -AXES_MIN_VALUE;
            }
            if (!isYActive) {
                dy = dy > 0 ? AXES_MIN_VALUE : -AXES_MIN_VALUE;
            }
            analogAngle = Math.atan2(dy, dx);
        }

        return {
            left  : gp.axes[0] < -AXES_ACTIVATION_VALUE,
            right : gp.axes[0] > AXES_ACTIVATION_VALUE,
            up    : gp.axes[1] < -AXES_ACTIVATION_VALUE,

            analogAngle : analogAngle,

            button0 : gp.buttons[0].pressed,
            button1 : gp.buttons[1].pressed,
            button2 : gp.buttons[2].pressed,
            button3 : gp.buttons[3].pressed
        };
    } else {
        return NO_DATA;
    }
}

module.exports = {
    getState : getState
};