import Starfield from '../Graphics/Starfield';
import Graphics from '../Graphics';
import Focus from '../Graphics/Focus';
import GameScreenControl from './control';

import Galaxy from '../Galaxy';
import Entity from '../Entity';

import HUD from './HUD';
import TeamSystem from './TeamSystem';
import Freelook from '../Graphics/Freelook';
import DockedModal from '../UI/Modal/DockedModal';
import SwapWeaponModal from '../UI/Modal/SwapWeaponModal';
import GalaxyWonModal from '../UI/Modal/GalaxyWonModal';
import GalaxyLostModal from '../UI/Modal/GalaxyLostModal';
import {debounce} from '../debounce';
import {playSound} from '../assets/audio';
import {TEAM} from '../constants';

let raf;  // requestAnimationFrame request
let then; // Time stamp of last animation frame

const FPS          = 60;
const FPS_INTERVAL = 1000 / FPS;

let isFadingIn      = true;
let gameScreenAlpha = 0;
let FADE_RATE       = 0.05;

let isPaused = false;

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
    if (team === TEAM.MAGENTA) {
        isPaused = true;

        const lostModal = GalaxyLostModal.create({
            onClickContinue: reinitAll
        });

        Graphics.addChildToHUD(lostModal.modal);
        GameScreenControl.setControlledEntity(lostModal);
    }
}

function onTeamWon(team) {
    if (team === TEAM.MAGENTA) {
        isPaused = true;

        const wonModal = GalaxyWonModal.create({
            onClickContinue: reinitAll
        });

        Graphics.addChildToHUD(wonModal.modal);
        GameScreenControl.setControlledEntity(wonModal);
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

    HUD.init();
    Galaxy.init();

    TeamSystem.init();
    TeamSystem.setOnTeamLostCallback(onTeamLost);
    TeamSystem.setOnTeamWinCallback(onTeamWon);
}

const togglePauseState = () => {
    isPaused = !isPaused;
    playSound(isPaused ? 'pause' : 'electric-fizzle');
    HUD.setPauseVisible(isPaused);
};

let dockedEntity;

const unpauseAndClearDocked = () => {
    GameScreenControl.setControlledEntity(dockedEntity);
    isPaused     = false;
    dockedEntity = null;
};

const showDockedModal = () => {
    isPaused     = true;
    dockedEntity = GameScreenControl.getControlledEntity();

    const dockedModal = DockedModal.create({
        onClickSetHomePlanet: () => {
            TeamSystem.setHumanTeamHomePlanet(dockedEntity.planet || dockedEntity.spaceport.planet);
            unpauseAndClearDocked();
        },
        onClickSwapWeapon:    showSwapWeaponModal,
        onClickDone:          unpauseAndClearDocked
    });

    Graphics.addChildToHUD(dockedModal.modal);
    GameScreenControl.setControlledEntity(dockedModal);
};

const showSwapWeaponModal = () => {
    isPaused = true;

    const swapWeaponModal = SwapWeaponModal.create({
        fighter:       dockedEntity,
        onClickWeapon: unpauseAndClearDocked
    });

    Graphics.addChildToHUD(swapWeaponModal.modal);
    GameScreenControl.setControlledEntity(swapWeaponModal);
};

export default {
    init,
    start,
    stop,
    showDockedModal,
    togglePause: debounce(togglePauseState, 250),
    getIsPaused: () => isPaused
}
