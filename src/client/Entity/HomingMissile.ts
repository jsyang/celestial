import TEAM from './_Team';
import Geometry from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "missileBody": {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 0xee0000,
            "alpha": 1
        },
        "path":      [
            0, 0,
            6, 0
        ]
    },

    "missileFlame": {
        "type":      "polygon",
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

export default class Shot extends LivingEntity {
    type = 'Shot';

    canMoveLinearly = true;
    canDamage       = true;
    canMetabolize   = true;

    team     = TEAM.NONE;
    hp       = 45;
    damageHp = 5;

    constructor(params: Shot) {
        super();

        this.geo = Geometry(GEO.missileBody);

        this.geo.graphics.addChild(
            Geometry(GEO.missileFlame).graphics
        );

        Object.assign(this, params);
    }
}