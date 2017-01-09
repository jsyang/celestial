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

var M1M2_FIGHTER_PLANET = MASS_FIGHTER * MASS_PLANET;
var M1M2_FIGHTER_STAR   = MASS_FIGHTER * MASS_STAR;

var ERROR_MARGIN_LANDING_ROTATION = Math.PI / 4;
var ERROR_MARGIN_LANDING_SPEED2   = 2.1 * 2.1;

function crashFighter(f) {
    EntityDB.remove(f);
    Audio.play('collide');
    ProjectileController.explode(f, 6);
}

var PIPI = Math.PI * 2;

function attractFighterToPlanet(f, p) {
    var r2 = Entity.getDistSquared(f, p);

    if (r2 < p.DIST_MIN_GRAVITY2) {
        AlarmController.process(f, p);

        var forceFactor = M1M2_FIGHTER_PLANET / Math.pow(r2, 1.5);

        var dx = p.x - f.x;
        var dy = p.y - f.y;

        f.dx += dx * forceFactor;
        f.dy += dy * forceFactor;

        if (r2 < p.DIST_SURFACE2) {
            var landingSpeed           = f.dx * f.dx + f.dy * f.dy;
            var fighterRotation        = f.rotation;
            var correctLandingRotation = Entity.getAngleFromTo(p, f);
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
                FighterController.dockTo(p);
            } else {
                crashFighter(f);
            }
        }
    }
}

function attractFighterToStar(f, s) {
    var r2 = Entity.getDistSquared(f, s);

    if (r2 < s.DIST_MIN_GRAVITY2) {
        AlarmController.process(f, s);

        var dx = s.x - f.x;
        var dy = s.y - f.y;

        var forceFactor = M1M2_FIGHTER_STAR / Math.pow(r2, 1.5);

        f.dx += dx * forceFactor;
        f.dy += dy * forceFactor;

        if (r2 < s.DIST_SURFACE2) {
            crashFighter(f);
        }
    }
}

function process() {
    var star    = EntityDB.getByType('Star');
    var planet  = EntityDB.getByType('Star');
    var fighter = EntityDB.getByType('Fighter');

    if (fighter) {
        for (var i = 0; i < fighter.length; i++) {
            if(!fighter[i].isDocked) {
                star.forEach(attractFighterToStar.bind(null, fighter[i]));
                planet.forEach(attractFighterToPlanet.bind(null, fighter[i]));
            }
        }
    }
}

module.exports = {
    process : process
};