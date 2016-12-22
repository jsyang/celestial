var Random = require('./random');

var byId   = {};
var byType = {};
var byTeam = {};

function generateId() {
    return Random.int(0, Date.now()).toString(16).substr(0, 6);
}

function add(entity) {
    entity.id = generateId();

    byId[entity.id.toString()]     = entity;
    byType[entity.type.toString()] = entity;
    byTeam[entity.team.toString()] = entity;
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
    // delete byId reference
    // delete byType reference
    // delete byTeam reference

    // delete from SAT
    // delete from PixiJS stage

    // break any remaining references for garbage collector
}

module.exports = {
    add    : add,
    remove : remove,

    getByType : getByType,
    getByTeam : getByTeam,
    getById   : getById
};