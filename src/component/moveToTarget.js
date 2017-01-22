var Entity = require('../entity');

var DEFAULTS = {
    TURN_RATE : 0.07,
    SPEED : 2.5,
    DIST_HALT2 : 80 * 80
};

function rotateToFaceTarget(entity, target) {
    var rotation        = entity.rotation;
    var desiredRotation = Entity.getAngleFromTo(entity, target);

    var turnMagnitude = Math.abs(desiredRotation - rotation);
    if (turnMagnitude > Math.PI) {
        if (rotation > 0) {
            entity.rotation += entity.TURN_RATE;
        } else {
            entity.rotation -= entity.TURN_RATE;
        }
    } else {
        if (turnMagnitude > entity.TURN_RATE) {
            if (rotation > desiredRotation) {
                entity.rotation -= entity.TURN_RATE;
            } else {
                entity.rotation += entity.TURN_RATE;
            }
        } else {
            entity.rotation = desiredRotation;
        }
    }

    rotation = entity.rotation;
    return rotation;
}

/**
 * Moves to target
 * @param entity
 */
function process(entity) {
    var target = entity.target;

    if(target) {
        var r2 = Entity.getDistSquared(entity, target);
        var DIST_HALT2 = entity.DIST_HALT2;

        if(target.type === 'Planet') {
            DIST_HALT2 = Entity.DIST_PLANET_ORBIT2;
        }

        if (r2 > DIST_HALT2) {
            var rotation = rotateToFaceTarget(entity, target);

            entity.x += Math.cos(rotation) * entity.SPEED;
            entity.y += Math.sin(rotation) * entity.SPEED;
            
            if(entity.flameOn) {
                entity.flameOn();
            }
        } else {
            if(target.type === 'Planet') {
                if(entity.canOrbitPlanet) {
                    entity.enterPlanetOrbit(target);
                }
            }

            if(entity.flameOff) {
                entity.flameOff();
            }
        }
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};