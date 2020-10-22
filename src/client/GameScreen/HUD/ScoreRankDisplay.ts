import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import Score from '../../Score';

const UPDATE_TIME_MAX = 20;
const MARGIN_EDGE     = 12;
const HEIGHT          = 14;
const WIDTH           = 100;


const scoreRankDisplay = new PIXI.Graphics();
scoreRankDisplay.x     = MARGIN_EDGE;
scoreRankDisplay.y     = MARGIN_EDGE * 2 + WIDTH;

const TEXT_STYLE = {
    fontFamily: 'arial',
    fontSize:   12
};

const rankText = new PIXI.Text(
    '<rank>',
    {...TEXT_STYLE, fill: 0xffffff}
);

scoreRankDisplay.addChild(
    rankText
);

let updateTime = 0;

function init(): void {
    Graphics.addChildToHUD(scoreRankDisplay);
}

function update(): void {
    if (updateTime > 0) {
        updateTime--;

    } else {
        scoreRankDisplay.clear();
        const {rank, score, nextRank} = Score.getScoreRank();
        rankText.text                 = rank.name;

        scoreRankDisplay.beginFill(0x444444, 1);
        scoreRankDisplay.drawRect(0, HEIGHT + 2, WIDTH, HEIGHT);
        scoreRankDisplay.endFill();

        scoreRankDisplay.beginFill(0x00ffff, 1);
        scoreRankDisplay.drawRect(0, HEIGHT + 2, WIDTH * ((score - rank.scoreNeeded) / nextRank.scoreNeeded), HEIGHT);
        scoreRankDisplay.endFill();

        updateTime = UPDATE_TIME_MAX;
    }
}

export default {
    init,
    update
};
