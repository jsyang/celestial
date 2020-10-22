/* Barebones version of src/client/Graphics */

import * as PIXI from 'pixi.js';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let renderer;
let width;
let height;

const scene = new PIXI.Container();

function onResize() {
    width  = innerWidth;
    height = innerHeight;

    if (renderer) {
        renderer.resize(width, height);
    }
}

function init() {
    removeAllChildren();

    if (typeof renderer === 'undefined') {
        onResize();
        renderer = new PIXI.Renderer({width, height});
        document.body.appendChild(renderer.view);
    }
}

export const addChild    = child => scene.addChild(child);
export const removeChild = child => scene.removeChild(child);

export const render = () => renderer.render(scene);

const removeAllChildren = () => {
    while (scene.children[0]) scene.removeChild(scene.children[0]);
};

export default {
    init,
    addChild,
    removeChild,
    onResize,
    render
};
