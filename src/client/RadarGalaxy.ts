// Galaxy radar
// Only available via SensorArray

import * as PIXI from 'pixi.js';

import Entity from './Entity';
import Graphics from './Graphics';
import {MAX_COORDINATE} from './constants';

const ALPHA_SCANNER_BORDER = 0.3;

const SIZE        = 100;
const MARGIN_EDGE = 4;

const scanner = new PIXI.Graphics();
scanner.beginFill(0, 1);
scanner.lineStyle(1, 0xffffff, ALPHA_SCANNER_BORDER);
scanner.drawRect(0, 0, SIZE, SIZE);
scanner.endFill();

scanner.x = MARGIN_EDGE;
scanner.y = MARGIN_EDGE;

Graphics.addChildToHUD(scanner);

let markerStar      = [];
let markerPlanet    = [];
let markerFighter   = [];
let markerFreighter = [];

const COORDINATE_TO_SCANNER_FACTOR = SIZE / MAX_COORDINATE;

function createMarker(color, size) {
    const marker = new PIXI.Graphics();
    marker.beginFill(0, 0);
    marker.lineStyle(1, color, 1);
    marker.drawRect(-size, -size, size, size);
    marker.endFill();
    scanner.addChild(marker);

    return marker;
}

function drawMarker(markers, color, size, s, i) {
    let marker = markers[i];
    if (!marker) {
        marker     = createMarker(color, size);
        markers[i] = marker;
    }

    marker.x = s.x * COORDINATE_TO_SCANNER_FACTOR;
    marker.y = s.y * COORDINATE_TO_SCANNER_FACTOR;
}

const COLOR_MARKER_STAR      = 0xffff00;
const COLOR_MARKER_PLANET    = 0x00ff00;
const COLOR_MARKER_FREIGHTER = 0xaaaaaa;

let lastUpdateTime = 0;
const TIME_UPDATE  = 500;

const FUNC_DRAW_PLANET_MARKER    = drawMarker.bind(null, markerPlanet, COLOR_MARKER_PLANET, 2);
const FUNC_DRAW_STAR_MARKER      = drawMarker.bind(null, markerStar, COLOR_MARKER_STAR, 2);
const FUNC_DRAW_FREIGHTER_MARKER = drawMarker.bind(null, markerFreighter, COLOR_MARKER_FREIGHTER, 1);

function update() {
    const now = Date.now();

    if (now - lastUpdateTime > TIME_UPDATE) {
        const stars = Entity.getByType('Star');
        if (stars) {
            // todo: correct implementation of this
            // currently it only decreases marker count, no increase accounted for (if new ships become available)
            if (stars.length != markerStar.length) {
                markerStar = markerStar.slice(0, stars.length - 1);
            }
            stars.forEach(FUNC_DRAW_STAR_MARKER);
        }

        const planets = Entity.getByType('Planet');
        if (planets) {
            if (planets.length != markerPlanet.length) {
                markerPlanet = markerPlanet.slice(0, planets.length - 1);
            }
            planets.forEach(FUNC_DRAW_PLANET_MARKER);
        }

        const fighters = Entity.getByType('Fighter');
        if (fighters) {
            if (fighters.length != markerFighter.length) {
                markerFighter = markerFighter.slice(0, fighters.length - 1);
            }
            fighters.forEach(function (f, i) {
                drawMarker(markerFighter, Entity.getTeamColor(f.team), 1, f, i);
            });
        }

        const freighters = Entity.getByType('Freighter');
        if (freighters) {
            if (freighters.length != markerFreighter.length) {
                markerFreighter = markerFreighter.slice(0, freighters.length - 1);
            }
            freighters.forEach(FUNC_DRAW_FREIGHTER_MARKER);
        }

        lastUpdateTime = now;
    }
}

export default {
    update
}
