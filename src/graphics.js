/**
 * Graphics interface
 */

var PIXI = require('./custom-lib/pixi.min.js');

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

var StarFieldController = require('./controller/starfield');

var stage;
var renderer;

var width, width2;
var height, height2;

function init() {
    updateDimensions();

    stage    = new PIXI.Container();
    renderer = new PIXI.WebGLRenderer(width, height);

    StarFieldController.init(stage);

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
}

function addChild() {
    stage.addChild.apply(stage, arguments);
}

function removeChild() {
    stage.removeChild.apply(stage, arguments);
}

function render() {
    renderer.render(stage);
}

var lastX;
var lastY;

function centerOn(point) {
    stage.x = width2 - point.x;
    stage.y = height2 - point.y;

    var dx = point.x - lastX;
    var dy = point.y - lastY;

    if(lastX === undefined && lastY === undefined ){
        StarFieldController.reinit(point);
    } else {
        StarFieldController.process(point, dx, dy);
    }

    lastX = point.x;
    lastY = point.y;
}

module.exports = {
    init        : init,
    addChild    : addChild,
    removeChild : removeChild,
    render      : render,
    centerOn    : centerOn
};