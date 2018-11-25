import * as PIXI from 'pixi.js';
import Graphics, {isOutsideViewport} from '../../Graphics';
import GameScreenControl from '../control';
import {TARGET_RETICLE} from '../../constants';
import {transformPolygon} from '../../Geometry';

const targetReticle = new PIXI.Graphics();

function init(): void {
    Graphics.addChildToHUD(targetReticle);
}

let isShimmering = 0;

function update(): void {
    const controlledEntity = GameScreenControl.getControlledEntity();

    if (controlledEntity && controlledEntity.attackTarget && !isOutsideViewport(controlledEntity.attackTarget)) {
        targetReticle.visible = true;

        let {
                reticleWidth2,
                reticleHeight2,
                x, y,
                reticleOffsetX = 0,
                reticleOffsetY = 0
            } = controlledEntity.attackTarget;

        const sceneCoord = Graphics.getSceneCoordFromStageCoord(x, y);


        if (!reticleWidth2 || !reticleHeight2) {
            const bounds   = controlledEntity.attackTarget.geo.graphics.getBounds();
            reticleWidth2  = (bounds.width >> 1) + 10;
            reticleHeight2 = (bounds.height >> 1) + 10;
        }

        targetReticle.x = sceneCoord.x + reticleOffsetX;
        targetReticle.y = sceneCoord.y + reticleOffsetY;
        targetReticle.clear();
        targetReticle.beginFill(0, 0);
        targetReticle.lineStyle(1, isShimmering % 6 ? 0xff0000 : 0x00ffff, 1);

        targetReticle.drawPolygon(transformPolygon(TARGET_RETICLE[0], -reticleWidth2, -reticleHeight2));
        targetReticle.drawPolygon(transformPolygon(TARGET_RETICLE[1], reticleWidth2, -reticleHeight2));
        targetReticle.drawPolygon(transformPolygon(TARGET_RETICLE[2], reticleWidth2, reticleHeight2));
        targetReticle.drawPolygon(transformPolygon(TARGET_RETICLE[3], -reticleWidth2, reticleHeight2));
        targetReticle.endFill();

        isShimmering++;
    } else {
        targetReticle.visible = false;
        isShimmering          = 0;
    }
}

export default {
    init,
    update
};
