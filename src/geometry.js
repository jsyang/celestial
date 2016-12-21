var PIXI = require('pixi.js');

function createCircle(options) {
    var g = new PIXI.Graphics();

    if (options.lineStyle) {
        g.lineStyle(options.lineStyle.width, options.lineStyle.color, options.lineStyle.alpha);
    }

    if (options.fill) {
        g.beginFill(options.fill.color, options.fill.alpha);
    } else {
        g.beginFill(0, 1);
    }

    g.drawCircle(0, 0, options.radius);
    g.endFill();

    g.x = options.x;
    g.y = options.y;
    return g;
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
    return g;
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
    return g;
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