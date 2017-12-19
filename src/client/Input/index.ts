import Focus from '../Graphics/Focus';
import GamePad from './GamePad';
import Keyboard from './Keyboard';
import Freelook from '../Graphics/Freelook';
import controlFighter from './control/Fighter';
import controlFreelook, {setFreelookPosition} from './control/Freelook';

let controlledEntity;

export const setControlledEntity = entity => controlledEntity = entity;

const DEVICE_TYPE = {
    Keyboard: 0,
    GamePad:  0
};

const device = localStorage.getItem('input.device') || DEVICE_TYPE.Keyboard;

function process() {
    let events = device === DEVICE_TYPE.Keyboard ?
        Keyboard.getEvents() : GamePad.getEvents();

    if (controlledEntity) {
        if (controlledEntity.hp > 0) {
            Freelook.setIconVisible(false);
            Focus.setFocus(controlledEntity);

            switch (controlledEntity.type) {
                case 'Fighter':
                    controlFighter(controlledEntity, events);
                    break;
            }
        } else {
            setFreelookPosition(controlledEntity);
            setControlledEntity(null);
        }
    } else {
        Focus.setFocus(
            controlFreelook(events)
        );
        Freelook.setIconVisible(true);
    }

    if (events.RESTART_GAME) {
        location.reload();
    }
}

export default {
    process,
    setControlledEntity
};