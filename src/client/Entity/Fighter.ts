import Geometry from '../Geometry';
import LivingEntity from './LivingEntity';

/* Bomber

3, 0,
5, 4,
9, 4,
9, 9,
3, 9,
-6, 9,
-1, 4,
-2, 0,
-1, -4,
-6, -9,
3, -9,
9, -4,
3, 0
 */

/* Fighter

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

 */

const GEO = {
    "body":   {
        "type": "polygon",

        "lineStyle": {
            "width": 1,
            "color": 255,
            "alpha": 1
        },

        "path": [
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

const ATTACK_TURRET_POSITIONS = [
    fighter => {
        const {x, y}     = fighter.geo.collider.calcPoints[1];
        const {rotation} = fighter;
        return {x, y, rotation};
    }
];

export default class Fighter extends LivingEntity {
    type = 'Fighter';
    geo  = Geometry(GEO.body);

    mass     = 10;
    hp       = 4;
    maxHp    = 4;
    rotation = 0;

    canGravitate = true;
    canExplode   = true;

    canAttack             = true;
    attackWeapon          = 'Cannon';
    attackTurretPositions = ATTACK_TURRET_POSITIONS;

    canBeShielded         = true;
    canShootLaserBolt     = true;
    canShootCannon        = true;
    canShootHeavyCannon   = true;
    canShootClusterRocket = true;
    canShootHomingMissile = true;

    canLimitSpeed                      = true;
    canMoveLinearly                    = true;
    canAccelerate                      = true;
    canDockPlanet                      = true;
    canDockSpacePort                   = true;
    canAccelerateFighterToAttackTarget = true;

    constructor(params: Fighter) {
        super();

        Object.assign(this, params);

        this.assignTeamColor();

        // Add as graphics only, not collider geometry
        this.geo.graphics.addChild(
            Geometry(GEO.flame1).graphics,
            Geometry(GEO.flame2).graphics
        );

        this.flameOff();
    }

    flameOn = () => {
        this.setChildVisible(0, true);
        this.setChildVisible(1, true);
    };

    flameOff = () => {
        this.setChildVisible(0, false);
        this.setChildVisible(1, false);
    };
}