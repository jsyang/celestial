var Entity   = require('../entity');
var EntityDB = require('../entityDB');
var Random   = require('../random');

var PLab = require('../entity/plab');

var HumanInterface = require('../humanInterface');

function assignFreightersToPlanet(freighters, planet) {
    if (freighters) {
        for (var i = freighters.length - 1; i >= 0; i--) {
            var freighter = freighters[i];
            var isIdle    = !freighter.target || (freighter.target && freighter.target.type !== 'Planet');
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
    return entity.pcolony && entity.plab && !entity.plab.isConstructing;
}

function constructOnRandomPlanet(idleTeamPlanet, type) {
    if (idleTeamPlanet) {
        PLab.orderConstruction(
            Random.arrayElement(idleTeamPlanet).plab,
            type
        );
    }
}

function processTeam(team) {
    var teamPlanet    = EntityDB.getByType('Planet');
    var teamFighter   = EntityDB.getByType('Fighter');
    var teamFreighter = EntityDB.getByType('Freighter');

    var idleTeamPlanet;

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

    if (teamFighter) {
        teamFighter = teamFighter.filter(filterByTeam.bind(null, team));
    }

    if (!HumanInterface.getFocalPoint()) {

        if (teamFighter.length > 0) {
            HumanInterface.setFocalPoint(teamFighter[0]);
        } else {
            constructOnRandomPlanet(idleTeamPlanet, 'Fighter');
        }
    }
}

var STRATEGY_UPDATE_TIMEOUT    = 3000;
var lastTeamStrategyUpdateTime = 0;

function process() {
    var now = Date.now();
    if (now - lastTeamStrategyUpdateTime > STRATEGY_UPDATE_TIMEOUT) {
        // only process 1 team for now: human magenta
        processTeam(Entity.TEAM.MAGENTA);
        lastTeamStrategyUpdateTime = now;
    }
}

module.exports = {
    process : process
};