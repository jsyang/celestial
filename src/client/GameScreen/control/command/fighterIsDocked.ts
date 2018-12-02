import {CommandHandler} from '.';
import HUD from '../../HUD';
import TeamSystem from '../../TeamSystem';

const getIsEntityDockedToFriendly = (state, controlledEntity) => {
    const {isDockedPlanet, isDockedSpacePort, planet, spaceport, team} = controlledEntity;

    return (isDockedPlanet && planet.team === team) ||
        (isDockedSpacePort && spaceport.team === team);
};

const MENU_DOCKED = [
    'Fighter is docked',
    '  [1] Swap weapon',
    '  [2] Set current location as home'
];

const DEFAULT_WEAPON = 'Cannon';

const displayAndSetOptions: CommandHandler = (state, controlledEntity) => {
    switch (state.menuId) {
        case 0:
            HUD.displayCommandText(MENU_DOCKED);
            state.menuId  = 1;
            state.options = [
                () => state.menuId = 2,
                () => {
                    TeamSystem.setHumanTeamHomePlanet(controlledEntity.planet || controlledEntity.spaceport.planet)
                    state.shouldReset = true;
                }
            ];
            break;
        case 2:
            const planet          = controlledEntity.planet || controlledEntity.spaceport.planet;
            const {plab}          = planet;
            const availableWeapon = plab && plab.developEquipment_equipmentReady && plab.developEquipment_equipmentReady !== 'Shield' ?
                plab.developEquipment_equipmentReady : false;

            const swapWeaponMenu = [
                `Swap Fighter's ${controlledEntity.attackWeapon} for`,
                '  [1] Cannon'
            ];
            state.menuId         = 3;
            state.options        = [
                () => {
                    if (plab && controlledEntity.attackWeapon !== DEFAULT_WEAPON) {
                        plab.developEquipment_equipmentReady = controlledEntity.attackWeapon;
                    }
                    controlledEntity.attackWeapon = DEFAULT_WEAPON;
                    state.shouldReset             = true;
                }
            ];

            if (availableWeapon) {
                swapWeaponMenu.push(`  [2] ${availableWeapon}`);
                state.options.push(
                    () => {
                        if (plab && controlledEntity.attackWeapon !== DEFAULT_WEAPON) {
                            plab.developEquipment_equipmentReady = controlledEntity.attackWeapon;
                        }
                        controlledEntity.attackWeapon = availableWeapon;
                        state.shouldReset             = true;
                    }
                );
            }

            HUD.displayCommandText(swapWeaponMenu);
    }

    return true;
};

export default [
    getIsEntityDockedToFriendly,
    displayAndSetOptions
];