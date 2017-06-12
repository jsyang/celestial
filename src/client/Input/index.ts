import GamePad from './GamePad';
import Keyboard from './Keyboard';

let focus;

export const getFocalPoint = () => focus;
export const setFocalPoint = entity => focus = entity;

const DROTATION    = 0.05;
const ACCELERATION = 0.2;

const DEVICE_TYPE = {
    Keyboard: 0,
    GamePad:  0
};

const device = localStorage.getItem('input.device') ||
    DEVICE_TYPE.Keyboard;

function process() {
    let events = device === DEVICE_TYPE.Keyboard ?
        Keyboard.getEvents() : GamePad.getEvents();

    if (focus && focus.type === 'Fighter') {
        const isDocked = focus.isDockedPlanet;

        if (focus.hp > 0) {
            if (!isDocked) {
                // Update fighter rotation
                if (typeof events.analogAngle === 'number') {
                    focus.rotation = events.analogAngle;
                } else {
                    if (events.TURN_LEFT) {
                        focus.rotation -= DROTATION;
                    } else if (events.TURN_RIGHT) {
                        focus.rotation += DROTATION;
                    }
                }
            }

            focus.isShooting = events.SHOOT;

            if (events.ACCELERATE) {
                if (isDocked) {
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

    if (events.RESTART_GAME) {
        location.reload();
    }
}

export default {
    process,

    // todo: does this belong here?
    getFocalPoint,
    setFocalPoint
};