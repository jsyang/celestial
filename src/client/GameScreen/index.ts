import Starfield from '../Graphics/Starfield';
import Graphics from '../Graphics';
import Focus from '../Graphics/Focus';
import GameScreenControl from './control';

import Galaxy from '../Galaxy';
import Entity from '../Entity';

import HUD from './HUD';
import TeamSystem from './TeamSystem';
import GalaxyWonModal from '../UI/Modal/GalaxyWonModal';
import GalaxyLostModal from '../UI/Modal/GalaxyLostModal';
import {playSound} from '../assets/audio';
import {isHumanTeam} from '../constants';
import Score from '../Score';
import GameOverModal from '../UI/Modal/GameOverModal';
import NavBeaconHuman from '../Graphics/NavBeaconHuman';

let raf;  // requestAnimationFrame request
let then; // Time stamp of last animation frame

const FPS          = 60;
const FPS_INTERVAL = 1000 / FPS;

let isFadingIn      = true;
let gameScreenAlpha = 0;
let FADE_RATE       = 0.05;

let isPaused = false;
let prevControlledEntity;

function update() {
    TeamSystem.update();
    Entity.updateAll();
    Entity.prepareNext();
}

function step() {
    const now     = Date.now();
    const elapsed = now - then;

    !isPaused && update();
    GameScreenControl.update();

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
            HUD.setFocus(focus);
            Graphics.centerOn(focus);
        }

        NavBeaconHuman.update();
        Graphics.cullRenderable();
        Starfield.process(focus);
        HUD.update();
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

function reinitAll() {
    isPaused = false;
    init();
    GameScreenControl.setControlledEntity(null);
}

function onTeamLost(team) {
    if (isHumanTeam(team)) {
        NavBeaconHuman.clear();
        Score.addBattleResult(-1);
        isPaused = true;
        playSound('galaxy-lose');

        let onClickContinue;

        if (Score.getIsGameOver()) {
            onClickContinue = () => {
                const gameOverModal = GameOverModal.create({
                    // a bit of a hack for now
                    // todo: make this properly destroy the GameScreen
                    // and go back to the main screen
                    onClickContinue: () => location.reload()
                });

                Graphics.addChildToHUD(gameOverModal.modal);
                GameScreenControl.setControlledEntity(gameOverModal);
            };

        } else {
            onClickContinue = reinitAll;
        }

        const lostModal = GalaxyLostModal.create({onClickContinue});

        Graphics.addChildToHUD(lostModal.modal);
        GameScreenControl.setControlledEntity(lostModal);
    }
}

function onTeamWon(team) {
    if (isHumanTeam(team)) {
        NavBeaconHuman.clear();
        isPaused = true;
        Score.addBattleResult(1);
        playSound('galaxy-win');

        const wonModal = GalaxyWonModal.create({
            onClickContinue: reinitAll
        });

        Graphics.addChildToHUD(wonModal.modal);
        GameScreenControl.setControlledEntity(wonModal);
    }
}

function init() {
    addEventListener('resize', onResize);

    isFadingIn      = true;
    gameScreenAlpha = 0;

    Entity.clearAll();
    Graphics.init();

    Starfield.init()
        .forEach(Graphics.addChild);

    NavBeaconHuman.init();

    HUD.init();
    Galaxy.init();

    TeamSystem.init();
    TeamSystem.setOnTeamLostCallback(onTeamLost);
    TeamSystem.setOnTeamWinCallback(onTeamWon);
}

function onResize() {
    HUD.onResize();
    Starfield.onResize();
    Graphics.onResize();
}

const togglePause = () => {
    isPaused = !isPaused;

    if (isPaused) {
        prevControlledEntity = GameScreenControl.getControlledEntity();
        GameScreenControl.setControlledEntity(HUD.pauseModal);
    } else {
        GameScreenControl.setControlledEntity(prevControlledEntity);
        prevControlledEntity = null;
    }

    playSound('pause');
    HUD.setPauseVisible(isPaused);
};

export default {
    init,
    start,
    stop,
    togglePause,
    getIsPaused: () => isPaused
};
