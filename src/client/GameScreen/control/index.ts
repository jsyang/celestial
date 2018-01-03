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

    if (controlledEntity) {
        if (controlledEntity.hp > 0) {
            FreelookIcon.setIconVisible(false);
            Focus.setFocus(controlledEntity);

            switch (controlledEntity.type) {
                case 'Fighter':
                    controlFighter(controlledEntity, events);
                    break;
            }
        } else if (controlledEntity.modal) {
            debugger;
            controlActiveModal(controlledEntity, inputState);
        } else {
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

export default {
    update,
    getControlledEntity,
    setControlledEntity
}