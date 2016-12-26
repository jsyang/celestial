var Entity = require('../entity');

var star;

var attractorX = -150;
var attractorY = -50;

function init() {
    star = Entity.create('Star', {
        x        : attractorX,
        y        : attractorY,
        rotation : 0
    });
}

function process() {}

module.exports = {
    init    : init,
    process : process
};