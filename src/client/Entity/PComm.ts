import TEAM from './_Team';
import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';

const GEO = {
    "type":      "polygon",
    "_name":     "Planetary Communications Center",
    "lineStyle": {
        "width": 1,
        "color": 255,
        "alpha": 1
    },
    "path":      [
        40, 30,
        0, 30,
        0, 50,
        40, 50,
        40, 30,
        60, 35,
        30, 10,
        40, 30
    ]
};

export default class PComm extends LivingEntity {
    type = 'PComm';
    geo  = Geometry(GEO);
    planet: Planet;

    // Components
    team  = TEAM.NONE;
    hp    = 20;
    maxHp = 20;

    canExplode      = true;
    canRepair       = true;
    canOccupyPlanet = true;

    REPAIR_COST_FINISHED = 2;
    REPAIR_TIME          = 10;

    constructor(params: PComm) {
        super();

        Object.assign(this, params);
        this.geo.graphics.currentPath.lineColor = TEAM._COLORS[this.team];
    }
}