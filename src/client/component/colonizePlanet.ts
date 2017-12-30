import Entity from '../Entity';
import {playSound} from '../assets/audio';

function createPBase(entity) {
    const {planet, team} = entity;

    playSound('nav');

    planet.pbase = Entity.create('PBase', {
        x: planet.x,
        y: planet.y,
        planet,
        team
    });

    entity.canExplode = false;
    Entity.destroy(entity);
}

function createPColony(entity) {
    const {planet, team} = entity;

    playSound('nav');

    planet.pcolony = Entity.create('PColony', {
        x: planet.x,
        y: planet.y,
        planet,
        team
    });

    entity.canExplode = false;
    Entity.destroy(entity);
}

function createSpacePort(entity) {
    const {planet, team, orbitRotation} = entity;

    playSound('nav');

    planet.spaceport = Entity.create('SpacePort', {
        x: planet.x,
        y: planet.y,
        orbitRotation,
        planet,
        team
    });

    planet.spaceport.enterPlanetOrbit(planet);

    entity.canExplode = false;
    Entity.destroy(entity);
}

const DEFAULTS = {
    /** How long it takes before cargo can be used after reaching orbit **/
    TIME_OFFLOAD_SUPPLY:    200,
    MAX_MATERIALS_FINISHED: 500,
    colonizationTarget:     null
};

function loadOrDumpSupply(entity) {
    const {pbase} = entity.planet;

    if (pbase.materialsFinished === 0) {
        pbase.materialsFinished += entity.materialsFinished;
        entity.materialsFinished = 0;

        let diffMaterials = 0;
        if (pbase.materialsFinished > pbase.MAX_FINISHED_MATERIALS) {
            diffMaterials            = pbase.materialsFinished - pbase.MAX_FINISHED_MATERIALS;
            pbase.materialsFinished  = pbase.MAX_MATERIALS_FINISHED;
            entity.materialsFinished = diffMaterials;
            entity.unloadSupply();
        } else {
            entity.canExplode = false;
            Entity.destroy(entity);
        }

    } else if (entity.planet.materialsFinished > 0 && entity.materialsFinished < entity.MAX_MATERIALS_FINISHED) {
        let materialsToLoad = entity.MAX_MATERIALS_FINISHED - entity.materialsFinished;
        if (materialsToLoad >= entity.planet.materialsFinished) {
            entity.materialsFinished += entity.planet.materialsFinished;
            entity.planet.materialsFinished = 0;
        } else {
            entity.materialsFinished += materialsToLoad;
            entity.planet.materialsFinished -= materialsToLoad;
        }

        entity.loadSupply();
    }
}

/**
 * Constructs PBase and PColony on friendly planet if neither exists
 * Supplies friendly planet with finished materials if no construction required
 */
function process(entity) {
    if (entity.colonizationTarget && entity.isOrbitingPlanet && entity.planet) {
        if (entity.materialsFinished > 0) {
            if (entity.supplyTime === undefined) {
                entity.supplyTime = entity.TIME_OFFLOAD_SUPPLY;
            } else if (entity.supplyTime > 0) {
                entity.supplyTime--;
            } else if (entity.supplyTime === 0) {
                if (!entity.planet.pbase) {
                    createPBase(entity);
                } else if (!entity.planet.pcolony) {
                    createPColony(entity);
                } else if (!entity.planet.spaceport) {
                    createSpacePort(entity);
                } else {
                    loadOrDumpSupply(entity);
                    entity.colonizationTarget = null;
                }
            }
        }
    }
}

export default {
    componentFlag: 'canColonizePlanet',
    DEFAULTS,
    process
}
