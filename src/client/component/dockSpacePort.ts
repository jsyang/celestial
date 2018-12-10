/**
 * Sits docked on spaceport
 */

import SpacePort from '../Entity/SpacePort';

function dockSpacePort(spaceport: SpacePort) {
    this.isDockedSpacePort           = true;
    this.dx                          = 0;
    this.dy                          = 0;
    this.rotation                    = spaceport.rotation;
    this.spaceport                   = spaceport;
    this.spaceport.fighter           = this;
    this.spaceport.isCarryingFighter = true;
}

function undockSpacePort() {
    this.isDockedSpacePort           = false;
    this.spaceport.fighter           = null;
    this.spaceport.isCarryingFighter = false;
    this.spaceport                   = null;
    // Ensure the spaceport does not catch it immediately after undocking
    this.x += Math.cos(this.rotation);
    this.y += Math.sin(this.rotation);
}

const DIST_SPACEPORT_DOCK = 211;

const DEFAULTS = {
    spaceport:         null,
    isDockedSpacePort: false,
    dockSpacePort,
    undockSpacePort
};

function process(entity) {
    const {isDockedSpacePort, spaceport} = entity;

    if (isDockedSpacePort) {
        entity.rotation = spaceport.rotation;
        entity.x        = Math.cos(entity.rotation) * DIST_SPACEPORT_DOCK + spaceport.planet.x;
        entity.y        = Math.sin(entity.rotation) * DIST_SPACEPORT_DOCK + spaceport.planet.y;
    }
}

export default {
    componentFlag: 'canDockSpacePort',
    DEFAULTS,
    process
}
