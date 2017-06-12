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

    // Components
    team  = TEAM.NONE;
    hp    = 30;
    maxHp = 30;

    canMine         = true;
    canExplode      = true;
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