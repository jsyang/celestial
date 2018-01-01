import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics/index';

function create({width = 640, height = 480}) {
    const modal = new PIXI.Graphics();
    modal.lineStyle(1, 0x00ff00, 1);
    modal.beginFill(0, 1);
    modal.drawRect(0, 0, width, height);
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
