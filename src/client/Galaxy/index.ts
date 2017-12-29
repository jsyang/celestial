import Random from '../Random';
import {createSolarSystem} from './createSolarSystem';
import {createBaseOrInvasionFleet} from './createBaseOrInvasionFleet';

let startingTeams = [
    'BLUE',
    'GREEN',
    'RED',
    'YELLOW',
    'MAGENTA'
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
}

export default {
    init
}
