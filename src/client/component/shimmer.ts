const DEFAULTS = {
    isShimmering:       true,
    isShimmerBlink:     false,
    shimmerTime:        3,
    shimmerTimeMax:     3,
    shimmerBlinkColor:  0xffffff,
    shimmerNormalColor: 0xff00ff
};

/**
 * Display hits on the owner entity
 */
function process(entity) {
    if (entity.isShimmering) {
        const {shimmerBlinkColor, shimmerNormalColor, shimmerTime, shimmerTimeMax, isShimmerBlink} = entity;

        if (shimmerTime > 0) {
            entity.shimmerTime--;
        } else {
            entity.shimmerTime    = shimmerTimeMax;
            entity.isShimmerBlink = !isShimmerBlink;
        }

        entity.geo.graphics.tint = isShimmerBlink ? shimmerBlinkColor : shimmerNormalColor;
    } else {
        entity.geo.graphics.tint = entity.shimmerNormalColor;
    }
}

export default {
    componentFlag: 'canShimmer',
    DEFAULTS,
    process
}
