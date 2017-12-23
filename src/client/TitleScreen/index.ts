import Graphics from '../Graphics';
import * as PIXI from "pixi.js";

let raf;  // requestAnimationFrame request
let then; // Time stamp of last animation frame

const FPS          = 60;
const FPS_INTERVAL = 1000 / FPS;

function step() {
    const now     = Date.now();
    const elapsed = now - then;

    if (elapsed > FPS_INTERVAL) {
        Graphics.render();
        then = now - (elapsed % FPS_INTERVAL);
    }

    raf = requestAnimationFrame(step);
}

function start() {
    const title = PIXI.Sprite.fromImage('title.png');
    title.anchor.set(0.5);
    title.x = innerWidth >> 1 - 160;
    title.y = 130;
    Graphics.addChildToHUD(title);

    then = Date.now();
    step();
}

function stop() {
    cancelAnimationFrame(raf);
}

export default {
    start,
    stop
}
