/**
 * Gravity and related collisions
 * todo: move this into fighter and some of the constants into entity
 */

var EntityDB   = require('./entityDB');
var Entity     = require('./entity');
var EntityGrid = require('./entitygrid');

var Fighter = require('./entity/fighter');

var ERROR_MARGIN_LANDING_ROTATION = Math.PI / 4;
var ERROR_MARGIN_LANDING_SPEED2   = 2.1 * 2.1;

var PIPI = Math.PI * 2;

function attractToPlanet(p) {
    var r2 = Entity.getDistSquared(this, p);

    if (r2 < Entity.DIST_MIN_PLANET_GRAVITY2) {
        var forceFactor = this.MASS * p.MASS / Math.pow(r2, 1.5);

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
                Fighter.dockTo(this, p);
            } else {
                Fighter.crash(this);
            }
        }
    }
}

function attractToStar(s) {
    var r2 = Entity.getDistSquared(this, s);

    if (r2 < Entity.DIST_MIN_STAR_GRAVITY2) {
        var dx = s.x - this.x;
        var dy = s.y - this.y;

        var forceFactor = this.MASS * s.MASS / Math.pow(r2, 1.5);

        this.dx += dx * forceFactor;
        this.dy += dy * forceFactor;

        if (r2 < s.DIST_SURFACE2) {
            Fighter.crash(this);
        }
    }
}

function attractFighterToStarOrPlanet(entity) {
    if (entity.type === 'Star') {
        attractToStar.call(this, entity);
    } else if (entity.type === 'Planet') {
        attractToPlanet.call(this, entity);
    }
}

function updateFighter(fighter) {
    if (fighter && !fighter.isDocked && fighter.hp > 0) {
        EntityGrid.getNearest(fighter)
            .forEach(attractFighterToStarOrPlanet.bind(fighter));
    }
}

function update() {
    var fighters = EntityDB.getByType('Fighter');

    if (fighters) {
        fighters.forEach(updateFighter);
    }
}

module.exports = {
    update : update
};