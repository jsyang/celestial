var Graphics = require('./graphics');
var Geometry = require('./geometry');
var EntityDB = require('./entityDB');

var Planet       = require('./geometry/Planet.json');
var PBase        = require('./geometry/PBase.json');
var PComm        = require('./geometry/PComm.json');
var PColony      = require('./geometry/PColony.json');
var PLab         = require('./geometry/PLab.json');
var StarPort     = require('./geometry/StarPort.json');
var Star         = require('./geometry/Star.json');
var Shot         = require('./geometry/Shot.json');
var Fighter      = require('./geometry/Fighter.json');
var Freighter    = require('./geometry/Freighter.json');
var Probe        = require('./geometry/Probe.json');
var PointDisplay = require('./geometry/PointDisplay.json');

/**
 * Set child DisplayObject visibility.
 * @param {number} childIndex
 * @param {boolean} isVisible
 */
function setVisible(childIndex, isVisible) {
    this.graphics.getChildAt(childIndex).visible = isVisible;
}

var TEAM = {
    NONE    : -1,
    BLUE    : 0,
    GREEN   : 1,
    RED     : 2,
    YELLOW  : 3,
    MAGENTA : 4
};

var COLOR_TEAM = [
    0x0000ff,
    0x00ff00,
    0xff0000,
    0xffff00,
    0xff00ff
];

function assignTeamColor(geometry, team) {
    geometry.graphics.currentPath.lineColor = COLOR_TEAM[team];
}

function renderHit() {
    if (this.hitTime > 0) {
        this.hitTime--;
        this.graphics.alpha = this.hitTime % 2;
    } else if (this.hitTime === 0) {
        this.hitTime        = -1;
        this.graphics.alpha = 1;
    }
}

/**
 * Creation of more complicated entities: e.g. ones with
 * multiple hit polygons and segments / conditionally
 * rendered parts.
 */

function createPointDisplay(options) {
    return Geometry(PointDisplay, options);
}

function createPlanet(options) {
    var planet = Geometry(Planet.body, options);
    var flag   = Geometry(Planet.flag);

    planet.graphics.addChild(flag.graphics);

    return planet;
}

function createFighter(options) {
    var fighter = Geometry(Fighter.body, options);

    assignTeamColor(fighter, options.team);

    var flame1 = Geometry(Fighter.flame1);
    var flame2 = Geometry(Fighter.flame2);

    fighter.graphics.addChild(
        flame1.graphics,
        flame2.graphics
    );

    flame1.graphics.visible = false;
    flame2.graphics.visible = false;

    fighter.flame1On  = setVisible.bind(fighter, 0, true);
    fighter.flame1Off = setVisible.bind(fighter, 0, false);
    fighter.flame2On  = setVisible.bind(fighter, 1, true);
    fighter.flame2Off = setVisible.bind(fighter, 1, false);

    return fighter;
}

function createProbe(options) {
    var probe = Geometry(Probe.body, options);
    var flame = Geometry(Probe.flame);

    assignTeamColor(probe, options.team);

    probe.graphics.addChild(flame.graphics);

    flame.graphics.visible = false;

    probe.flameOn   = setVisible.bind(probe, 0, true);
    probe.flameOff  = setVisible.bind(probe, 0, false);
    probe.renderHit = renderHit;

    return probe;
}

function createStarPort(options) {
    var starport = Geometry(StarPort.body, options);
    var flame1   = Geometry(StarPort.flame1);
    var flame2   = Geometry(StarPort.flame2);
    var flame3   = Geometry(StarPort.flame3);
    var flame4   = Geometry(StarPort.flame4);

    var shipyard = Geometry(StarPort.shipyard);
    var sensors  = Geometry(StarPort.sensors);

    var turret1 = Geometry(StarPort.turret1);
    var turret2 = Geometry(StarPort.turret2);
    var turret3 = Geometry(StarPort.turret3);
    var turret4 = Geometry(StarPort.turret4);

    starport.graphics
        .addChild(
            flame1.graphics,
            flame2.graphics,
            flame3.graphics,
            flame4.graphics,

            turret1.graphics,
            turret2.graphics,
            turret3.graphics,
            turret4.graphics,

            sensors.graphics,
            shipyard.graphics
        );

    return starport;
}

function createPBase(options) {
    var pbase   = Geometry(PBase.body, options);
    var turret1 = Geometry(PBase.turret1);
    var turret2 = Geometry(PBase.turret2);
    var turret3 = Geometry(PBase.turret3);
    var turret4 = Geometry(PBase.turret4);

    pbase.graphics.addChild(
        turret1.graphics,
        turret2.graphics,
        turret3.graphics,
        turret4.graphics
    );

    return pbase;
}

