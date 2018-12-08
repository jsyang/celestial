const DEFAULTS = {
    MAX_RAW_MATERIALS:      3000,
    MAX_FINISHED_MATERIALS: 2000,
    materialsRaw:           0,
    materialsFinished:      0
};

export default {
    process:       new Function(),
    componentFlag: 'canStoreMaterial',
    DEFAULTS
}
