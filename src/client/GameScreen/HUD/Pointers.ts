// HUD pointers
// Available to any unit

import * as PIXI from 'pixi.js';
import Graphics, {isOutsideViewport} from '../../Graphics';
import Entity from '../../Entity';
import {AVOID_DIVZERO_VALUE, getDistSquared} from '../../entityHelpers';
import SpeedIndicator from './SpeedIndicator';
import GameScreenControl from '../control';
import {POINTER, POINTER_NAV, POINTER_TARGET} from '../../constants';
import {transformPolygon} from '../../Geometry';
import NavBeaconHuman from '../../Graphics/NavBeaconHuman';

const LANDING_SPEED_VISIBLE_AT_DIST2 = 300 ** 2;

const pointerContainer = new PIXI.Graphics();

const pointerStar = new PIXI.Graphics();
pointerStar.beginFill(0, 0);
pointerStar.lineStyle(2, 0xffff00, 1);
pointerStar.drawPolygon(transformPolygon(POINTER, -10, -10));
pointerStar.endFill();
pointerStar.visible = false;

const pointerPlanet = new PIXI.Graphics();
pointerPlanet.beginFill(0, 0);
pointerPlanet.lineStyle(2, 0x00ff00, 1);
pointerPlanet.drawPolygon(transformPolygon(POINTER, -10, -10));
pointerPlanet.endFill();
pointerPlanet.visible = false;


const pointerTarget = new PIXI.Graphics();
pointerTarget.beginFill(0, 0);
pointerTarget.lineStyle(1, 0xffffff, 1);
pointerTarget.drawPolygon(transformPolygon(POINTER_TARGET, -10, -10));
pointerTarget.endFill();
pointerTarget.visible = false;

// Shimmer function
(pointerTarget as any).shimmer = () => pointerTarget.tint = updateCycle % 10 ? 0xff0000 : 0xffffff;

const pointerNav = new PIXI.Graphics();
pointerNav.beginFill(0, 0);
pointerNav.lineStyle(1.5, 0x00ffff, 1);
pointerNav.drawPolygon(transformPolygon(POINTER_NAV, -10, -10));
pointerNav.endFill();
pointerNav.visible = false;


pointerContainer.addChild(pointerStar, pointerPlanet, pointerTarget, pointerNav);

const POINTER_WIDTH2  = 12;
const POINTER_HEIGHT2 = 12;

let width   = 0;
let width2  = 0;
let height  = 0;
let height2 = 0;

let aspectRatio = 1;

let nearestPlanet, nearestStar;

function init() {
    onResize();
    Graphics.addChildToHUD(pointerContainer);
}

let updateCycle        = 0;
const UPDATE_CYCLE_MAX = 20;

function setSpeedIndicatorBasedOnNearestPlanet() {
    const controlledEntity = GameScreenControl.getControlledEntity();

    if (nearestPlanet && controlledEntity && controlledEntity.type === 'Fighter') {
        const {isDockedPlanet, isDockedSpacePort} = controlledEntity;
        const isDocked                            = isDockedPlanet || isDockedSpacePort;
        const isNearPlanet                        = getDistSquared(controlledEntity, nearestPlanet) <= LANDING_SPEED_VISIBLE_AT_DIST2;

        SpeedIndicator.setVisible(isNearPlanet && !isDocked);
    } else {
        SpeedIndicator.setVisible(false)
    }
}

function drawPointerFor(entity, pointer) {
    if (entity) {
        if (isOutsideViewport(entity)) {
            pointer.visible = true;

            const dx = (entity.x - origin.x) + AVOID_DIVZERO_VALUE;
            const dy = (entity.y - origin.y) + AVOID_DIVZERO_VALUE;

            const dx_dy     = dx / dy;
            const abs_dx_dy = Math.abs(dx_dy);

            if (abs_dx_dy > aspectRatio) {
                if (dx > 0) {
                    pointer.x = width2;
                } else {
                    pointer.x = -width2 + POINTER_WIDTH2;
                }
                pointer.y = 1 / dx_dy * pointer.x;
            } else if (dx_dy < aspectRatio) {
                if (dy > 0) {
                    pointer.y = height2;
                } else {
                    pointer.y = -height2 + POINTER_HEIGHT2;
                }
                pointer.x = dx_dy * pointer.y;
            }
        } else {
            pointer.visible = false;
        }
    }
}


function update() {
    if (origin) {
        // Update which entities are the
        if (updateCycle === 0) {
            updateCycle = UPDATE_CYCLE_MAX;

            nearestPlanet = Entity.getAbsoluteNearestByBodyType(origin, 'Planet');
            nearestStar   = Entity.getAbsoluteNearestByBodyType(origin, 'Star');

            setSpeedIndicatorBasedOnNearestPlanet();
        } else {
            updateCycle--;
        }

        // Update indicators every other frame
        if (updateCycle % 2) {
            drawPointerFor(nearestPlanet, pointerPlanet);
            drawPointerFor(nearestStar, pointerStar);
            drawPointerFor(NavBeaconHuman.getNavPoint(), pointerNav);
        }
    }
}

function onResize() {
    width              = innerWidth;
    height             = innerHeight;
    aspectRatio        = width / height;
    width2             = width / 2;
    height2            = height / 2;
    pointerContainer.x = width2;
    pointerContainer.y = height2;
}

let origin;
const setOrigin = ({x, y}) => origin = {x, y};

export default {
    init,
    update,
    setOrigin,
    onResize
};