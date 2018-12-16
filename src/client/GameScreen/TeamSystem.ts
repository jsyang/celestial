import Entity from '../Entity/index';
import GameScreenControl from './control/index';
import Random from '../Random';
import Focus from '../Graphics/Focus';
import {playSound} from '../assets/audio';
import HUD from './HUD';
import {isHumanTeam, TEAM} from '../constants';
import {getDistSquared} from '../entityHelpers';

let humanTeamHomePlanet;

function assignFreightersToPlanet(freighters, planet) {
    let isNewColonizationTarget = false;

    if (freighters.length > 0) {
        for (let i = freighters.length - 1; i >= 0; i--) {
            const freighter = freighters[i];
            const isIdle    = !Boolean(freighter.colonizationTarget);

            if (isIdle) {
                if (freighter.isOrbitingPlanet) {
                    freighter.exitPlanetOrbit();
                }

                freighter.colonizationTarget = planet;
                isNewColonizationTarget      = true;
                break;
            }
        }

        if (isNewColonizationTarget) {
            HUD.displayText(freighters[0].team, 'Freighter fleet heading towards target.');
        }
    }
}

function filterByNoPBaseOrPColony(entity) {
    return !entity.pbase || !entity.pcolony;
}

function filterByIdlePColony(entity) {
    return entity.pcolony && !entity.pcolony.isManufacturing;
}

function constructOnRandomPlanet(team, idleTeamPlanet, type) {
    if (idleTeamPlanet) {
        let pcolony;

        // Attempt to manufacture on home planet for humans
        if (isHumanTeam(team) && humanTeamHomePlanet) {
            const preferredPColony = humanTeamHomePlanet.pcolony;
            if (preferredPColony && !preferredPColony.isManufacturing) {
                pcolony = preferredPColony;
            }
        }

        if (!pcolony) {
            pcolony = Random.arrayElement(idleTeamPlanet).pcolony;
        }

        if (pcolony) {
            pcolony.orderManufacture(type);
        }
    }
}

function repairRearmWhenDocked(fighter) {
    const {planet, isDockedPlanet, team, isDockedSpacePort, reload_HomingMissile, reload_ClusterRocket, reload_LaserBolt} = fighter;
    let isHumanTeamRepair                                                                                                 = false;

    if (isDockedSpacePort) {
        // Repair
        if (fighter.hp < fighter.maxHp) {
            isHumanTeamRepair = isHumanTeam(team);
            fighter.hp        = fighter.maxHp;
            HUD.displayText(fighter.team, 'Fully repaired.');
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
            isHumanTeamRepair = isHumanTeam(team);
            fighter.hp += 0.5;
            HUD.displayText(fighter.team, `Repairing: ${Math.round(fighter.hp / fighter.maxHp * 100)}%`);
        }
    }

    if (isHumanTeamRepair) {
        playSound('repaired');
    }
}

