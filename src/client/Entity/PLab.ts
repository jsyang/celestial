import Geometry, {GeometryType} from '../Geometry';
import Planet from './Planet';
import LivingEntity from './LivingEntity';
import {TEAM_NONE_COLOR} from '../constants';

const GEO = {
    'type':      GeometryType.Polygon,
    '_name':     'Planetary Lab',
    'lineStyle': {
        'width': 1,
        'color': 0xffffff,
        'alpha': 1
    },
    'path':      [
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

    reticleOffsetX = 25;
    reticleOffsetY = -55;

    hp    = 10;
    maxHp = 10;

    canShimmer        = true;
    isShimmering      = false;
    shimmerNormalColor: number;
    shimmerBlinkColor = 0x0ff00f;

    canDevelopEquipment = true;
    canDisplayHit       = true;
    canExplode          = true;
    explosionOriginDx   = 25;
    explosionOriginDy   = -55;

    canOccupyPlanet = true;

    constructor(params: PLab) {
        super();

        Object.assign(this, params);

        const teamColor         = this.assignTeamColor();
        this.shimmerNormalColor = teamColor || TEAM_NONE_COLOR;
    }
}