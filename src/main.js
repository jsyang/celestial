var Assets     = require('./assets');
var Graphics   = require('./graphics');
var GameField  = require('./gamefield');
var EntityGrid = require('./entitygrid');
var Scanner    = require('./scanner');
var Gravity    = require('./gravity');
var Team       = require('./system/team');

var HumanInterface = require('./humanInterface');

var Projectile = require('./entity/projectile');
var Planet     = require('./entity/planet');
var Star       = require('./entity/star');
var Fighter    = require('./entity/fighter');
var Probe      = require('./entity/probe');
var Freighter  = require('./entity/freighter');
var PBase      = require('./entity/pbase');
var PColony    = require('./entity/pcolony');
var PLab       = require('./entity/plab');
var PComm      = require('./entity/pcomm');

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
    Graphics.init();
    GameField.init();
    Scanner.init();

    HumanInterface.init();
    Assets.init(start);
});

// // // // Game logic // // // //

function update() {
    Team.process();
    HumanInterface.process();

    Planet.process();
    PBase.process();
    PColony.process();
    PComm.process();
    PLab.process();
    Star.process();
    Fighter.process();
    Freighter.process();
    Probe.process();
    Projectile.process();

    Gravity.update();
    Scanner.update();

    EntityGrid.commit();
}
