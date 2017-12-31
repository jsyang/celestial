import Entity from '../Entity';
import {playSound} from '../assets/audio';

const LAUNCH_SPEED = 10;

const BOLTS_PER_SHOT = 20;

function shoot(getMuzzleFunc) {
    const {team}           = this;
    const muzzle           = getMuzzleFunc(this);
    const {rotation, x, y} = muzzle;

    const dx = Math.cos(rotation) * LAUNCH_SPEED;
    const dy = Math.sin(rotation) * LAUNCH_SPEED;

    const shooterDx = this.dx || 0;
    const shooterDy = this.dy || 0;

    for (let i = BOLTS_PER_SHOT; i > 0; i--) {
        Entity.create('LaserBolt', {
            team,
            rotation,
            x: x + this.x - shooterDx + dx * i,
            y: y + this.y - shooterDy + dy * i
        });
    }

}

const DEFAULTS = {
    ammo_LaserBolt:         4,
    ammoMax_LaserBolt:      4,
    lastShotTime_LaserBolt: 0,
    reloadTime_LaserBolt:   1000
};

const SOUND_SHOOT = 'laser';

function process(entity) {
    const {isAttacking, attackWeapon, ammo_LaserBolt} = entity;
    if (isAttacking && attackWeapon === 'LaserBolt') {
        const now = Date.now();

        if (now - entity.lastShotTime_LaserBolt >= entity.reloadTime_LaserBolt) {
            if (ammo_LaserBolt > 0) {
                entity.attackTurretPositions
                    .forEach(shoot.bind(entity));

                playSound(SOUND_SHOOT);

                entity.ammo_LaserBolt--;
                entity.lastShotTime_LaserBolt = now;
            }
        }
    }

}

export default {
    componentFlag: 'canShootLaserBolt',
    DEFAULTS,
    process
}
