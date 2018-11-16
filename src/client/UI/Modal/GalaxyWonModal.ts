import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from '../Button';

const TEXT = 'GALAXY CONQUERED\n\nAll enemies in this sector have been eradicated!\nYour empire encompasses all known worlds in this galaxy.';

function create({onClickContinue}) {
    const modal = Modal.create({width: 400, height: 300});

    let buttonStackY = 300;

    buttonStackY -= 40 + 20;
    const continueButton = Button.create({
        text:    'Continue to next sector',
        width:   360,
        onClick: () => {
            Modal.destroy(modal);
            onClickContinue();
        }
    });
    continueButton.x     = 20;
    continueButton.y     = buttonStackY;

    const label = new PIXI.Text(
        TEXT,
        {
            fontFamily: 'arial',
            fontSize:   12,
            fill:       0xffffff,
            align:      'center'
        }
    );
    label.x     = (400 - label.width) / 2;
    label.y     = 40;

    modal.buttons.push(continueButton);

    modal.modal.addChild(continueButton);
    modal.modal.addChild(label);

    return modal;
}

export default {
    create
}