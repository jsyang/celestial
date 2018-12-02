import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import {TEAM, TEAM_COLOR} from '../../constants';

const textContainer = new PIXI.Container();
const ROWS          = 4;
const MARGIN_EDGE   = 12;

function onResize() {
    textContainer.x = MARGIN_EDGE;
    textContainer.y = innerHeight - MARGIN_EDGE + 4;
}

function init() {
    let text;

    while (textContainer.children.length < ROWS) {
        text = new PIXI.Text(
            '',
            {
                fontFamily: 'arial',
                fontSize:   12,
                fill:       TEAM_COLOR[TEAM.MAGENTA]
            });

        textContainer.addChild(text);

        const lastIndex = textContainer.children.length - 1;
        const child     = textContainer.children[lastIndex] as any;

        child.y = -20 * (lastIndex + 1);
    }

    Graphics.addChildToHUD(textContainer);
    onResize();
}

const CLEAR_ROWS = ' '.repeat(ROWS).split('');

function displayText(newRows = CLEAR_ROWS) {
    for (let i = ROWS - 1; i >= 0; i--) {
        (textContainer.children[i] as PIXI.Text).text = newRows[ROWS - i - 1] || '';
    }
}

export default {
    init,
    clear: () => displayText(),
    onResize,
    displayText
}
