// Gravity and related collisions

import Entity   from '../Entity';
import Planet from '../Entity/Planet';
import Star from '../Entity/Star';

// Max distance that gravitation forces from this entity affect
// other entities
const DIST_MIN_STAR_GRAVITY2   = 1000 ** 2;
const DIST_MIN_PLANET_GRAVITY2 = 800 ** 2;

const ERROR_MARGIN_LANDING_ROTATION = Math.PI / 4;
const ERROR_MARGIN_LANDING_SPEED2   = 2.1 * 2.1;

const PIPI = Math.PI * 2;

function crash(entity) {
    entity.explode();
    Entity.destroy(entity);
}

function attractToPlanet(p) {
    const r2 = Entity.getDistSquared(this, p);

    if (r2 < DIST_MIN_PLANET_GRAVITY2) {
        const forceFactor = this.mass * p.mass / Math.pow(r2, 1.5);

        const dx = p.x - this.x;
        const dy = p.y - this.y;

        this.dx += dx * forceFactor;
        this.dy += dy * forceFactor;

        if (r2 < Planet.DIST_SURFACE2) {
            const landingSpeed           = this.dx * this.dx + this.dy * this.dy;
            let fighterRotation          = this.rotation;
            const correctLandingRotation = Entity.getAngleFromTo(p, this);
            let landingAngleError        = Math.abs(correctLandingRotation - fighterRotation);

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

            const isSoftLanding  = landingSpeed < ERROR_MARGIN_LANDING_SPEED2;
            const isCorrectAngle = landingAngleError < ERROR_MARGIN_LANDING_ROTATION;

            if (isCorrectAngle && isSoftLanding) {
                this.dockPlanet(p);
            } else {
                crash(this);
            }
        }
    }
}

function attractToStar(s) {
    const r2 = Entity.getDistSquared(this, s);

    if (r2 < DIST_MIN_STAR_GRAVITY2) {
        const dx = s.x - this.x;
        const dy = s.y - this.y;

        const forceFactor = this.mass * s.mass / Math.pow(r2, 1.5);

        this.dx += dx * forceFactor;
        this.dy += dy * forceFactor;

        if (r2 < Star.DIST_SURFACE2) {
            crash(this);
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
    if (fighter && !fighter.isDockedPlanet && fighter.hp > 0) {
        const nearest = Entity.getNearest(fighter);

        nearest
            .forEach(attractFighterToStarOrPlanet.bind(fighter));
    }
}

export default function update() {
    Entity.getByType('Fighter')
        .forEach(updateFighter);
}