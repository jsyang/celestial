var EntityDB  = require('../entityDB');
var Component = require('../component');

function process() {
    var pbase = EntityDB.getByType('PBase');
    if (pbase) {
        pbase.forEach(Component.process);
    }
}

module.exports = {
    process : process
};