var Audio    = require('../audio');
var Entity   = require('../entity');
var Graphics = require('../graphics');
var SAT      = require('sat');

var freighter;
var star;
var fighter;

function init() {
    star = Entity.create('Star', {
        x        : 400,
        y        : 50,
        rotation : 0,
        team     : Entity.TEAM.BLUE
    });

    fighter = Entity.create('Fighter', {
        x        : 20,
        y        : 0,
        rotation : 0,
        team     : Entity.TEAM.BLUE
    });

    freighter = Entity.create('Freighter', {
        x        : 30,
        y        : -30,
        rotation : 0,
        team     : Entity.TEAM.BLUE
    });

    Graphics.addChild(
        star.graphics,
        fighter.graphics,
        freighter.graphics
    );

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

var keyDown = {};

function onKeyUp(e) {
    if (e.which === 37) {
        keyDown.left_arrow = false;
    } else if (e.which === 39) {
        keyDown.right_arrow = false;
    } else if (e.which === 38) {
        keyDown.up_arrow = false;
    }
}

function onKeyDown(e) {
    if (e.which === 37) {
        // Left arrow
        keyDown.left_arrow = true;

    } else if (e.which === 39) {
        // Right arrow
        keyDown.right_arrow = true;

    } else if (e.which === 38) {
        // Up arrow
        keyDown.up_arrow = true;

    } else if (e.which === 40) {
        // Down arrow
        keyDown.down_arrow = true;
        Audio.play('hit');
    }
}

function process() {
    if (keyDown.left_arrow) {
        freighter.rotation -= 0.03;
    } else if (keyDown.right_arrow) {
        freighter.rotation += 0.03;
    }

    if (keyDown.down_arrow) {
        // shoot
    }

    if (keyDown.up_arrow) {
        freighter.x += Math.cos(freighter.rotation);
        freighter.y += Math.sin(freighter.rotation);
        freighter.flameOn();
    } else {
        freighter.flameOff();
    }

    if (SAT.testPolygonCircle(freighter.collision, star.collision)) {
        freighter.graphics.alpha = 0.4;
    } else {
        freighter.graphics.alpha = 0.8;
    }


}

function getFocalPoint() {
    return freighter;
}

module.exports = {
    init          : init,
    process       : process,
    getFocalPoint : getFocalPoint
};