import Geometry, {GeometryType} from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "_name":         "Planetary Shield",
    type:            GeometryType.Circle,
    radius:          30,
    collisionRadius: 30,
    fill:            {
        color: 0,
        alpha: 0
    },
    lineStyle:       {
        width: 1,
        color: 0x00aaaa,
        alpha: 1
    }
};

export default class PShield extends LivingEntity {
    type          = 'PShield';
    hp            = 20;
    maxHp         = 20;
    geo           = Geometry(GEO);
    canDisplayHit = true;
    canAnchor     = true;

    constructor(params: PShield) {
        super();
        Object.assign(this, params);
    }
}