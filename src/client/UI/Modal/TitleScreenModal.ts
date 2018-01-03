import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from '../Button';

const onClickHowToPlay = () => window.open('how-to-play.html', '_blank');
const onClickGitHub    = () => window.open('http://github.com/jsyang/celestial', '_blank');

function create({onClickNewGame}) {
    const modal = Modal.create({width: 340, height: 360});

    let modalStackY = 360;

    modalStackY -= 20 + 40;
    const buttonGitHub = Button.create({
        text:    'GitHub project',
        onClick: onClickGitHub
    });
    buttonGitHub.x     = 20;
    buttonGitHub.y     = modalStackY;
    modal.modal.addChild(buttonGitHub);


    modalStackY -= 20 + 40;
    const buttonHowToPlay = Button.create({
        text:    'How to play',
        onClick: onClickHowToPlay
    });
    buttonHowToPlay.x     = 20;
    buttonHowToPlay.y     = modalStackY;
    modal.modal.addChild(buttonHowToPlay);

    modalStackY -= 20 + 40;
    const buttonNewGame = Button.create({
        text:    'New game',
        onClick: onClickNewGame
    });
    buttonNewGame.x     = 20;
    buttonNewGame.y     = modalStackY;
    modal.modal.addChild(buttonNewGame);

    modal.buttons.push(buttonNewGame);
    modal.buttons.push(buttonHowToPlay);
    modal.buttons.push(buttonGitHub);

    modalStackY -= 20;

    const title = PIXI.Sprite.fromImage('assets/title.png') as any;
    title.anchor.set(0.5);
    title.x = 170;
    title.y = modalStackY - title.height - 70;
    modal.modal.addChild(title);

    return modal;
}

export default {
    create
}