import Geometry from '../Geometry';
import LivingEntity from './LivingEntity';

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


export default class Star extends LivingEntity{
    static DIST_SURFACE2 = 200 * 200;

    type = 'Star';
    hp   = 10000;
    mass = 500;
    
    constructor(params: Star) {
        super();
        this.geo = Geometry(GEO);
        Object.assign(this, params);
    }
}