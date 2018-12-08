import Geometry, {GeometryType} from '../Geometry';
import Planet from './Planet';
import LivingEntity from './LivingEntity';
import {TEAM_COLOR} from '../constants';
import Random from '../Random';
import {getAngleFromTo} from '../entityHelpers';

const GEO = {
    "body":      {
        "type":          GeometryType.Polygon,
        "lineStyle":     {
            "width": 1,
            "color": 15658734,
            "alpha": 1
        },
        "collisionPath": [
            -44, -4,
            -38, -8,
            26, -10,
            44, 0,
            26, 10,
            -38, 8,
            -44, 4
        ],
        "path":          [
            -26, -2,
            -26, -8,
            -38, -8,
            -38, 2,
            -44, 4,
            -44, -4,
            -38, -2,
            -38, 8,
            -26, 8,
            -26, -2,
            24, -2,
            26, -10,
            44, 0,
            26, 10,
            24, 2,
            -26, 2
        ]
    },
    "cargopodL": {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 1,
            "color": 15658734,
            "alpha": 1
        },
        "path":      [
            -24,
            -2,
            -24,
            -12,
            22,
            -12,
            22,
            -2
        ]
    },
    "cargopodR": {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 1,
            "color": 15658734,
            "alpha": 1
        },
        "path":      [
            -24,
            2,
            -24,
            12,
            22,
            12,
            22,
            2
        ]
    },
    "flag":      {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 2,
            "color": 255,
            "alpha": 1
        },
        "path":      [
            34, 0,
            42, 0
        ]
    },
    "turret1":   {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 0.5
        },
        "path":      [
            -34, 0,
            -30, -3,
            -30, 3,
            -34, 0
        ]
    },
    "turret2":   {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 0.5
        },
        "path":      [
            28, -3,
            32, 0,
            28, 3,
            28, -2
        ]
    },
    "flame":     {
        "type":      GeometryType.Polygon,
        "lineStyle": {
            "width": 1,
            "color": 65535,
            "alpha": 1
        },
        "path":      [
            -44, -2,
            -50, 0,
            -44, 2
        ]
    }
};

const getTurretRotation = (freighter, x, y) => {
    // Turreted fire:
    // direction of shot is independent of direction of shooter
    let {attackTarget} = freighter;
    attackTarget       = attackTarget || {};

    const targetDx = attackTarget.dx || 0;
    const targetDy = attackTarget.dy || 0;

    const leadingShot = {
        x: attackTarget.x + targetDx * 24,
        y: attackTarget.y + targetDy * 24
    };

    let rotation = getAngleFromTo(
        {
            x: x + freighter.x,
            y: y + freighter.y
        },
        leadingShot
    );

    // Fudge factor
    rotation += Random.float(-0.2, 0.2);

    return rotation;
};

const ATTACK_TURRET_POSITIONS = [
    freighter => {
        const x = -34 * Math.cos(freighter.rotation);
        const y = -34 * Math.sin(freighter.rotation);

        return {x, y, rotation: getTurretRotation(freighter, x, y)};
    },
    freighter => {
        const x = 32 * Math.cos(freighter.rotation);
        const y = 32 * Math.sin(freighter.rotation);

        return {x, y, rotation: getTurretRotation(freighter, x, y)};
    }
];

export default class Freighter extends LivingEntity {
    type = 'Freighter';
    geo  = Geometry(GEO.body);
    planet: Planet;

    hp    = 10;
    maxHp = 10;

    canDisplayHit    = true;
    canOrbitPlanet   = true;
    isOrbitingPlanet = false;
    orbitDistance    = 205;

    canExplode = true;

    canColonizePlanet           = true;
    canMoveToColonizationTarget = true;

    canStoreMaterial  = true;
    materialsRaw      = 0;
    materialsFinished = 500;

    canAutoTargetEnemy    = true;
    canAttack             = true;
    attackTurretPositions = ATTACK_TURRET_POSITIONS;

    canShootHomingMissile = true;
    canShootLaserBolt     = true;
    canShootCannon        = true;
    reloadTime_Cannon     = 400;

    constructor(params: Freighter) {
        super();

        Object.assign(this, params);

        // Add as graphics only, not collider geometry
        this.geo.graphics.addChild(
            Geometry(GEO.flame).graphics,
            Geometry(GEO.flag).graphics,
            Geometry(GEO.cargopodL).graphics,
            Geometry(GEO.cargopodR).graphics,
            Geometry(GEO.turret1).graphics,
            Geometry(GEO.turret2).graphics
        );

        this.assignTeamColor();
        this.flameOff();
    }

    assignTeamColor() {
        this.getChildAt(1).currentPath.lineColor = TEAM_COLOR[this.team];
    }

    loadSupply = () => {
        this.setChildVisible(2, true);
        this.setChildVisible(3, true);
    };

    unloadSupply = () => {
        this.setChildVisible(2, false);
        this.setChildVisible(3, false);
    };

    flameOn  = () => this.setChildVisible(0, true);
    flameOff = () => this.setChildVisible(0, false);
}