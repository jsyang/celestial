var Geometry = require('./geometry');

var Planet     = require('./geometry/Planet.json');
var PBase      = require('./geometry/PBase.json');
var PComm      = require('./geometry/PComm.json');
var PColony    = require('./geometry/PColony.json');
var PLab       = require('./geometry/PLab.json');
var StarPort   = require('./geometry/StarPort.json');
var Star       = require('./geometry/Star.json');
var ShotNormal = require('./geometry/ShotNormal.json');
var Fighter    = require('./geometry/Fighter.json');
var Freighter  = require('./geometry/Freighter.json');

function getGeometry(geometryDef, options) {
    var geometryOptions = JSON.parse(JSON.stringify(geometryDef));

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

    return Geometry(geometryOptions);
}

//

function createPlanet(options) {
    var planet = getGeometry(Planet.body, options);
    var flag   = getGeometry(Planet.flag);

    planet.graphics.addChild(flag.graphics);

    return planet;
}

function createFighter(options) {
    var fighter = getGeometry(Fighter.body, options);

    var flame1 = getGeometry(Fighter.flame1);
    var flame2 = getGeometry(Fighter.flame2);

    fighter.graphics.addChild(
        flame1.graphics,
        flame2.graphics
    );

    return fighter;
}

function createStarPort(options){
    var starport = getGeometry(StarPort.body, options);
    var flame1   = getGeometry(StarPort.flame1);
    var flame2   = getGeometry(StarPort.flame2);
    var flame3   = getGeometry(StarPort.flame3);
    var flame4   = getGeometry(StarPort.flame4);

    var shipyard = getGeometry(StarPort.shipyard);
    var sensors  = getGeometry(StarPort.sensors);

    var turret1 = getGeometry(StarPort.turret1);
    var turret2 = getGeometry(StarPort.turret2);
    var turret3 = getGeometry(StarPort.turret3);
    var turret4 = getGeometry(StarPort.turret4);

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
    var pbase   = getGeometry(PBase.body, options);
    var turret1 = getGeometry(PBase.turret1);
    var turret2 = getGeometry(PBase.turret2);
    var turret3 = getGeometry(PBase.turret3);
    var turret4 = getGeometry(PBase.turret4);

    pbase.graphics.addChild(
        turret1.graphics,
        turret2.graphics,
        turret3.graphics,
        turret4.graphics
    );

    return pbase;
}

function createFreighter(options) {
    var freighter = getGeometry(Freighter.body, options);
    var cargoPodL = getGeometry(Freighter.cargopodL);
    var cargoPodR = getGeometry(Freighter.cargopodR);
    var turret1   = getGeometry(Freighter.turret1);
    var turret2   = getGeometry(Freighter.turret2);
    var flag      = getGeometry(Freighter.flag);
    var flame     = getGeometry(Freighter.flame);

    freighter.graphics
        .addChild(
            cargoPodL.graphics,
            cargoPodR.graphics,
            turret1.graphics,
            turret2.graphics,
            flame.graphics,
            flag.graphics
        );

    return freighter;
}

function createPComm(options) {
    // todo: collisionPath should be a convex polygon
    return getGeometry(PComm, options);
}

function create(type, options) {
    if (type === 'Star') {
        return getGeometry(Star, options);
    } else if (type === 'ShotNormal') {
        return getGeometry(ShotNormal, options);
    } else if (type === 'PColony') {
        return getGeometry(PColony, options);
    } else if (type === 'PLab') {
        return getGeometry(PLab, options);
    } else if (type === 'PComm') {
        return createPComm(options);
    } else if (type === 'Planet') {
        return createPlanet(options);
    } else if (type === 'Fighter') {
        return createFighter(options);
    } else if (type === 'StarPort') {
        return createStarPort(options);
    } else if (type === 'PBase') {
        return createPBase(options);
    } else if (type === 'Freighter') {
        return createFreighter(options);
    }
}

module.exports = {
    create : create
};