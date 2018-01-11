import Component from '../component';

import DB from './_DB';
import TEAM from './TEAM';
import EntityGrid from './EntityGrid';

// Units and Facilities
import Fighter from './Fighter';
import Freighter from './Freighter';
import PBase from './PBase';
import PColony from './PColony';
import PComm from './PComm';
import PLab from './PLab';
import Probe from './Probe';
import SensorArray from './SensorArray';
import SpaceDock from './SpaceDock';
import SpacePort from './SpacePort';

const gridUnits   = new EntityGrid();
const TYPES_UNITS = [
    'PBase',
    'PColony',
    'PComm',
    'PLab',
    'SpacePort',
    'SpaceDock',
    'SensorArray',
    'Fighter',
    'Freighter'
];

// Celestial bodies
import Planet from './Planet';
import Star from './Star';

const gridBodies   = new EntityGrid();
const TYPES_BODIES = [
    'Star',
    'Planet'
];

// Projectiles
import CannonShot from './CannonShot';
import HeavyCannonShot from './HeavyCannonShot';
import LaserBolt from './LaserBolt';
import HomingMissile from './HomingMissile';
import ClusterRocket from './ClusterRocket';

const gridProjectiles   = new EntityGrid();
const TYPES_PROJECTILES = [
    'CannonShot',
    'HeavyCannonShot',
    'LaserBolt',
    'HomingMissile',
    'ClusterRocket'
];

const ALL_ENTITIES = {
    Fighter,
    Freighter,
    PBase,
    PColony,
    PComm,
    PLab,
    Planet,
    Probe,
    SensorArray,
    SpaceDock,
    SpacePort,
    Star,
    CannonShot,
    HeavyCannonShot,
    ClusterRocket,
    LaserBolt,
    HomingMissile
};

const UPDATE_ALL_ENTITIES_SEQUENCE = [
    ...TYPES_BODIES,
    ...TYPES_UNITS,
    ...TYPES_PROJECTILES
];

function create(type, params) {
    let entity;

    if (type in ALL_ENTITIES) {
        entity = new ALL_ENTITIES[type](params);
        Component.init(entity);
        DB.add(entity);
    }

    return entity;
}

export function getDistSquared(e1, e2) {
    const dx = e2.x - e1.x;
    const dy = e2.y - e1.y;
    return dx ** 2 + dy ** 2;
}

export function getAngleFromTo(e1, e2) {
    const dx = e2.x - e1.x;
    const dy = e2.y - e1.y;
    return Math.atan2(dy, dx);
}

function update(type: string) {
    const entitiesOfType = DB.getByType(type);
    entitiesOfType && entitiesOfType.forEach(Component.update);
}

function updateAll() {
    UPDATE_ALL_ENTITIES_SEQUENCE.forEach(update);
}

const getTeamColor = team => TEAM._COLORS[team];

function clearAll() {
    EntityGrid.prepareNext();
    EntityGrid.prepareNext();
    EntityGrid.prepareNext();
    EntityGrid.prepareNext();
    DB.clearAll();
}

export default {
    create,
    updateAll,

    commit:                EntityGrid.commit,
    prepareNext:           EntityGrid.prepareNext,
    getNearest:            EntityGrid.getNearest,
    getNearestEnemyTarget: EntityGrid.getNearestEnemyTarget,

    clearAll,
    destroy:                  DB.remove,
    getByType:                DB.getByType,
    getAbsoluteNearestByType: DB.getAbsoluteNearestByType,

    getTeamColor,
    getDistSquared,
    getAngleFromTo,
    TEAM
};