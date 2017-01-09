/**
 * Gravity and related collisions
 * todo: move this into fighter and some of the constants into entity
 */

var Audio      = require('../audio');
var EntityDB   = require('../entityDB');
var Entity     = require('../entity');
var EntityGrid = require('../entitygrid');

var ProjectileController = require('../controller/projectile');
var FighterController    = require('../controller/fighter');

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

function attractToPlanet(p) {
    var r2 = Entity.getDistSquared(this, p);

    var forceFactor = M1M2_FIGHTER_PLANET / Math.pow(r2, 1.5);

    var dx = p.x - this.x;
    var dy = p.y - this.y;

    this.dx += dx * forceFactor;
    this.dy += dy * forceFactor;

    if (r2 < p.DIST_SURFACE2) {
        var landingSpeed           = this.dx * this.dx + this.dy * this.dy;
        var fighterRotation        = this.rotation;
        var correctLandingRotation = Entity.getAngleFromTo(p, this);
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
            crashFighter(this);
        }
    }
}

function attractToStar(s) {
    var r2 = Entity.getDistSquared(this, s);

    var dx = s.x - this.x;
    var dy = s.y - this.y;

    var forceFactor = M1M2_FIGHTER_STAR / Math.pow(r2, 1.5);

    this.dx += dx * forceFactor;
    this.dy += dy * forceFactor;

    if (r2 < s.DIST_SURFACE2) {
        crashFighter(this);
    }
}

function process() {
    var fighters = EntityDB.getByType('Fighter');

    if (fighters) {
        for (var i = 0; i < fighters.length; i++) {
            var fighter = fighters[i];

            if (fighter && !fighter.isDocked && fighter.hp > 0) {

                var stars = EntityGrid.getNearest(fighter, 'Star', Entity.DIST_MIN_STAR_GRAVITY2);
                if(stars) {
                    stars.forEach(attractToStar.bind(fighter));
                }

                var planets = EntityGrid.getNearest(fighter, 'Planet', Entity.DIST_MIN_PLANET_GRAVITY2);
                if(planets) {
                    planets.forEach(attractToPlanet.bind(fighter));
                }
            }
        }
    }
}

module.exports = {
    process : process
};