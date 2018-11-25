import Entity from "../../Entity";
import {isHumanTeam} from '../../constants';
import {playSound} from '../../assets/audio';

let targetIndex = 0;

const TARGETABLE_TYPES = [
    'Fighter',
    'Freighter',
    'PBase',
    'PColony',
    'PComm',
    'PLab',
    //'SensorArray' // SpacePort child
    //'SpaceDock' // SpacePort child
    'SpacePort'
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

    const newTarget = potentialTargets[targetIndex];

    if (newTarget) {
        playSound('bopp');
    }

    return newTarget;
}
