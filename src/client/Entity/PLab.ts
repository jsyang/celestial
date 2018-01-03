import TEAM from './_Team';
import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';

const GEO = {
    "type":      "polygon",
    "_name":     "Planetary Lab",
    "lineStyle": {
        "width": 1,
        "color": 255,
        "alpha": 1
    },
    "path":      [
        0, -40,
        0, -70,
        50, -70,
        50, -40,
        0, -40
    ]
};

export default class PLab extends LivingEntity {
    type = 'PLab';
    geo  = Geometry(GEO);
    planet: Planet;

    // Components
    team  = TEAM.NONE;
    hp    = 10;
    maxHp = 10;

    canDisplayHit     = true;
    canExplode        = true;
    explosionOriginDx = 20;
    explosionOriginDy = -52;

    canOccupyPlanet = true;

    constructor(params: PLab) {
        super();

        Object.assign(this, params);
        this.geo.graphics.currentPath.lineColor = TEAM._COLORS[this.team];
    }
}