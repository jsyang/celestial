import {IInputEvent} from './Event';

const AXES_ACTIVATION_VALUE = 0.1;
const AXES_MIN_VALUE        = 0.000001;

interface IGamePadState {
    left?: boolean;
    up?: boolean;
    right?: boolean;

    analogAngle?: number;
    button0?: boolean;
    button1?: boolean;
    button2?: boolean;
    button3?: boolean;
}

const getEventsFromGamePad = ({left, right, up, analogAngle, button0, button1, button2, button3}: IGamePadState): IInputEvent => ({
    TURN_LEFT:     Boolean(left),
    TURN_RIGHT:    Boolean(right),
    ACCELERATE:    Boolean(button2),
    SHOOT_SPECIAL: Boolean(button1),
    SHOOT:         Boolean(button0),
    RESTART_GAME:  Boolean(button1 && button3),
    analogAngle
});

export function getEvents(id: number = 0): IInputEvent {
    const gp       = navigator.getGamepads()[id];
    let inputState = {};

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

            analogAngle,

            button0: gp.buttons[0].pressed,
            button1: gp.buttons[1].pressed,
            button2: gp.buttons[2].pressed,
            button3: gp.buttons[3].pressed
        };
    }

    return getEventsFromGamePad(inputState);
}

export default {getEvents};