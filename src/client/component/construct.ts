/**
 * Constructs structures that occupy planet surface or orbit
 */

import Entity from '../Entity';

const DEFAULTS = {
    CONSTRUCTION_TIME: 5000,
    constructionTime:  5000
};

// i.e. "Build tree"
const SEQUENCE_BUILD_PRIORITY = [
    {type: 'PLab', cost: 200},
    {type: 'PComm', cost: 300},
    {type: 'SpacePort', cost: 1000, prerequisite: 'PColony'},
    {type: 'SpaceDock', cost: 500, prerequisite: 'SpacePort', occupation: 'SpacePort'},
    {type: 'SensorArray', cost: 500, prerequisite: 'SpacePort', occupation: 'SpacePort'}
];

function build(construction) {
    const {team, planet} = this;


    const planetEntityType = construction.type.toLowerCase();

    let fulfillsPrerequisites = true;

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
                spaceport: this.planet.spaceport,
                planet,
                team
            });
        } else {
            this.planet[planetEntityType] = Entity.create(construction.type, {
                planet,
                team
            });
        }

        this.materialsFinished -= construction.cost;
    }
}

function process(entity) {
    if (entity.materialsFinished > 0) {
        if (entity.constructionTime > 0) {
            entity.constructionTime--;
        } else {
            SEQUENCE_BUILD_PRIORITY.forEach(build.bind(entity));
            entity.constructionTime = entity.CONSTRUCTION_TIME;
        }
    }
}

export default {
    componentFlag: 'canConstruct',
    DEFAULTS,
    process
}
