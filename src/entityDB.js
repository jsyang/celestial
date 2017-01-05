var Graphics = require('./graphics');

var byType = {};
var byTeam = {};

function add(entity) {
    var type = entity.type.toString();

    if (byType[type]) {
        byType[type].push(entity);
    } else {
        byType[type] = [entity];
    }

    /*
     if(entity.team) {
     byTeam[entity.team.toString()] = entity;
     }
     */
}

function getByType(type) {
    return byType[type];
}

function getByTeam(team) {
    return byType[team];
}

function remove(entity) {
    if(entity.hp != null) {
        entity.hp = 0;
    }

    var byTypeIndex = -1;
    byType[entity.type].filter(function (e, i) {
        if (e === entity) {
            byTypeIndex = i;
        }
    });

    if(byTypeIndex !== -1) {
        byType[entity.type].splice(byTypeIndex, 1);
    }

    // delete byId reference
    // delete byType reference
    // delete byTeam reference

    // delete from SAT
    Graphics.removeChild(entity.graphics);

    // break any remaining references for garbage collector
}

module.exports = {
    add    : add,
    remove : remove,

    getByType : getByType,
    getByTeam : getByTeam
};