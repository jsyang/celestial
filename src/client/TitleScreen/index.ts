import * as PIXI from "pixi.js";
import Modal from '../UI/Modal';
import Graphics from '../Graphics';
import Starfield from '../Graphics/Starfield';
import TitleScreenInput from './input';
import Button from '../UI/Button';

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
        TitleScreenInput.update();
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

function onClickNewGame() {
    isFadingOut = true;
}

const menuButtonParams = [
    {
        text:    'New game',
        onClick: onClickNewGame
    },
    {
        text:    'How to play',
        onClick: () => window.open('how-to-play.html', '_blank')
    },
    {
        text:    'GitHub project',
        onClick: () => window.open('http://github.com/jsyang/celestial', '_blank')
    }
];

let menuButtons;

function start() {
    Graphics.init();
    Starfield.init()
        .forEach(Graphics.addChild);

    const menuOptionsModal = Modal.create({width: 340, height: 360});

    let modalStackY = 360;

    menuButtons = menuButtonParams.reverse().map((buttonParams) => {
        modalStackY -= 20 + 40;
        const button = Button.create(buttonParams);
        button.x     = 20;
        button.y     = modalStackY;
        menuOptionsModal.modal.addChild(button);
        return button;
    }).reverse();

    modalStackY -= 20;

    const title = PIXI.Sprite.fromImage('assets/title.png') as any;
    title.anchor.set(0.5);
    title.x = 170;
    title.y = modalStackY - title.height - 70;
    menuOptionsModal.modal.addChild(title);

    Graphics.addChildToHUD(menuOptionsModal.modal);

    then = Date.now();
    step();
}

function stop() {
    menuButtons = [];
    cancelAnimationFrame(raf);

    if (onFadeOutComplete) {
        onFadeOutComplete();
    }
}

let onFadeOutComplete: Function;

function setFadeOutCallback(cb) {
    onFadeOutComplete = cb;
}

let activeIndex = -1;

const updateButtonState = () => {
    menuButtons.forEach((button, index) => {
        if (index === activeIndex) {
            button.mouseover();
        } else {
            button.mouseout();
        }
    });
};

const prevButton = () => {
    activeIndex--;

    if (activeIndex < 0) {
        activeIndex = 0;
    }

    updateButtonState();
};

const nextButton = () => {
    activeIndex++;

    const maxIndex = menuButtons.length - 1;
    if (activeIndex > maxIndex) {
        activeIndex = maxIndex;
    }

    updateButtonState();
};

const clickButton = () => {
    menuButtons[activeIndex].click();
};

export default {
    setFadeOutCallback,

    prevButton,
    nextButton,
    clickButton,

    start,
    stop
}
