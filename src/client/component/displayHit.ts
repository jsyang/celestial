const DEFAULTS = {
    hitTime : -1
};

/**
 * Display hits on the owner entity
 */
function process(entity) {
    if(entity.renderHit) {
        entity.renderHit();
    }
}

export default {
    componentFlag: 'canDisplayHit',
    DEFAULTS,
    process
}
