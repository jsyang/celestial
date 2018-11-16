import Geometry, {GeometryType} from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "missileBody": {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 1,
            "color": 0xffffff,
            "alpha": 1
        },
        "path":      [
            0, 0,
            6, 0
        ]
    },

    "missileFlame": {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 1,
            "color": 0xff0000,
            "alpha": 1
        },
        "path":      [
            0, 0,
            -3, 0
        ]
    }
};

export default class HomingMissile extends LivingEntity {
    type = 'HomingMissile';

    canShimmer         = true;
    shimmerNormalColor = 0xee0000;

    canMoveLinearly             = true;
    canLimitSpeed               = true;
    MAX_SPEED                   = 55;
    MAX_SPEED2                  = 55 * 55;
    canAccelerateToAttackTarget = true;
    canDamage                   = true;
    canMetabolize               = true;
    canAttack                   = true;

    hp       = 60;
    damageHp = 6;

    constructor(params: HomingMissile) {
        super();

        this.geo = Geometry(GEO.missileBody);

        this.geo.graphics.addChild(
            Geometry(GEO.missileFlame).graphics
        );

        Object.assign(this, params);
    }
}