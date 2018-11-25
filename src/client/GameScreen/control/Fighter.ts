import GameScreen from '..';
import {IInputEvent} from '../../Input/Event';
import {ACCELERATION_FIGHTER, ACCELERATION_FIGHTER_UNDOCK, ROTATION_RATE_FIGHTER} from '../../constants';
import NavBeaconHuman from '../../Graphics/NavBeaconHuman';
import {getTargetNearEntity} from './getTarget';

export default function controlFighter(controlledEntity, events: IInputEvent, prevEvents: IInputEvent) {
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
        } else if (events.TARGET_CLEAR && !prevEvents.TARGET_CLEAR) {
            controlledEntity.attackTarget = null;
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
        }

        controlledEntity.flameOn();
        controlledEntity.accelerate(ACCELERATION_FIGHTER);

    } else {
        controlledEntity.flameOff();
    }

    // Deselect targets if dead
    if (controlledEntity.attackTarget && controlledEntity.attackTarget.hp <= 0) {
        controlledEntity.attackTarget = null;
    }
}
