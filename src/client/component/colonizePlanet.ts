import Entity from '../Entity';
import {playSound} from '../assets/audio';
import HUD from '../GameScreen/HUD';
import {isHumanTeam} from '../constants';

function createPBase(entity) {
    const {planet, team} = entity;

    if (isHumanTeam(team)) {
        playSound('nav');
    }

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

    if (isHumanTeam(team)) {
        playSound('nav');
    }

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

    if (isHumanTeam(team)) {
        playSound('nav');
    }

    planet.spaceport = Entity.create('SpacePort', {
        x: planet.x,
        y: planet.y,
        planet,
        team
    });

    planet.spaceport.enterPlanetOrbit(planet);
    planet.spaceport.orbitRotation = orbitRotation;

    entity.canExplode = false;
    Entity.destroy(entity);
}

const TIME_OFFLOAD_SUPPLY = 600;

const DEFAULTS = {
    /** How long it takes before cargo can be used after reaching orbit **/
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
    const {colonizationTarget, isOrbitingPlanet, planet, team} = entity;

    if (colonizationTarget && isOrbitingPlanet && planet) {
        if (planet.team === team) {
            if (entity.materialsFinished > 0) {
                if (entity.supplyTime === undefined) {
                    entity.supplyTime = TIME_OFFLOAD_SUPPLY;
                } else if (entity.supplyTime > 0) {
                    entity.supplyTime--;
                } else if (entity.supplyTime === 0) {
                    if (!planet.pbase) {
                        createPBase(entity);
                        HUD.displayText(team, 'Colonization successful: PBase secured.');
                    } else if (!planet.pcolony) {
                        createPColony(entity);
                        HUD.displayText(team, 'Colonization successful: Colony secured.');
                    } else if (!planet.spaceport) {
                        createSpacePort(entity);
                        HUD.displayText(team, 'Colonization successful: SpacePort secured.');
                    } else {
                        loadOrDumpSupply(entity);
                        entity.colonizationTarget = null;
                    }
                }
            }
        } else if (!colonizationTarget.isOccupied()) {
            // Plant flag
            colonizationTarget.team = team;
            colonizationTarget.updateFlagColor();
        }
    }
}

export default {
    componentFlag: 'canColonizePlanet',
    DEFAULTS,
    process
}
