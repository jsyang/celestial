import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';

const textContainer = new PIXI.Container();
const ROWS          = 8;

function onResize() {
    textContainer.x = innerWidth - 5;
    textContainer.y = innerHeight;
}

let textRows: string[] = [];

function init() {
    let text;

    while (textContainer.children.length < ROWS) {
        text = new PIXI.Text(
            '',
            {
                fontFamily: 'arial',
                fontSize:   12,
                fill:       0xaaaaaa
            });

        textContainer.addChild(text);
        textRows.push();

        const lastIndex = textContainer.children.length - 1;
        const child     = textContainer.children[lastIndex] as any;

        child.y = -20 * (lastIndex + 1);
    }

    textRows = [];
    updateTextRows();

    Graphics.addChildToHUD(textContainer);
    addEventListener('resize', onResize);
    onResize();
}

function destroy() {
    removeEventListener('resize', onResize);
}


const SHIFT_TIME_MAX = 400;
let shiftTime        = SHIFT_TIME_MAX;

function updateTextRows() {
    textContainer.children.forEach((child: any, i) => {
        child.text = textRows[i];
        child.x    = -child.width;
    });
}

function update() {
    if (shiftTime > 0) {
        shiftTime--;
    } else {
        shiftTime = SHIFT_TIME_MAX;
        textRows.shift();

        updateTextRows();
    }
}

function displayText(text = '') {
    textRows.push(text);

    if (textRows.length > ROWS) {
        textRows.shift();
    }

    updateTextRows();
}

export default {
    init,
    destroy,
    update,
    displayText
}
