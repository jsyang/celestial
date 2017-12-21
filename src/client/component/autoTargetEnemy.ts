import Entity from '../Entity';

const DEFAULTS = {
    AUTO_TARGET_ENEMY_TIME:   1500,
    autoTargetSearchDist2:    400 * 400,
    autoTargetLastSearchTime: 0
};

function setCannonTargetNearestEnemy(entity) {
    entity.cannonTarget = Entity.getNearestEnemyTarget(entity, entity.autoTargetSearchDist2);
    entity.isShooting   = Boolean(entity.cannonTarget);
}

function process(entity) {
    if (entity.canShootCannon) {
        const now = Date.now();

        if (now - entity.autoTargetLastSearchTime >= entity.AUTO_TARGET_ENEMY_TIME) {
            setCannonTargetNearestEnemy(entity);
            entity.autoTargetLastSearchTime = now;
        }
    }
}

export default {
    componentFlag: 'canAutoTargetEnemy',
    DEFAULTS,
    process
}
