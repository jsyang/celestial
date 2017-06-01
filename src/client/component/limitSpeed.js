var DEFAULTS = {
    MAX_SPEED  : 40,
    MAX_SPEED2 : 40 * 40
};

/**
 * Limit speed to MAX_SPEED
 * @param entity
 */
function process(entity) {
    var dx2 = entity.dx * entity.dx;
    var dy2 = entity.dy * entity.dy;

    var speed2 = dx2 + dy2;
    if (speed2 > entity.MAX_SPEED2) {
        var limitFactor = entity.MAX_SPEED * Math.pow(speed2, -0.5);
        entity.dx *= limitFactor;
        entity.dy *= limitFactor;
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};