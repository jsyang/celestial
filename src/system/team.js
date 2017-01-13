var Entity   = require('../entity');
var EntityDB = require('../entityDB');

function assignFreightersToPlanet(team, planet) {
    var freighters = EntityDB.getByType('Freighter');
    if (freighters) {
        for (var i = freighters.length - 1; i >= 0; i--) {
            var freighter = freighters[i];
            if (freighter.team === team && !freighter.target) {
                freighter.target = planet;
                freighter.planet = undefined;
            }
        }
    }
}

function filterPlanetByTeamAndNoPBase(team, planet) {
    return planet.team === team && !planet.pbase;
}

function processTeam(team) {
    var planets = EntityDB.getByType('Planet');
    planets
        .filter(filterPlanetByTeamAndNoPBase.bind(null, team))
        .forEach(assignFreightersToPlanet.bind(null, team));
}

var STRATEGY_UPDATE_TIMEOUT    = 2000;
var lastTeamStrategyUpdateTime = 0;

function process() {
    var now = Date.now();
    if (now - lastTeamStrategyUpdateTime > STRATEGY_UPDATE_TIMEOUT) {
        processTeam(Entity.TEAM.MAGENTA);
        lastTeamStrategyUpdateTime = now;
    }
}

module.exports = {
    process : process
};