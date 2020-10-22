import Component from '../component';

import DB from './_DB';
import EntityGrid from './_EntityGrid';

// Units and Facilities
import Fighter from './Fighter';
import Freighter from './Freighter';
import PBase from './PBase';
import PColony from './PColony';
import PComm from './PComm';
import PLab from './PLab';
import PShield from './PShield';
import Probe from './Probe';
import SensorArray from './SensorArray';
import SpaceDock from './SpaceDock';
import SpacePort from './SpacePort';
import Shield from './Shield';

const gridUnits   = new EntityGrid();
const TYPES_UNITS = {
    Probe,
    PBase,
    PColony,
    PComm,
    PLab,
    PShield,
    SpacePort,
    SpaceDock,
    SensorArray,
    Fighter,
    Freighter,
    Shield
};

// Projectiles
import CannonShot from './CannonShot';
import HeavyCannonShot from './HeavyCannonShot';
import LaserBolt from './LaserBolt';
import HomingMissile from './HomingMissile';
import ClusterRocket from './ClusterRocket';

let projectiles         = [];
const TYPES_PROJECTILES = {
    CannonShot,
    HeavyCannonShot,
    LaserBolt,
    HomingMissile,
    ClusterRocket
};

// Celestial bodies
import Planet from './Planet';
import Star from './Star';
import {getDistSquared} from '../entityHelpers';

let bodies: any    = [];
const TYPES_BODIES = {
    Star,
    Planet
};

const ALL_ENTITIES = {
    ...TYPES_BODIES,
    ...TYPES_UNITS,
    ...TYPES_PROJECTILES
};

const UPDATE_ALL_ENTITIES_SEQUENCE = [
    ...Object.keys(TYPES_BODIES),
    ...Object.keys(TYPES_UNITS),
    ...Object.keys(TYPES_PROJECTILES)
];

// Manage serialization references by unique ids for every entity
let _creationId = 1;

function resetCreationId(newCreationId = 1) {
    _creationId = newCreationId;
}

function create(type, params) {
    let entity;

    // Break any refs to previous params used by other entities
    // by not reusing the params for a previous entity creation
    // even if they're passed in
    params = {...params};

    // Record creation time for serialization / deserialization
    if (!params._creationId) {
        params._creationId = _creationId++;
    }

    if (type in ALL_ENTITIES) {
        entity = new ALL_ENTITIES[type](params);
        Component.init(entity);
        DB.add(entity);

        if (type in TYPES_BODIES) {
            // Celestial bodies are not destroyed during a game
            bodies.push(entity);
        }
    }

    return entity;
}

function update(type: string) {
    const entitiesOfType = DB.getByType(type);
    entitiesOfType && entitiesOfType.forEach(Component.update);
}

function updateAll() {
    UPDATE_ALL_ENTITIES_SEQUENCE.forEach(update);
}

function clearAll() {
    DB.clearAll();

    gridUnits.grid     = [];
    gridUnits.nextGrid = [];

    bodies      = [];
    projectiles = [];
}

const isHPAbove0 = (e: any) => e.hp > 0;

function prepareNext() {
    gridUnits.prepareNext();
    projectiles = projectiles.filter(isHPAbove0);

    // We need to destroy this instance as well to prevent memory leaks
    // https://github.com/pixijs/pixi.js/pull/5544/files
    pixiGraphicsToBeDestroyed.forEach(pGraphics => {
        // Throws an error if not
        if (pGraphics._geometry) {
            pGraphics.destroy();
        }
    });
    pixiGraphicsToBeDestroyed = [];
}

function commit(entity) {
    if (entity.type in TYPES_UNITS) {
        gridUnits.commit(entity);
    }
}

function getBodies() {
    return bodies;
}

function getAbsoluteNearestByBodyType(entity, type) {
    let nearest;
    let nearestDist2 = Infinity;

    bodies
        .filter((body: any) => body.type === type)
        .forEach(body => {
            const dist2 = getDistSquared(entity, body);
            if (dist2 < nearestDist2) {
                nearestDist2 = dist2;
                nearest      = body;
            }
        });

    return nearest;
}

function getNearestEnemyUnit(entity, searchDist2 = Infinity) {
    return gridUnits.getNearestEnemy(entity, searchDist2);
}

function getNearestUnits(entity) {
    return gridUnits.get1CellRadiusAroundEntity(entity);
}

let pixiGraphicsToBeDestroyed: PIXI.Graphics[] = [];

function destroy(entity: any) {
    DB.remove(entity);
    pixiGraphicsToBeDestroyed.push(entity.geo.graphics);
}

export default {
    resetCreationId,
    create,
    updateAll,

    commit,
    prepareNext,
    getBodies,
    getAbsoluteNearestByBodyType,
    getNearestEnemyUnit,
    getNearestUnits,

    clearAll,
    destroy,
    getAll:    DB.getAll,
    getByType: DB.getByType
};
