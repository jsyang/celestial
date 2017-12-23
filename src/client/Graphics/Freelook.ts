import * as PIXI from 'pixi.js';
import {addChildToHUD} from '.';

const symbol = new PIXI.Graphics();

const PATH = [
    0, 0,
    -1, -1,
    -0.5, -1,
    -1, -1,
    -1, -0.5,
    -1, -1
].map(v => 16 * v);

// const LINE_COLOR_BLINK = 0xffffff;
const LINE_COLOR = 0x008800;

const createArrow = (rotation) => {
    const icon = new PIXI.Graphics();

    icon.lineStyle(1, LINE_COLOR, 1);
    icon.x = 0;
    icon.y = 0;

    icon.beginFill(0, 0);
    icon.lineWidth = 1;
    icon.drawPolygon(PATH);
    icon.endFill();

    icon.rotation = rotation;

    return icon;
};

symbol.addChild(
    createArrow(0),
    createArrow(Math.PI * 0.5),
    createArrow(Math.PI),
    createArrow(Math.PI * 1.5)
);

const setIconVisible = visible => symbol.visible = visible;

const MARGIN = 16 + 4;

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