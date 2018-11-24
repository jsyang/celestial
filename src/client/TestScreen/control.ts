import TestScreen from '.';
import Focus from '../Graphics/Focus';
import {IInputEvent} from '../Input/Event';
import Starfield from '../Graphics/Starfield';
import {getFighter} from '../GameScreen/control/getFighter';
import RadarGalaxyExpanded from '../GameScreen/HUD/RadarGalaxyExpanded';
import Input from '../Input';

let controlledEntity;
const setControlledEntity = entity => controlledEntity = entity;
const getControlledEntity = () => controlledEntity;

let prevEvents: IInputEvent = {} as any;

function update() {
    const device = Input.getDevice();
    const events = device.getEvents();

    if (events.PAUSE && !prevEvents.PAUSE) {
        TestScreen.togglePause();
    }

    // No controls if paused
    if (!TestScreen.getIsPaused()) {
        // Select enemy fighters to focus on
        if (events.FOCUS_NEXT_ENEMY && !prevEvents.FOCUS_NEXT_ENEMY) {
            Starfield.process(null);

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
    setControlledEntity
};
