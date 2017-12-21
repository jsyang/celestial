import * as PIXI from 'pixi.js';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

import StarField from './Starfield';
import Freelook from './Freelook';
import {IPoint} from '../types';

let renderer;
let width, width2;
let height, height2;
let lastX, lastY;

function updateDimensions() {
    width   = innerWidth;
    height  = innerHeight;
    width2  = width >> 1;
    height2 = height >> 1;

    if (renderer) {
        renderer.resize(width, height);
    }
}

updateDimensions();

// Scene is the graphic container for all the objects rendered as part of the game
const scene = new PIXI.Container();

// Stage is the graphics container for all the interactive game entities
const stage = new PIXI.Container();
scene.addChild(stage);

renderer = new PIXI.WebGLRenderer(width, height);

StarField.init(stage);

const clearLastCoordinates = () => lastX = lastY = undefined;

const updateFreelookPosition = () => Freelook.setIconPosition(
    innerWidth - 16 - 4,
    16 + 4
);

// Attach view and bind resize
if (document && window) {

    window.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(renderer.view);
    });

    window.addEventListener('resize', () => {
        updateDimensions();
        clearLastCoordinates();
        updateFreelookPosition();
    });
}

export const addChildToHUD = child => scene.addChild(child);
export const addChild      = child => stage.addChild(child);
export const removeChild   = child => stage.removeChild(child);

addChildToHUD(Freelook.symbol);
updateFreelookPosition();


export const render = () => renderer.render(scene);

export const centerOn = (point: IPoint) => {
    if (point) {
        stage.x = width2 - point.x;
        stage.y = height2 - point.y;

        const dx = point.x - lastX;
        const dy = point.y - lastY;

        if (lastX === undefined && lastY === undefined) {
            StarField.reinit(point);
        } else {
            StarField.process(point, dx, dy);
        }

        lastX = point.x;
        lastY = point.y;
    } else {
        clearLastCoordinates();
    }
};

export default {
    addChild,
    removeChild,
    render,
    centerOn,
    addChildToHUD
};