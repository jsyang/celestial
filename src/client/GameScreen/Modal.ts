import * as PIXI from 'pixi.js';
import Graphics from '../Graphics';

function create({width = 640, height = 480, padding = 4}) {
    const modal = new PIXI.Graphics();
    modal.lineStyle(1, 0x00ff00, 1);
    modal.beginFill(0, 0);
    modal.drawRect(0, 0, width, height);

    modal.beginFill(0x001100, 0.9);
    modal.lineStyle(0, 0, 0);

    modal.drawRect(padding, padding, width - 2 * padding, height - 2 * padding);
    modal.endFill();

    const onResize = () => {
        modal.x = (innerWidth - width) / 2;
        modal.y = (innerHeight - height) / 2;
    };

    onResize();
    addEventListener('resize', onResize);

    return {modal, onResize};
}

function destroy({modal, onResize}) {
    Graphics.removeChildFromHUD(modal);
    removeEventListener('resize', onResize);
}

export default {
    create,
    destroy
}
