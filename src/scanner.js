/**
 * Galactic scanner
 */
var PIXI      = require('./custom-lib/pixi.min.js');
var Entity    = require('./entity');
var EntityDB  = require('./entityDB');
var GameField = require('./gamefield');
var Graphics  = require('./graphics');

var ALPHA_SCANNER_BORDER = 0.8;

var SIZE        = 100;
var MARGIN_EDGE = 4;

var scanner;

function init() {
    scanner = new PIXI.Graphics();
    scanner.beginFill(0, 0);
    scanner.lineStyle(1, 0xffffff, ALPHA_SCANNER_BORDER);
    scanner.drawRect(0, 0, SIZE, SIZE);
    scanner.endFill();

    scanner.x = MARGIN_EDGE;
    scanner.y = MARGIN_EDGE;

    Graphics.addChildToHUD(scanner);
}

var markerStar    = [];
var markerPlanet  = [];
var markerFighter = [];

var COORDINATE_TO_SCANNER_FACTOR = SIZE / GameField.MAX_COORDINATE;

function createMarker(color, size) {
    var marker = new PIXI.Graphics();
    marker.beginFill(0, 0);
    marker.lineStyle(1, color, 1);
    marker.drawRect(-size, -size, size, size);
    marker.endFill();
    scanner.addChild(marker);

    return marker;
}

function drawMarker(markers, color, size, s, i) {
    var marker = markers[i];
    if (!marker) {
        marker     = createMarker(color, size);
        markers[i] = marker;
    }

    marker.x = s.x * COORDINATE_TO_SCANNER_FACTOR;
    marker.y = s.y * COORDINATE_TO_SCANNER_FACTOR;
}

var COLOR_MARKER_STAR   = 0xffff00;
var COLOR_MARKER_PLANET = 0x00ff00;

var lastUpdateTime = 0;
var TIME_UPDATE    = 500;

function update() {
    var now = Date.now();

    if (now - lastUpdateTime > TIME_UPDATE) {
        var stars = EntityDB.getByType('Star');
        if (stars) {
            stars.forEach(drawMarker.bind(null, markerStar, COLOR_MARKER_STAR, 2));
        }

        var planets = EntityDB.getByType('Planet');
        if (planets) {
            planets.forEach(drawMarker.bind(null, markerPlanet, COLOR_MARKER_PLANET, 2));
        }

        var fighters = EntityDB.getByType('Fighter');
        if (fighters) {
            fighters.forEach(function (f, i) {
                drawMarker(markerFighter, Entity.getTeamColor(f.team), 1, f, i);
            });
        }

        lastUpdateTime = now;
    }
}

module.exports = {
    init   : init,
    update : update
};