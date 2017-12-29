import TEAM from './_Team';
import Geometry from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "type":      "polygon",
    "lineStyle": {
        "width": 1,
        "color": 0xff0000,
        "alpha": 0.6
    },
    "path":      [
        8, 0,
        -8, 0
    ]
};

export default class LaserBolt extends LivingEntity {
    type = 'LaserBolt';

    canMoveLinearly = true;
    canDamage       = true;
    canMetabolize   = true;

    team     = TEAM.NONE;
    hp       = 70;
    damageHp = 0.25;

    constructor(params: LaserBolt) {
        super();

        this.geo = Geometry(GEO);
        Object.assign(this, params);
    }
}