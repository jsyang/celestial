import TEAM from './_Team';
import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';
import Entity from '.';
import Random from '../Random';

const GEO = {
    "_name":   "Planetary Base",
    "body":    {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 255,
            "alpha": 1
        },
        "path":      [
            -20, 20,
            -20, -20,
            20, -20,
            20, 20,
            -20, 20
        ]
    },
    "turret1": {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65280,
            "alpha": 0.5
        },
        "path":      [
            65, -60,
            65, -65,
            60, -65,
            65, -60
        ]
    },
    "turret2": {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65280,
            "alpha": 0.5
        },
        "path":      [
            -65, -60,
            -65, -65,
            -60, -65,
            -65, -60
        ]
    },
    "turret3": {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65280,
            "alpha": 0.5
        },
        "path":      [
            65, 60,
            65, 65,
            60, 65,
            65, 60
        ]
    },
    "turret4": {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65280,
            "alpha": 0.5
        },
        "path":      [
            -65, 60,
            -65, 65,
            -60, 65,
            -65, 60
        ]
    }
};


const getTurretRotation = (pbase, x, y) => {
    // Turreted fire:
    // direction of shot is independent of direction of shooter
    const {attackTarget} = pbase;

    const targetDx = attackTarget.dx || 0;
    const targetDy = attackTarget.dy || 0;

    const leadingShot = {
        x: attackTarget.x + targetDx * 24,
        y: attackTarget.y + targetDy * 24
    };

    let rotation = Entity.getAngleFromTo(
        {
            x: x + pbase.x,
            y: y + pbase.y
        },
        leadingShot
    );

    // Fudge factor
    rotation += Random.float(-0.2, 0.2);

    return rotation;
};

const ATTACK_TURRET_POSITIONS = [
    pbase => ({x: 65, y: 65, rotation: getTurretRotation(pbase, 65, 65)}),
    pbase => ({x: 65, y: -65, rotation: getTurretRotation(pbase, 65, -65)}),
    pbase => ({x: -65, y: -65, rotation: getTurretRotation(pbase, -65, -65)}),
    pbase => ({x: -65, y: 65, rotation: getTurretRotation(pbase, -65, 65)})
];

export default class PBase extends LivingEntity {
    type = 'PBase';
    geo  = Geometry(GEO.body);

    hp    = 20;
    maxHp = 20;

    canDisplayHit   = true;
    canExplode      = true;
    canHarvest      = true;
    canRepair       = true;
    canRefine       = true;
    canConstruct    = true;
    canOccupyPlanet = true;
    planet: Planet;

    canStoreMaterial  = true;
    materialsRaw      = 0;
    materialsFinished = 0;

    canAutoTargetEnemy    = true;
    autoTargetSearchDist2 = 600 * 600;

    canAttack             = true;
    attackTurretPositions = ATTACK_TURRET_POSITIONS;
    canShootCannon        = true;
    reloadTime_Cannon     = 400;

    constructor(params: PBase) {
        super();

        Object.assign(this, params);

        this.geo.graphics.currentPath.lineColor = TEAM._COLORS[this.team];

        // Add turrets as graphics only, not collider geometry
        this.geo.graphics.addChild(
            Geometry(GEO.turret1).graphics,
            Geometry(GEO.turret2).graphics,
            Geometry(GEO.turret3).graphics,
            Geometry(GEO.turret4).graphics
        );
    }
}