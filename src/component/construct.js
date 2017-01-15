var Entity = require('../entity');

var DEFAULTS = {
    CONSTRUCTION_TIME : 200
};

// "Build tree"
var SEQUENCE_BUILD_PRIORITY = [
    { type : 'PLab', cost : 100 },
    { type : 'PComm', cost : 200 }
];

function build(construction) {
    if (this.constructionTime > 0) {
        this.constructionTime--;
    } else {
        var planetEntityType = construction.type.toLowerCase();
        if (!this.planet[planetEntityType] && this.materialsFinished >= construction.cost) {
            this.planet[planetEntityType] = Entity.create(construction.type, {
                planet : this.planet,
                team   : this.team
            });

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