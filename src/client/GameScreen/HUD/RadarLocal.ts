// Proximity radar
// Available to any unit

import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import Entity from '../../Entity';

const DIAL_TRACK_ALPHA = 0.08;
const DEGREES          = Math.PI / 180;

function createDialAndTrack({trackWidth, trackColor, trackRadius, dialColor, dialSize}) {
    // Circular track
    const g = new PIXI.Graphics();
    g.beginFill(0, 0);
    g.lineStyle(trackWidth, trackColor, DIAL_TRACK_ALPHA);
    g.drawCircle(0, 0, trackRadius);
    g.endFill();

    g.x = 0;
    g.y = 0;

    // Colored dial
    const d = new PIXI.Graphics();
    d.beginFill(0, 0);
    d.lineStyle(trackWidth, dialColor, 1);

    const halfDialSize = 0.5 * dialSize;
    d.arc(0, 0, trackRadius, -halfDialSize * DEGREES, halfDialSize * DEGREES);
    d.endFill();

    d.x = 0;
    d.y = 0;

    g.addChild(d);
    return g;
}

let dials;
const MARGIN_EDGE = 4;

let dialNearestEnemy;
let dialNearestPlanet;
let dialNearestStar;

function init() {
    dialNearestPlanet = createDialAndTrack({
        trackWidth:  4,
        trackRadius: 45,
        trackColor:  0xffffff,
        dialColor:   0x00ff00,
        dialSize:    6
    });

    dialNearestStar = createDialAndTrack({
        trackWidth:  4,
        trackRadius: 50,
        trackColor:  0xffffff,
        dialColor:   0xffff00,
        dialSize:    12
    });

    dialNearestEnemy = createDialAndTrack({
        trackWidth:  1,
        trackRadius: 50,
        trackColor:  0xffffff,
        dialColor:   0xff0000,
        dialSize:    2
    });

    const centerLabel = new PIXI.Text(
        'Tactical Radar',
        {
            fontFamily: 'arial',
            fontSize:   8,
            fill:       0xf8f8f8,
            align:      'center'
        }
    );
    centerLabel.x     = -centerLabel.width >> 1;
    centerLabel.y     = -centerLabel.height >> 1;

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

let lastUpdateTime = 0;
const TIME_UPDATE  = 500;

function update() {
    if (origin && radarEnabled) {
        const now = Date.now();

        if (now - lastUpdateTime > TIME_UPDATE) {
            const nearestPlanet = Entity.getAbsoluteNearestByBodyType(origin, 'Planet');
            const nearestStar   = Entity.getAbsoluteNearestByBodyType(origin, 'Star');

            setRotations({
                nearestEnemy:  undefined,
                nearestPlanet: nearestPlanet && Entity.getAngleFromTo(origin, nearestPlanet),
                nearestStar:   nearestStar && Entity.getAngleFromTo(origin, nearestStar)
            });

            lastUpdateTime = now;
        }
    }
}

let origin;
const setOrigin = ({x, y}) => origin = {x, y};

export default {
    init,
    update,

    setOrigin,

    set isEnabled(isEnabled) {
        radarEnabled  = isEnabled;
        dials.visible = isEnabled;
    },
    get isEnabled() {
        return radarEnabled;
    }
};