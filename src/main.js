var Assets     = require('./assets');
var Graphics   = require('./graphics');
var GameField  = require('./gamefield');
var EntityDB   = require('./entityDB');
var EntityGrid = require('./entitygrid');

var Scanner = require('./scanner');
var Gravity = require('./gravity');

var HumanInterface = require('./humanInterface');
var Component      = require('./component');
var Team           = require('./system/team');

var Fighter    = require('./entity/fighter');
var Freighter  = require('./entity/freighter');
var Probe      = require('./entity/probe');

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

function applyComponentBehaviors(type) {
    var entity = EntityDB.getByType(type);
    if (entity) {
        entity.forEach(Component.process);
    }
}

var SEQUENCE_ENTITY_UPDATE = [
    'Star',
    'Planet',
    'PBase',
    'PColony',
    'PComm',
    'PLab',

//    'Fighter',
//    'Freighter',
//    'Probe',

    'ShotCannonNormal',
    'ShotCannonHeavy'
];

function update() {
    Team.process();
    HumanInterface.process();

    SEQUENCE_ENTITY_UPDATE
        .forEach(applyComponentBehaviors);

    Fighter.process();
    Freighter.process();
    Probe.process();

    Gravity.update();
    Scanner.update();

    EntityGrid.commit();
}
