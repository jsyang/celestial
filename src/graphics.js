/**
 * Graphics interface
 */

// todo: pixi is a large inclusion, need to strip it of unused features via custom build
var PIXI = require('pixi.js');

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

var stage;
var renderer;

var width, width2;
var height, height2;

function init() {
    stage    = new PIXI.Container();
    renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(renderer.view);

    window.addEventListener('resize', onResize);
    updateDimensions();
}

function updateDimensions() {
    width   = window.innerWidth;
    height  = window.innerHeight;
    width2  = width >> 1;
    height2 = height >> 1;
    renderer.resize(width, height);
}

function onResize() {
    updateDimensions();
}

function addChild(child) {
    stage.addChild(child);
}

function removeChild(child) {
    stage.removeChild(child);
}

function render() {
    renderer.render(stage);
}

function centerOn(point) {
    stage.x = width2 - point.x;
    stage.y = height2 - point.y;
}

module.exports = {
    init        : init,
    addChild    : addChild,
    removeChild : removeChild,
    render      : render,
    centerOn    : centerOn
};