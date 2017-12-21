import TEAM from './_Team';
import Geometry from '../Geometry';
import LivingEntity from './LivingEntity';

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

export default class Shot extends LivingEntity {
    type = 'Shot';
    
    canMoveLinearly = true;
    canDamage       = true;
    canMetabolize   = true;

    shotType = 'cannon_normal';
    team     = TEAM.NONE;
    hp       = 60;
    damageHp = 1;

    constructor(params: Shot) {
        super();
        
        const {shotType} = params;

        this.geo      = Geometry(GEO[shotType]);
        this.damageHp = DAMAGE[shotType];
        Object.assign(this, params);
    }
}