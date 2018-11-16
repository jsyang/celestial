import {MAX_COORDINATE} from '../constants';

const DEFAULTS = {
    dx : 0,
    dy : 0
};

/**
 * Moves linearly
 */
function process(entity) {
    if (!entity.isDockedPlanet) {
        entity.x += entity.dx;
        entity.y += entity.dy;

        // Stop motion when bounds hit

        if (entity.x === 0 || entity.x === MAX_COORDINATE) {
            entity.dx = 0;
        }

        if (entity.y === 0 || entity.y === MAX_COORDINATE) {
            entity.dy = 0;
        }
    }
}

export default {
    componentFlag: 'canMoveLinearly',
    DEFAULTS,
    process
}
