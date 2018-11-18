import {IInputEvent} from './Event';

const CODE_TO_KEY = {
    37:  'left_arrow',
    38:  'up_arrow',
    39:  'right_arrow',
    40:  'down_arrow',
    69:  'e',
    80:  'p',
    70:  'f',
    77:  'm',
    190: '.' // >
};


export interface IKeyboardState {
    left_arrow?: boolean;
    right_arrow?: boolean;
    up_arrow?: boolean;
    down_arrow?: boolean;
    p?: boolean;
    e?: boolean;
    f?: boolean;
    m?: boolean;
    '.'?: boolean;
}

const inputState: IKeyboardState = {
    left_arrow:  false,
    right_arrow: false,
    up_arrow:    false,
    down_arrow:  false,
    p:           false,
    e:           false,
    f:           false,
    m:           false,
    '.':         false
};

function onKeyUp({which}) {
    inputState[CODE_TO_KEY[which]] = false;
}

function onKeyDown({which}) {
    inputState[CODE_TO_KEY[which]] = true;
}

addEventListener('keydown', onKeyDown);
addEventListener('keyup', onKeyUp);

export const getEvents = (): IInputEvent => ({
    PAUSE:              Boolean(inputState.p),
    SPECIAL:            Boolean(inputState.e),
    TURN_LEFT:          Boolean(inputState.left_arrow),
    TURN_RIGHT:         Boolean(inputState.right_arrow),
    ACCELERATE:         Boolean(inputState.up_arrow),
    SHOOT:              Boolean(inputState.f),
    NEXT_ENEMY_FIGHTER: Boolean(inputState['.']),
    TOGGLE_RADAR:       Boolean(inputState.m)
});

const getInputState = () => ({...inputState});

export default {
    getEvents,
    getInputState
};