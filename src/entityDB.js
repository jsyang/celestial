var Graphics = require('./graphics');

var byType = {};

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

function getByTeam(team) {
    return byType[team];
}

function remove(entity) {
    if (entity.hp != null) {
        entity.hp = 0;
    }

    var byTypeIndex = -1;
    var byTypeCollection = byType[entity.type];
    for (var i = -1; i < byTypeCollection.length; i++) {
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

module.exports = {
    add    : add,
    remove : remove,

    getByType : getByType,
    getByTeam : getByTeam
};