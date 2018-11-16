import Geometry, {GeometryType} from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "missileBody": {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 2,
            "color": 0x4444ff,
            "alpha": 1
        },
        "path":      [
            0, 0,
            8, 0
        ]
    },

    "missileFlame": {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 1,
            "color": 0xffff00,
            "alpha": 1
        },
        "path":      [
            0, 0,
            -2, 0
        ]
    }
};

export default class ClusterRocket extends LivingEntity {
    type = 'ClusterRocket';
    geo  = Geometry(GEO.missileBody);

    canExplode          = true;
    EXPLOSION_FRAGMENTS = 20;
    EXPLOSION_SOUND     = 'fire-heavy';
    canMoveLinearly     = true;
    canDamage           = true;
    canMetabolize       = true;
    canAttack           = true;

    hp       = 45;
    damageHp = 0.5;

    constructor(params: ClusterRocket) {
        super();

        this.geo.graphics.addChild(
            Geometry(GEO.missileFlame).graphics
        );

        Object.assign(this, params);
    }
}