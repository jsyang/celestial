import Graphics from '../Graphics';
import Component from '../component';

import DB from './_DB';
import Team from './_Team';
import Grid from './_Grid';

import Fighter from './Fighter';
import Freighter from './Fighter';
import PBase from './PBase';
import PColony from './PColony';
import PComm from './PComm';
import PLab from './PLab';
import Planet from './Planet';
import Probe from './Probe';
import SensorArray from './SensorArray';
import Shot from './Shot';
import SpaceDock from './SpaceDock';
import SpacePort from './SpacePort';
import Star from './Star';

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
    Shot,
    SpaceDock,
    SpacePort,
    Star
};

const UPDATE_ALL_ENTITIES_SEQUENCE = [
    'Star',
    'Planet',
    'PBase',
    'PColony',
    'PComm',
    'PLab',
    'SpacePort',
    'SpaceDock',
    'SensorArray',
    'Fighter',
    'Freighter',
    'Shot',
// 'Probe',
];

function create(type, params) {
    let entity;

    if (type in ALL_ENTITIES) {
        entity = new ALL_ENTITIES[type](params);
        Component.init(entity);
        DB.add(entity);

        Graphics.addChild(entity.geo.graphics);
    }

    return entity;
}

export function getDistSquared(e1, e2) {
    const dx = e2.x - e1.x;
    const dy = e2.y - e1.y;
    return dx * dx + dy * dy;
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

const getTeamColor = team => Team._COLORS[team];

export default {
    create,
    updateAll,

    commit:      Grid.commit,
    prepareNext: Grid.prepareNext,
    getNearest:  Grid.getNearest,

    destroy:                  DB.remove,
    getByType:                DB.getByType,
    getAbsoluteNearestByType: DB.getAbsoluteNearestByType,

    getTeamColor,
    getDistSquared,
    getAngleFromTo,

    TEAM: Team
};