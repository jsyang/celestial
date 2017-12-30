/**
 * Homing capability
 */

const ACCELERATION = 0.16;

function process(entity) {

    if (entity.delayBeforeTracking > 0) {
        entity.delayBeforeTracking--;
    } else {
        const {attackTarget} = entity;

        if (attackTarget) {
            const {x, y} = attackTarget;

            if (entity.x > x) {
                entity.dx -= ACCELERATION;
            } else {
                entity.dx += ACCELERATION;
            }

            if (entity.y > y) {
                entity.dy -= ACCELERATION;
            } else {
                entity.dy += ACCELERATION;
            }

            entity.rotation = Math.atan2(entity.dy, entity.dx);
        }
    }

}

const DEFAULTS = {
    delayBeforeTracking: 5
};

export default {
    componentFlag: 'canAccelerateToAttackTarget',
    DEFAULTS,
    process
}
