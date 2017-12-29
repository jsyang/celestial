import Entity from '../Entity';
import Random from '../Random';
import {MAX_COORDINATE} from '../constants';
import Planet from '../Entity/Planet';
import Star from '../Entity/Star';

const MAX_PLANETS_PER_STAR      = 2;
const CHANCE_STARS_HAVE_PLANETS = 0.8;

// How far stars MUST be away from each other
const MIN_MARGIN_STARS  = 6000;
const MIN_MARGIN_STARS2 = MIN_MARGIN_STARS * MIN_MARGIN_STARS;

function generateStarPosition() {
    return {
        x: Random.float(MIN_MARGIN_STARS, MAX_COORDINATE - MIN_MARGIN_STARS),
        y: Random.float(MIN_MARGIN_STARS, MAX_COORDINATE - MIN_MARGIN_STARS)
    };
}

function isStarDistantFromOtherStars(star) {
    const otherStars = Entity.getByType('Star');

    for (let i = 0; i < otherStars.length; i++) {
        if (otherStars[i] !== star && Entity.getDistSquared(star, otherStars[i]) < MIN_MARGIN_STARS2) {
            return false;
        }
    }

    return true;
}

export function createSolarSystem(): Star | Planet {
    let starPosition;

    do {
        starPosition = generateStarPosition();
    } while (!isStarDistantFromOtherStars(starPosition));

    const star = Entity.create('Star', starPosition);

    let startingLocation = star;

    if (Random.float(0, 1) < CHANCE_STARS_HAVE_PLANETS) {
        const planetCount = Random.int(1, MAX_PLANETS_PER_STAR);

        for (let j = 0; j < planetCount; j++) {
            startingLocation = Entity.create('Planet', {
                star,
                orbitDistance: 1600 + j * Random.int(2, 5) * 800,
                orbitRotation: Random.float(-Math.PI, Math.PI)
            });
        }
    }

    return startingLocation;
}
