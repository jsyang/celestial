import Graphics from '../Graphics';
import Starfield from '../Graphics/Starfield';
import TitleScreenControl from './control';
import TitleScreenModal from '../UI/Modal/TitleScreenModal';

let raf;  // requestAnimationFrame request
let then; // Time stamp of last animation frame

const FPS          = 60;
const FPS_INTERVAL = 1000 / FPS;

const focus    = {x: 0, y: 0};
const DISTANCE = 600;
let angle      = 0;
const SPEED    = Math.PI / 180 * 0.02;

let titleScreenAlpha = 1;
const FADE_RATE      = 0.05;
let isFadingOut      = false;


function step() {
    const now         = Date.now();
    const elapsed     = now - then;
    let createNextRAF = true;


    if (!isFadingOut) {
        TitleScreenControl.update(modal);
    }

    if (elapsed > FPS_INTERVAL) {
        if (isFadingOut) {
            Graphics.setGlobalAlpha(titleScreenAlpha);

            if (titleScreenAlpha > 0) {
                titleScreenAlpha -= FADE_RATE;
            } else {
                titleScreenAlpha = 1;
                createNextRAF    = false;
            }
        } else {
            focus.x = Math.cos(angle) * DISTANCE;
            focus.y = Math.sin(angle) * DISTANCE;
            angle += SPEED;

            Graphics.centerOn(focus);

            Starfield.process(focus);
        }

        Graphics.render();
        then = now - (elapsed % FPS_INTERVAL);
    }

    if (createNextRAF) {
        raf = requestAnimationFrame(step);
    } else {
        stop();
    }
}

const modal = TitleScreenModal.create({
    onClickNewGame: () => isFadingOut = true
});

function start() {
    Graphics.init();
    Starfield.init()
        .forEach(Graphics.addChild);

    Graphics.addChildToHUD(modal.modal);

    then = Date.now();
    step();
}

function stop() {
    cancelAnimationFrame(raf);

    if (onFadeOutComplete) {
        onFadeOutComplete();
    }
}

let onFadeOutComplete: Function;

function setFadeOutCallback(cb) {
    onFadeOutComplete = cb;
}

export default {
    setFadeOutCallback,
    start,
    stop
}
