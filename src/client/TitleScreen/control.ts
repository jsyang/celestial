import Input from '../Input';

let prevEvents: any = {};

function update(modalInterface) {
    const events = Input.getDevice().getEvents();

    if (events.TURN_LEFT && !prevEvents.TURN_LEFT) {
        modalInterface.prevButton();
    } else if (events.TURN_RIGHT && !prevEvents.TURN_RIGHT) {
        modalInterface.nextButton();
    } else if (events.SHOOT && !prevEvents.SHOOT) {
        modalInterface.clickButton();
    }

    prevEvents = events;
}

export default {update}