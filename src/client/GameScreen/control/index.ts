import GameScreen from '..';
import Input from '../../Input';
import Focus from '../../Graphics/Focus';
import controlActiveModal from './ActiveModal';
import controlFighter from './Fighter';
import FreelookIcon from '../../Graphics/Freelook';
import Freelook from './Freelook';

let controlledEntity;
const setControlledEntity = entity => controlledEntity = entity;
const getControlledEntity = () => controlledEntity;

function update() {
    const device     = Input.getDevice();
    const events     = device.getEvents();
    const inputState = device.getInputState();

    if (events.PAUSE) {
        GameScreen.togglePause();
    }

    // No controls if paused
    if (GameScreen.getIsPaused()) {
        if (controlledEntity && controlledEntity.modal) {
            // Modals handled even during paused state
            controlActiveModal(controlledEntity, inputState);
        }
    } else {
        if (controlledEntity) {
            if (controlledEntity.modal) {
                // Modals handled first
                controlActiveModal(controlledEntity, inputState);
            } else if (controlledEntity.hp > 0) {
                // Any controlled entities
                FreelookIcon.setIconVisible(false);
                Focus.setFocus(controlledEntity);

                switch (controlledEntity.type) {
                    case 'Fighter':
                        controlFighter(controlledEntity, events);
                        break;
                }
            } else {
                // Freelook if none
                Freelook.setPosition(controlledEntity);
                setControlledEntity(null);
            }
        } else {
            Focus.setFocus(
                Freelook.update(inputState)
            );

            FreelookIcon.setIconVisible(true);
        }
    }
}

export default {
    update,
    getControlledEntity,
    setControlledEntity
}