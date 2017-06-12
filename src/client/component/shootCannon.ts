import Entity from '../Entity';
import {playSound} from '../Audio';

const AUDIO_SHOT = {
    'ShotCannonHeavy'  : 'fire-heavy',
    'ShotCannonNormal' : 'fire'
};

const DEFAULTS = {
    cannonGetMuzzleFuncs       : [],
    CANNON_LOAD_TIME_MS        : 100,
    cannonLastShotTime         : 0,
    cannonMatchShooterRotation : true,
    cannonTarget               : undefined,
    cannonShotSpeed            : 4,
    cannonShotType             : 'ShotCannonNormal',
    isShooting                 : false
};

function shoot(getMuzzleFunc) {
    const muzzle = getMuzzleFunc(this);

    let cannonAngle;

    if (this.cannonMatchShooterRotation) {
        cannonAngle = this.rotation;
    } else {
        cannonAngle = Entity.getAngleFromTo(muzzle, this.cannonTarget);
    }

    const dx = Math.cos(cannonAngle) * this.cannonShotSpeed;
    const dy = Math.sin(cannonAngle) * this.cannonShotSpeed;

    Entity.create(this.cannonShotType, {
        x    : muzzle.x + this.x,
        y    : muzzle.y + this.y,
        team : this.team,
        dx   : dx + (this.dx || 0),
        dy   : dy + (this.dy || 0)
    });

    playSound(AUDIO_SHOT[this.cannonShotType]);
}

function process(entity) {
    if (entity.isShooting) {
        const now = Date.now();

        if (now - entity.cannonLastShotTime >= entity.CANNON_LOAD_TIME_MS) {
            entity.cannonGetMuzzleFuncs
                .forEach(shoot.bind(entity));

            entity.cannonLastShotTime = now;
        }
    }

}

export default {
    componentFlag: 'canShootCannon',
    DEFAULTS,
    process
}
