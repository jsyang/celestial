import Entity from '../Entity';
import {getAngleFromTo, getDistSquared} from '../entityHelpers';

/**
 * Exhibit boid-like flocking behavior
 */

const REPEL_DIST_2    = 20 ** 2;
const REPEL_MAGNITUDE = 5;

const FLOCK_ATTRACT_TENDENCY = 5;


const FLOCK_SPEED = 2.5;

const DEFAULTS = {
    flockPoint: null
};

function repelFromOtherFlockMembers(entity) {
    Entity.getNearestUnits(entity)
        .filter((f: any) => f.canFlock && f !== entity)
        .forEach((otherFlocker: any) => {
            const distance = getDistSquared(entity, otherFlocker);

            if (distance < REPEL_DIST_2) {
                let factor = -REPEL_MAGNITUDE;

                // Extra repulsion for other probes that are too close
                if (distance < 6) {
                    factor = factor * 4;
                }

                entity.dx += (otherFlocker.x - entity.x) * factor;
                entity.dy += (otherFlocker.y - entity.y) * factor;
            }
        });
}

function attractToFlockPoint(entity) {
    const {flockPoint} = entity;

    if (flockPoint) {
        const bearing = getAngleFromTo(entity, flockPoint);

        entity.dx += FLOCK_ATTRACT_TENDENCY * Math.cos(bearing);
        entity.dy += FLOCK_ATTRACT_TENDENCY * Math.sin(bearing);
    }
}

function syncRotationWithMovement(entity) {
    const {dx, dy} = entity;

    const netBearing = Math.atan2(dy, dx);

    entity.rotation = netBearing;

    entity.dx = Math.cos(netBearing) * FLOCK_SPEED;
    entity.dy = Math.sin(netBearing) * FLOCK_SPEED;
}

function process(entity) {
    const {canMoveLinearly} = entity;

    if (canMoveLinearly) {
        repelFromOtherFlockMembers(entity);
        attractToFlockPoint(entity);
        syncRotationWithMovement(entity);
    }
}

export default {
    componentFlag: 'canFlock',
    DEFAULTS,
    process
}
