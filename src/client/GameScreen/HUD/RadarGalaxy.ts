// Galaxy radar
// Only available via SensorArray

import * as PIXI from 'pixi.js';

import Entity from '../../Entity';
import Graphics from '../../Graphics';
import {MAX_COORDINATE, TEAM_COLOR} from '../../constants';
import RadarGalaxyExpanded from './RadarGalaxyExpanded';
import {setClickable} from '../../UI/setClickable';
import {playSound} from '../../assets/audio';

const ALPHA_SCANNER_BORDER = 0.3;

const SIZE        = 100;
const MARGIN_EDGE = 4;

const scanner = new PIXI.Graphics();

const drawRadarBox = () => {
    scanner.beginFill(0, 1);
    scanner.lineStyle(1, 0xffffff, ALPHA_SCANNER_BORDER);
    scanner.drawRect(0, 0, SIZE, SIZE);
    scanner.endFill();
};

scanner.x = MARGIN_EDGE;
scanner.y = MARGIN_EDGE;

setClickable(
    scanner,
    () => {
        RadarGalaxyExpanded.setVisible(true);
        playSound('nav');
    }
);

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
            color = TEAM_COLOR[team];
            size  = 2;
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

let lastUpdateTime = 0;
const TIME_UPDATE  = 500;

function update() {
    const now = Date.now();

    if (now - lastUpdateTime > TIME_UPDATE) {
        scanner.clear();
        drawRadarBox();

        Entity.getByType('Star').forEach(drawMarker);
        Entity.getByType('Planet').forEach(drawMarker);
        Entity.getByType('Freighter').forEach(drawMarker);
        Entity.getByType('Fighter').forEach(drawMarker);

        lastUpdateTime = now;
    }
}

function init() {
    Graphics.addChildToHUD(scanner);
}

export default {
    init,
    update
}
