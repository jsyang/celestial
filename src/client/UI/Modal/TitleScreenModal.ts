import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from '../Button';

const onClickHowToPlay = () => window.open('how-to-play.html', '_blank');
const onClickGitHub    = () => window.open('http://github.com/jsyang/celestial', '_blank');

const width  = 340;
const height = 360;

declare const BUILD_DATE: string;
declare const BUILD_HASH: string;

function create({onClickNewGame}) {
    const modal = Modal.create({width, height});

    const label = new PIXI.Text(
        `Build: ${BUILD_DATE} -- ${BUILD_HASH}`,
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

    /*
    const title = PIXI.Sprite.fromImage('assets/title.png') as any;
    title.anchor.set(0.5);
    title.x = 170;
    title.y = modalStackY - title.height - 70;
    */

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
            translatePolygon(LETTERS[letter], dx, dy, scaleX, scaleY)
        );
        dx += 30;
    });

    dx = 90;
    dy = 100;
    'combat'.split('').forEach(letter => {
        title.drawPolygon(
            translatePolygon(LETTERS[letter], dx, dy, scaleX, scaleY)
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
        translatePolygon(LETTERS.symbol[0], dx, dy, scaleX, scaleY)
    );
    titleBackground.lineStyle(32, 0x333300, 1);
    titleBackground.drawPolygon(
        translatePolygon(LETTERS.symbol[1], dx, dy, scaleX, scaleY)
    );

    modal.modal.addChild(titleBackground);
    modal.modal.addChild(title);

    return modal;
}

const translatePolygon = (poly, dx = 0, dy = 0, sx = 1, sy = 1) =>
    poly.map((coord, index) => index % 2 === 0 ? coord * sx + dx : coord * sy + dy);

const LETTERS = {
    c:      [400, 100, 300, 0, 100, 0, 0, 100, 0, 300, 100, 400, 300, 400, 400, 300],
    e:      [400, 0, 0, 0, 0, 200, 300, 200, 0, 200, 0, 400, 400, 400],
    l:      [0, 0, 0, 400, 400, 400],
    s:      [400, 0, 100, 0, 0, 100, 100, 200, 300, 200, 400, 300, 300, 400, 0, 400],
    t:      [0, 0, 200, 0, 200, 400, 200, 0, 400, 0],
    i:      [0, 0, 400, 0, 200, 0, 200, 400, 0, 400, 400, 400],
    a:      [0, 400, 0, 166.66666666666669, 200, 0, 400, 166.66666666666669, 400, 400, 400, 200, 0, 200],
    b:      [400, 100, 300, 0, 0, 0, 0, 400, 300, 400, 400, 300, 300, 200, 0, 200, 300, 200, 400, 100],
    m:      [0, 400, 0, 0, 200, 266.6666666666667, 400, 0, 400, 400],
    o:      [0, 100, 100, 0, 300, 0, 400, 100, 400, 300, 300, 400, 100, 400, 0, 300, 0, 100],
    symbol: [
        [0, 233.33333333333334, 0, 166.66666666666669, 33.333333333333336, 66.66666666666667, 66.66666666666667, 33.333333333333336, 166.66666666666669, 0, 233.33333333333334, 0, 333.33333333333337, 33.333333333333336, 366.6666666666667, 66.66666666666667, 400, 166.66666666666669, 400, 233.33333333333334, 366.6666666666667, 333.33333333333337, 333.33333333333337, 366.6666666666667, 233.33333333333334, 400, 166.66666666666669, 400, 66.66666666666667, 366.6666666666667, 33.333333333333336, 333.33333333333337, 0, 233.33333333333334, 400, 166.66666666666669],
        [33.333333333333336, 66.66666666666667, 366.6666666666667, 333.33333333333337]
    ]
};

export default {
    create,
    LETTERS
}