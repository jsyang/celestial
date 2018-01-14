import Entity from '../Entity';
import {playSound, playSoundLocalized} from '../assets/audio';

const LAUNCH_SPEED = 2.5;

function shoot(getMuzzleFunc) {
    const {team}           = this;
    const muzzle           = getMuzzleFunc(this);
    const {rotation, x, y} = muzzle;

    const dx = Math.cos(rotation) * LAUNCH_SPEED;
    const dy = Math.sin(rotation) * LAUNCH_SPEED;

    const shooterDx = this.dx || 0;
    const shooterDy = this.dy || 0;

    Entity.create('ClusterRocket', {
        rotation,
        team,
        x:  x + this.x - shooterDx,
        y:  y + this.y - shooterDy,
        dx: dx + shooterDx,
        dy: dy + shooterDy
    });
}

function reload_ClusterRocket(isGradual = true) {
    if (this.ammo_ClusterRocket < this.ammoMax_ClusterRocket) {
        playSound('empty');

        if (isGradual) {
            this.ammo_ClusterRocket++;
        } else {
            this.ammo_ClusterRocket = this.ammoMax_ClusterRocket;
        }
    }
}


const DEFAULTS = {
    reload_ClusterRocket,
    lastShotTime_ClusterRocket: 0,
    reloadTime_ClusterRocket:   600,
    ammo_ClusterRocket:         8,
    ammoMax_ClusterRocket:      8
};

const SOUND_SHOOT = 'bomb-release';

function process(entity) {
    const {isAttacking, attackWeapon, ammo_ClusterRocket} = entity;

    if (isAttacking && attackWeapon === 'ClusterRocket') {
        const now = Date.now();

        if (now - entity.lastShotTime_ClusterRocket >= entity.reloadTime_ClusterRocket) {
            if (ammo_ClusterRocket > 0) {
                entity.attackTurretPositions
                    .forEach(shoot.bind(entity));

                entity.lastShotTime_ClusterRocket = now;
                entity.ammo_ClusterRocket--;

                playSoundLocalized(SOUND_SHOOT, entity);
            }
        }
    }

}

export default {
    componentFlag: 'canShootClusterRocket',
    DEFAULTS,
    process
}
