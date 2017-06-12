import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';

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

export default class SpacePort extends LivingEntity {
    type = 'SpacePort';
    geo  = Geometry(GEO.body);

    // Components
    hp    = 30;
    maxHp = 30;

    canRepair = true;
    canRefine = true;

    canOrbitPlanet = true;
    planet: Planet;
    orbitDistance  = 205;

    canExplode          = true;
    EXPLOSION_FRAGMENTS = 12;

    canStoreMaterial  = true;
    materialsRaw      = 0;
    materialsFinished = 0;

    constructor(params: SpacePort) {
        super();

        Object.assign(this, params);

        this.assignTeamColor();

        // Add turrets and flames as graphics only, not collision geometry
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