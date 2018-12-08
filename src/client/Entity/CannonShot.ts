import Geometry, {GeometryType} from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "type": GeometryType.Polygon,
    "fill": {
        "color": 16777215,
        "alpha": 1
    },
    "path": [
        -1, 1,
        1, 1,
        1, -1,
        -1, -1,
        -1, 1
    ]
};

export default class CannonShot extends LivingEntity {
    type            = 'CannonShot';
    geo             = Geometry(GEO);
    canMoveLinearly = true;
    canDamage       = true;
    canMetabolize   = true;

    hp       = 60; // effective range
    damageHp = 1; // damage inflicted

    constructor(params: CannonShot) {
        super();

        Object.assign(this, params);
    }
}