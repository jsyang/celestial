/**
 * Gravity and related collisions
 */

var Audio    = require('../audio');
var EntityDB = require('../entityDB');
var Entity   = require('../entity');

var ProjectileController = require('../controller/projectile');
var FighterController    = require('../controller/fighter');
var AlarmController      = require('../controller/alarm');

var MASS_STAR    = 500;
var MASS_PLANET  = 100;
var MASS_FIGHTER = 10;

var M1M2_PLANET_FIGHTER = MASS_PLANET * MASS_FIGHTER;
var M1M2_STAR_FIGHTER   = MASS_STAR * MASS_FIGHTER;

var ERROR_MARGIN_LANDING_ROTATION = Math.PI / 4;
var ERROR_MARGIN_LANDING_SPEED2   = 2.1 * 2.1;

function crashFighter(f) {
    EntityDB.remove(f);
    Audio.play('collide');
    ProjectileController.explode(f, 6);
}

var PIPI = Math.PI * 2;

// https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-forces/a/gravitational-attraction
function attractFighterToBody(b, m1m2, isNotDockable, f) {
    if (!f.isDocked) {
        var dx = b.x - f.x;
        var dy = b.y - f.y;
        var r2 = Entity.getDistSquared(f, b);

        AlarmController.process(f, b);

        if (r2 < b.DIST_MIN_GRAVITY2) {
            var forceFactor = m1m2 / Math.pow(r2, 1.5);

            var attractX = dx * forceFactor;
            var attractY = dy * forceFactor;

            f.dx += attractX;
            f.dy += attractY;

            if (r2 < b.DIST_SURFACE2) {
                if (isNotDockable) {
                    crashFighter(f);
                } else {
                    var landingSpeed           = f.dx * f.dx + f.dy * f.dy;
                    var fighterRotation        = f.rotation;
                    var correctLandingRotation = Math.atan2(-dy, -dx);
                    var landingAngleError      = Math.abs(correctLandingRotation - fighterRotation);

                    // Limit fighterRotation to the open interval (-PI, PI)
                    // todo: limit all entity rotations to within (-PI, PI) vs (-2PI, 2PI)?
                    if (landingAngleError > Math.PI) {
                        if (fighterRotation > 0) {
                            fighterRotation -= PIPI;
                        } else {
                            fighterRotation += PIPI;
                        }

                        landingAngleError = Math.abs(correctLandingRotation - fighterRotation);
                    }

                    var isSoftLanding  = landingSpeed < ERROR_MARGIN_LANDING_SPEED2;
                    var isCorrectAngle = landingAngleError < ERROR_MARGIN_LANDING_ROTATION;

                    if (isCorrectAngle && isSoftLanding) {
                        FighterController.dockTo(b);
                    } else {
                        crashFighter(f);
                    }
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

    attractFunc1 = attractFighterToBody.bind(null, planets[0], M1M2_PLANET_FIGHTER, false);
    attractFunc2 = attractFighterToBody.bind(null, star[0], M1M2_STAR_FIGHTER, true);
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