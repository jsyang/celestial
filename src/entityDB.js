var Graphics = require('./graphics');
var Random   = require('./random');

var byId   = {};
var byType = {};
var byTeam = {};

function generateId() {
    return Random.int(0, Date.now()).toString(16).substr(0, 6);
}

function add(entity) {
    entity.id = generateId();

    byId[entity.id.toString()] = entity;

    if (byType[entity.type.toString()]) {
        byType[entity.type.toString()].push(entity);
    } else {
        byType[entity.type.toString()] = [entity];
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

function getById(id) {
    return byId[id];
}

function remove(entity) {
    /** todo **/
    delete byId[entity.id];

    var byTypeIndex = -1;
    byType[entity.type].filter(function (e, i) {
        if (e === entity) {
            byTypeIndex = i;
        }
    });

    byType[entity.type].splice(byTypeIndex, 1);

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
    getByTeam : getByTeam,
    getById   : getById
};