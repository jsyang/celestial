var Graphics = require('./graphics');
var Entity   = require('./entity');

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

window.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
    Graphics.init();

    var s = Entity.create('Star', {
        x      : 20,
        y      : 50,
        radius : 300
    });

    var f = Entity.create('Fighter', {
        x : 20,
        y : 50
    });

    shot = Entity.create('Freighter', {
        x : 30,
        y : 50
    });

    Graphics.addChild(s);
    Graphics.addChild(f);
    Graphics.addChild(shot);

    start();
});

// // // // Game logic // // // //
// todo: modularize

var shot;

function calculate(){
    shot.x += 0.5;
    shot.y += 0.5;
}
