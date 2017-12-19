import {IInputEvent} from './Event';

const CODE_TO_KEY = {
    37: 'left_arrow',
    38: 'up_arrow',
    39: 'right_arrow',
    40: 'down_arrow',
    70: 'f',
    82: 'r'
};

const keyDown = {
    left_arrow:  false,
    right_arrow: false,
    up_arrow:    false,
    down_arrow:  false,
    f:           false,
    r:           false
};

function onKeyUp(e) {
    keyDown[CODE_TO_KEY[e.which]] = false;
}

function onKeyDown(e) {
    keyDown[CODE_TO_KEY[e.which]] = true;
}

if (window) {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

// todo: use key map
export const getEvents = (): IInputEvent => ({
    SHOOT_SPECIAL: keyDown.down_arrow,
    TURN_LEFT:     keyDown.left_arrow,
    TURN_RIGHT:    keyDown.right_arrow,
    ACCELERATE:    keyDown.up_arrow,
    SHOOT:         keyDown.f,
    RESTART_GAME:  keyDown.r
});

export default {getEvents};