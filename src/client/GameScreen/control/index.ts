import GameScreen from '..';
import Input from '../../Input';
import Focus from '../../Graphics/Focus';
import controlActiveModal from './ActiveModal';
import controlFighter from './Fighter';
import {isHumanTeam} from '../../constants';
import {IInputEvent} from '../../Input/Event';
import Starfield from '../../Graphics/Starfield';
import {getFighter} from './getFighter';
import RadarGalaxyExpanded from '../HUD/RadarGalaxyExpanded';
import command from './command';
import LivingEntity from '../../Entity/LivingEntity';

// Need to handle living entities separate from modals / other controlled things
let controlledEntity;
let lastControlledLivingEntity;
const setControlledEntity = entity => {
    controlledEntity = entity;

    if (!entity) {
        lastControlledLivingEntity = null;
    }

    if (entity instanceof LivingEntity) {
        lastControlledLivingEntity = entity;
        Focus.setFocus(entity);
    }
};

const getControlledEntity           = () => controlledEntity;
const getLastControlledLivingEntity = () => lastControlledLivingEntity;

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

    if (events.PAUSE && !prevEvents.PAUSE) {
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
                Focus.setFocus(controlledEntity);

                // Only allow player control if same faction
                if (isHumanTeam(controlledEntity.team)) {
                    setControlToHuman();

                    switch (controlledEntity.type) {
                        case 'Fighter':
                            controlFighter(controlledEntity, events, prevEvents);
                            break;
                    }
                }
            } else {
                command.reset(); // todo more sophisticated cancelling of commands
                setControlledEntity(null);
            }
        }

        // Select enemy fighters to focus on
        if (events.FOCUS_NEXT_ENEMY && !prevEvents.FOCUS_NEXT_ENEMY) {
            Starfield.process(null);
            revertControlToAI();

            Focus.setFocus(
                setControlledEntity(
                    getFighter(true)
                )
            );
        }

        if (events.TOGGLE_RADAR && !prevEvents.TOGGLE_RADAR) {
            RadarGalaxyExpanded.setVisible(
                !RadarGalaxyExpanded.getIsVisible()
            );
        }

        command.update(controlledEntity, events, prevEvents);
    }

    prevEvents = events;
}

export default {
    update,
    getLastControlledLivingEntity,
    getControlledEntity,
    setControlledEntity,
    revertControlToAI
}