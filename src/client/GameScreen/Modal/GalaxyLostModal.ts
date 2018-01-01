import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from './Button';

const TEXT = 'GALAXY LOST\n\nFriendly forces have been vanquished!\nYour empire has failed to establish\na foothold in this galaxy.';

function create({onClickContinue}) {
    const modal = Modal.create({width: 400, height: 200});

    let buttonStackY = 200;

    buttonStackY -= 40 + 20;
    const continueButton = Button.create({
        text:    'Retreat to a different sector',
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
    label.y     = 30;


    modal.modal.addChild(continueButton);
    modal.modal.addChild(label);

    return modal;
}

export default {
    create
}