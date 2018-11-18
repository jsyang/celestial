import * as PIXI from 'pixi.js';

import Entity from '../../Entity';
import Graphics from '../../Graphics';
import {FOCUS_RETICLE, MAX_COORDINATE, TEAM, TEAM_COLOR} from '../../constants';
import {setClickable} from '../../UI/setClickable';
import GameScreenControl from '../../GameScreen/control';
import {transformPolygon} from '../../Geometry';
import Focus from '../../Graphics/Focus';
import Starfield from '../../Graphics/Starfield';

const MARGIN_EDGE            = 16;
const ALPHA_SCANNER_BORDER   = 0.25;
const COLOR_MARKER_STAR      = 0xffff00;
const COLOR_MARKER_PLANET    = 0x00ff00;
const COLOR_MARKER_FREIGHTER = 0xaaaaaa;
const RETICLE_SCALE          = 0.04;
const RETICLE_EDGES          = FOCUS_RETICLE.map(
    poly => transformPolygon(
        poly,
        -200 * RETICLE_SCALE,
        -200 * RETICLE_SCALE,
        RETICLE_SCALE,
        RETICLE_SCALE
    )
);

const TIME_UPDATE = 125;

let isVisible             = false;
let selectionRectPosition = {x: 0, y: 0};
let RADAR_BOX_DIMENSIONS  = {x: 0, y: 0};

let COORDINATE_TO_SCANNER_FACTOR_X = 0;
let COORDINATE_TO_SCANNER_FACTOR_Y = 0;

let lastUpdateTime = 0;
let controlledEntity;


const scanner = new PIXI.Graphics() as any;
scanner.x     = MARGIN_EDGE;
scanner.y     = MARGIN_EDGE;

setClickable(scanner, ({data: {global: {x, y}}}) => {
    setVisible(false);
    const focalPoint = {
        x: (x - MARGIN_EDGE) / COORDINATE_TO_SCANNER_FACTOR_X,
        y: (y - MARGIN_EDGE) / COORDINATE_TO_SCANNER_FACTOR_Y
    };

    Focus.setFocus(focalPoint);
    GameScreenControl.revertControlToAI();
    // todo: shouldn't need to fake out the GameScreenControl
    // unified UX model needs to be created for how the player
    // interacts with game pieces
    GameScreenControl.setControlledEntity({
        ...focalPoint,
        hp: 1
    });

    Starfield.init();
});

const drawRadarBox = () => {
    scanner.beginFill(0x080808, 1);
    scanner.lineStyle(1, 0xffffff, ALPHA_SCANNER_BORDER);
    scanner.drawRect(
        0, 0,
        RADAR_BOX_DIMENSIONS.x, RADAR_BOX_DIMENSIONS.y
    );
    scanner.endFill();
};


scanner.mousemove = ({data: {global: {x, y}}}) => {
    if (isVisible) {
        selectionRectPosition.x = x;
        selectionRectPosition.y = y;
    }
};

const drawSelectionRect = () => {
    const {x, y} = selectionRectPosition;

    scanner.beginFill(0, 0);
    scanner.lineStyle(1, 0xcccccc, 1);
    scanner.drawRect(
        x - MARGIN_EDGE - RADAR_BOX_DIMENSIONS.x * 0.5 * COORDINATE_TO_SCANNER_FACTOR_X,
        y - MARGIN_EDGE - RADAR_BOX_DIMENSIONS.y * 0.5 * COORDINATE_TO_SCANNER_FACTOR_Y,
        (innerWidth) * COORDINATE_TO_SCANNER_FACTOR_X,
        innerHeight * COORDINATE_TO_SCANNER_FACTOR_Y
    );
    scanner.endFill();
};


const drawMarker = entity => {
    const {type, team} = entity;

    let size, color;
    const x = entity.x * COORDINATE_TO_SCANNER_FACTOR_X;
    const y = entity.y * COORDINATE_TO_SCANNER_FACTOR_Y;

    switch (type) {
        case 'Planet':
            color = COLOR_MARKER_PLANET;
            size  = 12;
            scanner.beginFill(color, 0.1);
            scanner.lineStyle(0, 0, 0);
            scanner.drawCircle(x, y, size);

            // Show flag for planet faction
            if (team !== TEAM.NONE) {
                const flagW = 3;
                const flagH = 2;
                scanner.endFill();
                scanner.beginFill(TEAM_COLOR[team], 0.75);
                scanner.lineStyle(0, 0, 0);
                scanner.drawRect(x - flagW / 2, y - flagH / 2, flagW, flagH);
            }

            break;
        case 'Star':
            color = COLOR_MARKER_STAR;
            size  = 16;
            scanner.beginFill(0, 0);
            scanner.lineStyle(1, color, 1);
            scanner.drawCircle(x, y, size);
            break;

        case 'Fighter':
            color = TEAM_COLOR[team];
            size  = 2;
            scanner.beginFill(color, 1);
            scanner.lineStyle(1, color, 1);
            scanner.drawRect(x - size / 2, y - size / 2, size, size);

            if (entity === controlledEntity) {
                scanner.endFill();
                scanner.beginFill(0, 0);
                scanner.lineStyle(1, 0xffffff, 1);
                RETICLE_EDGES.forEach(
                    poly => scanner.drawPolygon(transformPolygon(poly, x, y))
                );
            }

            break;
        case 'Freighter':
        default:
            color = COLOR_MARKER_FREIGHTER;
            size  = 4;
            scanner.beginFill(0, 0);
            scanner.lineStyle(1, color, 1);
            scanner.drawRect(x - size / 2, y - size / 2, size, size);
            break;
    }
    scanner.endFill();
};


function update() {
    if (!isVisible) return;

    const now = Date.now();

    if (now - lastUpdateTime > TIME_UPDATE) {
        scanner.clear();
        drawRadarBox();

        // Track the controlled entity with a reticle
        controlledEntity = GameScreenControl.getControlledEntity();

        Entity.getByType('Star').forEach(drawMarker);
        Entity.getByType('Planet').forEach(drawMarker);
        Entity.getByType('Freighter').forEach(drawMarker);
        Entity.getByType('Fighter').forEach(drawMarker);

        // Click will set viewport to selection location
        drawSelectionRect();

        lastUpdateTime = now;
    }
}

function onResize() {
    RADAR_BOX_DIMENSIONS.x         = innerWidth - 2 * MARGIN_EDGE;
    RADAR_BOX_DIMENSIONS.y         = innerHeight - 2 * MARGIN_EDGE;
    COORDINATE_TO_SCANNER_FACTOR_X = RADAR_BOX_DIMENSIONS.x / MAX_COORDINATE;
    COORDINATE_TO_SCANNER_FACTOR_Y = RADAR_BOX_DIMENSIONS.y / MAX_COORDINATE;
}

function setVisible(_isVisible: boolean) {
    if (_isVisible) {
        onResize();
    }

    scanner.visible = _isVisible;
    isVisible       = _isVisible;
}

function init() {
    Graphics.addChildToHUD(scanner);
}

export default {
    init,
    update,
    onResize,
    setVisible
}
