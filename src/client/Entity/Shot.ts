import TEAM from './_Team';
import Geometry from '../Geometry';

const GEO = {
    "cannon_normal": {
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
    },
    "cannon_heavy":  {
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
    }
};

const DAMAGE = {
    cannon_heavy:  2,
    cannon_normal: 1
};

export default class Shot {
    type = 'Shot';
    geo: any;

    canMoveLinearly = true;
    canDamage       = true;
    canMetabolize   = true;

    shotType = 'cannon_normal';
    team     = TEAM.NONE;
    hp       = 50;
    x        = 0;
    y        = 0;
    dx       = 0;
    dy       = 0;
    damageHp = 1;

    constructor(params: Shot) {
        Object.assign(this, params);
        this.geo      = Geometry(GEO[this.shotType]);
        this.damageHp = DAMAGE[this.shotType];
    }
}