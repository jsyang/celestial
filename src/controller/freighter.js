var Audio    = require('../audio');
var EntityDB = require('../entityDB');

var ProjectileController = require('../controller/projectile');

var freighter;

var DEGREES90 = Math.PI * 0.5;

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
            freighter.renderHit();
        } else {
            EntityDB.remove(freighter);
            Audio.play('collide');

            ProjectileController.explode(freighter, 6);
            freighter = undefined;
        }
    }
}

module.exports = {
    process : process
};