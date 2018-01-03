import Entity from '../../Entity/index';
import Input from '../../Input/index';
import Random from '../../Random';
import Focus from '../../Graphics/Focus';
import Starfield from '../../Graphics/Starfield';
import {playSound} from '../../assets/audio';

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

function filterByIdlePColony(entity) {
    return entity.pcolony && !entity.pcolony.isManufacturing;
}

function constructOnRandomPlanet(idleTeamPlanet, type) {
    if (idleTeamPlanet) {
        const pcolony = Random.arrayElement(idleTeamPlanet).pcolony;

        if (pcolony) {
            pcolony.orderManufacture(type);
        }
    }
}

function repairRearmWhenDockedToOccupiedPlanet(fighter) {
    const {planet, isDockedPlanet, team} = fighter;
    if (isDockedPlanet && team === planet.team && planet.isOccupied()) {
        const {reload_HomingMissile, reload_ClusterRocket, reload_LaserBolt} = fighter;

        // Re-arm
        reload_HomingMissile && fighter.reload_HomingMissile();
        reload_ClusterRocket && fighter.reload_ClusterRocket();
        reload_LaserBolt && fighter.reload_LaserBolt();

        // Repair
        if (fighter.hp < fighter.maxHp) {
            playSound('repaired');
            fighter.hp = fighter.maxHp;
        }
    }
}

function colonizeNearestPlanet(freighter) {
    if (freighter.colonizationTarget) return;

    let nearestPlanet, nearestDist2 = Infinity;

    Entity.getByType('Planet')
        .forEach(planet => {
            const dist2 = Entity.getDistSquared(freighter, planet);

            if (nearestDist2 > dist2) {
                nearestPlanet = planet;
                nearestDist2  = dist2;
            }
        });

    if (nearestPlanet) {
        freighter.exitPlanetOrbit();
        freighter.colonizationTarget = nearestPlanet;
    }
}

function processTeam(team) {
    const selectOnlyCurrentTeam = filterByTeam.bind(null, team);

    let teamPlanet    = Entity.getByType('Planet').filter(selectOnlyCurrentTeam);
    let teamPColony   = Entity.getByType('PColony').filter(selectOnlyCurrentTeam);
    let teamFreighter = Entity.getByType('Freighter').filter(selectOnlyCurrentTeam);
    const teamFighter = Entity.getByType('Fighter').filter(selectOnlyCurrentTeam);

    let idleTeamPlanet;

    idleTeamPlanet = teamPlanet.filter(filterByIdlePColony);
    idleTeamPlanet = idleTeamPlanet.length > 0 ? idleTeamPlanet : undefined;

    if (teamPlanet.length > teamFreighter.length) {
        constructOnRandomPlanet(idleTeamPlanet, 'Freighter');
    }

    if (teamPlanet.length === 0 && teamFreighter.length > 0) {
        teamFreighter.forEach(colonizeNearestPlanet);

    } else {
        teamPlanet
            .filter(filterByNoPBaseOrPColony)
            .forEach(assignFreightersToPlanet.bind(null, teamFreighter));
    }

    if (teamFighter.length === 0) {
        constructOnRandomPlanet(idleTeamPlanet, 'Fighter');

    } else if (team === Entity.TEAM.MAGENTA && !Input.hasControlledEntity()) {
        const firstFighter = teamFighter[0];

        Input.setControlledEntity(firstFighter);
        Focus.setFocus(firstFighter);
        Starfield.init();
    }

    teamFighter.forEach(repairRearmWhenDockedToOccupiedPlanet);

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