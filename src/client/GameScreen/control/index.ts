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

    return entity;
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

    if (events.PAUSE && !prevEvents.PAUSE) {
        GameScreen.togglePause();
    }

    // Modals handled even during paused state
    if (controlledEntity && controlledEntity.modal) {
        return controlActiveModal(controlledEntity, events, prevEvents);
    }

    // No controls if paused
    if (!GameScreen.getIsPaused()) {
        if (controlledEntity && controlledEntity.hp > 0) {
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

        // Select enemy fighters to focus on
        if (events.FOCUS_NEXT_ENEMY && !prevEvents.FOCUS_NEXT_ENEMY) {
            const nextFocusedFighter = getFighter(true);

            if (nextFocusedFighter !== getControlledEntity()) {
                revertControlToAI();
                Starfield.process(null);

                Focus.setFocus(
                    setControlledEntity(
                        nextFocusedFighter
                    )
                );
            }
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
    revertControlToAI,
    setControlToHuman
}