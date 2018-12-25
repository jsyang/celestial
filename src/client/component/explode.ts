import {playSoundLocalized} from '../assets/audio';
import Entity from '../Entity';
import Random from '../Random';
import {TEAM} from '../constants';

function explode(entity) {
    const {
              EXPLOSION_SOUND, EXPLOSION_FRAGMENTS,
              x, y, dx, dy,
              explosionOriginDx,
              explosionOriginDy
          } = entity;

    playSoundLocalized(EXPLOSION_SOUND, entity);

    for (let fragmentCount = EXPLOSION_FRAGMENTS; fragmentCount > 0; fragmentCount--) {
        Entity.create('CannonShot', {
            x:    explosionOriginDx + x + Random.float(-10, 10),
            y:    explosionOriginDy + y + Random.float(-10, 10),
            team: TEAM.NONE,
            dx:   Random.float(-2, 2) + (dx || 0),
            dy:   Random.float(-2, 2) + (dy || 0)
        });
    }

    entity.hasExploded = true;
}

const DEFAULTS = {
    // Relative to entity x,y
    explosionOriginDx:   0,
    explosionOriginDy:   0,
    EXPLOSION_SOUND:     'collide',
    EXPLOSION_FRAGMENTS: 6,
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
        explode(entity);
    }
}

export default {
    componentFlag: 'canExplode',
    DEFAULTS,
    process
}
