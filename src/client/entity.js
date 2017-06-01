var Graphics = require('./graphics');
var Geometry = require('./geometry');
var EntityDB = require('./entityDB');

var Star   = require('./geometry/Star.json');
var Planet = require('./geometry/Planet.json');

var PBase       = require('./geometry/PBase.json');
var PComm       = require('./geometry/PComm.json');
var PColony     = require('./geometry/PColony.json');
var PLab        = require('./geometry/PLab.json');
var SpacePort   = require('./geometry/SpacePort.json');
var SpaceDock   = require('./geometry/SpaceDock.json');
var SensorArray = require('./geometry/SensorArray.json');

var Shot      = require('./geometry/Shot.json');
var Fighter   = require('./geometry/Fighter.json');
var Freighter = require('./geometry/Freighter.json');
var Probe     = require('./geometry/Probe.json');

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

function setPlanetFlag(team) {
    var flag = this.graphics.children[0];
    if (team === TEAM.NONE) {
        flag.visible = false;
    } else {
        flag.visible                   = true;
        flag.graphicsData[0].fillColor = COLOR_TEAM[team];
    }

    this.team = team;
}

function createPlanet(options) {
    var planet = Geometry(Planet.body, options);
    var flag   = Geometry(Planet.flag);
    planet.graphics.addChild(flag.graphics);
    planet.setPlanetFlag = setPlanetFlag;
    planet.setPlanetFlag(TEAM.NONE);

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

    fighter.flameOn = function () {
        setVisible.call(this, 0, true);
        setVisible.call(this, 1, true);
    };

    fighter.flameOff = function () {
        setVisible.call(this, 0, false);
        setVisible.call(this, 1, false);
    };

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

function createSpaceDock(options) {
    var spaceDock = Geometry(SpaceDock, options);

    assignTeamColor(spaceDock, options.team);

    return spaceDock;
}

function createSensorArray(options) {
    var sensorArray = Geometry(SensorArray, options);

    assignTeamColor(sensorArray, options.team);

    return sensorArray;
}

function createSpacePort(options) {
    var spacePort = Geometry(SpacePort.body, options);

    assignTeamColor(spacePort, options.team);

    var flame1 = Geometry(SpacePort.flame1);
    var flame2 = Geometry(SpacePort.flame2);
    var flame3 = Geometry(SpacePort.flame3);
    var flame4 = Geometry(SpacePort.flame4);

    var turret1 = Geometry(SpacePort.turret1);
    var turret2 = Geometry(SpacePort.turret2);
    var turret3 = Geometry(SpacePort.turret3);
    var turret4 = Geometry(SpacePort.turret4);

    spacePort.graphics
        .addChild(
            flame1.graphics,
            flame2.graphics,
            flame3.graphics,
            flame4.graphics,

            turret1.graphics,
            turret2.graphics,
            turret3.graphics,
            turret4.graphics
        );

    return spacePort;
}

function createPBase(options) {
    var pbase = Geometry(PBase.body, options);

    assignTeamColor(pbase, options.team);

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

    assignTeamColor(flag, options.team);

    freighter.graphics
        .addChild(
            flame.graphics,
            flag.graphics,
            cargoPodL.graphics,
            cargoPodR.graphics,
            turret1.graphics,
            turret2.graphics
        );

    freighter.loadSupply = function loadSupply() {
        setVisible.call(this, 2, true);
        setVisible.call(this, 3, true);
    };

    freighter.unloadSupply = function unloadSupply() {
        setVisible.call(this, 2, false);
        setVisible.call(this, 3, false);
    };

    freighter.flameOn   = setVisible.bind(freighter, 0, true);
    freighter.flameOff  = setVisible.bind(freighter, 0, false);
    freighter.renderHit = renderHit;

    freighter.flameOff();

    return freighter;
}

function createPComm(options) {
    var pcomm = Geometry(PComm, options);

    assignTeamColor(pcomm, options.team);

    return pcomm;
}

function createPColony(options) {
    var pcolony = Geometry(PColony, options);

    assignTeamColor(pcolony, options.team);

    return pcolony;
}
function createPLab(options) {
    var plab = Geometry(PLab, options);

    assignTeamColor(plab, options.team);

    return plab;
}

/**
 * Squared distance within which this body imparts gravitational forces something
 * @type {number}
 */
var DIST_MIN_STAR_GRAVITY2   = 1000 * 1000;
var DIST_MIN_PLANET_GRAVITY2 = 800 * 800;
var DIST_PLANET_ORBIT2       = 200 * 200;

function create(type, options) {
    var entity;

    if (type === 'Star') {
        entity = Geometry(Star, options);

        entity.hp            = 10000;
        entity.MASS          = 500;
        entity.DIST_SURFACE2 = 200 * 200;

    } else if (type === 'Planet') {
        entity = createPlanet(options);

        entity.hp            = 2000;
        entity.MASS          = 100;
        entity.DIST_SURFACE2 = 105 * 105;

        entity.canOrbitStar  = true;
        entity.star          = options.star;
        entity.orbitDistance = options.orbitDistance;
        entity.orbitRotation = options.orbitRotation;

        entity.canStoreMaterial  = true;
        entity.materialsRaw      = options.materialsRaw;
        entity.materialsFinished = options.materialsFinished;

        // Reference to resident entities
        entity.pbase       = options.pbase;
        entity.plab        = options.plab;
        entity.pcolony     = options.pcolony;
        entity.pcomm       = options.pcomm;
        entity.spacedock   = options.spacedock;
        entity.sensorarray = options.sensorarray;
        entity.spaceport   = options.spaceport;

    } else if (type === 'ShotCannonHeavy') {
        entity = Geometry(Shot.cannon_heavy, options);

        entity.hp = options.hp || 50;

        entity.canMoveLinearly = true;
        entity.dx              = options.dx;
        entity.dy              = options.dy;

        entity.canDamage = true;
        entity.damageHp  = 2;

        entity.canMetabolize = true;
    } else if (type === 'ShotCannonNormal') {
        entity = Geometry(Shot.cannon_normal, options);

        entity.hp = options.hp || 50;

        entity.canMoveLinearly = true;
        entity.dx              = options.dx;
        entity.dy              = options.dy;

        entity.canDamage     = true;
        entity.canMetabolize = true;
    } else if (type === 'PColony') {
        entity = createPColony(options);

        entity.hp     = options.hp || 30;
        entity.maxHp  = options.maxHp || 30;
        entity.planet = options.planet;

        entity.canMine         = true;
        entity.canExplode      = true;
        entity.canOccupyPlanet = true;

        entity.canRepair            = true;
        entity.REPAIR_COST_FINISHED = 10;
        entity.REPAIR_TIME          = 20;

    } else if (type === 'PLab') {
        entity = createPLab(options);

        entity.hp     = options.hp || 20;
        entity.maxHp  = options.maxHp || 20;
        entity.planet = options.planet;

        entity.canExplode      = true;
        entity.canOccupyPlanet = true;
        entity.canManufacture  = true;
        entity.PRODUCT         = {
            Freighter : { cost : 300, time : 120 },
            Fighter   : { cost : 500, time : 90 }
        };

    } else if (type === 'PComm') {
        entity = createPComm(options);

        entity.hp     = options.hp || 20;
        entity.maxHp  = options.maxHp || 20;
        entity.planet = options.planet;

        entity.canExplode      = true;
        entity.canRepair       = true;
        entity.canOccupyPlanet = true;

        entity.REPAIR_COST_FINISHED = 2;
        entity.REPAIR_TIME          = 10;
    } else if (type === 'PBase') {
        entity = createPBase(options);

        entity.hp    = options.hp || 20;
        entity.maxHp = options.maxHp || 20;

        entity.planet = options.planet;

        entity.canExplode      = true;
        entity.canHarvest      = true;
        entity.canRepair       = true;
        entity.canRefine       = true;
        entity.canConstruct    = true;
        entity.canOccupyPlanet = true;

        entity.canStoreMaterial  = true;
        entity.materialsRaw      = options.materialsRaw;
        entity.materialsFinished = options.materialsFinished;

    } else if (type === 'SpacePort') {
        entity = createSpacePort(options);

        entity.hp     = options.hp || 30;
        entity.maxHp  = options.maxHp || 30;
        entity.planet = options.planet;

        entity.canRepair = true;
        entity.canRefine = true;

        entity.canOrbitPlanet = true;
        entity.orbitDistance  = 205;

        entity.canExplode          = true;
        entity.EXPLOSION_FRAGMENTS = 12;

        entity.canStoreMaterial  = true;
        entity.materialsRaw      = options.materialsRaw || 0;
        entity.materialsFinished = options.materialsFinished || 0;

    } else if (type === 'SpaceDock') {
        entity = createSpaceDock(options);

        entity.hp     = options.hp || 8;
        entity.maxHp  = options.maxHp || 8;
        entity.planet = options.planet;

        entity.canRepair          = true;
        entity.canManufacture     = true;
        entity.PRODUCT            = {
            Fighter : { cost : 200, time : 60 },
            Probe   : { cost : 15, time : 10 }
        };
        entity.canOccupySpacePort = true;
        entity.spaceport          = options.spaceport;

    } else if (type === 'SensorArray') {
        entity = createSensorArray(options);

        entity.hp                 = options.hp || 5;
        entity.maxHp              = options.maxHp || 5;
        entity.planet             = options.planet;
        entity.canRepair          = true;
        entity.canOccupySpacePort = true;
        entity.spaceport          = options.spaceport;

    } else if (type === 'Fighter') {
        entity = createFighter(options);

        entity.hp    = entity.hp || 6;
        entity.maxHp = entity.maxHp || 6;
        entity.MASS  = 10;

        entity.canExplode = true;

        entity.canShootCannon       = true;
        entity.cannonGetMuzzleFuncs = [
            function getFighterMuzzle(f) {
                return f.collision.calcPoints[1];
            }
        ];

        entity.canLimitSpeed   = true;
        entity.canMoveLinearly = true;
        entity.canAccelerate   = true;
        entity.canDockPlanet   = true;

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

    } else if (type === 'Freighter') {
        entity         = createFreighter(options);
        
        entity.hp      = options.hp || 10;
        entity.maxHp   = options.maxHp || 10;
        
        entity.canDisplayHit    = true;
        entity.canOrbitPlanet   = true;
        entity.isOrbitingPlanet = false;
        entity.orbitDistance    = 205;

        entity.canExplode = true;

        entity.canColonizePlanet = true;
        entity.planet            = options.planet;

        entity.canMoveToTarget   = true;
        entity.target            = options.target;

        entity.canStoreMaterial  = true;
        entity.materialsRaw      = options.materialsRaw || 0;
        entity.materialsFinished = options.materialsFinished || 0;
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

function getTeamColor(team) {
    return COLOR_TEAM[team];
}

module.exports = {
    create : create,

    getDistSquared : getDistSquared,
    getAngleFromTo : getAngleFromTo,
    getTeamColor   : getTeamColor,

    TEAM                     : TEAM,
    DIST_MIN_STAR_GRAVITY2   : DIST_MIN_STAR_GRAVITY2,
    DIST_MIN_PLANET_GRAVITY2 : DIST_MIN_PLANET_GRAVITY2,
    DIST_PLANET_ORBIT2       : DIST_PLANET_ORBIT2
};