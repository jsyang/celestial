import {ACCELERATION_FIGHTER, ACCELERATION_FIGHTER_UNDOCK, ROTATION_RATE_FIGHTER} from '../constants';
import {getAngleFromTo, getDistSquared} from '../entityHelpers';
import {evalSelector} from '../behaviorTreeHelper';

/**
 * Move a fighter while avoiding planets and stars
 * Needs:
 *      canLimitSpeed
 *      canAttack
 *      canDockPlanet
 */

const ACCELERATION_ANGLE_MAGNITUDE = 0.1;
const ROTATION_RATE_AI_FIGHTER     = ROTATION_RATE_FIGHTER * 2;

const FRAMES_TO_TURN      = Math.PI / ROTATION_RATE_FIGHTER;
const ATTACK_DIST2        = 500 ** 2;
const ATTACK_PLANET_DIST2 = 400 ** 2;

const KEEP_AWAY_PLANET_DIST2     = (200 ** 2) / 1.4;
const FRAMES_DECELERATION_MARGIN = 5;

const MIN_ROTATION_DIFF = 0.01;

function rotate(entity, idealRotation) {
    let diff = idealRotation - entity.rotation;

    // Recalculate idealRotation if out of [-PI,PI] bounds
    if (Math.abs(diff) > Math.PI) {
        if (idealRotation > Math.PI) {
            idealRotation -= 2 * Math.PI;
        } else if (idealRotation < -Math.PI) {
            idealRotation += 2 * Math.PI;
        }

        diff = idealRotation - entity.rotation;
    }

    if (Math.abs(diff) >= MIN_ROTATION_DIFF) {
        if (diff > 0) {
            entity.rotation += ROTATION_RATE_AI_FIGHTER;
        } else {
            entity.rotation -= ROTATION_RATE_AI_FIGHTER;
        }
    }
}

function accelerateFlameOn(entity, acc = ACCELERATION_FIGHTER) {
    entity.accelerate(acc);
    entity.flameOn();
}

function undockIfDocked(entity): boolean {
    const {isDockedPlanet, isDockedSpacePort, isFighterPreviouslyDocked} = entity;

    if (isDockedPlanet) {
        entity.isFighterPreviouslyDocked = true;
        entity.undockPlanet();
        accelerateFlameOn(entity, ACCELERATION_FIGHTER_UNDOCK * 2 + ACCELERATION_FIGHTER);
        return true;
    } else if (isDockedSpacePort) {
        entity.isFighterPreviouslyDocked = true;
        entity.undockSpacePort();
        accelerateFlameOn(entity, ACCELERATION_FIGHTER_UNDOCK + ACCELERATION_FIGHTER);
        return true;
    } else {
        const {dx, dy} = entity;
        const speed2   = dx ** 2 + dy ** 2;

        if (isFighterPreviouslyDocked && speed2 < 9) {
            // Develop initial speed
            accelerateFlameOn(entity);
            return true;
        }
    }

    return false;
}

function moveOrAttack(entity) {
    const {attackTarget, dx, dy} = entity;

    let rotation;
    let attackDist2;

    let dist2    = getDistSquared(entity, attackTarget);
    const speed2 = dx ** 2 + dy ** 2;

    if (attackTarget.type === 'PBase') {
        attackDist2 = ATTACK_PLANET_DIST2;
    } else {
        attackDist2 = ATTACK_DIST2;
    }

    const idealRotation   = getAngleFromTo(entity, attackTarget);
    const movementBearing = Math.atan2(dy, dx);

    entity.isFighterPreviouslyDocked = false;
    entity.isAttacking               = false;

    if (dist2 < KEEP_AWAY_PLANET_DIST2 / speed2) {
        // Too close
        // Keep away from planet's gravitation force
        rotation = idealRotation - Math.PI;

    } else if (dist2 < attackDist2) {
        // If close enough, start attacking
        // Less weight on targetBearing
        // more weight on movementBearing
        const ax = Math.cos(idealRotation) * 5;
        const ay = Math.sin(idealRotation) * 5;

        rotation           = Math.atan2(ay - dy, ax - dx);
        entity.isAttacking = Math.abs(rotation - entity.rotation) < ACCELERATION_ANGLE_MAGNITUDE;
    } else {
        // Too far to attack, move closer
        const framesToSlowDown            = Math.sqrt(Math.sqrt(dist2) / ACCELERATION_FIGHTER) + FRAMES_TO_TURN + FRAMES_DECELERATION_MARGIN;
        const numberOfFramesAwayFromPoint = Math.sqrt(dist2 / speed2);

        if (numberOfFramesAwayFromPoint < framesToSlowDown) {
            // Decelerate when approaching target point
            rotation = movementBearing + Math.PI;
        } else {
            // Accelerate towards target
            rotation = idealRotation;
        }
    }

    rotate(entity, rotation);

    // Only accelerate when not attacking and in the correct angle
    if (!entity.isAttacking && Math.abs(Math.cos(rotation) - Math.cos(entity.rotation)) < ACCELERATION_ANGLE_MAGNITUDE) {
        accelerateFlameOn(entity);
    }
}

const ATTACK_SELECTOR = [
    undockIfDocked,
    moveOrAttack
];

function moveToAttackTarget(entity) {
    const {attackTarget} = entity;

    entity.flameOff();

    if (attackTarget) {
        if (attackTarget.hp > 0) {
            evalSelector(ATTACK_SELECTOR, entity);
        } else {
            entity.attackTarget = null;
            entity.isAttacking  = false;
        }
    }
}

function process(entity) {
    if (entity.isFighterAutoAccelerated) {
        moveToAttackTarget(entity);
    }
}

const DEFAULTS = {
    isFighterPreviouslyDocked: false,
    isFighterAutoAccelerated:  true
};

export default {
    componentFlag: 'canAccelerateFighterToAttackTarget',
    DEFAULTS,
    process
}
