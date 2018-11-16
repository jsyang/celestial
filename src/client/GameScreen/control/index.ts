import GameScreen from '..';
import Input from '../../Input';
import Focus from '../../Graphics/Focus';
import controlActiveModal from './ActiveModal';
import controlFighter from './Fighter';
import FreelookIcon from '../../Graphics/Freelook';
import Freelook from './Freelook';
import {isHumanTeam} from '../../constants';
import {IInputEvent} from '../../Input/Event';
import Starfield from '../../Graphics/Starfield';
import {getFighter} from './getFighter';

let controlledEntity;
const setControlledEntity = entity => controlledEntity = entity;
const getControlledEntity = () => controlledEntity;

let prevEvents: IInputEvent = {} as any;

function revertControlToAI() {
    if (controlledEntity && isHumanTeam(controlledEntity.team)) {
        controlledEntity.isFighterAutoAccelerated = true;
    }
}

function setControlToHuman() {
    if (controlledEntity && isHumanTeam(controlledEntity.team)) {
        controlledEntity.isFighterAutoAccelerated = false;
    }
}

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

                // Only allow player control if same faction
                if (isHumanTeam(controlledEntity.team)) {
                    setControlToHuman();

                    switch (controlledEntity.type) {
                        case 'Fighter':
                            controlFighter(controlledEntity, events);
                            break;
                    }
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

        // Select enemy fighters to focus on
        if (events.NEXT_ENEMY_FIGHTER && !prevEvents.NEXT_ENEMY_FIGHTER) {
            Starfield.process(null);
            revertControlToAI();

            Focus.setFocus(
                setControlledEntity(
                    getFighter(true)
                )
            );
        } else if (events.PREV_ENEMY_FIGHTER && !prevEvents.PREV_ENEMY_FIGHTER) {
            Starfield.process(null);
            revertControlToAI();

            Focus.setFocus(
                setControlledEntity(
                    getFighter(false)
                )
            );
        }
    }

    prevEvents = events;
}

export default {
    update,
    getControlledEntity,
    setControlledEntity,
    revertControlToAI,
    setControlToHuman
}