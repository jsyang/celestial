var Assets          = require('./assets');
var Graphics        = require('./graphics');
var HumanController = require('./controller/human');
var PlanetController = require('./controller/planet');

// // // // Game loop // // // //

var raf;
var then;
var FPS          = 60;
var FPS_INTERVAL = 1000 / FPS;

function step() {
    var now     = Date.now();
    var elapsed = now - then;

    update();

    if (elapsed > FPS_INTERVAL) {
        Graphics.centerOn(controller.getFocalPoint());
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

    PlanetController.init();
    Assets.init(start);
});

// // // // Game logic // // // //

function update() {
    PlanetController.process();
    controller.process();
    // todo: process collisions
}
