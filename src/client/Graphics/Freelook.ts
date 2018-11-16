import * as PIXI from 'pixi.js';
import {addChildToHUD} from '.';
import {transformPolygon} from '../Geometry';
import {GEOMETRY_FREELOOK} from '../constants';

const PATH = transformPolygon(GEOMETRY_FREELOOK, -32, -32, 0.16, 0.16);

const symbol = new PIXI.Graphics();
symbol.lineStyle(1, 0x00ff00, 1);
symbol.drawPolygon(PATH);

const setIconVisible = visible => symbol.visible = visible;

const MARGIN = 32 + 8;

function onResize() {
    symbol.x = innerWidth - MARGIN;
    symbol.y = MARGIN;
}

function init() {
    addChildToHUD(symbol);
    onResize();
    setIconVisible(false);
    addEventListener('resize', onResize);
}

export default {
    init,
    symbol,
    setIconVisible
}