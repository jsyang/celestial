import TEAM from './_Team';
import Geometry from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "type": "polygon",
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
    type = 'CannonShot';

    canMoveLinearly = true;
    canDamage       = true;
    canMetabolize   = true;

    team     = TEAM.NONE;
    hp       = 60; // effective range
    damageHp = 1; // damage inflicted

    constructor(params: CannonShot) {
        super();

        this.geo = Geometry(GEO);
        Object.assign(this, params);
    }
}