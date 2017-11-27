import Geometry from '../Geometry';
import LivingEntity from './LivingEntity';

const GEO = {
    "body":   {
        "type":          "polygon",
        "lineStyle":     {
            "width": 1,
            "color": 255,
            "alpha": 1
        },
        "path":          [
            -2, 2,
            -4, 0,
            -2, -2,
            -4, -4,
            -4, -6,
            2, -4,
            0, -2,
            8, 0,
            0, 2,
            2, 4,
            -4, 6,
            -4, 4,
            -2, 2
        ],
        "collisionPath": [
            -4, -6,
            8, 0,
            -4, 6
        ]
    },
    "flame1": {
        "type":      "polygon",
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
    },
    "flame2": {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 1
        },
        "path":      [
            -4, 4,
            -8, 5,
            -4, 6
        ]
    }
};

export default class Fighter extends LivingEntity {
    constructor(params: Fighter) {
        super();

        Object.assign(this, params);

        this.assignTeamColor();

        // Add as graphics only, not collision geometry
        this.geo.graphics.addChild(
            Geometry(GEO.flame1).graphics,
            Geometry(GEO.flame2).graphics
        );
    }

    type = 'Fighter';
    geo  = Geometry(GEO.body);

    // Components
    mass     = 10;
    hp       = 6;
    maxHp    = 6;
    dx       = 0;
    dy       = 0;
    rotation = 0;

    canExplode           = true;
    //todo : refine this
    cannonGetMuzzleFuncs = [
        function getFighterMuzzle(f) {
            return f.collision.calcPoints[1];
        }
    ];

    canLimitSpeed   = true;
    canMoveLinearly = true;
    canAccelerate   = true;
    canDockPlanet   = true;



    flameOn = () => {
        this.setChildVisible(0, true);
        this.setChildVisible(1, true);
    };

    flameOff = () => {
        this.setChildVisible(0, false);
        this.setChildVisible(1, false);
    };
}