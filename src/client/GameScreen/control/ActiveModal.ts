import {IInputEvent} from '../../Input/Event';

export default function controlActiveModal(modalInterface, events: IInputEvent, prevEvents: IInputEvent) {
    if (events.TURN_LEFT && !prevEvents.TURN_LEFT) {
        modalInterface.prevButton();
    } else if (events.TURN_RIGHT && !prevEvents.TURN_RIGHT) {
        modalInterface.nextButton();
    } else if (events.SHOOT && !prevEvents.SHOOT) {
        modalInterface.clickButton();
    }
}