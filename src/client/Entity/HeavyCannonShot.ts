import TEAM from './_Team';
import Geometry from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "type":      "polygon",
    "lineStyle": {
        "width": 2,
        "color": 65535,
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

    canMoveLinearly = true;
    canDamage       = true;
    canMetabolize   = true;

    team     = TEAM.NONE;
    hp       = 60;
    damageHp = 2;

    constructor(params: HeavyCannonShot) {
        super();

        this.geo = Geometry(GEO);
        Object.assign(this, params);
    }
}