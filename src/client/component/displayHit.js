var DEFAULTS = {
    hitTime : -1
};

/**
 * Display hits on the owner entity
 * @param entity
 */
function process(entity) {
    if(entity.renderHit) {
        entity.renderHit();
    }
}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};