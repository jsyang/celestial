import Entity from '../Entity';
import {playSound} from '../assets/audio';

const LAUNCH_SPEED = 7;

function shoot(getMuzzleFunc) {
    const {attackTarget, team} = this;
    const muzzle               = getMuzzleFunc(this);
    const {rotation, x, y}     = muzzle;

    const dx = Math.cos(rotation) * LAUNCH_SPEED;
    const dy = Math.sin(rotation) * LAUNCH_SPEED;

    const shooterDx = this.dx || 0;
    const shooterDy = this.dy || 0;

    Entity.create('HomingMissile', {
        team,
        attackTarget,
        rotation,
        x:  x + this.x - shooterDx,
        y:  y + this.y - shooterDy,
        dx: dx + shooterDx,
        dy: dy + shooterDy
    });
}

const RELOAD_TIME = 200;

const DEFAULTS = {
    lastShotTime_HomingMissile:  0,
    ammo_HomingMissile:          20,
    ammoMax_HomingMissile:       20
};

const SOUND_SHOOT = 'missile';
const SOUND_EMPTY = 'empty';

function process(entity) {
    const {isAttacking, ammo_HomingMissile, attackWeapon} = entity;

    if (isAttacking && attackWeapon === 'HomingMissile') {
        const now = Date.now();

        if (now - entity.lastShotTime_HomingMissile >= RELOAD_TIME) {
            if (ammo_HomingMissile > 0) {

                entity.attackTurretPositions
                    .forEach(shoot.bind(entity));

                entity.lastShotTime_HomingMissile = now;
                entity.ammo_HomingMissile--;

                playSound(SOUND_SHOOT);

            } else {
                playSound(SOUND_EMPTY);
            }
        }
    }
}

export default {
    componentFlag: 'canShootHomingMissile',
    DEFAULTS,
    process
}
