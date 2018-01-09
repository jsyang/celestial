import {IInputEvent} from '../../Input/Event';
import {ACCELERATION_FIGHTER, ACCELERATION_FIGHTER_UNDOCK, ROTATION_RATE_FIGHTER} from '../../constants';

export default function controlFighter(controlledEntity, events: IInputEvent) {
    const isDocked = controlledEntity.isDockedPlanet;


    if (!isDocked) {
        // Update fighter rotation
        if (typeof events.analogAngle === 'number') {
            controlledEntity.rotation = events.analogAngle;
        } else {
            if (events.TURN_LEFT) {
                controlledEntity.rotation -= ROTATION_RATE_FIGHTER;
            } else if (events.TURN_RIGHT) {
                controlledEntity.rotation += ROTATION_RATE_FIGHTER;
            }
        }

        controlledEntity.isAttacking = events.SHOOT;
    }

    if (events.ACCELERATE) {
        if (isDocked) {
            controlledEntity.undockPlanet();
            // Escape acceleration
            controlledEntity.accelerate(ACCELERATION_FIGHTER_UNDOCK);
        }

        controlledEntity.flameOn();
        controlledEntity.accelerate(ACCELERATION_FIGHTER);

    } else {
        controlledEntity.flameOff();
    }

}
