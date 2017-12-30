import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';
import Entity from '.';
import Random from '../Random';

const GEO = {
    "_name":   "Space Port",
    "body":    {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 255,
            "alpha": 1
        },
        "path":      [
            -2, 0,
            -6, -20,
            -6, -36,
            -2, -44,
            6, -44,
            6, -24,
            2, -20,
            2, 20,
            6, 24,
            6, 44,
            -2, 44,
            -6, 36,
            -6, 20,
            -2, 0
        ]
    },
    "turret1": {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 0.5
        },
        "path":      [
            0, 28,
            4, 26,
            4, 30,
            0, 28
        ]
    },
    "turret2": {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 0.5
        },
        "path":      [
            0, -28,
            4, -26,
            4, -30,
            0, -28
        ]
    },
    "turret3": {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 0.5
        },
        "path":      [
            4, 44,
            2, 48,
            0, 44
        ]
    },
    "turret4": {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 0.5
        },
        "path":      [
            4, -44,
            2, -48,
            0, -44
        ]
    },
    "flame1":  {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 1
        },
        "path":      [
            -6, 20,
            -12, 22,
            -6, 24
        ]
    },
    "flame2":  {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 1
        },
        "path":      [
            -6, -24,
            -12, -22,
            -6, -20
        ]
    },
    "flame3":  {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 1
        },
        "path":      [
            -6, 32,
            -12, 34,
            -6, 36
        ]
    },
    "flame4":  {
        "type":      "polygon",
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 1
        },
        "path":      [
            -6, -36,
            -12, -34,
            -6, -32
        ]
    }
};


const getTurretRotation = (spaceport, x, y) => {
    // Turreted fire:
    // direction of shot is independent of direction of shooter
    const {attackTarget} = spaceport;

    const targetDx = attackTarget.dx || 0;
    const targetDy = attackTarget.dy || 0;

    const leadingShot = {
        x: attackTarget.x + targetDx * 20,
        y: attackTarget.y + targetDy * 20
    };

    let rotation = Entity.getAngleFromTo(
        {
            x: x + spaceport.x,
            y: y + spaceport.y
        },
        leadingShot
    );

    // Fudge factor
    rotation += Random.float(-0.15, 0.15);

    return rotation;
};

const HALF_PI = Math.PI / 2;

const ATTACK_TURRET_POSITIONS = [
    spaceport => {
        const x = 28 * Math.cos(spaceport.rotation - HALF_PI);
        const y = 28 * Math.sin(spaceport.rotation - HALF_PI);

        return {x, y, rotation: getTurretRotation(spaceport, x, y)};
    },
    spaceport => {
        const x = -28 * Math.cos(spaceport.rotation - HALF_PI);
        const y = -28 * Math.sin(spaceport.rotation - HALF_PI);

        return {x, y, rotation: getTurretRotation(spaceport, x, y)};
    },
    spaceport => {
        const x = 46 * Math.cos(spaceport.rotation - HALF_PI);
        const y = 46 * Math.sin(spaceport.rotation - HALF_PI);

        return {x, y, rotation: getTurretRotation(spaceport, x, y)};
    },
    spaceport => {
        const x = -46 * Math.cos(spaceport.rotation - HALF_PI);
        const y = -46 * Math.sin(spaceport.rotation - HALF_PI);

        return {x, y, rotation: getTurretRotation(spaceport, x, y)};
    }
];

export default class SpacePort extends LivingEntity {
    type = 'SpacePort';
    geo  = Geometry(GEO.body);
    planet: Planet;

    hp    = 30;
    maxHp = 30;

    canRepair = true;
    canRefine = true;

    canOrbitPlanet = true;
    orbitDistance  = 205;

    canAutoTargetEnemy    = true;
    canDisplayHit         = true;
    canExplode            = true;
    canAttack             = true;
    attackTurretPositions = ATTACK_TURRET_POSITIONS;
    canShootCannon        = true;
    reloadTime_Cannon     = 300;

    canStoreMaterial  = true;
    materialsRaw      = 0;
    materialsFinished = 0;

    constructor(params: SpacePort) {
        super();

        Object.assign(this, params);

        this.assignTeamColor();

        // Add turrets and flames as graphics only, not collider geometry
        this.geo.graphics
            .addChild(
                Geometry(GEO.flame1).graphics,
                Geometry(GEO.flame2).graphics,
                Geometry(GEO.flame3).graphics,
                Geometry(GEO.flame4).graphics,

                Geometry(GEO.turret1).graphics,
                Geometry(GEO.turret2).graphics,
                Geometry(GEO.turret3).graphics,
                Geometry(GEO.turret4).graphics
            );
    }
}