import Entity from '../Entity';
import {playSound} from '../assets/audio';

const AUDIO_SHOT = {
    'plasma':        'laser',
    'pbase_plasma':  'laser',
    'cannon_heavy':  'fire-heavy',
    'cannon_normal': 'fire'
};


function shoot(getMuzzleFunc) {
    const muzzle = getMuzzleFunc(this);

    let cannonAngle;

    if (this.cannonMatchShooterRotation) {
        cannonAngle = this.rotation;
    } else {
        cannonAngle = Entity.getAngleFromTo(
            {
                x: muzzle.x + this.x,
                y: muzzle.y + this.y
            },
            this.cannonTarget
        );
    }

    const dx = Math.cos(cannonAngle) * this.cannonShotSpeed;
    const dy = Math.sin(cannonAngle) * this.cannonShotSpeed;

    const shooterDx = this.dx || 0;
    const shooterDy = this.dy || 0;

    const shotType = this.cannonShotType;

    let shotParams: any = {
        shotType,
        x:    muzzle.x + this.x - shooterDx,
        y:    muzzle.y + this.y - shooterDy,
        team: this.team,
        dx:   dx + shooterDx,
        dy:   dy + shooterDy
    };

    if (shotType === 'pbase_plasma') {
        shotParams.rotation = cannonAngle;
        shotParams.shotType = 'plasma';
    } else if (shotType === 'plasma') {
        shotParams = {
            ...shotParams,
            rotation: this.rotation,
            dx:       Math.cos(this.rotation) * 10 + this.dx,
            dy:       Math.sin(this.rotation) * 10 + this.dy
        };
    }

    Entity.create('Shot', shotParams);

    playSound(AUDIO_SHOT[this.cannonShotType]);
}

const DEFAULTS = {
    cannonGetMuzzleFuncs:       [],
    CANNON_LOAD_TIME_MS:        100,
    cannonLastShotTime:         0,
    cannonMatchShooterRotation: true,
    cannonTarget:               undefined,
    cannonShotSpeed:            4,
    cannonShotType:             'cannon_normal',
    isShooting:                 false,
    shoot
};

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
