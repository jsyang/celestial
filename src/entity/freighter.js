var Audio      = require('../audio');
var EntityDB   = require('../entityDB');
var Entity     = require('../entity');
var EntityGrid = require('../entitygrid');

var DEGREES90 = Math.PI * 0.5;

var TURN_RATE = 0.07;
var SPEED     = 2.5;

function move(freighter) {
    var r2 = Entity.getDistSquared(freighter, freighter.target);
    if (r2 > Entity.DIST_PLANET_ORBIT2) {
        var rotation        = freighter.rotation;
        var desiredRotation = Entity.getAngleFromTo(freighter, freighter.target);

        var turnMagnitude = Math.abs(desiredRotation - rotation);
        if (turnMagnitude > Math.PI) {
            if (rotation > 0) {
                freighter.rotation += TURN_RATE;
            } else {
                freighter.rotation -= TURN_RATE;
            }
        } else {
            if (turnMagnitude > TURN_RATE) {
                if (rotation > desiredRotation) {
                    freighter.rotation -= TURN_RATE;
                } else {
                    freighter.rotation += TURN_RATE;
                }
            } else {
                freighter.rotation = desiredRotation;
            }
        }

        rotation = freighter.rotation;

        freighter.x += Math.cos(rotation) * SPEED;
        freighter.y += Math.sin(rotation) * SPEED;
        undock(freighter);
    } else {
        dockTo(freighter, freighter.target);
        freighter.rotation = Entity.getAngleFromTo(freighter.planet, freighter) + DEGREES90;
    }
}

var DIST_FOLLOW2 = 80 * 80;

function follow(freighter) {
    var r2 = Entity.getDistSquared(freighter, freighter.target);

    if (r2 > DIST_FOLLOW2) {
        var rotation        = freighter.rotation;
        var desiredRotation = Entity.getAngleFromTo(freighter, freighter.target);

        var turnMagnitude = Math.abs(desiredRotation - rotation);
        if (turnMagnitude > Math.PI) {
            if (rotation > 0) {
                freighter.rotation += TURN_RATE;
            } else {
                freighter.rotation -= TURN_RATE;
            }
        } else {
            if (turnMagnitude > TURN_RATE) {
                if (rotation > desiredRotation) {
                    freighter.rotation -= TURN_RATE;
                } else {
                    freighter.rotation += TURN_RATE;
                }
            } else {
                freighter.rotation = desiredRotation;
            }
        }

        rotation = freighter.rotation;

        freighter.x += Math.cos(rotation) * SPEED;
        freighter.y += Math.sin(rotation) * SPEED;
        undock(freighter);
    } else {
        freighter.flameOff();
    }
}

var ORBIT_ROTATION = 0.00025;
var ORBIT_DISTANCE = 200;

function orbit(freighter) {
    var px = freighter.planet.x;
    var py = freighter.planet.y;

    freighter.rotation += ORBIT_ROTATION;
    freighter.x = px + Math.cos(freighter.rotation - DEGREES90) * ORBIT_DISTANCE;
    freighter.y = py + Math.sin(freighter.rotation - DEGREES90) * ORBIT_DISTANCE;
}

function explode(freighter) {
    EntityDB.remove(freighter);
    Audio.play('collide');
}

function createPBase(freighter) {
    var planet = freighter.planet;

    Audio.play('nav');

    planet.pbase = Entity.create('PBase', {
        x      : planet.x,
        y      : planet.y,
        planet : planet,
        team   : freighter.team
    });

    EntityDB.remove(freighter);
}

function createPColony(freighter) {
    var planet = freighter.planet;

    Audio.play('nav');

    planet.pcolony = Entity.create('PColony', {
        x      : planet.x,
        y      : planet.y,
        planet : planet,
        team   : freighter.team
    });

    EntityDB.remove(freighter);
}

var MAX_MATERIALS_FINISHED = 500;

function loadOrDumpSupply(freighter) {
    var pbase = freighter.planet.pbase;

    if (pbase.materialsFinished === 0) {
        pbase.materialsFinished += freighter.materialsFinished;
        freighter.materialsFinished = 0;

        var diffMaterials = 0;
        if (pbase.materialsFinished > pbase.MAX_FINISHED_MATERIALS) {
            diffMaterials               = pbase.materialsFinished - pbase.MAX_FINISHED_MATERIALS;
            pbase.materialsFinished     = pbase.MAX_MATERIALS_FINISHED;
            freighter.materialsFinished = diffMaterials;
            freighter.unloadSupply();
        } else {
            EntityDB.remove(freighter);
        }

    } else if (freighter.planet.materialsFinished > 0 && freighter.materialsFinished < MAX_MATERIALS_FINISHED) {
        var materialsToLoad = MAX_MATERIALS_FINISHED - freighter.materialsFinished;
        if (materialsToLoad >= freighter.planet.materialsFinished) {
            freighter.materialsFinished += freighter.planet.materialsFinished;
            freighter.planet.materialsFinished = 0;
        } else {
            freighter.materialsFinished += materialsToLoad;
            freighter.planet.materialsFinished -= materialsToLoad;
        }

        freighter.loadSupply();
    }
}

/** How long it takes before cargo can be used after reaching orbit **/
var TIME_OFFLOAD_SUPPLY = 200;

function supply(freighter) {
    if (freighter.materialsFinished > 0) {
        if (freighter.supplyTime === undefined) {
            freighter.supplyTime = TIME_OFFLOAD_SUPPLY;
        } else if (freighter.supplyTime > 0) {
            freighter.supplyTime--;
        } else if (freighter.supplyTime === 0) {
            if (!freighter.planet.pbase) {
                createPBase(freighter);
            } else if (!freighter.planet.pcolony) {
                createPColony(freighter);
            } else {
                loadOrDumpSupply(freighter);
            }
        }
    }
}

function undock(freighter) {
    freighter.flameOn();
}

function dockTo(freighter, planet) {
    freighter.planet = planet;
    freighter.target = undefined;
    freighter.flameOff();
}

function processFreighter(freighter) {
    if (freighter) {
        if (freighter.hp > 0) {
            freighter.renderHit();

            if (freighter.target) {
                if (freighter.target.type === 'Planet') {
                    move(freighter);
                } else {
                    follow(freighter);
                }

            } else if (freighter.planet) {
                orbit(freighter);
                supply(freighter);
            }

            EntityGrid.add(freighter);
        } else {
            explode(freighter);
        }
    }
}

function process() {
    var freighter = EntityDB.getByType('Freighter');
    if (freighter) {
        freighter.forEach(processFreighter);
    }

}

module.exports = {
    process : process,
    dockTo  : dockTo
};