var Entity = require('../entity');
var Random = require('../random');
var Audio  = require('../audio');

var DEFAULTS = {
    EXPLOSION_FRAGMENTS : 6,
    EXPLOSION_SOUND     : 'collide',
    explode             : explode
};

function explode() {
    Audio.play(this.EXPLOSION_SOUND);

    for (var fragmentCount = this.EXPLOSION_FRAGMENTS; fragmentCount > 0; fragmentCount--) {
        Entity.create('ShotCannonNormal', {
            x    : this.x + Random.float(-10, 10),
            y    : this.y + Random.float(-10, 10),
            team : Entity.TEAM.NONE,
            dx   : Random.float(-2, 2) + (this.dx || 0),
            dy   : Random.float(-2, 2) + (this.dy || 0)
        });
    }
}

/**
 * Explodes when dead
 * @param {object} entity
 */
function process(entity) {
    explode.call(entity);
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};