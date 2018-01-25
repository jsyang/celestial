import Entity from "../Entity";
import Random from "../Random";
import {playSound} from '../assets/audio';
import HUD from '../GameScreen/HUD';
import {isHumanTeam} from '../constants';

// Chance of successfully developing equipment
const DEVELOPABLE = {
    'HeavyCannon':   0.6,
    'ClusterRocket': 0.5,
    'HomingMissile': 0.4,
    'LaserBolt':     0.2,
    'Shield':        0.7
};

const isShield = name => name === 'Shield';

const DEFAULTS = {
    developEquipment_installTimeMax: 150,
    developEquipment_installTime:    150,
    developEquipment_timeMax:        1600,
    developEquipment_time:           1600,
    developEquipment_equipmentReady: ''
};

/**
 * Develop new weapons to be installed on Fighter craft
 */
function process(entity) {
    const {
              developEquipment_time,
              developEquipment_installTime,
              developEquipment_installTimeMax,
              developEquipment_timeMax,
              developEquipment_equipmentReady,
              team
          } = entity;

    if (Boolean(developEquipment_equipmentReady)) {
        entity.isShimmering = true;

        if (developEquipment_installTime > 0) {
            entity.developEquipment_installTime--;
        } else {
            const installable: any = Entity.getNearestUnits(entity)
                .find((fighter: any) => (
                    fighter.team === team &&
                    (
                        (fighter.isDockedPlanet && fighter.planet === entity.planet) ||
                        (fighter.isDockedSpacePort && fighter.spaceport === entity.planet.spaceport)
                    )
                ));

            if (installable) {
                if (isShield(developEquipment_equipmentReady) && !installable.shield) {
                    installable.shield = Entity.create(
                        'Shield',
                        {
                            team,
                            anchor: installable
                        }
                    );

                    entity.developEquipment_equipmentReady = '';

                    if (isHumanTeam(team)) {
                        playSound('install');

                        if (!installable.isFighterAutoAccelerated) {
                            HUD.displayText(team, `${developEquipment_equipmentReady} installed.`);
                        }
                    }
                } else if (installable.attackWeapon === 'Cannon') {
                    installable.attackWeapon               = developEquipment_equipmentReady;
                    entity.developEquipment_equipmentReady = '';

                    if (isHumanTeam(team)) {
                        playSound('install');

                        if (!installable.isFighterAutoAccelerated) {
                            HUD.displayText(team, `${developEquipment_equipmentReady} installed.`);
                        }
                    }
                }
            }

            entity.developEquipment_installTime = developEquipment_installTimeMax;
        }
    } else {
        entity.isShimmering = false;

        if (developEquipment_time > 0) {
            entity.developEquipment_time--;
        } else {
            entity.developEquipment_time = developEquipment_timeMax;

            const weaponToDevelop = Random.arrayElement(Object.keys(DEVELOPABLE));
            if (Math.random() < DEVELOPABLE[weaponToDevelop]) {
                // Successfully developed this weapon
                entity.developEquipment_equipmentReady = weaponToDevelop;

                if (isHumanTeam(team)) {
                    playSound('develop');
                    HUD.displayText(team, `New equipment: ${weaponToDevelop} available.`);
                }
            }
        }
    }

}

export default {
    componentFlag: 'candevelopEquipment',
    DEFAULTS,
    process
}
