import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import GameScreenControl from '../control';
import {ERROR_MARGIN_LANDING_SPEED2} from '../../component/gravitate';

const WIDTH           = 100;
const HEIGHT          = 14;
const PROGRESS_FACTOR = 1 / ERROR_MARGIN_LANDING_SPEED2;
const OFFSET_X        = WIDTH >> 1;
const OFFSET_Y        = (HEIGHT >> 1) + 20;

const speedIndicator = new PIXI.Graphics();
const speedText      = new PIXI.Text(
    'Landing Speed',
    {
        fontFamily: 'arial',
        fontSize:   12,
        fill:       0xffffff
    }
);

speedText.x = -OFFSET_X;
speedText.y = OFFSET_Y;
speedIndicator.addChild(speedText);

let isVisible = true;

function init(): void {
    onResize();
    Graphics.addChildToHUD(speedIndicator);
}

function update(): void {
    if (!isVisible) return;

    const controlledEntity = GameScreenControl.getControlledEntity();

    if (controlledEntity) {
        const {dx, dy} = controlledEntity;

        if (!isNaN(dx + dy)) {
            let color = 0x00ff00;

            const speed2        = dx * dx + dy * dy;
            const speedProgress = Math.min(speed2 * PROGRESS_FACTOR, 1);
            const currentWidth  = speedProgress * WIDTH;

            speedIndicator.beginFill(0x444444, 1);
            speedIndicator.drawRect(-OFFSET_X, 14 + OFFSET_Y, WIDTH, HEIGHT);
            speedIndicator.endFill();

            if (speedProgress > 0.3) {
                color = 0x88ff00;
            }

            if (speedProgress > 0.5) {
                color = 0xffff00;
            }

            if (speedProgress > 0.7) {
                color = 0xff8800;
            }

            if (speedProgress > 0.9) {
                color = 0xff0000;
            }

            speedIndicator.beginFill(color, 1);
            speedIndicator.drawRect(-OFFSET_X, 14 + OFFSET_Y, currentWidth, HEIGHT);
            speedIndicator.endFill();
        }
    }
}

function setVisible(_isVisible) {
    speedIndicator.visible = _isVisible;
    isVisible              = _isVisible;
}

function onResize() {
    speedIndicator.x = innerWidth >> 1;
    speedIndicator.y = innerHeight >> 1;
}

export default {
    init,
    update,
    setVisible,
    onResize
};
