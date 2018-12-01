// Galaxy radar
// Only available via SensorArray

import * as PIXI from 'pixi.js';

import Entity from '../../Entity';
import Graphics from '../../Graphics';
import GameScreenControl from '../control';
import {MAX_COORDINATE, TEAM_COLOR} from '../../constants';
import RadarGalaxyExpanded from './RadarGalaxyExpanded';
import {setClickable} from '../../UI/setClickable';
import {playSound} from '../../assets/audio';

const ALPHA_SCANNER_BORDER = 0.3;
const SIZE                 = 100;
const MARGIN_EDGE          = 12;
const UPDATE_CYCLE_MAX     = 12;
let updateCycle            = 0;


const scanner = new PIXI.Graphics();
scanner.x     = MARGIN_EDGE;
scanner.y     = MARGIN_EDGE;

setClickable(
    scanner,
    () => {
        RadarGalaxyExpanded.setVisible(true);
        playSound('expand-detail');
    }
);

function drawRadarBox() {
    scanner.beginFill(0, 1);
    scanner.lineStyle(1, 0xffffff, ALPHA_SCANNER_BORDER);
    scanner.drawRect(0, 0, SIZE, SIZE);
    scanner.endFill();
}

/* Blink border if no controlled entity
const UPDATE_CYCLE_TO_BORDER_COLOR_FACTOR = 0x22 / UPDATE_CYCLE_MAX;
function drawBorderIfNoControlledEntity() {
    if (!controlledEntity) {
        const borderColor = 0x010101 *
            Math.floor(
                updateCycle * UPDATE_CYCLE_TO_BORDER_COLOR_FACTOR
            );

        scanner.beginFill(0, 0);
        scanner.lineStyle(1, borderColor, ALPHA_SCANNER_BORDER);
        scanner.drawRect(0, 0, SIZE, SIZE);
        scanner.endFill();
    }
}
*/

const COORDINATE_TO_SCANNER_FACTOR = SIZE / MAX_COORDINATE;

const drawMarker = entity => {
    const {type, team} = entity;

    let size, color;
    switch (type) {
        case 'Planet':
            color = COLOR_MARKER_PLANET;
            size  = 4;
            break;
        case 'Star':
            color = COLOR_MARKER_STAR;
            size  = 2;
            break;
        case 'Fighter':
            // Blink controlled fighter marker
            if (entity === controlledEntity && updateCycle > 6) {
                color = 0xffffff;
            } else {
                color = TEAM_COLOR[team];
            }
            size = 2;
            break;
        case 'Freighter':
        default:
            color = COLOR_MARKER_FREIGHTER;
            size  = 1;
            break;
    }

    const x = entity.x * COORDINATE_TO_SCANNER_FACTOR;
    const y = entity.y * COORDINATE_TO_SCANNER_FACTOR;

    scanner.beginFill(0, 0);
    scanner.lineStyle(1, color, 1);
    scanner.drawRect(x - size / 2, y - size / 2, size, size);
    scanner.endFill();
};


const COLOR_MARKER_STAR      = 0xffff00;
const COLOR_MARKER_PLANET    = 0x00ff00;
const COLOR_MARKER_FREIGHTER = 0xaaaaaa;

let controlledEntity;

function pruneControlledEntityIfDead() {
    if (controlledEntity) {
        if (!controlledEntity.type || controlledEntity.hp <= 0) {
            controlledEntity = null;
        }
    }
}

function update() {
    if (updateCycle > 0) {
        updateCycle--;
    } else {
        controlledEntity = GameScreenControl.getControlledEntity();

        updateCycle = UPDATE_CYCLE_MAX;

        scanner.clear();
        drawRadarBox();

        Entity.getByType('Star').forEach(drawMarker);
        Entity.getByType('Planet').forEach(drawMarker);
        Entity.getByType('Freighter').forEach(drawMarker);
    }

    Entity.getByType('Fighter').forEach(drawMarker);
    //drawBorderIfNoControlledEntity();
    pruneControlledEntityIfDead();
}

function init() {
    Graphics.addChildToHUD(scanner);
}

export default {
    init,
    update
}
