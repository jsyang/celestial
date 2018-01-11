import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';
import SpacePort from './SpacePort';

const GEO = {
    "_name":     "Space Dock",
    "type":      "polygon",
    "lineStyle": {
        "width": 1,
        "color": 255,
        "alpha": 1
    },
    "path":      [
        6, -42,
        20, -42,
        20, -22,
        14, -26,
        6, -26
    ]
};

export default class SpaceDock extends LivingEntity {
    type = 'SpaceDock';
    geo  = Geometry(GEO);
    planet: Planet;

    hp    = 8;
    maxHp = 8;

    canExplode         = true;
    canDisplayHit      = true;
    canRepair          = true;
    canManufacture     = true;
    PRODUCT            = {
        Fighter: {cost: 200, time: 60},
        Probe:   {cost: 15, time: 10}
    };
    canOccupySpacePort = true;
    spaceport: SpacePort;

    constructor(params: SpaceDock) {
        super();
        Object.assign(this, params);
        this.assignTeamColor();
    }
}
