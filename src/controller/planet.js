var Audio    = require('../audio');
var Entity   = require('../entity');
var EntityDB = require('../entityDB');

var ProjectileController = require('./projectile');

var childRotation = 0;

var dChildRotation = 0.0001;
var childDistance  = 1200;
var attractorX     = -100;
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

var star, planet, pbase, pcomm, plab, pcolony, starport, freighter;

var DEFAULT_OPTIONS = {
    x        : 0,
    y        : 0,
    rotation : 0,
    team     : Entity.TEAM.BLUE,
    dx       : 0,
    dy       : 0
};
var DEGREES90       = Math.PI * 0.5;
var DEGREES10       = Math.PI * 0.5 / 9;

function init() {
    star = Entity.create('Star', {
        x        : attractorX,
        y        : attractorY,
        rotation : 0
    });

    planet  = Entity.create('Planet', DEFAULT_OPTIONS);
    pbase   = Entity.create('PBase', DEFAULT_OPTIONS);
    pcomm   = Entity.create('PComm', DEFAULT_OPTIONS);
    plab    = Entity.create('PLab', DEFAULT_OPTIONS);
    pcolony = Entity.create('PColony', DEFAULT_OPTIONS);

    starport  = Entity.create('StarPort', DEFAULT_OPTIONS);
    freighter = Entity.create('Freighter', DEFAULT_OPTIONS);

    freighter.rotation       = -6 * DEGREES10;
    freighter.graphics.alpha = 0.8;
}

var orbitRotationFactor = 2.5;
var orbitDistance       = 200;

function process() {
    childRotation += dChildRotation;
    var px = Math.cos(childRotation) * childDistance + attractorX;
    var py = Math.sin(childRotation) * childDistance + attractorY;
    updatePosition(px, py);

    // todo: convert sample orbit rotation to more generalized case
    starport.rotation += dChildRotation * orbitRotationFactor;
    starport.x = px + Math.cos(starport.rotation) * orbitDistance;
    starport.y = py + Math.sin(starport.rotation) * orbitDistance;

    if (freighter) {
        freighter.rotation += dChildRotation * orbitRotationFactor;
        freighter.x = px + Math.cos(freighter.rotation - DEGREES90) * orbitDistance;
        freighter.y = py + Math.sin(freighter.rotation - DEGREES90) * orbitDistance;

        if (freighter.hp > 0) {
            if (freighter.hitTime > 0) {
                freighter.hitTime--;
                freighter.graphics.alpha = 1;
            } else {
                freighter.graphics.alpha = 0.8;
            }
        } else {
            EntityDB.remove(freighter);
            Audio.play('collide');

            ProjectileController.explode(freighter, 6);
            freighter = undefined;
        }
    }
}

function getFocalPoint() {
    return pbase;
}

module.exports = {
    init          : init,
    process       : process,
    getFocalPoint : getFocalPoint
};