import {IPoint} from '../types';
import {transformPolygon} from '../Geometry';
import Graphics from '.';

let navPoint;

const beacon = new PIXI.Graphics();
beacon.beginFill(0x00ffff, 0.05);
beacon.drawCircle(0, 0, 60);
beacon.endFill();

const SCALE = 0.05;

// "NAV"
[
    [0, 400, 33.333333333333336, 0, 366.6666666666667, 400, 400, 0],
    [0, 400, 266.6666666666667, 0, 400, 400, 333.33333333333337, 200, 133.33333333333334, 200],
    [0, 0, 100, 400, 400, 0]
].map((poly, i) => {
    beacon.beginFill(0, 0);
    beacon.lineStyle(1, 0x00aaaa, 1);
    beacon.drawPolygon(
        transformPolygon(poly, i * 20 - 30, -10, SCALE, SCALE)
    );
    beacon.endFill();
});

beacon.visible = false;

export default {
    init: () => Graphics.addChild(beacon),

    setNavPoint: (point: IPoint) => {
        navPoint       = point;
        beacon.x       = point.x;
        beacon.y       = point.y;
        beacon.visible = true;
    },

    getNavPoint: () => ({...navPoint}),

    clear: () => {
        navPoint       = null;
        beacon.visible = false;
    }
}