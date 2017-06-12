function accelerate(acceleration) {
    this.dx += Math.cos(this.rotation) * acceleration;
    this.dy += Math.sin(this.rotation) * acceleration;
}

const DEFAULTS = {
    accelerate
};

export default {
    componentFlag: 'canAccelerate',
    DEFAULTS
}
