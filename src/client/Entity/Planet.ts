import {TEAM, TEAM_COLOR} from '../constants';
import Geometry, {GeometryType} from '../Geometry';
import Star from './Star';
import PBase from './PBase';
import PLab from './PLab';
import PColony from './PColony';
import PComm from './PComm';
import SpaceDock from './SpaceDock';
import SensorArray from './SensorArray';
import SpacePort from './SpacePort';
import LivingEntity from './LivingEntity';

const GEO = {
    body: {
        type:      GeometryType.Circle,
        radius:    100,
        fill:      {
            color: 0,
            alpha: 1
        },
        lineStyle: {
            width: 1,
            color: 65280,
            alpha: 1
        }
    },
    flag: {
        type: GeometryType.Polygon,
        fill: {
            color: 0xffffff,
            alpha: 1
        },
        path: [
            -5, -4,
            -5, 4,
            5, 4,
            5, -4
        ]
    }
};

export default class Planet extends LivingEntity {
    type = 'Planet';

    static DIST_SURFACE2 = 105 * 105;

    orbitDistance: number;
    orbitRotation: number;

    canOrbitStar      = true;
    canStoreMaterial  = true;
    materialsRaw      = 0;
    materialsFinished = 0;
    hp                = 2000;
    mass              = 180;

    star?: Star;
    pbase?: PBase;
    plab?: PLab;
    pcolony?: PColony;
    pcomm?: PComm;
    spacedock?: SpaceDock;
    sensorarray?: SensorArray;
    spaceport?: SpacePort;

    constructor(params: Planet) {
        super();
        this.geo = Geometry(GEO.body);
        this.geo.graphics.addChild(Geometry(GEO.flag).graphics);

        Object.assign(this, params);
        this.updateFlagColor();
    }

    isOccupied() {
        return Boolean(
            this.pbase ||
            this.plab ||
            this.pcolony ||
            this.pcomm
        );
    };

    updateFlagColor() {
        const flag = this.geo.graphics.children[0] as any;

        if (this.team === TEAM.NONE) {
            flag.visible = false;
        } else {
            flag.visible = true;
            flag.tint    = TEAM_COLOR[this.team];
        }

    }
}