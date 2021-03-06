import Entity from '../Entity';
import {playSound, playSoundLocalized} from '../assets/audio';

const LAUNCH_SPEED = 10;


function shoot(getMuzzleFunc) {
    const {team, range_LaserBolt} = this;
    const muzzle                  = getMuzzleFunc(this);
    const {rotation, x, y}        = muzzle;

    const dx = Math.cos(rotation) * LAUNCH_SPEED;
    const dy = Math.sin(rotation) * LAUNCH_SPEED;

    const shooterDx = this.dx || 0;
    const shooterDy = this.dy || 0;

    for (let i = range_LaserBolt; i > 0; i--) {
        Entity.create('LaserBolt', {
            team,
            rotation,
            x: x + this.x - shooterDx + dx * i,
            y: y + this.y - shooterDy + dy * i
        });
    }

}

function reload_LaserBolt(isGradual = true) {
    if (this.ammo_LaserBolt < this.ammoMax_LaserBolt) {
        playSound('empty');

        if (isGradual) {
            this.ammo_LaserBolt++;
        } else {
            this.ammo_LaserBolt = this.ammoMax_LaserBolt;
        }
    }
}


const DEFAULTS = {
    reload_LaserBolt,
    range_LaserBolt:        20,
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

                playSoundLocalized(SOUND_SHOOT, entity);

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
