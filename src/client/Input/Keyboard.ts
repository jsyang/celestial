import {IInputEvent} from './Event';

const CODE_TO_KEY = {
    37: 'left_arrow',
    38: 'up_arrow',
    39: 'right_arrow',
    40: 'down_arrow',
    69: 'e',
    70: 'f'
};


export interface IKeyboardState {
    left_arrow?: boolean;
    right_arrow?: boolean;
    up_arrow?: boolean;
    down_arrow?: boolean;
    e?: boolean;
    f?: boolean;
}

const inputState: IKeyboardState = {
    left_arrow:  false,
    right_arrow: false,
    up_arrow:    false,
    down_arrow:  false,
    e:           false,
    f:           false
};

function onKeyUp(e) {
    inputState[CODE_TO_KEY[e.which]] = false;
}

function onKeyDown(e) {
    inputState[CODE_TO_KEY[e.which]] = true;
}

if (window) {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

export const getEvents = (): IInputEvent => ({
    SPECIAL:    Boolean(inputState.e),
    TURN_LEFT:  Boolean(inputState.left_arrow),
    TURN_RIGHT: Boolean(inputState.right_arrow),
    ACCELERATE: Boolean(inputState.up_arrow),
    SHOOT:      Boolean(inputState.f)
});

const getInputState = () => ({...inputState});

export default {
    getEvents,
    getInputState
};