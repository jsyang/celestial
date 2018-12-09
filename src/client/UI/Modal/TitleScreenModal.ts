import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from '../Button';
import {LETTERS} from '../../constants';
import {transformPolygon} from '../../Geometry';

const onClickHowToPlay = () => window.open('how-to-play', '_blank');
const onClickGitHub    = () => window.open('http://github.com/jsyang/celestial', '_blank');

const width  = 340;
const height = 420;

function create({onClickNewGame, onClickLoadGame}) {
    const modal = Modal.create({width, height});

    const label = new PIXI.Text(
        `Build: ${process.env.BUILD_DATE} -- ${process.env.BUILD_HASH}`,
        {
            fontFamily: 'arial',
            fontSize:   12,
            fill:       0x112211,
            align:      'left'
        }
    );
    label.x     = 0;
    label.y     = height + 10;
    modal.modal.addChild(label);

    let modalStackY = height;

    modalStackY -= 20 + 40;
    const buttonGitHub = Button.create({
        text:    'Source code',
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
    const buttonLoadGame = Button.create({
        text:    'Load game',
        onClick: onClickLoadGame
    });
    buttonLoadGame.x     = 20;
    buttonLoadGame.y     = modalStackY;
    modal.modal.addChild(buttonLoadGame);

    modalStackY -= 20 + 40;
    const buttonNewGame = Button.create({
        text:    'New game',
        onClick: onClickNewGame
    });
    buttonNewGame.x     = 20;
    buttonNewGame.y     = modalStackY;
    modal.modal.addChild(buttonNewGame);

    modal.buttons.push(buttonNewGame);
    modal.buttons.push(buttonLoadGame);
    modal.buttons.push(buttonHowToPlay);
    modal.buttons.push(buttonGitHub);

    const title = new PIXI.Graphics() as any;
    title.lineStyle(2, 0xffff00, 1);

    let dx;
    let dy;
    let scaleX = 1.25 / 20;
    let scaleY = 1 / 20;

    dx = 40;
    dy = 60;
    'celestial'.split('').forEach(letter => {
        title.drawPolygon(
            transformPolygon(LETTERS[letter], dx, dy, scaleX, scaleY)
        );
        dx += 30;
    });

    dx = 90;
    dy = 100;
    'combat'.split('').forEach(letter => {
        title.drawPolygon(
            transformPolygon(LETTERS[letter], dx, dy, scaleX, scaleY)
        );
        dx += 30;
    });

    const titleBackground = new PIXI.Graphics() as any;

    dx     = 190;
    dy     = 20;
    scaleX = 1 / 3;
    scaleY = 1 / 3;
    titleBackground.lineStyle(12, 0x333300, 1);
    titleBackground.drawPolygon(
        transformPolygon(LETTERS.symbol[0], dx, dy, scaleX, scaleY)
    );
    titleBackground.lineStyle(32, 0x333300, 1);
    titleBackground.drawPolygon(
        transformPolygon(LETTERS.symbol[1], dx, dy, scaleX, scaleY)
    );

    modal.modal.addChild(titleBackground);
    modal.modal.addChild(title);

    return modal;
}

export default {create}