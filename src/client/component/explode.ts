import {playSound} from '../assets/audio';
import Entity from '../Entity';
import Random from '../Random';

function explode() {
    const {
              EXPLOSION_SOUND, EXPLOSION_FRAGMENTS,
              x, y, dx, dy,
              explosionOriginDx,
              explosionOriginDy
          } = this;

    playSound(EXPLOSION_SOUND);

    for (let fragmentCount = EXPLOSION_FRAGMENTS; fragmentCount > 0; fragmentCount--) {
        Entity.create('Shot', {
            shotType: 'cannon_normal',
            x:        explosionOriginDx + x + Random.float(-10, 10),
            y:        explosionOriginDy + y + Random.float(-10, 10),
            team:     Entity.TEAM.NONE,
            dx:       Random.float(-2, 2) + (dx || 0),
            dy:       Random.float(-2, 2) + (dy || 0)
        });
    }

    this.hasExploded = true;
}

const DEFAULTS = {
    // Relative to entity x,y
    explosionOriginDx: 0,
    explosionOriginDy: 0,

    EXPLOSION_FRAGMENTS: 6,
    EXPLOSION_SOUND:     'collide',
    hasExploded:         false,
    explode
};

/**
 * Explodes when dead
 */
function process(entity) {
    const {hasExploded, canExplode, hp} = entity;

    // Ensure the explosion is intentional
    // i.e. Freighters should not explode when colonizing
    if (hp <= 0 && !hasExploded && canExplode) {
        explode.call(entity);
    }
}

export default {
    componentFlag: 'canExplode',
    DEFAULTS,
    process
}
