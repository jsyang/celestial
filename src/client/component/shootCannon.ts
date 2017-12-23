import Random from '../random';
import Entity from '../Entity';
import {playSound} from '../assets/audio';

// todo: define different dumb weapons here

const AUDIO_SHOT = {
    // todo use better sounds
    'plasma':        'fire',
    'pbase_plasma':  'laser',
    'cannon_heavy':  'fire-heavy',
    'cannon_normal': 'fire'
};


function shoot(getMuzzleFunc) {
    const {cannonTarget, cannonShotSpeed} = this;

    const muzzle = getMuzzleFunc(this);

    let cannonAngle;

    if (this.cannonMatchShooterRotation) {
        cannonAngle = this.rotation;
    } else {
        const targetDx = cannonTarget.dx || 0;
        const targetDy = cannonTarget.dy || 0;

        const leadingShot = {
            x: cannonTarget.x + targetDx * 5 * cannonShotSpeed,
            y: cannonTarget.y + targetDy * 5 * cannonShotSpeed
        };

        cannonAngle = Entity.getAngleFromTo(
            {
                x: muzzle.x + this.x,
                y: muzzle.y + this.y
            },
            leadingShot
        );

        // Fudge factor
        cannonAngle += Random.float(-0.15, 0.15);
    }

    const dx = Math.cos(cannonAngle) * cannonShotSpeed;
    const dy = Math.sin(cannonAngle) * cannonShotSpeed;

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
}

const DEFAULTS = {
    cannonGetMuzzleFuncs:       [],
    CANNON_REARM_TIME:          40,
    CANNON_LOAD_TIME_MS:        100,
    cannonRearmTime:            40,
    cannonLastShotTime:         0,
    cannonMatchShooterRotation: true,
    cannonTarget:               undefined,
    cannonShotSpeed:            4,
    cannonShotType:             'cannon_normal',
    isShooting:                 false,
    isRearming:                 false,
    cannonAmmo:                 Infinity,
    cannonMaxAmmo:              Infinity,
    shoot
};

function process(entity) {
    const {isShooting, cannonAmmo, cannonMaxAmmo, CANNON_REARM_TIME} = entity;

    if (isShooting) {
        const now = Date.now();

        if (cannonAmmo > 0) {
            if (now - entity.cannonLastShotTime >= entity.CANNON_LOAD_TIME_MS) {
                entity.cannonGetMuzzleFuncs
                    .forEach(shoot.bind(entity));

                playSound(AUDIO_SHOT[entity.cannonShotType]);

                entity.cannonLastShotTime = now;
                entity.cannonAmmo--;
            }
        } else {
            // Re-arm
            if (entity.cannonRearmTime > 0) {
                entity.cannonRearmTime--;
            } else {
                entity.cannonAmmo      = cannonMaxAmmo;
                entity.cannonRearmTime = CANNON_REARM_TIME;
            }
        }

    }

}

export default {
    componentFlag: 'canShootCannon',
    DEFAULTS,
    process
}
