import {playSound} from '../assets/audio';
import Entity from '../Entity';
import Random from '../Random';

function explode() {
    playSound(this.EXPLOSION_SOUND);

    for (let fragmentCount = this.EXPLOSION_FRAGMENTS; fragmentCount > 0; fragmentCount--) {
        Entity.create('Shot', {
            shotType: 'cannon_normal',
            x:        this.x + Random.float(-10, 10),
            y:        this.y + Random.float(-10, 10),
            team:     Entity.TEAM.NONE,
            dx:       Random.float(-2, 2) + (this.dx || 0),
            dy:       Random.float(-2, 2) + (this.dy || 0)
        });
    }
}

const DEFAULTS = {
    EXPLOSION_FRAGMENTS: 6,
    EXPLOSION_SOUND:     'collide',
    explode
};

/**
 * Explodes when dead
 */
function process(entity) {
    // Ensure the explosion is intentional
    // i.e. Freighters should not explode when colonizing
    if (entity.canExplode && entity.hp <= 0) {
        explode.call(entity);
    }
}

export default {
    componentFlag: 'canExplode',
    DEFAULTS,
    process
}
