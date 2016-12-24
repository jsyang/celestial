var Graphics = require('./graphics');
var Geometry = require('./geometry');
var EntityDB = require('./entityDB');

var Planet    = require('./geometry/Planet.json');
var PBase     = require('./geometry/PBase.json');
var PComm     = require('./geometry/PComm.json');
var PColony   = require('./geometry/PColony.json');
var PLab      = require('./geometry/PLab.json');
var StarPort  = require('./geometry/StarPort.json');
var Star      = require('./geometry/Star.json');
var Shot      = require('./geometry/Shot.json');
var Fighter   = require('./geometry/Fighter.json');
var Freighter = require('./geometry/Freighter.json');

/**
 * Set child DisplayObject visibility.
 * @param {number} childIndex
 * @param {boolean} isVisible
 */
function setVisible(childIndex, isVisible) {
    this.graphics.getChildAt(childIndex).visible = isVisible;
}

/**
 * Creation of more complicated entities: e.g. ones with
 * multiple hit polygons and segments / conditionally
 * rendered parts.
 */

function createPlanet(options) {
    var planet = Geometry(Planet.body, options);
    var flag   = Geometry(Planet.flag);

    planet.graphics.addChild(flag.graphics);

    return planet;
}

function createFighter(options) {
    var fighter = Geometry(Fighter.body, options);

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

    freighter.flameOn  = setVisible.bind(freighter, 0, true);
    freighter.flameOff = setVisible.bind(freighter, 0, false);

    freighter.flameOff();
    freighter.graphics.alpha = 0.85;

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
    } else if (type === 'ShotCannonNormal') {
        entity = Geometry(Shot.cannon_normal, options);

        entity.dx       = options.dx;
        entity.dy       = options.dy;
        entity.lifespan = options.lifespan;
    } else if (type === 'PColony') {
        entity = Geometry(PColony, options);
    } else if (type === 'PLab') {
        entity = Geometry(PLab, options);
    } else if (type === 'PComm') {
        entity = createPComm(options);
    } else if (type === 'Planet') {
        entity = createPlanet(options);
    } else if (type === 'Fighter') {
        entity = createFighter(options);

        entity.dx = options.dx;
        entity.dy = options.dy;
    } else if (type === 'StarPort') {
        entity = createStarPort(options);
    } else if (type === 'PBase') {
        entity = createPBase(options);
    } else if (type === 'Freighter') {
        entity         = createFreighter(options);
        entity.hitTime = 0;
        entity.hp      = 10;
    }

    if (entity) {
        entity.type = type;
        entity.team = options.team;
        EntityDB.add(entity);

        // Add entity to PixiJS stage
        Graphics.addChild(entity.graphics);
    }

    return entity;
}

var TEAM = {
    BLUE    : 0,
    GREEN   : 1,
    RED     : 2,
    YELLOW  : 3,
    MAGENTA : 4
};

module.exports = {
    create : create,
    TEAM   : TEAM
};