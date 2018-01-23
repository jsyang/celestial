import GameScreen from '..';
import {IInputEvent} from '../../Input/Event';
import {ACCELERATION_FIGHTER, ACCELERATION_FIGHTER_UNDOCK, ROTATION_RATE_FIGHTER} from '../../constants';

export default function controlFighter(controlledEntity, events: IInputEvent) {
    const {isDockedPlanet, isDockedSpacePort, team, planet, spaceport} = controlledEntity;

    const isDocked = isDockedPlanet || isDockedSpacePort;

    if (isDocked) {
        if (events.SPECIAL) {
            if ((isDockedPlanet && planet.team === team) ||
                (isDockedSpacePort && spaceport.team === team)) {
                GameScreen.showDockedModal();
            }
        }
    } else {
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
            if (isDockedPlanet) {
                controlledEntity.undockPlanet();

            } else if (isDockedSpacePort) {
                controlledEntity.undockSpacePort();
            }
            // Escape acceleration
            controlledEntity.accelerate(ACCELERATION_FIGHTER_UNDOCK);
        }

        controlledEntity.flameOn();
        controlledEntity.accelerate(ACCELERATION_FIGHTER);

    } else {
        controlledEntity.flameOff();
    }

}
