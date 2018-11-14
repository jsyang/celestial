import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import GameScreenControl from '../control';
import {ERROR_MARGIN_LANDING_SPEED2} from '../../component/gravitate';

const UPDATE_TIME_MAX = 5;
const WIDTH           = 100;
const HEIGHT          = 15;
const MARGIN_EDGE     = 4;
const PROGRESS_FACTOR = 1 / ERROR_MARGIN_LANDING_SPEED2;

const speedIndicator = new PIXI.Graphics();
speedIndicator.y     = (MARGIN_EDGE + 100) * 2 + 14 * 4 + 4 * MARGIN_EDGE;
speedIndicator.x     = MARGIN_EDGE;

speedIndicator.addChild(new PIXI.Text(
    '  Landing Speed',
    {
        fontFamily: 'arial',
        fontSize:   12,
        fill:       0
    }
));

let updateTime = 0;

function init(): void {
    Graphics.addChildToHUD(speedIndicator);
}

function update(): void {
    if (updateTime > 0) {
        updateTime--;

    } else {
        const controlledEntity = GameScreenControl.getControlledEntity();

        if (controlledEntity) {
            const {dx, dy} = controlledEntity;

            if (!isNaN(dx + dy)) {
                let color = 0x00ff00;

                const speed2        = dx * dx + dy * dy;
                const speedProgress = Math.min(speed2 * PROGRESS_FACTOR, 1);
                const currentWidth  = speedProgress * WIDTH;

                speedIndicator.beginFill(0x444444, 1);
                speedIndicator.drawRect(0, 0, WIDTH, HEIGHT);
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
                speedIndicator.drawRect(0, 0, currentWidth, HEIGHT);
                speedIndicator.endFill();
            }
        }

        updateTime = UPDATE_TIME_MAX;
    }
}

export default {
    init,
    update
};
