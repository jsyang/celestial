var Assets    = require('./assets');
var Graphics  = require('./graphics');
var GameField = require('./gamefield');

var HumanController      = require('./controller/human');
var CollisionController  = require('./controller/collision');
var ProjectileController = require('./controller/projectile');

var PlanetController    = require('./controller/planet');
var FighterController   = require('./controller/fighter');
var ProbeController     = require('./controller/probe');
var FreighterController = require('./controller/freighter');
var GravityController   = require('./controller/gravity');

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
        Graphics.centerOn(HumanController.getFocalPoint());
        Graphics.render();
        then = now - (elapsed % FPS_INTERVAL);
    }

    raf = requestAnimationFrame(step);
}

function start() {
    then = Date.now();
    step();
}

window.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    // assuming a fresh game start every time
    // todo: generate based on a state
    Graphics.init();
    GameField.init();

    // Create all entities
    FighterController.init();
    ProbeController.init();

    // Initialize controllers
    HumanController.init();

    Assets.init(start);
});

// // // // Game logic // // // //

function update() {
    PlanetController.process();
    HumanController.process();
    FighterController.process();
    FreighterController.process();
    ProbeController.process();
    ProjectileController.process();
    GravityController.process();
    CollisionController.process();
}
