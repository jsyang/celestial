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
    84:  't',
    88:  'x',
    190: '.', // >
    13:  'enter',
    8:   'backspace'
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
    t?: boolean;
    x?: boolean;
    '.'?: boolean;
    backspace?: boolean;
    enter?: boolean;
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
    t:           false,
    x:           false,
    '.':         false,
    backspace:   false,
    enter:       false
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
    PAUSE:             Boolean(inputState.p),
    SPECIAL:           Boolean(inputState.e),
    TURN_LEFT:         Boolean(inputState.left_arrow),
    TURN_RIGHT:        Boolean(inputState.right_arrow),
    ACCELERATE:        Boolean(inputState.up_arrow),
    SHOOT:             Boolean(inputState.f),
    FOCUS_NEXT_ENEMY:  Boolean(inputState['.']),
    TARGET_NEXT_ENEMY: Boolean(inputState.t),
    TARGET_CLEAR:      Boolean(inputState.x),
    TOGGLE_RADAR:      Boolean(inputState.m),
    NAV_POINT_SET:     Boolean(inputState.enter),
    NAV_POINT_CLEAR:   Boolean(inputState.backspace)
});

const getInputState = () => ({...inputState});

export default {
    getEvents,
    getInputState
};