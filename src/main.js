var Assets          = require('./assets');
var Graphics        = require('./graphics');
var HumanController = require('./controller/human');

// // // // Game loop // // // //

var raf;
var then;
var FPS_INTERVAL = 1000 / 90;

function step() {
    var now     = Date.now();
    var elapsed = now - then;

    calculate();

    if (elapsed > FPS_INTERVAL) {
        Graphics.render();
        then = now - (elapsed % FPS_INTERVAL);
    }

    raf = requestAnimationFrame(step);
}

function start() {
    then = Date.now();
    step();
}

var controller;

window.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    Graphics.init();
    controller = HumanController;
    controller.init();

    Assets.init(start);
});

// // // // Game logic // // // //

function calculate() {
    controller.process();
    Graphics.centerOn(controller.getFocalPoint());
}
