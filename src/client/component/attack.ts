/**
 * Has weapons with which to attack
 */

/*
HomingMissile
Cannon
HeavyCannon
LaserBolt
ClusterRocket
PlanetBuster
 */

const DEFAULTS = {
    attackTurretPositions: [],
    attackTarget:          null,
    attackWeapon:          'Cannon',
    isAttacking:           false
};

export default {
    componentFlag: 'canAttack',
    DEFAULTS
}
