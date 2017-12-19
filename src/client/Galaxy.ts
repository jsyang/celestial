import Focus from './Graphics/Focus';
import Input from './Input';
import Entity from './Entity';
import TEAM from './Entity/_Team';
import Random from './Random';
import {MAX_COORDINATE} from './constants';

const MIN_STARS                 = 2;
const MAX_STARS                 = 5;
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

let teamIsNotInitialized = [
    'BLUE',
    'GREEN',
    'RED',
    'YELLOW'
];

function createPBaseOrInvasionFleet(teamName, startingLocation) {
    const team = TEAM[teamName];

    if (startingLocation.type === 'Star') {
        // Create an invasion fleet if no planet is given
        Entity.create('Freighter', {
            x:                 startingLocation.x + Random.int(-100, 100),
            y:                 startingLocation.y + Random.int(-100, 100),
            team,
            isOrbitingPlanet:  false,
            materialsFinished: 500
        });

    } else {
        const pbase = Entity.create('PBase', {
            team,
            planet: startingLocation
        });

        startingLocation.pbase = pbase;
        startingLocation.team  = team;
        startingLocation.updateFlagColor();
    }
}

function createSolarSystem() {
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

    const uninitializedTeam = teamIsNotInitialized.shift();

    if (uninitializedTeam) {
        createPBaseOrInvasionFleet(uninitializedTeam, startingLocation);
    }
}

/**
 * Create a game field with some Stars and Planets orbiting them
 */
function init() {
    const starCount = Random.int(MIN_STARS, MAX_STARS);

    for (let i = 0; i < starCount; i++) {
        createSolarSystem();
    }

    // Test entities
    const fighter = Entity.create('Fighter', {
        x:        Random.int(0, MAX_COORDINATE),
        y:        Random.int(0, MAX_COORDINATE),
        rotation: Random.float(-Math.PI, Math.PI),
        team:     TEAM.MAGENTA
    });

    Entity.create('Freighter', {
        x:                 fighter.x + Random.int(-100, 100),
        y:                 fighter.y + Random.int(-100, 100),
        target:            fighter,
        team:              TEAM.MAGENTA,
        isOrbitingPlanet:  false,
        materialsFinished: 500
    });

    Entity.create('Freighter', {
        x:                 fighter.x + Random.int(-100, 100),
        y:                 fighter.y + Random.int(-100, 100),
        target:            fighter,
        team:              TEAM.MAGENTA,
        isOrbitingPlanet:  false,
        materialsFinished: 500
    });

    Focus.setFocus(fighter);
    Input.setControlledEntity(fighter);
}

export default {
    init
}
