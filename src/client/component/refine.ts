const DEFAULTS = {
    REFINE_RATE_RAW_TO_FINISHED : 0.5
};

/**
 * Refines finished materials from raw materials
 */
function process(entity) {
    if (entity.materialsFinished < entity.MAX_FINISHED_MATERIALS) {
        if (entity.materialsRaw > 0) {
            entity.materialsFinished += entity.REFINE_RATE_RAW_TO_FINISHED;
            if (entity.materialsFinished > entity.MAX_FINISHED_MATERIALS) {
                entity.planet.materialsFinished += entity.materialsFinished - entity.MAX_FINISHED_MATERIALS;
                entity.materialsFinished = entity.MAX_FINISHED_MATERIALS;
            }
            entity.materialsRaw--;
        }
    } else {
        if (entity.materialsRaw > 0) {
            entity.planet.materialsFinished += entity.REFINE_RATE_RAW_TO_FINISHED;
            entity.materialsRaw--;
        }
    }
}

export default {
    componentFlag: 'canRefine',
    DEFAULTS,
    process
}
