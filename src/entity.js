var Geometry = require('./geometry');

var GEOMETRY_DEFAULTS = {
    Star : {
        type      : 'circle',
        lineStyle : {
            width : 1,
            color : 0xffff00,
            alpha : 1
        }
    },

    Shot0 : {
        type : 'rectangle',
        fill : { color : 0xffffff, alpha : 1 },
        w    : 2,
        h    : 2
    },

    Fighter   : require('./geometry/Fighter.json'),
    Freighter : require('./geometry/Freighter.json')
};

function create(type, options) {
    var geometryOptions = JSON.parse(JSON.stringify(GEOMETRY_DEFAULTS[type]));

    for (var k in options) {
        if(options.hasOwnProperty(k)) {
            geometryOptions[k] = options[k];
        }
    }

    return Geometry(geometryOptions);
}

module.exports = {
    create : create
};