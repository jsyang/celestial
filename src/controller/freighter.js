var Audio    = require('../audio');
var Entity   = require('../entity');
var EntityDB = require('../entityDB');

var ProjectileController = require('../controller/projectile');

var freighter;

var DEGREES90 = Math.PI * 0.5;
var DEGREES10 = DEGREES90 / 9;

var DEFAULT_OPTIONS = {
    x    : 0,
    y    : 0,
    team : Entity.TEAM.BLUE
};

function init() {
    freighter = Entity.create('Freighter', DEFAULT_OPTIONS);

    freighter.rotation       = -6 * DEGREES10;
    freighter.graphics.alpha = 0.8;

    freighter.planet = EntityDB.getByType('Planet')[0];
}

var ORBIT_ROTATION = 0.00025;
var ORBIT_DISTANCE = 200;

function process() {
    if (freighter) {
        var px = freighter.planet.x;
        var py = freighter.planet.y;

        freighter.rotation += ORBIT_ROTATION;
        freighter.x = px + Math.cos(freighter.rotation - DEGREES90) * ORBIT_DISTANCE;
        freighter.y = py + Math.sin(freighter.rotation - DEGREES90) * ORBIT_DISTANCE;

        if (freighter.hp > 0) {
            if (freighter.hitTime > 0) {
                freighter.hitTime--;
                freighter.graphics.alpha = 1;
            } else {
                freighter.graphics.alpha = 0.8;
            }
        } else {
            EntityDB.remove(freighter);
            Audio.play('collide');

            ProjectileController.explode(freighter, 6);
            freighter = undefined;
        }
    }
}

module.exports = {
    init    : init,
    process : process
};