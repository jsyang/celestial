var Assets     = require('./assets');
var Graphics   = require('./graphics');
var GameField  = require('./gamefield');
var EntityGrid = require('./entitygrid');

var HumanInterface = require('./humanInterface');

var ProjectileController = require('./controller/projectile');
var PlanetController     = require('./controller/planet');
var StarController       = require('./controller/star');
var FighterController    = require('./controller/fighter');
var ProbeController      = require('./controller/probe');
var FreighterController  = require('./controller/freighter');
var GravityController    = require('./controller/gravity');

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
        Graphics.centerOn(HumanInterface.getFocalPoint());
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
    // This entry-point assumes a fresh game start every time
    // todo: generate a game state based from pre-exising saved data
    Graphics.init();
    GameField.init();

    HumanInterface.init();
    Assets.init(start);
});

// // // // Game logic // // // //

function update() {
    HumanInterface.process();

    PlanetController.process();
    StarController.process();
    FighterController.process();
    FreighterController.process();
    ProbeController.process();
    ProjectileController.process();
    GravityController.process();

    EntityGrid.commit();
}
