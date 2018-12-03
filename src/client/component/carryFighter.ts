import {playSound} from '../assets/audio';
import Entity from '../Entity';
import {testPointInEntity} from '../Geometry';
import {isHumanTeam} from '../constants';

const DEFAULTS = {
    fighter:           null,
    isCarryingFighter: false
};

const DOCK_SPEED_MAX2       = 8 ** 2;   // Only catch Fighter going no faster than this speed
const CATCH_ANGLE_MAGNITUDE = 0.1;      // Only catch Fighter that correctly rotated

function catchFighter(fighter): boolean {
    const {dx, dy, type, team, canDockSpacePort, rotation, isDockedSpacePort} = fighter;

    if (type === 'Fighter' && team === this.team &&
        canDockSpacePort && !isDockedSpacePort &&
        testPointInEntity(fighter, this) &&
        Math.abs(Math.cos(rotation) - Math.cos(this.rotation)) < CATCH_ANGLE_MAGNITUDE
    ) {
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
