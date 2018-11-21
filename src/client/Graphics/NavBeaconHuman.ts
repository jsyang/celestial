import {IPoint} from '../types';
import Graphics from '.';

const RADIUS_MAX         = 60;
const RADIUS_GROWTH_RATE = 0.5;
const beacon             = new PIXI.Graphics();
beacon.visible           = false;

let navPoint;
let radius = 0;

function update() {
    if (!beacon.visible) return;

    if (radius > RADIUS_MAX) {
        radius = 0;
    } else {
        radius += RADIUS_GROWTH_RATE;
    }

    beacon.clear();
    beacon.lineStyle(1, 0x00ffff, 0.4);
    beacon.beginFill(0, 0);
    beacon.drawCircle(0, 0, radius);
    beacon.drawCircle(0, 0, RADIUS_MAX - radius);
    beacon.endFill();
}


export default {
    init: () => Graphics.addChild(beacon),

    setNavPoint: (point: IPoint) => {
        navPoint       = point;
        beacon.x       = point.x;
        beacon.y       = point.y;
        beacon.visible = true;
    },

    update,

    getNavPoint: () => ({...navPoint}),

    clear: () => {
        navPoint       = null;
        beacon.visible = false;
    }
}