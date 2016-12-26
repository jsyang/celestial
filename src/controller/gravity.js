/**
 * Gravity and related collisions
 */

var Audio    = require('../audio');
var EntityDB = require('../entityDB');

var ProjectileController = require('../controller/projectile');
var FighterController    = require('../controller/fighter');

var MASS_STAR    = 500;
var MASS_PLANET  = 100;
var MASS_FIGHTER = 10;

var M1M2_PLANET_FIGHTER = MASS_PLANET * MASS_FIGHTER;
var M1M2_STAR_FIGHTER   = MASS_STAR * MASS_FIGHTER;

var DOCK_DISTANCE_PLANET2 = 105 * 105;

var GRAVITY_MIN_DISTANCE_THRESHOLD2 = 600 * 600;

function getMagnitude(dx, dy) {
    return Math.pow(dx * dx + dy * dy, 0.5);
}

var ERROR_MARGIN_LANDING_ROTATION = Math.PI / 4;
var ERROR_MARGIN_LANDING_SPEED    = 2.1;

// https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-forces/a/gravitational-attraction
function attractFighterToBody(b, m1m2, dockDistance2, f) {
    if (!f.isDocked) {
        var dx = b.x - f.x;
        var dy = b.y - f.y;
        var r2 = dx * dx + dy * dy;

        if (r2 < GRAVITY_MIN_DISTANCE_THRESHOLD2) {
            var forceFactor = m1m2 / Math.pow(r2, 1.5);

            var attractX = dx * forceFactor;
            var attractY = dy * forceFactor;

            f.dx += attractX;
            f.dy += attractY;

            if (r2 < dockDistance2) {
                var landingSpeed           = getMagnitude(f.dx, f.dy);
                var fighterRotation        = f.rotation;
                var correctLandingRotation = Math.atan2(-dy, -dx);
                var landingAngleError      = Math.abs(correctLandingRotation - fighterRotation);

                var isSoftLanding  = landingSpeed < ERROR_MARGIN_LANDING_SPEED;
                var isCorrectAngle = landingAngleError < ERROR_MARGIN_LANDING_ROTATION;

                /*
                 console.log('isSoftLanding', isSoftLanding, 'isCorrectAngle', isCorrectAngle);
                 console.log(
                 'landingSpeed', landingSpeed,
                 'landingAngleError', landingAngleError,
                 'correctLandingAngle', correctLandingRotation,
                 'fighterRotation', fighterRotation
                 );
                 */

                if (isCorrectAngle && isSoftLanding) {
                    FighterController.dockTo(b);
                } else {
                    EntityDB.remove(f);
                    Audio.play('collide');

                    ProjectileController.explode(f, 6);
                }
            }
        }
    }
}

var planets;
var star;

var attractFunc1;
var attractFunc2;

function init() {
    planets = EntityDB.getByType('Planet');
    star    = EntityDB.getByType('Star');

    attractFunc1 = attractFighterToBody.bind(null, planets[0], M1M2_PLANET_FIGHTER, DOCK_DISTANCE_PLANET2);
    attractFunc2 = attractFighterToBody.bind(null, star[0], M1M2_STAR_FIGHTER, 10);
}

function process() {
    var fighter = EntityDB.getByType('Fighter');

    if (fighter) {
        fighter.forEach(attractFunc1);
        fighter.forEach(attractFunc2);
    }
}

module.exports = {
    init    : init,
    process : process
};