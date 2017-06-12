import TEAM from './_Team';
import Geometry from '../Geometry';

const GEO = {
    type:      "circle",
    radius:    200,
    fill:      {
        color: 0,
        alpha: 1
    },
    lineStyle: {
        width: 1,
        color: 16776960,
        alpha: 1
    }
};


export default class Star {
    static DIST_SURFACE2 = 200 * 200;

    type = 'Star';
    geo: any;
    x    = 0;
    y    = 0;
    hp   = 10000;
    mass = 500;
    team = TEAM.NONE;

    constructor(params: Star) {
        Object.assign(this, params);
        this.geo = Geometry(GEO);
    }
}