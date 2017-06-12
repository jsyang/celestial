import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';
import SpacePort from './SpacePort';

const GEO = {
    "_name":     "Orbital Sensor Array",
    "type":      "polygon",
    "lineStyle": {
        "width": 1,
        "color": 255,
        "alpha": 1
    },
    "path":      [
        6, 26,
        12, 28,
        12, 40,
        18, 46,
        18, 34,
        12, 40,
        6, 42
    ]
};

export default class SensorArray extends LivingEntity {
    type = 'SensorArray';
    geo  = Geometry(GEO);
    planet: Planet;

    // Components
    hp    = 5;
    maxHp = 5;

    canRepair          = true;
    canOccupySpacePort = true;
    spaceport: SpacePort;

    constructor(params: SensorArray) {
        super();
        Object.assign(this, params);
        this.assignTeamColor();
    }
}
