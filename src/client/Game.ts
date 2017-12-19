import Assets from './assets/index';
import Graphics from './Graphics';
import Input from './Input';

import Galaxy from './Galaxy';
import Entity from './Entity';

import RadarGalaxy from './RadarGalaxy';
import RadarLocal from './RadarLocal';
import SystemGravity from './system/gravity';
import SystemTeam from './system/team';

// // // // Game loop // // // //

let raf;
let then;
const FPS = 60;
const FPS_INTERVAL = 1000 / FPS;

function update() {
    SystemTeam();
    Input.process();

    Entity.updateAll();

    SystemGravity();
    RadarGalaxy.update();
    RadarLocal.update();

    Entity.prepareNext();
}

function step() {
    const now = Date.now();
    const elapsed = now - then;

    update();

    if (elapsed > FPS_INTERVAL) {
        const focus = Input.getFocalPoint();

        if(focus) {
            RadarLocal.setOrigin(focus);
            Graphics.centerOn(focus);
        }

        Graphics.render();

        then = now - (elapsed % FPS_INTERVAL);
    }

    raf = requestAnimationFrame(step);
}

export function start() {
    then = Date.now();
    step();
}

export function stop() {
    cancelAnimationFrame(raf);
}

export function onDOMContentLoaded () {
    Galaxy.init();
    RadarLocal.init();

    Assets
        .load()
        .then(start);
}
