var Assets   = require('./assets');
var Graphics = require('./graphics');

var HumanController      = require('./controller/human');
var CollisionController  = require('./controller/collision');
var ProjectileController = require('./controller/projectile');

var PlanetController    = require('./controller/planet');
var StarController      = require('./controller/star');
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
    Graphics.init();

    // Create all entities
    StarController.init();
    PlanetController.init();
    FighterController.init();
    FreighterController.init();
    ProbeController.init();

    // Initialize controllers
    GravityController.init();
    HumanController.init();

    Assets.init(start);
});

// // // // Game logic // // // //

function update() {
    //StarController.process();
    PlanetController.process();
    HumanController.process();
    FighterController.process();
    FreighterController.process();
    ProbeController.process();
    ProjectileController.process();
    GravityController.process();
    CollisionController.process();
}
