import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from '../Button';
import Score from '../../Score';
import Random from '../../Random';

const GAME_OVER_MESSAGES = [
    'Your career ends with a forced\nretirement after recent losses.',
    'You are dismissed by central command\nfollowing terrible losses.',
    'The desperation of space warfare has driven you mad.\nYou take a permanent vacation by going AWOL.',
    'Losing the second major engagement in a row,\nyour subordinates mutiny against you.',
    'After losing 2 galaxies, your enemies catch you\nand relieve you of duties: by lethal torture.'
].map(s => s.split('\n'));

function create({onClickContinue}) {
    const modal = Modal.create({width: 400, height: 200});

    let buttonStackY = 200;

    buttonStackY -= 40 + 20;
    const continueButton = Button.create({
        text:    'Return to main menu',
        width:   360,
        onClick: () => {
            Modal.destroy(modal);
            onClickContinue();
        }
    });
    continueButton.x     = 20;
    continueButton.y     = buttonStackY;

    const {rank, score} = Score.getScoreRank();

    const gameOverText = Random.arrayElement(GAME_OVER_MESSAGES);

    const label = new PIXI.Text(
        [
            'GAME OVER\n',
            gameOverText[0],
            gameOverText[1],
            '',
            `Your final rank: ${rank.name}.`,
            `Your final score: ${score}.`

        ].join('\n'),
        {
            fontFamily: 'arial',
            fontSize:   12,
            fill:       0xffffff,
            align:      'center'
        }
    );
    label.x     = (400 - label.width) / 2;
    label.y     = 30;

    modal.buttons.push(continueButton);

    modal.modal.addChild(continueButton);
    modal.modal.addChild(label);

    return modal;
}

export default {
    create
}