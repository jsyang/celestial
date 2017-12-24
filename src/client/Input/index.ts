import Focus from '../Graphics/Focus';
import GamePad from './GamePad';
import Keyboard from './Keyboard';
import Freelook from '../Graphics/Freelook';
import controlFighter from './control/Fighter';
import controlFreelook, {setFreelookPosition} from './control/Freelook';

let controlledEntity;

export const setControlledEntity = entity => controlledEntity = entity;

enum DeviceType {
    Keyboard = 0,
    GamePad
}

const device = localStorage.getItem('input.device') || DeviceType.Keyboard;

function processGameScreen() {
    let events, inputState;

    switch(device) {
        case DeviceType.GamePad:
            events = GamePad.getEvents();
            inputState = GamePad.getInputState();
            break;

        case DeviceType.Keyboard:
        default:
            events = Keyboard.getEvents();
            inputState = Keyboard.getInputState();
    }

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
            controlFreelook(inputState)
        );
        Freelook.setIconVisible(true);
    }
}

const getDevice = () => device === DeviceType.Keyboard ? Keyboard : GamePad;

export default {
    getDevice,
    processGameScreen,
    setControlledEntity
};