/* Editor for in-game polygon */

import * as PIXI from "pixi.js";

const TEXT     = `
Click to add a new vertex to each polyline

Press Z to undo last vertex
Press Q / P to add / delete a layer
Press H to export all layers

Press S to set the scale of the preview / exported geometry
`;
const DIVISION = 12;
const SIZE     = 400;

let scaleX=1/4, scaleY=1/4;

let layerPoints: any = [];
let editor: any;
let preview: any;

function getRelativeXY(e) {
    const {x, y} = e.data.originalEvent;

    const toGridFactor   = DIVISION / SIZE;
    const fromGridFactor = 1 / toGridFactor;

    const relativeX = x - editor.x;
    const relativeY = y - editor.y;

    const gridX = Math.min(
        Math.round(relativeX * toGridFactor) * fromGridFactor,
        SIZE
    );

    const gridY = Math.min(
        Math.round(relativeY * toGridFactor) * fromGridFactor,
        SIZE
    );

    return {
        x: relativeX,
        y: relativeY,
        gridX,
        gridY
    };
}

function onClick(e) {
    const {children}     = editor;
    const {gridX, gridY} = getRelativeXY(e);

    const currentLayer = children[children.length - 1];

    const currentLayerPoints = layerPoints[layerPoints.length - 1];
    currentLayerPoints.push(gridX);
    currentLayerPoints.push(gridY);

    updateLayer(currentLayer, currentLayerPoints);
}

function onMouseMove(e) {
    const {gridX, gridY} = getRelativeXY(e);

    editor.children[1].x = gridX;
    editor.children[1].y = gridY;
}

function deleteLayer() {
    if (layerPoints.length > 1) {
        editor.removeChild(editor.children[editor.children.length - 1]);
        layerPoints.pop();

        const currentLayerPoints = layerPoints[layerPoints.length - 1];
        const currentLayer       = editor.children[editor.children.length - 1];
        updateLayer(currentLayer, currentLayerPoints);
    }
}

function exportLayers() {
    prompt('Exported geometry', JSON.stringify(layerPoints));
}

const setScale = () => {
    scaleX = parseFloat(eval(prompt('Scale X coordinates\nYou may also use fractions here, e.g. "0.25" or "1/4"', '0.25') || '1/4'));
    scaleY = parseFloat(eval(prompt('Scale Y coordinates\nYou may also use fractions here, e.g. "0.25" or "1/4"', '0.25') || '1/4'));
};

function onKeyPress({which}) {
    console.log(which);
    let currentLayer;
    let currentLayerPoints;

    switch (which) {
        // S = set the export / preview scale
        case 115:
            setScale();
            updatePreview();
            break;

        // H = export all layers
        case 104:
            exportLayers();
            break;

        // P = delete layer
        case 112:
            deleteLayer();
            break;

        // Q = create layer
        case 113:
            addLayer();
            break;

        // Z = undo
        case 122:
            const {children}   = editor;
            currentLayerPoints = layerPoints[layerPoints.length - 1];
            currentLayerPoints.pop();
            currentLayerPoints.pop();
            currentLayer = children[children.length - 1];

            updateLayer(currentLayer, currentLayerPoints);
            break;

        default:
    }
}

function create(x = 0, y = 0) {
    editor = new PIXI.Graphics() as any;
    editor.lineStyle(1, 0xffffff, 0.25);
    editor.beginFill(0, 0);
    editor.drawRect(0, 0, SIZE, SIZE);
    editor.endFill();

    editor.x = x;
    editor.y = y;

    editor.interactive = true;
    editor.hitArea     = new PIXI.Rectangle(0, 0, SIZE, SIZE);
    editor.buttonMode  = true;
    editor.click       = onClick;
    editor.mousemove   = onMouseMove;

    drawGridLines();
    drawHelpLabel();

    addSnapCursor();
    addPreviewWindow();
    addLayer();

    addEventListener('keypress', onKeyPress);

    return editor;
}

function addPreviewWindow() {
    preview   = new PIXI.Graphics() as any;
    preview.x = SIZE + 20;
    preview.y = 0;

    editor.addChild(preview);
}

function addSnapCursor() {
    const cursor = new PIXI.Graphics() as any;
    cursor.lineStyle(1, 0xff0000, 1);
    cursor.drawRect(-2, -2, 4, 4);
    editor.addChild(cursor);
}

function addLayer() {
    editor.addChild(new PIXI.Graphics());
    layerPoints.push([]);
}

function drawGridLines() {
    let i;
    const dxy = SIZE / DIVISION;

    // verticals
    for (i = 0; i < SIZE; i += dxy) {
        if (i >> 0 === SIZE >> 1) {
            editor.lineStyle(1, 0xffffff, 0.5);
        } else {
            editor.lineStyle(1, 0xffffff, 0.25);
        }
        editor.moveTo(i, 0);
        editor.lineTo(i, SIZE);
    }

    // horizontals
    for (i = 0; i < SIZE; i += dxy) {
        if (i >> 0 === SIZE >> 1) {
            editor.lineStyle(1, 0xffffff, 0.5);
        } else {
            editor.lineStyle(1, 0xffffff, 0.25);
        }
        editor.moveTo(0, i);
        editor.lineTo(SIZE, i);
    }
}

function drawHelpLabel() {
    const label = new PIXI.Text(
        TEXT,
        {
            fontFamily: 'arial',
            fontSize:   12,
            fill:       0xffffff
        }
    );
    label.x     = 0;
    label.y     = editor.height;

    editor.addChild(label);
}

function updateLayer(layer, points) {
    layer.clear();
    layer.lineStyle(1, 0xff0000, 1);
    layer.drawPolygon(points);

    updatePreview();
}

function updatePreview() {
    preview.clear();
    preview.lineStyle(1, 0x00ff00, 1);

    const scalePoint = (v, i) => i % 2 ? scaleX * v : scaleY * v;

    layerPoints
        .forEach(points => preview.drawPolygon(points.map(scalePoint)));
}

function destroy() {
    removeEventListener('keypress', onKeyPress);
}

export default {
    create,
    destroy
}