function colonizeNearestPlanet(freighter) {
    if (freighter.colonizationTarget) return;

    let nearestPlanet, nearestDist2 = Infinity;

    Entity.getByType('Planet')
        .forEach(planet => {
            const dist2 = getDistSquared(freighter, planet);

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

function sortByDockedToHomePlanet(f1, f2) {
    const preferF1: any = f1.planet === humanTeamHomePlanet ||
        (f1.spaceport && f1.spaceport.planet === humanTeamHomePlanet);

    const preferF2: any = f2.planet === humanTeamHomePlanet ||
        (f2.spaceport && f2.spaceport.planet === humanTeamHomePlanet);

    return (preferF2 >> 0) - (preferF1 >> 0);
}

function clearHumanTeamPlanetIfNotInTeam() {
    if (humanTeamHomePlanet && !isHumanTeam(humanTeamHomePlanet.team)) {
        humanTeamHomePlanet = null;
    }
}

function processTeam(team) {
    const friendlyOnly               = (e: any) => e.team === team;
    const enemyOnly                  = (e: any) => e.team !== team;
    const unoccupiedEnemyPlanetsOnly = (e: any) => e.type === 'Planet' && enemyOnly(e) && !e.isOccupied();

    let teamPlanet    = Entity.getByType('Planet').filter(friendlyOnly);
    let teamPColony   = Entity.getByType('PColony').filter(friendlyOnly);
    let teamFreighter = Entity.getByType('Freighter').filter(friendlyOnly);
    const teamFighter = Entity.getByType('Fighter').filter(friendlyOnly);

    let idleTeamPlanet;

    idleTeamPlanet = teamPlanet.filter(filterByIdlePColony);
    idleTeamPlanet = idleTeamPlanet.length > 0 ? idleTeamPlanet : undefined;

    if (teamPlanet.length === 0 && teamFreighter.length > 0) {
        teamFreighter.forEach(colonizeNearestPlanet);

    } else {
        teamPlanet
            .filter(filterByNoPBaseOrPColony)
            .forEach(assignFreightersToPlanet.bind(null, teamFreighter));
    }

    // Construct wingmen
    if (teamFighter.length < teamPlanet.length) {
        constructOnRandomPlanet(team, idleTeamPlanet, 'Fighter');
    }

    if (teamFighter.length > 0) {
        let fighter: any = Random.arrayElement(teamFighter);

        // Human control
        if (isHumanTeam(team)) {
            clearHumanTeamPlanetIfNotInTeam();

            if (!GameScreenControl.getControlledEntity()) {
                fighter = teamFighter.filter(f => !f.isFighterAutoAccelerated || (!f.attackTarget && (f.planet || f.spaceport))).sort(sortByDockedToHomePlanet)[0];

                if (fighter) {
                    GameScreenControl.setControlledEntity(fighter);
                    GameScreenControl.setControlToHuman();
                    Focus.setFocus(fighter);
                }
            }
        }

        // Attack if idle
        if (fighter && !fighter.attackTarget && fighter.isFighterAutoAccelerated) {
            const whichAttackType = Math.random();
            let potentialTarget;
            let messageText;

            if (whichAttackType < 0.1) {
                potentialTarget = Random.arrayElement(Entity.getByType('Freighter').filter(enemyOnly));
                messageText     = 'Friendly Fighter targeting enemy Freighter!';

            } else if (whichAttackType < 0.3) {
                potentialTarget = Random.arrayElement(Entity.getByType('PBase').filter(enemyOnly));
                messageText     = 'Friendly Fighter targeting enemy base!';

            } else if (whichAttackType < 0.5) {
                potentialTarget = Random.arrayElement(Entity.getBodies().filter(unoccupiedEnemyPlanetsOnly));
                messageText     = 'Friendly Fighter moving to secure planet!';
            }

            if (potentialTarget) {
                fighter.attackTarget = potentialTarget;
                HUD.displayText(team, messageText);
            }
        }
    }

    teamFighter
        .forEach(repairRearmWhenDocked);

    if (teamPlanet.length > teamFreighter.length) {
        constructOnRandomPlanet(team, idleTeamPlanet, 'Freighter');
    }

    if (teamPColony.length === 0 && teamFighter.length === 0 && teamFreighter.length === 0) {
        teamsRemaining = teamsRemaining.filter(t => t !== team);
        onTeamLost(team);
    }
}

function setHumanTeamHomePlanet(planet) {
    playSound('install');
    humanTeamHomePlanet = planet;
}

function setHumanFightersTarget(attackTarget) {
    Entity.getByType('Fighter')
        .forEach(e => {
            if (isHumanTeam(e.team)) {
                e.attackTarget = attackTarget;
            }
        });

    playSound('alert');
    HUD.displayText(TEAM.MAGENTA, 'All fighters attacking your target!');
}

const STRATEGY_UPDATE_TIMEOUT  = 3000;
let lastTeamStrategyUpdateTime = 0;

const TEAMS = [
    TEAM.GREEN,
    TEAM.BLUE,
    TEAM.YELLOW,
    TEAM.RED,
    TEAM.MAGENTA
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
    // If loading a previous game ensure this
    // system is in sync with loaded game state
    const allEntities = Entity.getAll();
    if (allEntities.length > 0) {
        teamsRemaining = new Set(allEntities.map((e: any) => e.team));
        teamsRemaining = [...teamsRemaining].filter(t => t > -1);
    } else {
        teamsRemaining = [...TEAMS];
    }
}

export default {
    init,
    update,
    setHumanFightersTarget,
    setHumanTeamHomePlanet,
    setOnTeamLostCallback,
    setOnTeamWinCallback
}