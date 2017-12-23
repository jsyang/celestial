import Entity from '../Entity';
import Random from '../random';

function assignFreightersToPlanet(freighters, planet) {
    if (freighters) {
        for (let i = freighters.length - 1; i >= 0; i--) {
            const freighter = freighters[i];
            const isIdle    = (!freighter.isOrbitingPlanet && !freighter.target) || (freighter.target && freighter.target.type !== 'Planet');
            if (isIdle) {
                freighter.target = planet;
                freighter.planet = undefined;
                break;
            }
        }
    }
}

function filterByNoPBaseOrPColony(entity) {
    return !entity.pbase || !entity.pcolony;
}

function filterByTeam(team, entity) {
    return entity.team === team;
}

function filterByIdlePLab(entity) {
    return entity.pcolony && entity.plab && !entity.plab.isManufacturing;
}

function constructOnRandomPlanet(idleTeamPlanet, type) {
    if (idleTeamPlanet) {
        const plab = Random.arrayElement(idleTeamPlanet).plab;
        if (plab) {
            plab.orderManufacture(type);
        }
    }
}

function processTeam(team) {
    const selectOnlyCurrentTeam = filterByTeam.bind(null, team);

    let teamPlanet    = Entity.getByType('Planet').filter(selectOnlyCurrentTeam);
    let teamFreighter = Entity.getByType('Freighter').filter(selectOnlyCurrentTeam);

    let idleTeamPlanet;

    if (teamFreighter) {
        teamFreighter = teamFreighter.filter(filterByTeam.bind(null, team));
    }

    if (teamPlanet) {
        teamPlanet = teamPlanet.filter(filterByTeam.bind(null, team));

        teamPlanet
            .filter(filterByNoPBaseOrPColony)
            .forEach(assignFreightersToPlanet.bind(null, teamFreighter));

        idleTeamPlanet = teamPlanet.filter(filterByIdlePLab);
        idleTeamPlanet = idleTeamPlanet.length > 0 ? idleTeamPlanet : undefined;

        if (teamFreighter && teamPlanet.length > teamFreighter.length) {
            constructOnRandomPlanet(idleTeamPlanet, 'Freighter');
        }
    }

    const fighters = Entity.getByType('Fighter').filter(selectOnlyCurrentTeam);

    if (fighters.length === 0) {
        constructOnRandomPlanet(idleTeamPlanet, 'Fighter');
    }
}

const STRATEGY_UPDATE_TIMEOUT  = 3000;
let lastTeamStrategyUpdateTime = 0;

export default function update() {
    let now = Date.now();
    if (now - lastTeamStrategyUpdateTime > STRATEGY_UPDATE_TIMEOUT) {
        // only process 1 team for now: human magenta
        processTeam(Entity.TEAM.MAGENTA);
        lastTeamStrategyUpdateTime = now;
    }
}
