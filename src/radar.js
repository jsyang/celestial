var PIXI = require('./custom-lib/pixi.min.js');

var DIAL_TRACK_ALPHA = 0.08;
var DEGREES          = Math.PI * 0.5 / 90;

var dialNearestPlanet;

function createNearestPlanetDial() {
    var g = new PIXI.Graphics();
    g.beginFill(0, 0);
    g.lineStyle(1, 0xffffff, DIAL_TRACK_ALPHA);
    g.drawCircle(0, 0, 60);
    g.endFill();

    g.x = 0;
    g.y = 0;

    var d = new PIXI.Graphics();
    d.beginFill(0, 0);
    d.lineStyle(2, 0x00ff00, 1);
    d.arc(0, 0, 60, -3 * DEGREES, 3 * DEGREES);
    d.endFill();

    d.x = 0;
    d.y = 0;

    g.addChild(d);
    return g;
}

var dialNearestStar;

function createNearestStarDial() {
    var g = new PIXI.Graphics();
    g.beginFill(0, 0);
    g.lineStyle(1, 0xffffff, DIAL_TRACK_ALPHA);
    g.drawCircle(0, 0, 64);
    g.endFill();

    g.x = 0;
    g.y = 0;

    var d = new PIXI.Graphics();
    d.beginFill(0, 0);
    d.lineStyle(2, 0xffff00, 1);
    d.arc(0, 0, 64, -6 * DEGREES, 6 * DEGREES);
    d.endFill();

    d.x = 0;
    d.y = 0;

    g.addChild(d);
    return g;
}

var dialNearestEnemy;

function createNearestEnemyDial() {
    var g = new PIXI.Graphics();
    g.beginFill(0, 0);
    g.lineStyle(1, 0xffffff, DIAL_TRACK_ALPHA);
    g.drawCircle(0, 0, 68);
    g.endFill();

    g.x = 0;
    g.y = 0;

    var d = new PIXI.Graphics();
    d.beginFill(0, 0);
    d.lineStyle(2, 0xff0000, 1);
    d.arc(0, 0, 68, -DEGREES, DEGREES);
    d.endFill();

    d.x = 0;
    d.y = 0;

    g.addChild(d);
    return g;
}

var dials;

function init(stage) {
    dialNearestPlanet = createNearestPlanetDial();
    dialNearestStar   = createNearestStarDial();
    dialNearestEnemy  = createNearestEnemyDial();

    dials = new PIXI.Container();
    dials.addChild(
        dialNearestPlanet,
        dialNearestStar,
        dialNearestEnemy
    );

    stage.addChild(dials);
    dials.visible = false;
}

function setPosition(point) {
    dials.x = point.x;
    dials.y = point.y;
}

var radarEnabled = true;

function setRotations(rotation) {
    if (rotation.nearestEnemy) {
        dialNearestEnemy.visible  = true;
        dialNearestEnemy.rotation = rotation.nearestEnemy;
    } else {
        dialNearestEnemy.visible = false;
    }

    if (rotation.nearestStar) {
        dialNearestStar.visible  = true;
        dialNearestStar.rotation = rotation.nearestStar;
    } else {
        dialNearestStar.visible = false;
    }

    if (rotation.nearestPlanet) {
        dialNearestPlanet.visible  = true;
        dialNearestPlanet.rotation = rotation.nearestPlanet;
    } else {
        dialNearestPlanet.visible = false;
    }
}

module.exports = {
    init         : init,
    setRotations : setRotations,
    setPosition  : setPosition,

    set isEnabled(isEnabled) {
        radarEnabled  = isEnabled;
        dials.visible = isEnabled;
    },
    get isEnabled() {
        return radarEnabled;
    }
};