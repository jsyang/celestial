var PIXI = require('./custom-lib/pixi.min.js');
var SAT  = require('sat');

function v(x, y) {
    return new SAT.Vector(x, y);
}

function createMutableGeoInterface(graphics, collision) {
    return {
        set x(x) {
            this.graphics.x      = x;
            this.collision.pos.x = x;
        },
        set y(y) {
            this.graphics.y      = y;
            this.collision.pos.y = y;
        },
        set rotation(rotation) {
            this.graphics.rotation = rotation;
            this.collision.setAngle(rotation);
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

function createRectangle(options) {
    var g = new PIXI.Graphics();

    if (options.lineStyle) {
        g.lineStyle(options.lineStyle.width, options.lineStyle.color, options.lineStyle.alpha);
    }

    if (options.fill) {
        g.beginFill(options.fill.color, options.fill.alpha);
    } else {
        g.beginFill(0x000000, 0);
    }

    g.drawRect(0, 0, options.w, options.h);
    g.endFill();

    g.x = options.x;
    g.y = options.y;

    return createMutableGeoInterface(
        g, new SAT.Box(v(g.x, g.y), options.w, options.h)
    );
}

function createLine(options) {
    var g = new PIXI.Graphics();

    if (options.lineStyle) {
        g.lineStyle(options.lineStyle.width, options.lineStyle.color, options.lineStyle.alpha);
    }

    g.moveTo(0, 0);
    g.lineTo(options.x2, options.y2);

    g.x = options.x1;
    g.y = options.y1;
    return g;
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
    if(options.collisionPath) {
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

function Geometry(options) {
    if (options.type === 'circle') {
        return createCircle(options);

    } else if (options.type === 'line') {
        return createLine(options);

    } else if (options.type === 'rectangle') {
        return createRectangle(options);

    } else if (options.type === 'polygon') {
        return createPolygon(options);
    }
}

module.exports = Geometry;