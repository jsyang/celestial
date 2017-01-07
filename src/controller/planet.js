var Entity = require('../entity');

var childRotation = 0;

var dChildRotation = 0.0001;
var childDistance  = 2400;
var attractorX     = -150;
var attractorY     = -50;

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

var DEFAULT_OPTIONS = {
    x        : 0,
    y        : 0,
    rotation : 0,
    team     : Entity.TEAM.BLUE,
    dx       : 0,
    dy       : 0
};

function init() {
    planet  = Entity.create('Planet', DEFAULT_OPTIONS);
    pbase   = Entity.create('PBase', DEFAULT_OPTIONS);
    pcomm   = Entity.create('PComm', DEFAULT_OPTIONS);
    plab    = Entity.create('PLab', DEFAULT_OPTIONS);
    pcolony = Entity.create('PColony', DEFAULT_OPTIONS);

    starport = Entity.create('StarPort', DEFAULT_OPTIONS);
}

var ORBIT_ROTATION = 0.00025;
var ORBIT_DISTANCE = 200;

function process() {
    childRotation += dChildRotation;
    var px = Math.cos(childRotation) * childDistance + attractorX;
    var py = Math.sin(childRotation) * childDistance + attractorY;
    updatePosition(px, py);

    // todo: convert sample orbit rotation to more generalized case
    starport.rotation += ORBIT_ROTATION;
    starport.x = px + Math.cos(starport.rotation) * ORBIT_DISTANCE;
    starport.y = py + Math.sin(starport.rotation) * ORBIT_DISTANCE;
}

module.exports = {
    init    : init,
    process : process
};