/**
 * Has weapons with which to attack
 */

/*
HomingMissile
Cannon
HeavyCannon
Laser
PlanetBuster

// Maybe differentiate?

PBaseCannon
PBaseLaser
PBaseHomingMissile

FreighterCannon
FreighterLaser
FreighterHomingMissile

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
