var PIXI      = require('./custom-lib/pixi.min.js');
var SAT       = require('sat');
var GameField = require('./gamefield');

/**
 * Alias for SAT.Vector
 * @param {number} x
 * @param {number} y
 * @returns {*|Vector}
 */
function v(x, y) {
    return new SAT.Vector(x, y);
}

var PIPI           = Math.PI * 2;

/**
 *
 * @param {object} graphics     - PixiJS primitive
 * @param {object} collision    - SAT primitive
 * @returns {{x, y, rotation, x, y, rotation, graphics: *, collision: *}}
 */
function createMutableGeoInterface(graphics, collision) {
    return {
        set x(x) {
            if (x < 0) {
                x = 0;
                if (this.dx) {
                    this.dx = 0;
                }
            } else if (x > 32768) { // GameField.MAX_COORDINATE
                x = 32768;
                if (this.dx) {
                    this.dx = 0;
                }
            }

            this.graphics.x      = x;
            this.collision.pos.x = x;
        },
        set y(y) {
            if (y < 0) {
                y = 0;
                if (this.dy) {
                    this.dy = 0;
                }
            } else if (y > 32768) { // GameField.MAX_COORDINATE
                y = 32768;
                if (this.dy) {
                    this.dy = 0;
                }
            }

            this.graphics.y      = y;
            this.collision.pos.y = y;
        },
        set rotation(rotation) {
            if (rotation > PIPI) {
                rotation -= PIPI;
            } else if (rotation < -PIPI) {
                rotation += PIPI;
            }

            if (!(this.collision instanceof SAT.Circle)) {
                // SAT.Circle.setAngle() doesn't exist
                this.collision.setAngle(rotation);
                this.graphics.rotation = rotation;

            }
        },

        get x() {
            return this.graphics.x;
        },
        get y() {
            return this.graphics.y;
        },
        get rotation() {
            return this.graphics.rotation;
        },

        graphics  : graphics,
        collision : collision
    };
}

function createCircle(options) {
    var g = new PIXI.Graphics();

    if (options.lineStyle) {
        g.lineStyle(options.lineStyle.width, options.lineStyle.color, options.lineStyle.alpha);
    }

    if (options.fill) {
        g.beginFill(options.fill.color, options.fill.alpha);
    } else {
        g.beginFill(0, 0);
    }

    g.drawCircle(0, 0, options.radius);
    g.endFill();

    g.x = options.x;
    g.y = options.y;

    return createMutableGeoInterface(
        g, new SAT.Circle(v(g.x, g.y), options.radius)
    );
}

function createPolygon(options) {
    var g = new PIXI.Graphics();

    if (options.lineStyle) {
        g.lineStyle(options.lineStyle.width, options.lineStyle.color, options.lineStyle.alpha);
    }

    if (options.fill) {
        g.beginFill(options.fill.color, options.fill.alpha);
    } else {
        g.beginFill(0x000000, 0);
    }

    g.drawPolygon(options.path);
    g.endFill();
    g.x = options.x;
    g.y = options.y;

    var polygonSAT = [];
    if (options.collisionPath) {
        for (var i = 0; i < options.collisionPath.length; i += 2) {
            polygonSAT.push(v(
                options.collisionPath[i],       // x
                options.collisionPath[i + 1]    // y
            ));
        }
    }

    return createMutableGeoInterface(
        g, new SAT.Polygon(v(g.x, g.y), polygonSAT)
    );
}

/**
 * @param {object} geometryDef Collision and Graphics Geometry
 * @param {object} options
 */
function Geometry(geometryDef, options) {
    // Start with default geometries loaded from `src/geometry/*.json`
    var geometryOptions = JSON.parse(JSON.stringify(geometryDef));

    // Overwrite properties as needed (e.g. x, y, rotation, lineStyle, ...)
    if (options) {
        for (var k in options) {
            if (options.hasOwnProperty(k)) {
                geometryOptions[k] = options[k];
            }
        }
    } else {
        geometryOptions.x = 0;
        geometryOptions.y = 0;
    }

    if (geometryOptions.type === 'circle') {
        return createCircle(geometryOptions);

    } else if (geometryOptions.type === 'polygon') {
        return createPolygon(geometryOptions);
    }
}

module.exports = Geometry;