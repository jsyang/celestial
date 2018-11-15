import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import Score from '../../Score';

const UPDATE_TIME_MAX = 10;
const HEIGHT          = 14;
const MARGIN_EDGE     = 4;

const scoreRankDisplay = new PIXI.Graphics();
scoreRankDisplay.y     = (MARGIN_EDGE + 100) * 2 + 14 * 6 + 5 * MARGIN_EDGE;
scoreRankDisplay.x     = MARGIN_EDGE;

const TEXT_STYLE = {
    fontFamily: 'arial',
    fontSize:   12
};

let y = 0;

const rankLabel = new PIXI.Text(
    'Rank',
    {...TEXT_STYLE, fill: 0x888888}
);

rankLabel.y = y;
y += HEIGHT;

const rankText = new PIXI.Text(
    '<rank>',
    {...TEXT_STYLE, fill: 0xffffff}
);

rankText.y = y;
y += HEIGHT;

const scoreLabel = new PIXI.Text(
    'Score',
    {...TEXT_STYLE, fill: 0x888888}
);
scoreLabel.y     = y;
y += HEIGHT;


const scoreText = new PIXI.Text(
    '<score>',
    {...TEXT_STYLE, fill: 0xffffff}
);
scoreText.y     = y;

scoreRankDisplay.addChild(
    rankLabel,
    rankText,
    scoreLabel,
    scoreText
);

let updateTime = 0;

function init(): void {
    Graphics.addChildToHUD(scoreRankDisplay);
}

function update(): void {
    if (updateTime > 0) {
        updateTime--;

    } else {
        const {rank, score} = Score.getScoreRank();
        rankText.text       = rank;
        scoreText.text      = score.toString();

        updateTime = UPDATE_TIME_MAX;
    }
}

export default {
    init,
    update
};
