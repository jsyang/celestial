/**
 * Sits docked on planet
 */

import {getAngleFromTo} from '../entityHelpers';
import {isHumanTeam} from '../constants';
import Score from '../Score';

function dockPlanet(planet) {
    this.isDockedPlanet = true;
    this.dx             = 0;
    this.dy             = 0;
    this.rotation       = getAngleFromTo(planet, this);
    this.planet         = planet;

    if (!planet.isOccupied() && planet.team != this.team) {
        if (isHumanTeam(this.team)) {
            Score.add(20);
        }

        planet.team = this.team;
        planet.updateFlagColor();
    }
}

function undockPlanet() {
    this.isDockedPlanet = false;
    this.planet         = undefined;
}

const DIST_PLANET_DOCK = 105;

const DEFAULTS = {
    isDockedPlanet: false,
    dockPlanet,
    undockPlanet
};

function process(entity) {
    if (entity.isDockedPlanet) {
        entity.x = Math.cos(entity.rotation) * DIST_PLANET_DOCK + entity.planet.x;
        entity.y = Math.sin(entity.rotation) * DIST_PLANET_DOCK + entity.planet.y;
    }
}

export default {
    componentFlag: 'canDockPlanet',
    DEFAULTS,
    process
}
