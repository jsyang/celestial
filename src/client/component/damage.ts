import {playSound} from '../assets/audio';
import Entity from '../Entity';
import {testPointInEntity} from '../Geometry';

const DEFAULTS = {
    damageHp: 1
};

function registerDamage(entity): boolean {
    if (entity.team !== this.team) {
        if (testPointInEntity(this, entity)) {
            playSound(entity.AUDIO_HIT || 'hit');
            entity.hp -= this.damageHp;
            entity.hitTime = 10;
            Entity.destroy(this);

            return true;
        }
    }

    return false;
}

// Damages other entities if it collides with them
function process(entity) {
    Entity.getNearestUnits(entity)
        .some(registerDamage.bind(entity));
}

export default {
    componentFlag: 'canDamage',
    DEFAULTS,
    process
}
