var PIXI   = require('./custom-lib/pixi.min.js');
var Random = require('./random');

var COUNT_STARS_DIM    = 40;
var COUNT_STARS_BRIGHT = 20;

var stars = [];

function createStar(stage, options) {
    var g = new PIXI.Graphics();

    g.beginFill(0xffffff, options.alpha);

    g.drawRect(0, 0, options.size, options.size);
    g.endFill();

    g.x = options.x;
    g.y = options.y;

    g.size = options.size;

    stage.addChild(g);

    return g;
}

var STAR_BRIGHT = {
    size  : 2,
    alpha : 0.8,
    x     : 0,
    y     : 0
};

var STAR_DIM = {
    size  : 2,
    alpha : 0.3,
    x     : 0,
    y     : 0
};

function init(stage) {
    var i;

    for (i = 0; i < COUNT_STARS_DIM; i++) {
        stars.push(createStar(stage, STAR_DIM));
    }

    for (i = 0; i < COUNT_STARS_BRIGHT; i++) {
        stars.push(createStar(stage, STAR_BRIGHT));
    }
}

function reinit(point) {
    var width2  = innerWidth >> 1;
    var height2 = innerHeight >> 1;

    var count = COUNT_STARS_BRIGHT + COUNT_STARS_DIM;
    for (var i = 0; i < count; i++) {
        stars[i].x = point.x + Random.float(-width2, width2);
        stars[i].y = point.y + Random.float(-height2, height2);
    }
}

var SPEED_STARS_BRIGHT = 0.01;
var SPEED_STARS_DIM    = 0.3;

function moveStar(width2, height2, dx, dy, center, star) {
    if (star.size === 1) {
        dx *= SPEED_STARS_DIM;
        dy *= SPEED_STARS_DIM;
    } else {
        dx *= SPEED_STARS_BRIGHT;
        dy *= SPEED_STARS_BRIGHT;
    }

    star.x += dx;
    star.y += dy;

    if (star.x < center.x - width2) {
        star.x = center.x + width2;
    } else if (star.x > center.x + width2) {
        star.x = center.x - width2;
    }

    if (star.y < center.y - height2) {
        star.y = center.y + height2;
    } else if (star.y > center.y + height2) {
        star.y = center.y - height2;
    }
}

function process(center, dx, dy) {
    stars.forEach(
        moveStar.bind(
            null,
            innerWidth >> 1,
            innerHeight >> 1,
            dx,
            dy,
            center
        )
    );
}

module.exports = {
    init    : init,
    reinit  : reinit,
    process : process
};