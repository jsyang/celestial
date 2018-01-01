import * as PIXI from "pixi.js";
import Graphics from '../Graphics';
import Starfield from '../Graphics/Starfield';
import {playSound} from '../assets/audio';
import TitleScreenInput from './input';

let raf;  // requestAnimationFrame request
let then; // Time stamp of last animation frame

const FPS          = 60;
const FPS_INTERVAL = 1000 / FPS;

const focus    = {x: 0, y: 0};
const DISTANCE = 600;
let angle      = 0;
const SPEED    = Math.PI / 180 * 0.02;

let titleScreenAlpha = 1;
const FADE_RATE      = 0.02;
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
    menuItemSprites.forEach(item => {
        item.off('tap');
        item.off('click');
        item.off('mouseout');
        item.off('mouseover');
    });

    isFadingOut = true;
}

const menu: any = [
    {
        filename: 'assets/title.png',
        dy:       -200
    },
    {
        filename: 'assets/new-game.png',
        dy:       -50,
        onClick:  onClickNewGame
    },
    {
        filename: 'assets/how-to-play.png',
        dy:       50,
        onClick:  () => window.open('how-to-play.html', '_blank')
    },
    {
        filename: 'assets/about.png',
        dy:       150,
        onClick:  () => window.open('http://github.com/jsyang/celestial', '_blank')
    }
];

let menuItemSprites: PIXI.Sprite[] = [];

function onMouseOverMenuButton() {
    this.alpha = 0.5;
    playSound('switch-flick');
}

function onMouseOutMenuButton() {
    this.alpha = 1;
}

function createMenuButton({filename, onClick, dy}: any): PIXI.Sprite {
    const menuButton = PIXI.Sprite.fromImage(filename) as any;

    menuButton.anchor.set(0.5);
    menuButton.y = innerHeight >> 1 + dy;

    if (onClick) {
        const _onClick = () => {
            playSound('heavy-switch');
            onClick();
        };

        menuButton.buttonMode  = true;
        menuButton.interactive = true;
        menuButton.on('mouseover', onMouseOverMenuButton);
        menuButton.on('mouseout', onMouseOutMenuButton);
        menuButton.on('tap', _onClick);
        menuButton.on('click', _onClick);
    }

    return menuButton;
}

const onResize = () => {
    menuItemSprites.forEach((item, index) => {
        item.x = innerWidth / 2;
        item.y = innerHeight / 2 + menu[index].dy;
    });
};

function start() {
    Graphics.init();
    Starfield.init()
        .forEach(Graphics.addChild);

    menuItemSprites = menu.map(createMenuButton);
    menuItemSprites.forEach(Graphics.addChildToHUD);

    addEventListener('resize', onResize);
    onResize();

    then = Date.now();
    step();
}

function stop() {
    cancelAnimationFrame(raf);
    removeEventListener('resize', onResize);

    if (onFadeOutComplete) {
        onFadeOutComplete();
    }
}

let onFadeOutComplete: Function;

function setFadeOutCallback(cb) {
    onFadeOutComplete = cb;
}

let activeButtonIndex = 0;

function updateActiveButton() {
    activeButtonIndex = Math.max(
        Math.min(activeButtonIndex, menu.length - 1),
        1
    );

    menuItemSprites.forEach((item, index) => {
        if (index === activeButtonIndex) {
            onMouseOverMenuButton.call(menuItemSprites[activeButtonIndex]);
        } else {
            onMouseOutMenuButton.bind(item)();
        }
    });
}

function nextButton() {
    activeButtonIndex++;
    updateActiveButton();
}

function prevButton() {
    activeButtonIndex--;
    updateActiveButton();
}

function clickButton() {
    menu[activeButtonIndex].onClick();
    playSound('heavy-switch');
}

export default {
    setFadeOutCallback,

    prevButton,
    nextButton,
    clickButton,

    start,
    stop
}
