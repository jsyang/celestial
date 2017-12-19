import Entity from '../Entity';

const DEFAULTS = {
    TURN_RATE:  0.07,
    SPEED:      2.5,
    DIST_HALT2: 80 ** 2
};

const DIST_PLANET_ORBIT2 = 200 ** 2;

function rotateToFaceTarget(entity, target) {
    let rotation          = entity.rotation;
    const desiredRotation = Entity.getAngleFromTo(entity, target);

    const turnMagnitude = Math.abs(desiredRotation - rotation);
    if (turnMagnitude > Math.PI) {
        if (rotation > 0) {
            entity.rotation += entity.TURN_RATE;
        } else {
            entity.rotation -= entity.TURN_RATE;
        }
    } else {
        if (turnMagnitude > entity.TURN_RATE) {
            if (rotation > desiredRotation) {
                entity.rotation -= entity.TURN_RATE;
            } else {
                entity.rotation += entity.TURN_RATE;
            }
        } else {
            entity.rotation = desiredRotation;
        }
    }

    rotation = entity.rotation;
    return rotation;
}

/**
 * Moves to target
 */
function process(entity) {
    let {target, DIST_HALT2} = entity;

    if (target && target.hp > 0) {
        const r2 = Entity.getDistSquared(entity, target);

        if (target.type === 'Planet') {
            DIST_HALT2 = DIST_PLANET_ORBIT2;
        }

        if (r2 > DIST_HALT2) {
            const rotation = rotateToFaceTarget(entity, target);

            entity.x += Math.cos(rotation) * entity.SPEED;
            entity.y += Math.sin(rotation) * entity.SPEED;

            if (entity.flameOn) {
                entity.flameOn();
            }
        } else {
            if (target.type === 'Planet') {
                if (entity.canOrbitPlanet) {
                    entity.enterPlanetOrbit(target);
                }
            }

            if (entity.flameOff) {
                entity.flameOff();
            }
        }
    } else {
        entity.target = null;
    }
}

export default {
    componentFlag: 'canMoveToTarget',
    DEFAULTS,
    process
}
