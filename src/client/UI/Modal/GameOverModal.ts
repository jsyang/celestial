import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from '../Button';
import Score from '../../Score';

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

    const label = new PIXI.Text(
        [
            'GAME OVER\n',
            'Your career ends with a forced',
            'retirement after recent losses.\n',
            `Your final rank is ${rank.name}.`,
            `Your final score is ${score}.`

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