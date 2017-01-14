var Audio      = require('../audio');
var Projectile = require('../entity/projectile');

var DEFAULTS = {
    EXPLOSION_FRAGMENTS : 6,
    EXPLOSION_SOUND     : 'collide'
};

/**
 * Explodes when dead
 * @param {object} entity
 */
function process(entity) {
    Audio.play(entity.EXPLOSION_SOUND);
    Projectile.explode(entity, entity.EXPLOSION_FRAGMENTS);
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};