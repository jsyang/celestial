/**
 * Graphics interface
 */

var PIXI = require('./custom-lib/pixi.min.js');

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

var StarField = require('./starfield');
var Radar     = require('./radar');

var renderer;
var scene;
var stage;

var width, width2;
var height, height2;

function init() {
    updateDimensions();

    scene    = new PIXI.Container();
    stage    = new PIXI.Container();
    renderer = new PIXI.WebGLRenderer(width, height);

    StarField.init(stage);
    Radar.init(stage);

    scene.addChild(stage);

    document.body.appendChild(renderer.view);
    window.addEventListener('resize', onResize);
}

function updateDimensions() {
    width   = window.innerWidth;
    height  = window.innerHeight;
    width2  = width >> 1;
    height2 = height >> 1;

    if (renderer) {
        renderer.resize(width, height);
    }
}

function onResize() {
    updateDimensions();
    lastX = undefined;
    lastY = undefined;
}

function addChildToHUD() {
    scene.addChild.apply(scene, arguments);
}

function addChild() {
    stage.addChild.apply(stage, arguments);
}

function removeChild() {
    stage.removeChild.apply(stage, arguments);
}

function render() {
    renderer.render(scene);
}

var lastX;
var lastY;

function centerOn(point) {
    stage.x = width2 - point.x;
    stage.y = height2 - point.y;

    var dx = point.x - lastX;
    var dy = point.y - lastY;

    if (Radar.isEnabled) {
        Radar.setPosition(point);
    }

    if (lastX === undefined && lastY === undefined) {
        StarField.reinit(point);
    } else {
        StarField.process(point, dx, dy);
    }

    lastX = point.x;
    lastY = point.y;
}

module.exports = {
    init          : init,
    addChild      : addChild,
    removeChild   : removeChild,
    render        : render,
    centerOn      : centerOn,
    addChildToHUD : addChildToHUD
};