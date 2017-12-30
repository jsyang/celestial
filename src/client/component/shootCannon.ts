import Entity from '../Entity';
import {playSound} from '../assets/audio';

const LAUNCH_SPEED = 4;

function shoot(getMuzzleFunc) {
    const {team}           = this;
    const muzzle           = getMuzzleFunc(this);
    const {rotation, x, y} = muzzle;

    const dx = Math.cos(rotation) * LAUNCH_SPEED;
    const dy = Math.sin(rotation) * LAUNCH_SPEED;

    const shooterDx = this.dx || 0;
    const shooterDy = this.dy || 0;

    Entity.create('CannonShot', {
        team,
        x:  x + this.x - shooterDx,
        y:  y + this.y - shooterDy,
        dx: dx + shooterDx,
        dy: dy + shooterDy
    });
}

const DEFAULTS = {
    lastShotTime_Cannon: 0,
    reloadTime_Cannon:   100
};

const SOUND_SHOOT = 'fire';

function process(entity) {
    const {isAttacking, attackWeapon} = entity;
    if (isAttacking && attackWeapon === 'Cannon') {
        const now = Date.now();

        if (now - entity.lastShotTime_Cannon >= entity.reloadTime_Cannon) {
            entity.attackTurretPositions
                .forEach(shoot.bind(entity));

            playSound(SOUND_SHOOT);

            entity.lastShotTime_Cannon = now;
        }
    }

}

export default {
    componentFlag: 'canShootCannon',
    DEFAULTS,
    process
}
