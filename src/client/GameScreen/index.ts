import Starfield from '../Graphics/Starfield';
import Graphics from '../Graphics';
import Focus from '../Graphics/Focus';
import Input from '../Input';

import Galaxy from '../Galaxy';
import Entity from '../Entity';

import RadarGalaxy from './RadarGalaxy';
import RadarLocal from './RadarLocal';
import SystemGravity from './system/gravity';
import SystemTeam from './system/team';
import Freelook from '../Graphics/Freelook';
import UnitDisplay from './UnitDisplay';
import WeaponsDisplay from './WeaponsDisplay';
import GalaxyWonModal from '../UI/Modal/GalaxyWonModal';
import GalaxyLostModal from '../UI/Modal/GalaxyLostModal';

let raf;  // requestAnimationFrame request
let then; // Time stamp of last animation frame

const FPS          = 60;
const FPS_INTERVAL = 1000 / FPS;

let isFadingIn      = true;
let gameScreenAlpha = 0;
let FADE_RATE       = 0.05;

let isPaused = false;

function update() {
    SystemTeam.update();
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

    !isPaused && update();

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
        UnitDisplay.update();
        WeaponsDisplay.update();

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

function onTeamLost(team) {
    if (team === Entity.TEAM.MAGENTA) {
        isPaused        = true;
        const lostModal = GalaxyLostModal.create({
            onClickContinue: reinitAll
        });
        Graphics.addChildToHUD(lostModal.modal);
    }
}

function reinitAll() {
    isPaused = false;
    init();
    Input.setControlledEntity(null);
    stop();
    start();
}

function onTeamWon(team) {
    if (team === Entity.TEAM.MAGENTA) {
        isPaused = true;

        const wonModal = GalaxyWonModal.create({
            onClickContinue: reinitAll,
            onClickStay:     () => {
                isPaused = false;
                SystemTeam.setOnTeamWinCallback(new Function());
            }
        });

        Graphics.addChildToHUD(wonModal.modal);
    }
}

function init() {
    isFadingIn      = true;
    gameScreenAlpha = 0;

    Entity.clearAll();
    Graphics.init();
    Freelook.init();

    Starfield
        .init()
        .forEach(Graphics.addChild);

    Galaxy.init();
    RadarLocal.init();
    RadarGalaxy.init();
    UnitDisplay.init();
    WeaponsDisplay.init();

    SystemTeam.init();
    SystemTeam.setOnTeamLostCallback(onTeamLost);
    SystemTeam.setOnTeamWinCallback(onTeamWon);
}

export default {
    init,
    start,
    stop
}
