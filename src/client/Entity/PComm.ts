import Geometry, {GeometryType} from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';

const GEO = {
    "type":      GeometryType.Polygon,
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

    hp    = 7;
    maxHp = 7;

    canDisplayHit     = true;
    canExplode        = true;
    explosionOriginDx = 31;
    explosionOriginDy = 33;

    canRepair       = true;
    canOccupyPlanet = true;

    REPAIR_COST_FINISHED = 2;
    REPAIR_TIME          = 10;

    constructor(params: PComm) {
        super();

        Object.assign(this, params);
        this.assignTeamColor();
    }
}