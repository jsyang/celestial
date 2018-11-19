import * as PIXI from 'pixi.js';
import {IPoint} from '../types';
import Entity from '../Entity';
import LivingEntity from '../Entity/LivingEntity';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

let renderer;
let width;
let width2;
let height;
let height2;

// Scene is the graphic container for all the objects rendered as part of the game
// HUD and UI elements included
const scene = new PIXI.Container();

// Stage is the graphics container for all the game entities
// Spaceships, projectiles, etc.
const stage = new PIXI.Container();

// Dict of modals and HUD elements that need to be updated
let sceneChildrenOnResizeFuncs: Record<string, Function> = {};

function onResize(): void {
    width   = innerWidth;
    height  = innerHeight;
    width2  = width >> 1;
    height2 = height >> 1;

    if (renderer) {
        renderer.resize(width, height);

        Object.values(sceneChildrenOnResizeFuncs).forEach(
            func => func()
        );
    }
}

const removeAllChildren = () => {
    sceneChildrenOnResizeFuncs = {};

    while (stage.children[0]) {
        stage.removeChild(stage.children[0]);
    }

    while (scene.children[0]) {
        scene.removeChild(scene.children[0]);
    }

    scene.addChild(stage);
};

function init(): void {
    removeAllChildren();

    if (typeof renderer === 'undefined') {
        onResize();
        scene.addChild(stage);
        renderer = new PIXI.WebGLRenderer(width, height);
        document.body.appendChild(renderer.view);
    }
}

const setGlobalAlpha = alpha => scene.alpha = alpha;

export const addChildToHUD = child => {
    if (child.modal) {
        const {modal, id, onResize} = child;
        scene.addChild(modal);
        sceneChildrenOnResizeFuncs[id] = onResize;
    } else {
        scene.addChild(child);
    }
};

export const removeChildFromHUD = child => {
    if (child.modal) {
        const {modal, id} = child;

        scene.removeChild(modal);
        delete sceneChildrenOnResizeFuncs[id];
    } else {
        scene.removeChild(child);
    }
};

export const addChild    = child => stage.addChild(child);
export const removeChild = child => stage.removeChild(child);

export const render = () => renderer.render(scene);

const RENDER_CULLING_MARGIN = 200;

export const isOutsideViewport = ({x, y}) => (
    x < -stage.x - RENDER_CULLING_MARGIN ||
    x > -stage.x + width + RENDER_CULLING_MARGIN ||
    y < -stage.y - RENDER_CULLING_MARGIN ||
    y > -stage.y + height + RENDER_CULLING_MARGIN
);

export const centerOn = (point: IPoint) => {
    if (point) {
        stage.x = -(point.x - width2);
        stage.y = -(point.y - height2);
    }
};

// Cull entities outside of viewport
function cullRenderable() {
    Entity.getAll().forEach(
        (entity: LivingEntity) => entity.geo.graphics.visible = !isOutsideViewport(entity)
    );
}

export default {
    init,
    setGlobalAlpha,
    addChild,
    removeChild,
    render,
    centerOn,
    addChildToHUD,
    removeChildFromHUD,
    cullRenderable,
    onResize
};
