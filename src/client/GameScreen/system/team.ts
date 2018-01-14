import Entity from '../../Entity';
import GameScreenControl from '../control';
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

function repairRearmWhenDocked(fighter) {
    const {planet, isDockedPlanet, team, isDockedSpacePort, reload_HomingMissile, reload_ClusterRocket, reload_LaserBolt} = fighter;

    if (isDockedSpacePort) {
        // Repair
        if (fighter.hp < fighter.maxHp) {
            playSound('repaired');
            fighter.hp = fighter.maxHp;
        }

        // Re-arm
        reload_HomingMissile && fighter.reload_HomingMissile(false);
        reload_ClusterRocket && fighter.reload_ClusterRocket(false);
        reload_LaserBolt && fighter.reload_LaserBolt(false);

    } else if (isDockedPlanet && team === planet.team && planet.isOccupied()) {
        // Re-arm
        reload_HomingMissile && fighter.reload_HomingMissile();
        reload_ClusterRocket && fighter.reload_ClusterRocket();
        reload_LaserBolt && fighter.reload_LaserBolt();

        // Repair
        if (fighter.hp < fighter.maxHp) {
            playSound('repaired');
            fighter.hp += 0.5;
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
    const friendlyOnly = (e: any) => e.team === team;
    const enemyOnly    = (e: any) => e.team !== team;

    let teamPlanet    = Entity.getByType('Planet').filter(friendlyOnly);
    let teamPColony   = Entity.getByType('PColony').filter(friendlyOnly);
    let teamFreighter = Entity.getByType('Freighter').filter(friendlyOnly);
    const teamFighter = Entity.getByType('Fighter').filter(friendlyOnly);

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

    // Construct wingmen
    if (teamFighter.length < teamPlanet.length) {
        constructOnRandomPlanet(idleTeamPlanet, 'Fighter');
    }

    if (teamFighter.length > 0) {
        let fighter: any = Random.arrayElement(teamFighter);

        // Human control
        if (team === Entity.TEAM.MAGENTA) {
            if (!GameScreenControl.getControlledEntity()) {
                fighter = teamFighter.filter(f => f.isDockedPlanet || f.isDockedSpacePort || !f.isFighterAutoAccelerated)[0];

                if (fighter) {
                    fighter.isFighterAutoAccelerated = false;
                    GameScreenControl.setControlledEntity(fighter);
                    Focus.setFocus(fighter);
                    Starfield.init();
                }
            }
        }

        // Attack if idle
        if (fighter && !fighter.attackTarget && fighter.isFighterAutoAccelerated) {
            const whichAttackType = Math.random();
            let potentialTarget;

            if (whichAttackType < 0.1) {
                potentialTarget = Random.arrayElement(Entity.getByType('Freighter').filter(enemyOnly));
            } else if (whichAttackType < 0.3) {
                potentialTarget = Random.arrayElement(Entity.getByType('PBase').filter(enemyOnly));
            }

            if (potentialTarget) {
                fighter.attackTarget = potentialTarget;
            }
        }
    }

    teamFighter.forEach(repairRearmWhenDocked);

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