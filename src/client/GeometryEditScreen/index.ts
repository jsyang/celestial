import Graphics from './Graphics';
import Editor from './Editor';

let raf;
let then;

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
    Graphics.init();
    Graphics.addChild(
        Editor.create(20, 20)
    );

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
