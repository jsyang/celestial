import Geometry, {GeometryType} from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "body":  {
        "type":          GeometryType.Polygon,
        "lineStyle":     {
            "width": 1,
            "color": 16711935,
            "alpha": 1
        },
        "path":          [
            -4, 1,
            0, 2,
            4, 0,
            0, -2,
            -4, -1,
            -4, 1
        ],
        "collisionPath": [
            -4, 2,
            0, 4,
            8, 0,
            0, -4,
            -4, -2
        ]
    },
    "flame": {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 1
        },
        "path":      [
            -4, -4,
            -8, -5,
            -4, -6
        ]
    }
};

export default class Probe extends LivingEntity {
    type = 'Probe';
    geo  = Geometry(GEO.body);

    hp    = 2;
    maxHp = 2;

    canMoveLinearly = true;
    canFlock        = true;

    constructor(params: Probe) {
        super();
        Object.assign(this, params);
        this.assignTeamColor();

        this.geo.graphics.addChild(
            Geometry(GEO.flame).graphics
        );

        this.flameOff();
    }

    flameOn  = () => this.setChildVisible(0, true);
    flameOff = () => this.setChildVisible(0, false);
}