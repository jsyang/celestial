var Entity = require('../entity');

var DEFAULTS = {
    CONSTRUCTION_TIME : 100,
    constructionTime  : 100
};

// i.e. "Build tree"
var SEQUENCE_BUILD_PRIORITY = [
    { type : 'PLab', cost : 200 },
    { type : 'PComm', cost : 300 },
    { type : 'SpacePort', cost : 1000, prerequisite : 'PColony' },
    { type : 'SpaceDock', cost : 500, prerequisite : 'SpacePort', occupation : 'SpacePort' },
    { type : 'SensorArray', cost : 500, prerequisite : 'SpacePort', occupation : 'SpacePort' }
];

function build(construction) {
    if (this.constructionTime > 0) {
        this.constructionTime--;
    } else {
        var planetEntityType      = construction.type.toLowerCase();
        var fulfillsPrerequisites = true;

        if (construction.prerequisite) {
            fulfillsPrerequisites = Boolean(
                this.planet[construction.prerequisite.toLowerCase()]
            );
        }

        if (!this.planet[planetEntityType] &&
            this.materialsFinished >= construction.cost &&
            fulfillsPrerequisites) {

            if (construction.occupation === 'SpacePort') {
                this.planet[planetEntityType] = Entity.create(construction.type, {
                    spaceport : this.planet.spaceport,
                    team      : this.team
                });
            } else {
                this.planet[planetEntityType] = Entity.create(construction.type, {
                    planet : this.planet,
                    team   : this.team
                });
            }

            this.materialsFinished -= construction.cost;
            this.constructionTime = this.CONSTRUCTION_TIME;
        }
    }
}

/**
 * Constructs structures that occupy planet surface or orbit
 * @param {object} entity
 */
function process(entity) {
    if (entity.materialsFinished > 0) {
        SEQUENCE_BUILD_PRIORITY.forEach(build.bind(entity));
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};