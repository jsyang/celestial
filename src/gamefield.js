var Entity   = require('./entity');
var EntityDB = require('./entityDB');
var Random   = require('./random');

var MAX = {
    X : 1 << 16,
    Y : 1 << 16
};

var GRID_SIZE = 1 << 10;

var gridX;
var gridY;

var MIN_STARS                 = 2;
var MAX_STARS                 = 8;
var MAX_PLANETS_PER_STAR      = 3;
var CHANCE_STARS_HAVE_PLANETS = 1;

/**
 * How far stars MUST be away from each other
 * @number
 */
var MIN_MARGIN_STARS  = 4800;
var MIN_MARGIN_STARS2 = MIN_MARGIN_STARS * MIN_MARGIN_STARS;

function generateStarPosition() {
    return {
        x : Random.int(MIN_MARGIN_STARS, MAX.X - MIN_MARGIN_STARS),
        y : Random.int(MIN_MARGIN_STARS, MAX.X - MIN_MARGIN_STARS)
    };
}

function isStarDistantFromOtherStars(star) {
    var stars = EntityDB.getByType('Star');
    if (stars) {
        for (var i = 0; i < stars.length; i++) {
            if (stars[i] !== star && Entity.getDistSquared(star, stars[i]) < MIN_MARGIN_STARS2) {
                return false;
            }
        }

        return true;

    } else {
        return true;
    }
}

function createGalaxy() {
    var i;
    var starPosition;
    var starCount = Random.int(MIN_STARS, MAX_STARS);

    for (i = 0; i < starCount; i++) {
        do {
            starPosition = generateStarPosition();
        } while(!isStarDistantFromOtherStars(starPosition));

        var star = Entity.create('Star', starPosition);

        if (Random.float(0, 1) < CHANCE_STARS_HAVE_PLANETS) {
            var planetCount = Random.int(1, MAX_PLANETS_PER_STAR);
            for (i = 0; i < planetCount; i++) {
                Entity.create('Planet', {
                    x             : 0,
                    y             : 0,
                    star          : star,
                    orbitDistance : 1800 + i * 400,
                    rotation      : Random.float(-Math.PI, Math.PI)
                });
            }
        }
    }
}

function init() {
    createGalaxy();
}

function process() {

}

module.exports = {
    init    : init,
    process : process,
    MAX     : MAX
};