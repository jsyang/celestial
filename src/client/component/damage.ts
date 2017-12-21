import {playSound} from '../assets/audio';
import Entity from '../Entity';
import {testPointInEntity} from '../Geometry';

const DEFAULTS = {
    damageHp: 1
};

function registerDamage(entity): boolean {
    if (entity.team !== this.team) {
        const isEntityPlanetOrStar = (
            entity.type === 'Planet' ||
            entity.type === 'Star'
        );

        if (!isEntityPlanetOrStar) {
            if (testPointInEntity(this, entity)) {
                playSound(entity.AUDIO_HIT || 'hit');
                entity.hp -= this.damageHp;
                entity.hitTime = 5;
                Entity.destroy(this);

                console.log(entity.type, 'hit!');

                return true;
            }
        }
    }

    return false;
}

// Damages other entities if it collides with them
function process(entity) {
    Entity.getNearest(entity)
        .some(registerDamage.bind(entity));
}

export default {
    componentFlag: 'canDamage',
    DEFAULTS,
    process
}
