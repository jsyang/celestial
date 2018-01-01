import * as PIXI from "pixi.js";
import {playSound} from '../../assets/audio';

function create({text, width = 300, height = 40, onClick}) {
    const button = new PIXI.Graphics();
    button.lineStyle(1, 0xffffff, 1);
    button.drawRect(0, 0, width, height);
    button.tint = 0x00ff00;

    const label = new PIXI.Text(
        text,
        {
            fontFamily: 'arial',
            fontSize:   12,
            fill:       0xffffff,
            align:      'center'
        }
    );
    label.x     = (width - label.width) / 2;
    label.y     = (height - label.height) / 2;

    button.addChild(label);

    button.interactive         = true;
    button.interactiveChildren = false;
    button.buttonMode          = true;
    button.hitArea             = new PIXI.Rectangle(0, 0, width, height);

    button.on('mouseover', ({currentTarget}) => {
        currentTarget.tint = 0xffffff;
        const text         = currentTarget.getChildAt(0);
        text.tint          = 0xff0000;
        playSound('switch-flick');
    });

    button.on('mouseout', ({currentTarget}) => {
        currentTarget.tint = 0x00ff00;
        const text         = currentTarget.getChildAt(0);
        text.tint          = 0xffffff;
    });

    button.on('click', () => {
        onClick();
        playSound('nav');
    });

    return button;
}


export default {
    create
}