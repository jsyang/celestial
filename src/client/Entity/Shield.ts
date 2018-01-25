import Geometry from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    type:            "circle",
    radius:          20,
    collisionRadius: 10,
    fill:            {
        color: 0,
        alpha: 0
    },
    lineStyle:       {
        width: 1,
        color: 0x00ffff,
        alpha: 1
    }
};

export default class Shield extends LivingEntity {
    type          = 'Shield';
    hp            = 12;
    maxHp         = 12;
    geo           = Geometry(GEO);
    canDisplayHit = true;
    canAnchor     = true;

    constructor(params: Shield) {
        super();
        Object.assign(this, params);
    }
}