var Geometry = require('./geometry');

var Planet     = require('./geometry/Planet.json');
var PBase      = require('./geometry/PBase.json');
var Star       = require('./geometry/Star.json');
var ShotNormal = require('./geometry/ShotNormal.json');
var Fighter    = require('./geometry/Fighter.json');
var Freighter  = require('./geometry/Freighter.json');

function getGeometry(geometryDef, options) {
    var geometryOptions = JSON.parse(JSON.stringify(geometryDef));

    for (var k in options) {
        if (options.hasOwnProperty(k)) {
            geometryOptions[k] = options[k];
        }
    }

    return Geometry(geometryOptions);
}

function create(type, options) {
    var origin = { x : 0, y : 0 };

    if (type === 'Star') {
        return getGeometry(Star, options);
    } else if (type === 'Planet') {
        return getGeometry(Planet, options);
    } else if (type === 'PBase') {
        var pbase   = getGeometry(PBase.body, options);
        var turret1 = getGeometry(PBase.turret1, origin);
        var turret2 = getGeometry(PBase.turret2, origin);
        var turret3 = getGeometry(PBase.turret3, origin);
        var turret4 = getGeometry(PBase.turret4, origin);

        pbase.graphics.addChild(
            turret1.graphics,
            turret2.graphics,
            turret3.graphics,
            turret4.graphics
        );

        return pbase;

    } else if (type === 'ShotNormal') {
        return getGeometry(ShotNormal, options);
    } else if (type === 'Fighter') {
        return getGeometry(Fighter, options);
    } else if (type === 'Freighter') {
        var freighter   = getGeometry(Freighter.body, options);
        var cargoPodL   = getGeometry(Freighter.cargopodL, origin);
        var cargoPodR   = getGeometry(Freighter.cargopodR, origin);
        var turretFront = getGeometry(Freighter.turretFront, origin);
        var turretRear  = getGeometry(Freighter.turretRear, origin);
        var flag        = getGeometry(Freighter.flag, origin);
        var flame       = getGeometry(Freighter.flame, origin);

        freighter.graphics
            .addChild(
                cargoPodL.graphics,
                cargoPodR.graphics,
                turretFront.graphics,
                turretRear.graphics,
                flame.graphics,
                flag.graphics
            );

        return freighter;
    }
}

module.exports = {
    create : create
};