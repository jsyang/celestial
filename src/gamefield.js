var Entity   = require('./entity');
var EntityDB = require('./entityDB');
var Random   = require('./random');

var MAX_COORDINATE = 1 << 15;

var MIN_STARS                 = 2;
var MAX_STARS                 = 5;
var MAX_PLANETS_PER_STAR      = 2;
var CHANCE_STARS_HAVE_PLANETS = 0.8;

/**
 * How far stars MUST be away from each other
 * @number
 */
var MIN_MARGIN_STARS  = 6000;
var MIN_MARGIN_STARS2 = MIN_MARGIN_STARS * MIN_MARGIN_STARS;

function generateStarPosition() {
    return {
        x : Random.float(MIN_MARGIN_STARS, MAX_COORDINATE - MIN_MARGIN_STARS),
        y : Random.float(MIN_MARGIN_STARS, MAX_COORDINATE - MIN_MARGIN_STARS)
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

/**
 * Create a game field with some Stars and Planets orbiting them
 */
function init() {
    var starPosition;
    var starCount = Random.int(MIN_STARS, MAX_STARS);

    for (var i = 0; i < starCount; i++) {
        do {
            starPosition = generateStarPosition();
        } while (!isStarDistantFromOtherStars(starPosition));

        var star = Entity.create('Star', starPosition);

        if (Random.float(0, 1) < CHANCE_STARS_HAVE_PLANETS) {
            var planetCount = Random.int(1, MAX_PLANETS_PER_STAR);
            for (var j = 0; j < planetCount; j++) {
                Entity.create('Planet', {
                    x             : 0,
                    y             : 0,
                    star          : star,
                    orbitDistance : 1600 + j * Random.int(2, 5) * 800,
                    orbitRotation : Random.float(-Math.PI, Math.PI)
                });
            }
        }
    }

    // Test entities
    var fighter = Entity.create('Fighter', {
        x    : Random.int(0, MAX_COORDINATE),
        y    : Random.int(0, MAX_COORDINATE),
        team : Entity.TEAM.MAGENTA
    });

    Entity.create('Freighter', {
        x      : fighter.x + Random.int(-100, 100),
        y      : fighter.y + Random.int(-100, 100),
        target : fighter,
        team   : Entity.TEAM.MAGENTA
    });
    Entity.create('Freighter', {
        x      : fighter.x + Random.int(-100, 100),
        y      : fighter.y + Random.int(-100, 100),
        target : fighter,
        team   : Entity.TEAM.MAGENTA
    });
}

module.exports = {
    init           : init,
    MAX_COORDINATE : MAX_COORDINATE
};