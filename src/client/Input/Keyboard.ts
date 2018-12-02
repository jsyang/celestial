import {IInputEvent} from './Event';

const CODE_TO_KEY = {
    27: 'escape',
    32: 'spacebar',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    58: '0',

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
    81:  'q',
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
    q?: boolean;
    e?: boolean;
    f?: boolean;
    m?: boolean;
    t?: boolean;
    x?: boolean;
    '.'?: boolean;
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false,
    '9': false,
    '0': false,
    spacebar?: boolean;
    backspace?: boolean;
    enter?: boolean;
}

const inputState: IKeyboardState = {
    left_arrow:  false,
    right_arrow: false,
    up_arrow:    false,
    down_arrow:  false,
    p:           false,
    q:           false,
    e:           false,
    f:           false,
    m:           false,
    t:           false,
    x:           false,
    '.':         false,
    '1':         false,
    '2':         false,
    '3':         false,
    '4':         false,
    '5':         false,
    '6':         false,
    '7':         false,
    '8':         false,
    '9':         false,
    '0':         false,
    spacebar:    false,
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
    TURN_LEFT:         Boolean(inputState.left_arrow),
    TURN_RIGHT:        Boolean(inputState.right_arrow),
    ACCELERATE:        Boolean(inputState.up_arrow),
    SHOOT:             Boolean(inputState.f),
    FOCUS_NEXT_ENEMY:  Boolean(inputState['.']),
    TARGET_NEXT_ENEMY: Boolean(inputState.t),
    TOGGLE_RADAR:      Boolean(inputState.m),
    NAV_POINT_SET:     Boolean(inputState.enter),
    NAV_POINT_CLEAR:   Boolean(inputState.backspace),

    // Command menu
    SPECIAL: Boolean(inputState.spacebar),
    OPTION1: Boolean(inputState['1']),
    OPTION2: Boolean(inputState['2']),
    OPTION3: Boolean(inputState['3']),
    OPTION4: Boolean(inputState['4']),
    OPTION5: Boolean(inputState['5']),
    OPTION6: Boolean(inputState['6']),
    OPTION7: Boolean(inputState['7']),
    OPTION8: Boolean(inputState['8']),
    OPTION9: Boolean(inputState['9']),
    OPTION0: Boolean(inputState['0'])
});

const getInputState = () => ({...inputState});

export default {
    getEvents,
    getInputState
};