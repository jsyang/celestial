import Focus from '../Graphics/Focus';
import Input from '../Input/index';
import Entity from '../Entity/index';
import TEAM from '../Entity/_Team';
import Random from '../random';
import {MAX_COORDINATE} from '../constants';
import {createSolarSystem} from './createSolarSystem';
import {createBaseOrInvasionFleet} from './createBaseOrInvasionFleet';

let startingTeams = [
    'BLUE',
    'GREEN',
    'RED',
    'YELLOW'
];

const MIN_STARS = 2;
const MAX_STARS = 5;

function init() {
    const starCount = Random.int(MIN_STARS, MAX_STARS);

    for (let i = 0; i < starCount; i++) {
        const teamStartingLocation = createSolarSystem();

        const newTeam = startingTeams.pop();
        if (newTeam) {
            createBaseOrInvasionFleet(newTeam, teamStartingLocation);
        }
    }

    // Test entities for human player
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
