import Entity from '../Entity';

const DEFAULTS = {
    AUTO_TARGET_ENEMY_TIME:   1500,
    autoTargetSearchDist2:    400 * 400,
    autoTargetLastSearchTime: 0
};

function setAttackTargetNearestEnemy(entity) {
    entity.attackTarget = Entity.getNearestEnemyTarget(entity, entity.autoTargetSearchDist2);
    entity.isAttacking  = Boolean(entity.attackTarget);
}

function process(entity) {
    if (entity.canAttack) {
        const now = Date.now();

        if (now - entity.autoTargetLastSearchTime >= entity.AUTO_TARGET_ENEMY_TIME) {
            setAttackTargetNearestEnemy(entity);
            entity.autoTargetLastSearchTime = now;
        }
    }
}

export default {
    componentFlag: 'canAutoTargetEnemy',
    DEFAULTS,
    process
}
