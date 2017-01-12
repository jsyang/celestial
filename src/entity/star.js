var EntityDB   = require('../entityDB');
var EntityGrid = require('../entitygrid');

function process() {
    var stars = EntityDB.getByType('Star');
    if (stars) {
        stars.forEach(EntityGrid.add);
    }
}

module.exports = {
    process : process
};