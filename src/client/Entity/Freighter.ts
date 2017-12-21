import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';
import TEAM from './_Team';

const GEO = {
    "body":      {
        "type":          "polygon",
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
        "type":      "polygon",
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
        "type":      "polygon",
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
        "type":      "polygon",
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
        "type":      "polygon",
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
        "type":      "polygon",
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
        "type":      "polygon",
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

export default class Freighter extends LivingEntity {
    type = 'Freighter';
    geo  = Geometry(GEO.body);
    planet: Planet;


    // Components
    hp    = 10;
    maxHp = 10;

    canDisplayHit    = true;
    canOrbitPlanet   = true;
    isOrbitingPlanet = false;
    orbitDistance    = 205;

    canExplode = true;

    canColonizePlanet = true;

    canMoveToTarget = true;
    target: any;

    canStoreMaterial  = true;
    materialsRaw      = 0;
    materialsFinished = 0;

    constructor(params: Freighter) {
        super();

        Object.assign(this, params);

        const cargoPodL = Geometry(GEO.cargopodL);
        const cargoPodR = Geometry(GEO.cargopodR);
        const turret1   = Geometry(GEO.turret1);
        const turret2   = Geometry(GEO.turret2);
        const flag      = Geometry(GEO.flag);
        const flame     = Geometry(GEO.flame);

        // Add as graphics only, not collider geometry
        this.geo.graphics.addChild(
            flame.graphics,
            flag.graphics,
            cargoPodL.graphics,
            cargoPodR.graphics,
            turret1.graphics,
            turret2.graphics
        );

        this.assignTeamColor();
        this.flameOff();
    }

    assignTeamColor() {
        this.getChildAt(1).currentPath.lineColor = TEAM._COLORS[this.team];
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