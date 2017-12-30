import Geometry from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "missileBody": {
        "type":      "polygon",
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
        "type":      "polygon",
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

    canExplode          = true;
    EXPLOSION_FRAGMENTS = 20;
    canMoveLinearly     = true;
    canDamage           = true;
    canMetabolize       = true;
    canAttack           = true;

    hp       = 45;
    damageHp = 0.5;

    constructor(params: ClusterRocket) {
        super();

        this.geo = Geometry(GEO.missileBody);

        this.geo.graphics.addChild(
            Geometry(GEO.missileFlame).graphics
        );

        Object.assign(this, params);
    }
}