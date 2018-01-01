import Entity from '../../Entity/index';
import Input from '../../Input/index';
import Random from '../../Random';
import Focus from '../../Graphics/Focus';
import Starfield from '../../Graphics/Starfield';

function assignFreightersToPlanet(freighters, planet) {
    if (freighters) {
        for (let i = freighters.length - 1; i >= 0; i--) {
            const freighter = freighters[i];
            const isIdle    = !Boolean(freighter.colonizationTarget);

            if (isIdle) {
                if (freighter.isOrbitingPlanet) {
                    freighter.exitPlanetOrbit();
                }

                freighter.colonizationTarget = planet;
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
    let teamPColony   = Entity.getByType('PColony').filter(selectOnlyCurrentTeam);
    let teamFreighter = Entity.getByType('Freighter').filter(selectOnlyCurrentTeam);
    const teamFighter = Entity.getByType('Fighter').filter(selectOnlyCurrentTeam);

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


    if (teamFighter.length === 0) {
        constructOnRandomPlanet(idleTeamPlanet, 'Fighter');

    } else if (team === Entity.TEAM.MAGENTA && !Input.hasControlledEntity()) {
        const firstFighter = teamFighter[0];

        Input.setControlledEntity(firstFighter);
        Focus.setFocus(firstFighter);
        Starfield.init();
    }

    if (teamPColony.length === 0 && teamFighter.length === 0 && teamFreighter.length === 0) {
        teamsRemaining = teamsRemaining.filter(t => t !== team);
        onTeamLost(team);
    }
}


const STRATEGY_UPDATE_TIMEOUT  = 3000;
let lastTeamStrategyUpdateTime = 0;

const TEAMS = [
    Entity.TEAM.GREEN,
    Entity.TEAM.BLUE,
    Entity.TEAM.YELLOW,
    Entity.TEAM.RED,
    Entity.TEAM.MAGENTA
];

let teamsRemaining;

function update() {
    const now = Date.now();

    if (now - lastTeamStrategyUpdateTime > STRATEGY_UPDATE_TIMEOUT) {
        teamsRemaining.forEach(processTeam);

        // Everyone else has lost
        if (teamsRemaining.length === 1) {
            onTeamWin(teamsRemaining[0]);
        }

        lastTeamStrategyUpdateTime = now;
    }
}

let onTeamLost              = new Function();
let onTeamWin               = new Function();
const setOnTeamLostCallback = cb => onTeamLost = cb;
const setOnTeamWinCallback = cb => onTeamWin = cb;

function init() {
    teamsRemaining = [...TEAMS];
}

export default {
    init,
    update,
    setOnTeamLostCallback,
    setOnTeamWinCallback
}