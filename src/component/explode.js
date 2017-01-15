var Entity     = require('../entity');
var Random     = require('../random');
var Audio      = require('../audio');

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

    for (var fragmentCount = entity.EXPLOSION_FRAGMENTS; fragmentCount > 0; fragmentCount--) {
        Entity.create('ShotCannonNormal', {
            x    : entity.x + Random.float(-10, 10),
            y    : entity.y + Random.float(-10, 10),
            team : Entity.TEAM.NONE,
            dx   : Random.float(-2, 2) + (entity.dx || 0),
            dy   : Random.float(-2, 2) + (entity.dy || 0)
        });
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};