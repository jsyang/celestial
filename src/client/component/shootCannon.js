var Entity = require('../entity');
var Random = require('../random');
var Audio  = require('../audio');

var AUDIO_SHOT = {
    'ShotCannonHeavy'  : 'fire-heavy',
    'ShotCannonNormal' : 'fire'
};

var DEFAULTS = {
    cannonGetMuzzleFuncs       : [],
    CANNON_LOAD_TIME_MS        : 100,
    cannonLastShotTime         : 0,
    cannonMatchShooterRotation : true,
    cannonTarget               : undefined,
    cannonShotSpeed            : 4,
    cannonShotType             : 'ShotCannonNormal',
    isShooting                 : false
};

function shoot(getMuzzleFunc) {
    var muzzle = getMuzzleFunc(this);

    var cannonAngle;

    if (this.cannonMatchShooterRotation) {
        cannonAngle = this.rotation;
    } else {
        cannonAngle = Entity.getAngleFromTo(muzzle, this.cannonTarget);
    }

    var dx = Math.cos(cannonAngle) * this.cannonShotSpeed;
    var dy = Math.sin(cannonAngle) * this.cannonShotSpeed;

    Entity.create(this.cannonShotType, {
        x    : muzzle.x + this.x,
        y    : muzzle.y + this.y,
        team : this.team,
        dx   : dx + (this.dx || 0),
        dy   : dy + (this.dy || 0)
    });

    Audio.play(AUDIO_SHOT[this.cannonShotType]);
}

/**
 * Shoot cannon shots
 * @param {object} entity
 */
function process(entity) {
    if (entity.isShooting) {
        var now = Date.now();

        if (now - entity.cannonLastShotTime >= entity.CANNON_LOAD_TIME_MS) {
            entity.cannonGetMuzzleFuncs
                .forEach(shoot.bind(entity));

            entity.cannonLastShotTime = now;
        }
    }

}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};