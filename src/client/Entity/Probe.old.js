var Random   = require('../random');
var Entity   = require('./index');
var EntityDB = require('./_DB');

var probes = [];
var COUNT  = 20;

var patrolPoints = [];
var POINT_COUNT  = 4;

function init() {
    var i;

    for (i = 0; i < COUNT; i++) {
        var probe = Entity.create('Probe', {
            x    : -250 + Random.float(-40, 40),
            y    : -20 + Random.float(-40, 40),
            team : Entity.TEAM.MAGENTA
        });

        probes.push(probe);
    }

    for (i = 0; i < POINT_COUNT; i++) {
        patrolPoints.push({
            x : 300 + Random.float(0, 600),
            y : Random.float(0, 600)
        });
    }
}

var REPEL_DIST_2    = 20 * 20;
var REPEL_MAGNITUDE = 50;

var PROBE_SPEED     = 0.5;
var PROBE_TURN_RATE = 0.05;

function processProbe(p) {
    if (p.hp > 0) {
        var dx = 0;
        var dy = 0;

        p.renderHit();

        // Repel from other probes
        for (var i = 0; i < COUNT; i++) {
            var otherProbe = probes[i];
            if (otherProbe && p !== otherProbe) {
                var distance = Entity.getDistSquared(p, otherProbe);

                if (distance < REPEL_DIST_2) {
                    var factor = -REPEL_MAGNITUDE;

                    // Extra repulsion for other probes that are too close
                    if (distance < 6) {
                        factor = factor * 4;
                    }

                    dx += (otherProbe.x - p.x) * factor;
                    dy += (otherProbe.y - p.y) * factor;
                }
            }
        }

        var currentPatrolPoint = patrolPoints[p.patrolIndex];

        // Attract towards patrol point
        if (Entity.getDistSquared(p, currentPatrolPoint) < REPEL_DIST_2) {
            p.patrolIndex++;
            if (p.patrolIndex === POINT_COUNT) {
                p.patrolIndex = 0;
            }

            currentPatrolPoint = patrolPoints[p.patrolIndex];
        }

        dx += (currentPatrolPoint.x - p.x);
        dy += (currentPatrolPoint.y - p.y);

        var desiredRotation = Math.atan2(dy, dx);

        var turnMagnitude = Math.abs(desiredRotation - p.rotation);
        if (turnMagnitude > Math.PI) {
            if (p.rotation > 0) {
                p.rotation += PROBE_TURN_RATE;
            } else {
                p.rotation -= PROBE_TURN_RATE;
            }
        } else {
            if (p.rotation > desiredRotation) {
                p.rotation -= PROBE_TURN_RATE;
            } else {
                p.rotation += PROBE_TURN_RATE;
            }
        }

        p.x += Math.cos(p.rotation) * PROBE_SPEED;
        p.y += Math.sin(p.rotation) * PROBE_SPEED;
    } else if (!p.hasDied) {
        EntityDB.remove(p);
        p.hasDied = true;
    }
}

function hasNotDied(p) { return !p.hasDied; }

function process() {
    probes.forEach(processProbe);
    probes = probes.filter(hasNotDied);
}

module.exports = {
    init    : init,
    process : process
};