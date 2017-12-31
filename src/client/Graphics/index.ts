import * as PIXI from 'pixi.js';
import {IPoint} from '../types';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;


let renderer;
let width, width2;
let height, height2;

// Scene is the graphic container for all the objects rendered as part of the game
const scene = new PIXI.Container();

// Stage is the graphics container for all the interactive game entities
const stage = new PIXI.Container();

function onResize() {
    width   = innerWidth;
    height  = innerHeight;
    width2  = width >> 1;
    height2 = height >> 1;

    if (renderer) {
        renderer.resize(width, height);
    }
}

function init() {
    if (typeof renderer === 'undefined') {
        addEventListener('resize', onResize);
        onResize();
        scene.addChild(stage);
        renderer = new PIXI.WebGLRenderer(width, height);
        document.body.appendChild(renderer.view);
    }
}

const setGlobalAlpha = alpha => scene.alpha = alpha;
export const addChildToHUD      = child => scene.addChild(child);
export const removeChildFromHUD = child => scene.removeChild(child);
export const addChild           = child => stage.addChild(child);
export const removeChild        = child => stage.removeChild(child);

export const render = () => renderer.render(scene);

export const centerOn = (point: IPoint) => {
    if (point) {
        stage.x = width2 - point.x;
        stage.y = height2 - point.y;
    }
};

const removeAllChildren = () => {
    while (stage.children[0]) stage.removeChild(stage.children[0]);
    while (scene.children[0]) scene.removeChild(scene.children[0]);
    scene.addChild(stage);
};

export default {
    init,
    setGlobalAlpha,
    addChild,
    removeChild,
    removeAllChildren,
    render,
    centerOn,
    addChildToHUD,
    removeChildFromHUD
};