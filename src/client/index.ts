import Assets from './Assets';
import Graphics from './Graphics';
import Input from './Input';

import Galaxy from './Galaxy';
import Entity from './Entity';

import RadarGalaxy from './RadarGalaxy';
import RadarLocal  from './RadarLocal';
import SystemGravity from './system/gravity';
import SystemTeam from './system/team';

// // // // Game loop // // // //

let raf;
let then;
const FPS          = 60;
const FPS_INTERVAL = 1000 / FPS;

function step() {
    const now     = Date.now();
    const elapsed = now - then;

    update();

    if (elapsed > FPS_INTERVAL) {
        const focus = Input.getFocalPoint();

        RadarLocal.setOrigin(focus);
        Graphics.centerOn(focus);
        Graphics.render();

        then = now - (elapsed % FPS_INTERVAL);
    }

    raf = requestAnimationFrame(step);
}

function start() {
    then = Date.now();
    step();
}

window.addEventListener('DOMContentLoaded', () => {
    Galaxy.init();
    RadarLocal.init();

    Assets.load()
        .then(start);
});

// // // // Game logic // // // //

function update() {
    SystemTeam();
    Input.process();

    Entity.updateAll();

    SystemGravity();
    RadarGalaxy.update();
    RadarLocal.update();

    Entity.prepareNext();
}
