var Graphics = require('../graphics');
var Entity   = require('../entity');

var childRotation  = 0;
var dChildRotation = 0.0001;
var childDistance  = 400;
var attractorX     = -500;
var attractorY     = 100;

function updatePosition(x, y) {
    planet.x  = x;
    planet.y  = y;
    pbase.x   = x;
    pbase.y   = y;
    pcomm.x   = x;
    pcomm.y   = y;
    plab.x    = x;
    plab.y    = y;
    pcolony.x = x;
    pcolony.y = y;
}

var planet, pbase, pcomm, plab, pcolony;

function init() {
    var defaultPosition = { x : 0, y : 0, rotation : 0 };

    planet  = Entity.create('Planet', defaultPosition);
    pbase   = Entity.create('PBase', defaultPosition);
    pcomm   = Entity.create('PComm', pcomm);
    plab    = Entity.create('PLab', plab);
    pcolony = Entity.create('PColony', pcolony);

    Graphics.addChild(
        planet.graphics,
        pbase.graphics,
        pcomm.graphics,
        plab.graphics,
        pcolony.graphics
    );
}

function process() {
    childRotation += dChildRotation;
    var px = Math.cos(childRotation) * childDistance;
    var py = Math.sin(childRotation) * childDistance;

    updatePosition(
        px + attractorX,
        py + attractorY
    );
}

module.exports = {
    init    : init,
    process : process
};