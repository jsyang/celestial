import Entity from '../Entity';

const DEFAULTS = {
    TURN_RATE:  0.07,
    SPEED:      2.5,
    DIST_HALT2: 80 ** 2
};

const DIST_PLANET_ORBIT2 = 200 ** 2;

function rotateToFaceColonizationTarget(entity) {
    let rotation          = entity.rotation;
    const desiredRotation = Entity.getAngleFromTo(entity, entity.colonizationTarget);

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
    let {colonizationTarget, DIST_HALT2} = entity;

    if (colonizationTarget && colonizationTarget.hp > 0) {
        const r2 = Entity.getDistSquared(entity, colonizationTarget);

        if (colonizationTarget.type === 'Planet') {
            DIST_HALT2 = DIST_PLANET_ORBIT2;
        }

        if (r2 > DIST_HALT2) {
            const rotation = rotateToFaceColonizationTarget(entity);

            entity.x += Math.cos(rotation) * entity.SPEED;
            entity.y += Math.sin(rotation) * entity.SPEED;

            if (entity.flameOn) {
                entity.flameOn();
            }
        } else {
            if (colonizationTarget.type === 'Planet') {
                if (entity.canOrbitPlanet) {
                    entity.enterPlanetOrbit(colonizationTarget);
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
    componentFlag: 'canMoveToColonizationTarget',
    DEFAULTS,
    process
}
