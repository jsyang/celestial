import {IInputEvent} from '../../Input/Event';
import {ACCELERATION_FIGHTER, ACCELERATION_FIGHTER_UNDOCK, ROTATION_RATE_FIGHTER} from '../../constants';
import NavBeaconHuman from '../../Graphics/NavBeaconHuman';
import {getTargetNearEntity} from './getTarget';
import command from './command';

export default function controlFighter(controlledEntity, events: IInputEvent, prevEvents: IInputEvent) {
    const {isDockedPlanet, isDockedSpacePort, attackTarget} = controlledEntity;

    const isDocked = isDockedPlanet || isDockedSpacePort;

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

        // Navigation aids
        if (events.NAV_POINT_SET && !prevEvents.NAV_POINT_SET) {
            const point = {
                x: controlledEntity.x,
                y: controlledEntity.y
            };

            NavBeaconHuman.setNavPoint(point);
        } else if (events.NAV_POINT_CLEAR && !prevEvents.NAV_POINT_CLEAR) {
            NavBeaconHuman.clear();
        }

        // Targeting
        if (events.TARGET_NEXT_ENEMY && !prevEvents.TARGET_NEXT_ENEMY) {
            controlledEntity.attackTarget = getTargetNearEntity(controlledEntity);
        }
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
            command.reset(); // todo more sophisticated cancelling of commands
        }

        controlledEntity.flameOn();
        controlledEntity.accelerate(ACCELERATION_FIGHTER);

    } else {
        controlledEntity.flameOff();
    }

    // Deselect targets if dead
    if (attackTarget && attackTarget.hp <= 0) {
        controlledEntity.attackTarget = null;
        command.reset(); // todo more sophisticated cancelling of commands
    }
}
