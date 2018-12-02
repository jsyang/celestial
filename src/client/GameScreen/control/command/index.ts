import {IInputEvent} from '../../../Input/Event';
import HUD from '../../HUD';
import fighterIsDocked from './fighterIsDocked';
import fighterHasAttackTarget from './fighterHasAttackTarget';

interface ICommandState {
    isCommanding: boolean;
    menuId: number;
    shouldReset: boolean;
    options: Function[];
}

export interface CommandHandler {
    (state: ICommandState, controlledEntity: any, events: IInputEvent, prevEvents: IInputEvent): void
}

const state: ICommandState = {
    isCommanding: false,
    shouldReset:  false,
    menuId:       0,
    options:      []
};

const update = (controlledEntity, events: IInputEvent, prevEvents: IInputEvent) => {
    if (state.shouldReset) {
        reset();
    }

    if (state.isCommanding) {
        const applySequence = (f: any) => f(state, controlledEntity, events, prevEvents);

        if (controlledEntity) {
            fighterIsDocked.every(applySequence);
            fighterHasAttackTarget.every(applySequence);
        }
    }

    let func;

    if (events.OPTION1 && !prevEvents.OPTION1) {
        func = state.options[0];
    } else if (events.OPTION2 && !prevEvents.OPTION2) {
        func = state.options[1];
    } else if (events.OPTION3 && !prevEvents.OPTION3) {
        func = state.options[2];
    } else if (events.OPTION4 && !prevEvents.OPTION4) {
        func = state.options[3];
    } else if (events.OPTION5 && !prevEvents.OPTION5) {
        func = state.options[4];
    } else if (events.OPTION6 && !prevEvents.OPTION6) {
        func = state.options[5];
    } else if (events.OPTION7 && !prevEvents.OPTION7) {
        func = state.options[6];
    } else if (events.OPTION8 && !prevEvents.OPTION8) {
        func = state.options[7];
    } else if (events.OPTION9 && !prevEvents.OPTION9) {
        func = state.options[8];
    } else if (events.OPTION0 && !prevEvents.OPTION0) {
        func = reset;
    } else if (events.SPECIAL && !prevEvents.SPECIAL) {
        state.isCommanding = !state.isCommanding;
        if (!state.isCommanding) {
            state.shouldReset = true;
        }
    }

    func && func();
};

const reset = () => {
    state.isCommanding = false;
    state.shouldReset  = false;
    state.menuId       = 0;
    state.options      = [];
    HUD.displayCommandText();
};

export default {
    update,
    reset
};
