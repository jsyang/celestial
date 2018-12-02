import {CommandHandler} from '.';
import HUD from '../../HUD';
import TeamSystem from '../../TeamSystem';

const getEntityHasAttackTarget = (state, controlledEntity) => {
    const {attackTarget} = controlledEntity;

    return attackTarget && attackTarget.hp > 0;
};

const MENU_TARGET = [
    'Wingmates:',
    '  [1] Attack my target'
];

const displayAndSetOptions: CommandHandler = (state, controlledEntity) => {
    switch (state.menuId) {
        case 0:
            const {attackTarget} = controlledEntity;
            HUD.displayCommandText(MENU_TARGET);
            state.menuId  = 1;
            state.options = [
                () => {
                    TeamSystem.setHumanFightersTarget(attackTarget);
                    state.shouldReset = true;
                }
            ];
            break;
    }

    return true;
};

export default [
    getEntityHasAttackTarget,
    displayAndSetOptions
];
