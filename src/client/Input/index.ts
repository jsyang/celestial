import GamePad from './GamePad';
import Keyboard from './Keyboard';

let controlledEntity;

export const setControlledEntity = entity => controlledEntity = entity;

const DROTATION    = 0.05;
const ACCELERATION = 0.2;

const DEVICE_TYPE = {
    Keyboard: 0,
    GamePad:  0
};

const device = localStorage.getItem('input.device') || DEVICE_TYPE.Keyboard;

function controlFighter(events) {
    const isDocked = controlledEntity.isDockedPlanet;


    if (!isDocked) {
        // Update fighter rotation
        if (typeof events.analogAngle === 'number') {
            controlledEntity.rotation = events.analogAngle;
        } else {
            if (events.TURN_LEFT) {
                controlledEntity.rotation -= DROTATION;
            } else if (events.TURN_RIGHT) {
                controlledEntity.rotation += DROTATION;
            }
        }

        controlledEntity.isShooting = events.SHOOT;
    }

    controlledEntity.isShooting = events.SHOOT;

    if (events.ACCELERATE) {
        if (isDocked) {
            controlledEntity.undockPlanet();
        }

        controlledEntity.flameOn();
        controlledEntity.accelerate(ACCELERATION);

    } else {
        controlledEntity.flameOff();
    }

}

function process() {
    let events = device === DEVICE_TYPE.Keyboard ?
        Keyboard.getEvents() : GamePad.getEvents();

    if (controlledEntity && controlledEntity.hp > 0) {
        if (controlledEntity.type === 'Fighter') {
            controlFighter(events);
        }
    } else {
        setControlledEntity(null);
    }

    if (events.RESTART_GAME) {
        location.reload();
    }
}

export default {
    process,
    setControlledEntity
};