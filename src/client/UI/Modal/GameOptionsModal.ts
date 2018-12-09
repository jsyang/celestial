import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from '../Button';
import {restoreFromLocalStorage, saveToLocalStorage} from '../../GameState';
import GameScreen from '../../GameScreen';

const width  = 340;
const height = 240;

function create() {
    const modal = Modal.create({width, height});

    const label = new PIXI.Text(
        'Game options',
        {
            fontFamily: 'arial',
            fontSize:   12,
            fill:       0xaaaaaa,
            align:      'center'
        }
    );
    label.x     = (width - label.width) / 2;
    label.y     = 20;
    modal.modal.addChild(label);

    let modalStackY = height;

    modalStackY -= 20 + 40;
    const buttonSaveGame = Button.create({
        text:    'Save game',
        onClick: () => {
            saveToLocalStorage();
            GameScreen.togglePause();
        }
    });
    buttonSaveGame.x     = 20;
    buttonSaveGame.y     = modalStackY;
    modal.modal.addChild(buttonSaveGame);

    modalStackY -= 20 + 40;
    const buttonLoadGame = Button.create({
        text:    'Load game',
        onClick: () => {
            restoreFromLocalStorage();
            GameScreen.togglePause();
        }
    });
    buttonLoadGame.x     = 20;
    buttonLoadGame.y     = modalStackY;
    modal.modal.addChild(buttonLoadGame);

    modalStackY -= 20 + 40;
    const buttonReturnToGame = Button.create({
        text:    'Return to game',
        onClick: () => GameScreen.togglePause()
    });
    buttonReturnToGame.x     = 20;
    buttonReturnToGame.y     = modalStackY;
    modal.modal.addChild(buttonReturnToGame);

    modal.buttons.push(buttonReturnToGame);
    modal.buttons.push(buttonLoadGame);
    modal.buttons.push(buttonSaveGame);

    return modal;
}

export default {create}