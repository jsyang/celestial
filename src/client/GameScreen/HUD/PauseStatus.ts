import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import {LETTERS} from '../../constants';
import {transformPolygon} from '../../Geometry';

const label = new PIXI.Graphics() as any;

label.lineStyle(1, 0xffffff, 1);

let dx;
let dy;
let scaleX = 1.25 / 40;
let scaleY = 1 / 40;

dx = 14;
dy = 0;
'game'.split('').forEach(letter => {
    label.drawPolygon(
        transformPolygon(LETTERS[letter], dx, dy, scaleX, scaleY)
    );
    dx += 17;
});

dx = 0;
dy = 20;
'paused'.split('').forEach(letter => {
    label.drawPolygon(
        transformPolygon(LETTERS[letter], dx, dy, scaleX, scaleY)
    );
    dx += 16;
});

function onResize() {
    label.x = (innerWidth - label.width) * 0.5;
    label.y = (innerHeight - label.height) * 0.5 + 40;
}

function setVisible(isVisible) {
    label.renderable = isVisible;

    if (isVisible) {
        onResize();
    }
}

function init() {
    label.renderable = false;
    Graphics.addChildToHUD(label);
}

export default {
    init,
    setVisible,
    onResize
}
