var Geometry = require('./geometry');

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
    if (type === 'Star') {
        return getGeometry(Star, options);
    } else if (type === 'ShotNormal') {
        return getGeometry(ShotNormal, options);
    } else if (type === 'Fighter') {
        return getGeometry(Fighter, options);
    } else if (type === 'Freighter') {
        var origin = { x : 0, y : 0 };

        var freighter   = getGeometry(Freighter.body, options);
        var cargoPodL   = getGeometry(Freighter.cargopodL, origin);
        var cargoPodR   = getGeometry(Freighter.cargopodR, origin);
        var turretFront = getGeometry(Freighter.turretFront, origin);
        var turretRear  = getGeometry(Freighter.turretRear, origin);
        var flag        = getGeometry(Freighter.flag, origin);

        freighter.addChild(cargoPodL, cargoPodR, turretFront, turretRear, flag);

        return freighter;
    }
}

module.exports = {
    create : create
};