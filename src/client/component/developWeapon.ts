import Entity from "../Entity";
import Random from "../Random";
import {playSound} from '../assets/audio';

// Chance of successfully developing this weapon type
const DEVELOPABLE = {
    'HeavyCannon':   0.6,
    'ClusterRocket': 0.5,
    'HomingMissile': 0.4,
    'LaserBolt':     0.2
};

const DEFAULTS = {
    developWeapon_installTimeMax: 150,
    developWeapon_installTime:    150,
    developWeapon_timeMax:        1600,
    developWeapon_time:           1600,
    developWeapon_weaponReady:    ''
};

/**
 * Develop new weapons to be installed on Fighter craft
 */
function process(entity) {
    const {
              developWeapon_time,
              developWeapon_installTime,
              developWeapon_installTimeMax,
              developWeapon_timeMax,
              developWeapon_weaponReady
          } = entity;

    if (Boolean(developWeapon_weaponReady)) {
        entity.isShimmering = true;

        if (developWeapon_installTime > 0) {
            entity.developWeapon_installTime--;
        } else {
            const installable: any = Entity.getNearestUnits(entity)
                .find((fighter: any) => (
                    fighter.team === entity.team &&
                    (
                        (fighter.isDockedPlanet && fighter.planet === entity.planet) ||
                        (fighter.isDockedSpacePort && fighter.spaceport === entity.planet.spaceport)
                    )
                ));

            if (installable && installable.attackWeapon === 'Cannon') {
                installable.attackWeapon         = developWeapon_weaponReady;
                entity.developWeapon_weaponReady = '';

                // Only play sound if human team
                if (entity.team === Entity.TEAM.MAGENTA) {
                    playSound('install');
                }
            }

            entity.developWeapon_installTime = developWeapon_installTimeMax;
        }
    } else {
        entity.isShimmering = false;

        if (developWeapon_time > 0) {
            entity.developWeapon_time--;
        } else {
            entity.developWeapon_time = developWeapon_timeMax;

            const weaponToDevelop = Random.arrayElement(Object.keys(DEVELOPABLE));
            if (Math.random() < DEVELOPABLE[weaponToDevelop]) {
                // Successfully developed this weapon
                entity.developWeapon_weaponReady = weaponToDevelop;

                // Only play sound if human team
                if (entity.team === Entity.TEAM.MAGENTA) {
                    playSound('develop');
                }
            }
        }
    }

}

export default {
    componentFlag: 'canDevelopWeapon',
    DEFAULTS,
    process
}
