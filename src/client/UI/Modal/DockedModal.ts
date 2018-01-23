import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from '../Button';

const TEXT = 'Fighter is docked to friendly facilities.';

function create({onClickSetHomePlanet, onClickSwapWeapon, onClickDone}) {
    const modal = Modal.create({width: 400, height: 250});

    let buttonStackY = 250;

    buttonStackY -= 40 + 20;
    const doneButton = Button.create({
        text:    'Done',
        width:   360,
        onClick: () => {
            Modal.destroy(modal);
            onClickDone();
        }
    });
    doneButton.x     = 20;
    doneButton.y     = buttonStackY;

    buttonStackY -= 40 + 20;
    const swapWeaponButton = Button.create({
        text:    'Swap weapon',
        width:   360,
        onClick: () => {
            Modal.destroy(modal);
            onClickSwapWeapon();
        }
    });
    swapWeaponButton.x     = 20;
    swapWeaponButton.y     = buttonStackY;

    buttonStackY -= 40 + 20;
    const setHomePlanetButton = Button.create({
        text:    'Set as home planet',
        width:   360,
        onClick: () => {
            Modal.destroy(modal);
            onClickSetHomePlanet();
        }
    });
    setHomePlanetButton.x     = 20;
    setHomePlanetButton.y     = buttonStackY;

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

    modal.modal.addChild(label);

    modal.buttons.push(setHomePlanetButton);
    modal.modal.addChild(setHomePlanetButton);

    modal.buttons.push(swapWeaponButton);
    modal.modal.addChild(swapWeaponButton);

    modal.buttons.push(doneButton);
    modal.modal.addChild(doneButton);

    return modal;
}

export default {
    create
}