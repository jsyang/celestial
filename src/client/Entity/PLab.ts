import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';

const GEO = {
    "type":      "polygon",
    "_name":     "Planetary Lab",
    "lineStyle": {
        "width": 1,
        "color": 0xffffff,
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

    hp    = 10;
    maxHp = 10;

    canShimmer        = true;
    isShimmering      = false;
    shimmerNormalColor: number;
    shimmerBlinkColor = 0x0ff00f;

    canDevelopWeapon  = true;
    canDisplayHit     = true;
    canExplode        = true;
    explosionOriginDx = 20;
    explosionOriginDy = -52;

    canOccupyPlanet = true;

    constructor(params: PLab) {
        super();

        Object.assign(this, params);

        const teamColor         = this.assignTeamColor();
        this.shimmerNormalColor = teamColor;
    }
}