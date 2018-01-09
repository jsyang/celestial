import Entity from '../Entity';
import {ACCELERATION_FIGHTER, ACCELERATION_FIGHTER_UNDOCK, ROTATION_RATE_FIGHTER} from '../constants';

/**
 * Move a fighter while avoiding planets and stars
 * Needs:
 *      canAccelerate
 *      canLimitSpeed
 *      canAttack
 *      canDockPlanet
 */

const ACCELERATION_ANGLE_MAGNITUDE = 0.05;
const ROTATION_RATE_AI_FIGHTER     = ROTATION_RATE_FIGHTER * 2;

const FRAMES_TO_TURN             = Math.PI / ROTATION_RATE_FIGHTER;
const ATTACK_DIST2               = 400 ** 2;
const FRAMES_DECELERATION_MARGIN = 5;

function rotate(entity, idealRotation) {
    if (idealRotation > entity.rotation) {
        entity.rotation += ROTATION_RATE_AI_FIGHTER;
    } else {
        entity.rotation -= ROTATION_RATE_AI_FIGHTER;
    }
}

function accelerateFlameOn(entity, acc = ACCELERATION_FIGHTER) {
    entity.accelerate(acc);
    entity.flameOn();
}

function moveToAttackTarget(entity) {
    const {attackTarget, dx, dy, isDockedPlanet} = entity;

    entity.flameOff();

    if (attackTarget) {
        if (isDockedPlanet) {
            entity.undockPlanet();
            accelerateFlameOn(entity, ACCELERATION_FIGHTER_UNDOCK * 2 + ACCELERATION_FIGHTER);

        } else {
            let rotation;

            const speed2 = dx ** 2 + dy ** 2;
            const dist2  = Entity.getDistSquared(entity, attackTarget);

            const idealRotation   = Entity.getAngleFromTo(entity, attackTarget);
            const movementBearing = Math.atan2(dy, dx);

            // todo: simplify calculations
            const framesToSlowDown            = (dist2 / ACCELERATION_FIGHTER) ** 0.25 + FRAMES_TO_TURN + FRAMES_DECELERATION_MARGIN;
            const numberOfFramesAwayFromPoint = Math.sqrt(dist2 / speed2);

            if (speed2 < 9) {
                // Develop initial speed
                rotation = entity.rotation;
            } else {
                if (numberOfFramesAwayFromPoint <= framesToSlowDown) {
                    // Decelerate when
                    rotation = movementBearing + Math.PI;
                } else {
                    // Accelerate towards target
                    rotation = idealRotation;
                }

                // Shoot if close enough
                // todo: avoid stars and planets
                if (dist2 < ATTACK_DIST2) {
                    const ax = Math.cos(idealRotation) * 10;
                    const ay = Math.sin(idealRotation) * 10;

                    rotation           = Math.atan2(ay - dy, ax - dx);
                    entity.isAttacking = Math.abs(rotation - entity.rotation) < ACCELERATION_ANGLE_MAGNITUDE;
                } else {
                    entity.isAttacking = false;
                }

                rotate(entity, rotation);
            }

            // Only accelerate when not attacking and in the correct angle
            if (!entity.isAttacking && Math.abs(Math.cos(rotation) - Math.cos(entity.rotation)) < ACCELERATION_ANGLE_MAGNITUDE) {
                accelerateFlameOn(entity);
            }

        }
    }
}

function process(entity) {
    if (entity.isFighterAutoAccelerated) {
        moveToAttackTarget(entity);
    }
}

const DEFAULTS = {
    isFighterAutoAccelerated: true
};

export default {
    componentFlag: 'canAccelerateFighterToAttackTarget',
    DEFAULTS,
    process
}
