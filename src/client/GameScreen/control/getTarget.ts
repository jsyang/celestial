import Entity from "../../Entity";
import {isHumanTeam} from '../../constants';

let targetIndex = 0;

const TARGETABLE_TYPES = [
    'Fighter',
    'Freighter',
    'PBase',
    'PColony',
    'PComm',
    'PLab',
    //'SensorArray',
    //'SpacePort',
    'SpaceDock'
].join(',');

const getIsTargetable = e => (
    !isHumanTeam(e.team) &&
    TARGETABLE_TYPES.indexOf(e.type) !== -1
);

export function getTargetNearEntity(entity) {
    const potentialTargets = Entity.getNearestUnits(entity)
        .filter(getIsTargetable);

    targetIndex++;

    if (!potentialTargets[targetIndex]) {
        targetIndex = 0;
    }

    return potentialTargets[targetIndex];
}
