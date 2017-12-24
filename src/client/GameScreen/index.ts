import Starfield from '../Graphics/Starfield';
import Graphics from '../Graphics';
import Focus from '../Graphics/Focus';
import Input from '../Input';

import Galaxy from '../Galaxy';
import Entity from '../Entity';

import RadarGalaxy from '../RadarGalaxy';
import RadarLocal from '../RadarLocal';
import SystemGravity from '../system/gravity';
import SystemTeam from '../system/team';
import Freelook from '../Graphics/Freelook';

let raf;  // requestAnimationFrame request
let then; // Time stamp of last animation frame

const FPS          = 60;
const FPS_INTERVAL = 1000 / FPS;

let isFadingIn      = true;
let gameScreenAlpha = 0;
let FADE_RATE       = 0.02;

function update() {
    SystemTeam();
    Input.processGameScreen();

    Entity.updateAll();

    SystemGravity();
    RadarGalaxy.update();
    RadarLocal.update();

    Entity.prepareNext();
}

function step() {
    const now     = Date.now();
    const elapsed = now - then;

    update();

    if (elapsed > FPS_INTERVAL) {
        if (isFadingIn) {
            if (gameScreenAlpha < 1) {
                gameScreenAlpha += FADE_RATE;
            } else {
                gameScreenAlpha = 1;
                isFadingIn      = false;
            }

            Graphics.setGlobalAlpha(gameScreenAlpha);

        }

        const focus = Focus.getFocus();

        if (focus) {
            RadarLocal.setOrigin(focus);
            Graphics.centerOn(focus);
        }

        Starfield.process(focus);

        Graphics.render();

        then = now - (elapsed % FPS_INTERVAL);
    }

    raf = requestAnimationFrame(step);
}

function start() {
    then = Date.now();
    step();
}

function stop() {
    cancelAnimationFrame(raf);
}

function init() {
    isFadingIn      = true;
    gameScreenAlpha = 0;

    Graphics.init();
    Freelook.init();

    Starfield
        .init()
        .forEach(Graphics.addChild);

    Galaxy.init();
    RadarLocal.init();
    RadarGalaxy.init();
}

export default {
    init,
    start,
    stop
}
