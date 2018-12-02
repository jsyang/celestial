import {IInputEvent} from './Event';

const AXES_ACTIVATION_VALUE = 0.1;
const AXES_MIN_VALUE        = 0.000001;

export interface IGamePadState {
    left?: boolean;
    up?: boolean;
    right?: boolean;
    down?: boolean;

    analogAngle?: number;
    button0?: boolean;
    button1?: boolean;
    button2?: boolean;
    button3?: boolean;
}

const getEventsFromGamePad = ({left, right, up, analogAngle, button0, button1, button2, button3}: IGamePadState): IInputEvent => ({
    TURN_LEFT:             Boolean(left),
    TURN_RIGHT:            Boolean(right),
    ACCELERATE:            Boolean(button3),
    SPECIAL:               Boolean(button1),
    SHOOT:                 Boolean(button0),
    PAUSE:                 Boolean(button2),
    FOCUS_NEXT_ENEMY:      false,
    TARGET_NEXT_ENEMY:     false,
    TOGGLE_RADAR:          false,
    NAV_POINT_SET:         false,
    NAV_POINT_CLEAR:       false,
    analogAngle
});

let inputState: IGamePadState = {
    left:  false,
    right: false,
    up:    false,
    down:  false,

    analogAngle: 0,

    button0: false,
    button1: false,
    button2: false,
    button3: false
};

export function getEvents(id: number = 0): IInputEvent {
    const gp = navigator.getGamepads()[id];

    if (gp) {
        let [dx, dy]    = gp.axes;
        const isXActive = Math.abs(dx) > AXES_ACTIVATION_VALUE;
        const isYActive = Math.abs(dy) > AXES_ACTIVATION_VALUE;

        const isAnalogEngaged = isXActive || isYActive;
        let analogAngle;

        if (isAnalogEngaged) {
            if (!isXActive) {
                dx = dx > 0 ? AXES_MIN_VALUE : -AXES_MIN_VALUE;
            }
            if (!isYActive) {
                dy = dy > 0 ? AXES_MIN_VALUE : -AXES_MIN_VALUE;
            }
            analogAngle = Math.atan2(dy, dx);
        }

        inputState = {
            left:  gp.axes[0] < -AXES_ACTIVATION_VALUE,
            right: gp.axes[0] > AXES_ACTIVATION_VALUE,
            up:    gp.axes[1] < -AXES_ACTIVATION_VALUE,
            down:  gp.axes[1] > AXES_ACTIVATION_VALUE,

            analogAngle,

            button0: gp.buttons[0].pressed,
            button1: gp.buttons[1].pressed,
            button2: gp.buttons[2].pressed,
            button3: gp.buttons[3].pressed
        };
    }

    return getEventsFromGamePad(inputState);
}

const getInputState = () => ({...inputState});

export default {
    getEvents,
    getInputState
};