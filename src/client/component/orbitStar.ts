const DEFAULTS = {
    D_ROTATION    : 0.0001,
    orbitDistance : 1800,
    orbitRotation : 0
};

function process(entity) {
    entity.orbitRotation += entity.D_ROTATION;
    entity.x     = Math.cos(entity.orbitRotation) * entity.orbitDistance + entity.star.x;
    entity.y     = Math.sin(entity.orbitRotation) * entity.orbitDistance + entity.star.y;
}

export default {
    componentFlag: 'canOrbitStar',
    DEFAULTS,
    process
}