function createFreighter(options) {
    var freighter = Geometry(Freighter.body, options);
    var cargoPodL = Geometry(Freighter.cargopodL);
    var cargoPodR = Geometry(Freighter.cargopodR);
    var turret1   = Geometry(Freighter.turret1);
    var turret2   = Geometry(Freighter.turret2);
    var flag      = Geometry(Freighter.flag);
    var flame     = Geometry(Freighter.flame);

    freighter.graphics
        .addChild(
            flame.graphics,
            flag.graphics,
            cargoPodL.graphics,
            cargoPodR.graphics,
            turret1.graphics,
            turret2.graphics
        );

    freighter.flameOn   = setVisible.bind(freighter, 0, true);
    freighter.flameOff  = setVisible.bind(freighter, 0, false);
    freighter.renderHit = renderHit;

    freighter.flameOff();

    return freighter;
}

function createPComm(options) {
    // todo: collisionPath should be a convex polygon
    return Geometry(PComm, options);
}

function create(type, options) {
    var entity;

    if (type === 'Star') {
        entity = Geometry(Star, options);

        /**
         * Squared distance within which this body imparts gravitational forces something
         * @type {number}
         */
        entity.DIST_MIN_GRAVITY2 = 800 * 800;
        entity.DIST_SURFACE2 = 200 * 200;

    } else if (type === 'Planet') {
        entity = createPlanet(options);
        /**
         * Squared distance within which this body imparts gravitational forces something
         * @type {number}
         */
        entity.DIST_MIN_GRAVITY2 = 600 * 600;
        entity.DIST_SURFACE2 = 105 * 105;
        entity.orbitDistance = options.orbitDistance;
        entity.star          = options.star;
        entity.rotation      = options.rotation || 0;

    } else if (type === 'ShotCannonHeavy') {
        entity = Geometry(Shot.cannon_heavy, options);

        entity.dx = options.dx || 0;
        entity.dy = options.dy || 0;
        entity.hp = options.hp || 50;
    } else if (type === 'ShotCannonNormal') {
        entity = Geometry(Shot.cannon_normal, options);

        entity.dx = options.dx || 0;
        entity.dy = options.dy || 0;
        entity.hp = options.hp || 50;
    } else if (type === 'PColony') {
        entity = Geometry(PColony, options);
    } else if (type === 'PLab') {
        entity = Geometry(PLab, options);
    } else if (type === 'PComm') {
        entity = createPComm(options);
    } else if (type === 'PointDisplay') {
        entity = createPointDisplay(options);
    } else if (type === 'Fighter') {
        entity = createFighter(options);

        entity.hp       = 6;
        entity.isDocked = options.isDocked || false;
        entity.dockedTo = options.dockedTo;
        entity.dx       = options.dx || 0;
        entity.dy       = options.dy || 0;
        entity.rotation = options.rotation || 0;
    } else if (type === 'Probe') {
        entity = createProbe(options);

        entity.AUDIO_HIT   = 'hit2';
        entity.hp          = options.hp || 2;
        entity.hasDied     = false;
        entity.hitTime     = -1;
        entity.patrolIndex = 0;
        entity.rotation    = options.rotation || 0;
    } else if (type === 'StarPort') {
        entity = createStarPort(options);
    } else if (type === 'PBase') {
        entity = createPBase(options);
    } else if (type === 'Freighter') {
        entity          = createFreighter(options);
        entity.hitTime  = -1;
        entity.hp       = 10;
        entity.dx       = options.dx || 0;
        entity.dy       = options.dy || 0;
        entity.rotation = options.rotation || 0;
        entity.isDocked = options.isDocked || false;
        entity.dockedTo = options.dockedTo;
    }

    if (entity) {
        entity.type = type;
        entity.team = options.team || TEAM.NONE;
        EntityDB.add(entity);

        // Add entity to PixiJS stage
        Graphics.addChild(entity.graphics);
    }

    return entity;
}

function getDistSquared(e1, e2) {
    var dx = e2.x - e1.x;
    var dy = e2.y - e1.y;
    return dx * dx + dy * dy;
}

function getAngleFromTo(e1, e2) {
    var dx = e2.x - e1.x;
    var dy = e2.y - e1.y;
    return Math.atan2(dy, dx);
}

module.exports = {
    create         : create,
    getDistSquared : getDistSquared,
    getAngleFromTo : getAngleFromTo,
    TEAM           : TEAM
};