const DEFAULTS = {
    MAX_SPEED:  40,
    MAX_SPEED2: 40 ** 2
};

/**
 * Limit speed to MAX_SPEED
 */
function process(entity) {
    const dx2 = entity.dx ** 2;
    const dy2 = entity.dy ** 2;

    const speed2 = dx2 + dy2;
    if (speed2 > entity.MAX_SPEED2) {
        const limitFactor = entity.MAX_SPEED * Math.pow(speed2, -0.5);
        entity.dx *= limitFactor;
        entity.dy *= limitFactor;
    }
}

export default {
    componentFlag: 'canLimitSpeed',
    DEFAULTS,
    process
}
