var Graphics = require('./graphics');

var byType = {};

/**
 * @param {object} entity
 */
function add(entity) {
    var type = entity.type.toString();

    if (byType[type]) {
        byType[type].push(entity);
    } else {
        byType[type] = [entity];
    }
}

function getByType(type) {
    return byType[type];
}

/**
 * Remove entity from the DB
 * @param {object} entity
 */
function remove(entity) {
    var i;

    if (entity.hp != null) {
        entity.hp = 0;
    }

    if (entity.planet) {
        entity.planet[entity.type.toLowerCase()] = undefined;
    }

    if (entity.target) {
        entity.target = undefined;
    }

    var byTypeIndex      = -1;
    var byTypeCollection = byType[entity.type];
    for (i = byTypeCollection.length - 1; i >= 0; i--) {
        if (entity === byTypeCollection[i]) {
            byTypeIndex = i;
            break;
        }
    }

    if (byTypeIndex !== -1) {
        byType[entity.type].splice(byTypeIndex, 1);
    }

    Graphics.removeChild(entity.graphics);
}

/**
 * @param {object} f
 * @param {string} type
 * @returns {object|*}
 */
function getAbsoluteNearestByType(f, type) {
    var entities    = getByType(type);
    var nearest;
    var nearestDist = Infinity;

    if (entities) {
        entities.forEach(function (e) {
            var dx   = e.x - f.x;
            var dy   = e.y - f.y;
            var dist = dx * dx + dy * dy;
            if (dist < nearestDist) {
                nearestDist = dist;
                nearest     = e;
            }
        });
    }

    return nearest;
}

module.exports = {
    add    : add,
    remove : remove,

    getByType : getByType,

    getAbsoluteNearestByType : getAbsoluteNearestByType
};