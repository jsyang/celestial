import TEAM from './_Team';
import Geometry from '../Geometry';
import Planet from "./Planet";
import LivingEntity from './LivingEntity';

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

export default class PBase extends LivingEntity {
    type = 'PBase';
    geo  = Geometry(GEO.body);

    // Components
    team  = TEAM.NONE;
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