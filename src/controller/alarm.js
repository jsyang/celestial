var Entity = require('../entity');
var Audio  = require('../audio');

var hasAlarmSounded = {
    Planet : false,
    Star   : false
};

var AUDIO_ALARM = {
    Planet : 'nav',
    Star   : 'siren'
};

function init() {
    for (var k in hasAlarmSounded) {
        if (hasAlarmSounded.hasOwnProperty(k)) {
            hasAlarmSounded[k] = false;
        }
    }
}

function process(fighter, entity) {
    var t = entity.type;

    var isWithinAlarmDistance = Entity.getDistSquared(fighter, entity) < entity.DIST_MIN_GRAVITY2;

    if (isWithinAlarmDistance) {
        if (!hasAlarmSounded[t]) {
            Audio.play(AUDIO_ALARM[t]);
            hasAlarmSounded[t] = true;
        }
    } else if (hasAlarmSounded[t]) {
        hasAlarmSounded[t] = false;
    }
}

module.exports = {
    init    : init,
    process : process
};