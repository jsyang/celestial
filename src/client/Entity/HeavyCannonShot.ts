import Geometry, {GeometryType} from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "type":      GeometryType.Polygon,
    "lineStyle": {
        "width": 2,
        "color": 0xffffff,
        "alpha": 1
    },
    "path":      [
        -3, 0,
        0, 0,
        0, -3,
        0, 0,
        0, 3,
        0, 0,
        3, 0
    ]
};

export default class HeavyCannonShot extends LivingEntity {
    type = 'HeavyCannonShot';

    canShimmer         = true;
    shimmerNormalColor = 0x00ffff;
    canMoveLinearly    = true;
    canDamage          = true;
    canMetabolize      = true;

    hp       = 40;
    damageHp = 2;

    constructor(params: HeavyCannonShot) {
        super();

        this.geo = Geometry(GEO);
        Object.assign(this, params);
    }
}