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