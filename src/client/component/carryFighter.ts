import {playSound} from '../assets/audio';
import Entity from '../Entity';
import {testPointInEntity} from '../Geometry';
import {isHumanTeam} from '../constants';

const DEFAULTS = {
    fighter:           null,
    isCarryingFighter: false
};

// Fighter must approach dock under this speed to successfully be caught
const DOCK_SPEED_MAX2 = 7 ** 2;

function catchFighter(fighter): boolean {
    const {dx, dy, type, team, canDockSpacePort} = fighter;

    if (type === 'Fighter' && team === this.team && canDockSpacePort && testPointInEntity(this, fighter)) {
        const speed2 = dx ** 2 + dy ** 2;

        if (speed2 <= DOCK_SPEED_MAX2) {
            if (isHumanTeam(team)) {
                playSound('repaired');
            }
            fighter.dockSpacePort(this);
            return true;
        }
    }

    return false;
}

function process(entity) {
    if (!entity.isCarryingFighter) {
        Entity.getNearestUnits(entity)
            .some(catchFighter.bind(entity));
    }
}

export default {
    componentFlag: 'canCarryFighter',
    DEFAULTS,
    process
}
