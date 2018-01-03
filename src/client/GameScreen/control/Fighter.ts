import {IInputEvent} from '../../Input/Event';

const DROTATION    = 0.05;
const ACCELERATION = 0.2;

export default function controlFighter(controlledEntity, events: IInputEvent) {
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

        controlledEntity.isAttacking = events.SHOOT;
    }

    if (events.ACCELERATE) {
        if (isDocked) {
            controlledEntity.undockPlanet();
            // Escape acceleration
            controlledEntity.accelerate(1);
        }

        controlledEntity.flameOn();
        controlledEntity.accelerate(ACCELERATION);

    } else {
        controlledEntity.flameOff();
    }

}
