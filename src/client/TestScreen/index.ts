/*

This is a stripped down version of the GameScreen module
used primarily to test ECS emergent behaviors and new game
features in a controlled (read: non-random) environment that
aren't easily as testable in an instance of the GameScreen.

*/

import Starfield from '../Graphics/Starfield';
import Graphics from '../Graphics';
import Focus from '../Graphics/Focus';
import TestScreenControl from './control';

import Entity from '../Entity';

import HUD from '../GameScreen/HUD';
import ScenarioSystem from './ScenarioSystem';

let then; // Time stamp of last animation frame

const FPS          = 60;
const FPS_INTERVAL = 1000 / FPS;


let isPaused = false;

function update() {
    Entity.updateAll();
    Entity.prepareNext();
}

function step() {
    const now     = Date.now();
    const elapsed = now - then;

    !isPaused && update();
    TestScreenControl.update();

    if (elapsed > FPS_INTERVAL) {
        const focus = Focus.getFocus();

        if (focus) {
            HUD.setFocus(focus);
            Graphics.centerOn(focus);
        }

        Graphics.cullRenderable();
        Starfield.process(focus);
        HUD.update();
        Graphics.render();

        then = now - (elapsed % FPS_INTERVAL);
    }

    requestAnimationFrame(step);
}

function start() {
    then = Date.now();
    step();
}

function init() {
    addEventListener('resize', onResize);

    Entity.clearAll();
    Graphics.init();

    Starfield.init()
        .forEach(Graphics.addChild);

    HUD.init(TestScreenControl);

    ScenarioSystem.init();
}

function onResize() {
    HUD.onResize();
    Starfield.onResize();
    Graphics.onResize();
}

const togglePause = () => {
    isPaused = !isPaused;
    HUD.setPauseVisible(isPaused);
};

export default {
    init,
    start,
    togglePause,
    getIsPaused: () => isPaused
};
