import Geometry, {GeometryType} from '../Geometry';
import LivingEntity from './LivingEntity';
import Random from '../Random';

const GEO = {
    "type":      GeometryType.Polygon,
    "lineStyle": {
        "width": 1,
        "color": 0xffff00,
        "alpha": 1
    },
    "path":      [
        5, 0,
        -5, 0
    ]
};

export default class LaserBolt extends LivingEntity {
    type = 'LaserBolt';

    canMoveLinearly = true;
    canDamage       = true;
    canMetabolize   = true;

    hp       = Random.int(2, 3);
    damageHp = 30;

    constructor(params: LaserBolt) {
        super();

        this.geo = Geometry(GEO);
        Object.assign(this, params);
    }
}