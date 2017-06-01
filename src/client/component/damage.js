var Audio      = require('../audio');
var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');

var DEFAULTS = {
    damageHp : 1
};

function registerDamage(entity) {
    Audio.play(entity.AUDIO_HIT || 'hit');
    entity.hp -= this.damageHp;
    entity.hitTime = 5;
    EntityDB.remove(this);
}

function filterEnemiesOnly(entity) {
    return entity.team !== this.team;
}

/**
 * Damages other entities if it collides with them
 * @param entity
 */
function process(entity) {
    var neighborEnemy = EntityGrid.getNearest(entity)
        .filter(filterEnemiesOnly.bind(entity));
    // todo
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};