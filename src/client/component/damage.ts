// import {playSound} from '../Audio';
// import Entity from '../Entity';

const DEFAULTS = {
    damageHp: 1
};

// function registerDamage(entity) {
//     playSound(entity.AUDIO_HIT || 'hit');
//     entity.hp -= this.damageHp;
//     entity.hitTime = 5;
//     Entity.destroy(this);
// }
//
// const enemies = entity => entity.team !== this.team;


/**
 * Damages other entities if it collides with them
 */
function process() {
// todo
    // Entity.getNearest(entity)
    //     .filter(enemies.bind(entity));

}

export default {
    componentFlag: 'canDamage',
    DEFAULTS,
    process
}
