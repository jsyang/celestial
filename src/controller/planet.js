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

var planet, pbase, pcomm, plab, pcolony, starport;

var DEFAULT_OPTIONS = { x : 0, y : 0, rotation : 0, team : Entity.TEAM.BLUE };

function init() {

    planet  = Entity.create('Planet', DEFAULT_OPTIONS);
    pbase   = Entity.create('PBase', DEFAULT_OPTIONS);
    pcomm   = Entity.create('PComm', DEFAULT_OPTIONS);
    plab    = Entity.create('PLab', DEFAULT_OPTIONS);
    pcolony = Entity.create('PColony', DEFAULT_OPTIONS);

    starport = Entity.create('StarPort', DEFAULT_OPTIONS);

    Graphics.addChild(
        starport.graphics,

        planet.graphics,
        pbase.graphics,
        pcomm.graphics,
        plab.graphics,
        pcolony.graphics
    );
}

function process() {
    childRotation += dChildRotation;
    var px = Math.cos(childRotation) * childDistance + attractorX;
    var py = Math.sin(childRotation) * childDistance + attractorY;
    updatePosition(px, py);

    // todo: convert sample orbit rotation to more generalized case
    starport.rotation += dChildRotation * 2.5;
    starport.x = px + Math.cos(starport.rotation) * 150;
    starport.y = py + Math.sin(starport.rotation) * 150;
}

module.exports = {
    init    : init,
    process : process
};