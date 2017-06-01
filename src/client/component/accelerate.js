function accelerate(acceleration) {
    this.dx += Math.cos(this.rotation) * acceleration;
    this.dy += Math.sin(this.rotation) * acceleration;

}

var DEFAULTS = {
    accelerate : accelerate
};

function process() {}

module.exports = {
    DEFAULTS : DEFAULTS,
    process  : process
};