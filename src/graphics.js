/**
 * Graphics interface
 */

var PIXI = require('pixi.js');

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

var stage;
var renderer;

var width;
var height;

function init() {
    stage    = new PIXI.Container();
    renderer = PIXI.autoDetectRenderer(width, height);
    document.body.appendChild(renderer.view);

    window.addEventListener('resize', onResize);
    updateDimensions();
}

function updateDimensions() {
    width  = window.innerWidth;
    height = window.innerHeight;
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

module.exports = {
    init        : init,
    addChild    : addChild,
    removeChild : removeChild,
    render      : render
};