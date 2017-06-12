// Proximity radar
// Available to any unit

// todo: convert to TS

import * as PIXI  from 'pixi.js';
import Graphics from './Graphics';
import Entity from './Entity';

var DIAL_TRACK_ALPHA = 0.08;
var DEGREES          = Math.PI / 180;

var dialNearestPlanet;

function createNearestPlanetDial() {
    var g = new PIXI.Graphics();
    g.beginFill(0, 0);
    g.lineStyle(4, 0xffffff, DIAL_TRACK_ALPHA);
    g.drawCircle(0, 0, 45);
    g.endFill();

    g.x = 0;
    g.y = 0;

    var d = new PIXI.Graphics();
    d.beginFill(0, 0);
    d.lineStyle(4, 0x00ff00, 1);
    d.arc(0, 0, 45, -3 * DEGREES, 3 * DEGREES);
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
    g.lineStyle(4, 0xffffff, DIAL_TRACK_ALPHA);
    g.drawCircle(0, 0, 50);
    g.endFill();

    g.x = 0;
    g.y = 0;

    var d = new PIXI.Graphics();
    d.beginFill(0, 0);
    d.lineStyle(4, 0xffff00, 1);
    d.arc(0, 0, 50, -6 * DEGREES, 6 * DEGREES);
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
    g.drawCircle(0, 0, 50);
    g.endFill();

    g.x = 0;
    g.y = 0;

    var d = new PIXI.Graphics();
    d.beginFill(0, 0);
    d.lineStyle(2, 0xff0000, 1);
    d.arc(0, 0, 50, -DEGREES, DEGREES);
    d.endFill();

    d.x = 0;
    d.y = 0;

    g.addChild(d);
    return g;
}

var TEXT_OPTIONS = {
    fontFamily: 'arial',
    fontSize:   8,
    fill:       0xf8f8f8,
    align:      'center'
};

var centerLabel;

function createCenterLabel() {
    var centerLabel = new PIXI.Text(
        'Tactical Radar',
        TEXT_OPTIONS
    );
    centerLabel.x   = -centerLabel.width >> 1;
    centerLabel.y   = -centerLabel.height >> 1;
    return centerLabel;
}

var dials;
var MARGIN_EDGE = 4;

function init() {
    dialNearestPlanet = createNearestPlanetDial();
    dialNearestStar   = createNearestStarDial();
    dialNearestEnemy  = createNearestEnemyDial();
    centerLabel       = createCenterLabel();

    dials = new PIXI.Container();
    dials.addChild(
        dialNearestPlanet,
        dialNearestStar,
        dialNearestEnemy,
        centerLabel
    );

    dials.x       = MARGIN_EDGE + 50;
    dials.y       = 100 + MARGIN_EDGE * 3 + 50;
    dials.visible = true;

    Graphics.addChildToHUD(dials);
}

let radarEnabled = true;

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

var lastUpdateTime = 0;
var TIME_UPDATE    = 500;

var origin;

function update() {
    if (origin && radarEnabled) {
        var now = Date.now();

        if (now - lastUpdateTime > TIME_UPDATE) {
            var nearestPlanet = Entity.getAbsoluteNearestByType(origin, 'Planet');
            var nearestStar   = Entity.getAbsoluteNearestByType(origin, 'Star');

            setRotations({
                nearestEnemy:  undefined,
                nearestPlanet: nearestPlanet ? Entity.getAngleFromTo(origin, nearestPlanet) : undefined,
                nearestStar:   nearestStar ? Entity.getAngleFromTo(origin, nearestStar) : undefined
            });

            lastUpdateTime = now;
        }
    }
}

function setOrigin(entity) {
    if (entity) {
        origin = {x: entity.x, y: entity.y};
    }
}

export default {
    init,
    update,

    setOrigin,
    setRotations,

    set isEnabled(isEnabled) {
        radarEnabled  = isEnabled;
        dials.visible = isEnabled;
    },
    get isEnabled() {
        return radarEnabled;
    }
};