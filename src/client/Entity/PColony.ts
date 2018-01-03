import TEAM from './_Team';
import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';

const GEO = {
    "type":      "polygon",
    "_name":     "Planetary Colony",
    "lineStyle": {
        "width": 1,
        "color": 255,
        "alpha": 1
    },
    "path":      [
        -30, 40,
        -70, 40,
        -70, -40,
        -30, -40,
        -30, 40
    ]
};

export default class PColony extends LivingEntity {
    type = 'PColony';
    geo  = Geometry(GEO);
    planet: Planet;

    hp    = 15;
    maxHp = 15;

    canDisplayHit     = true;
    canMine           = true;
    canExplode        = true;
    explosionOriginDx = -50;
    explosionOriginDy = 0;

    canManufacture    = true;
    PRODUCT           = {
        Freighter: {cost: 300, time: 120},
        Fighter:   {cost: 500, time: 90}
    };

    canOccupyPlanet = true;

    canRepair            = true;
    REPAIR_COST_FINISHED = 10;
    REPAIR_TIME          = 20;

    constructor(params: PColony) {
        super();

        Object.assign(this, params);
        this.geo.graphics.currentPath.lineColor = TEAM._COLORS[this.team];
    }
}