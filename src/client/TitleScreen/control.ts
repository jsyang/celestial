import Input from '../Input';
import Modal from '../UI/Modal';

let then           = 0; // Time stamp of last animation frame
const FPS          = 16;
const FPS_INTERVAL = 1000 / FPS;

function update(modalInterface) {
    const now     = Date.now();
    const elapsed = now - then;

    if (elapsed > FPS_INTERVAL) {
        const {getInputState, getEvents} = Input.getDevice();

        getEvents();
        const keys = getInputState() as any;

        if (keys.up || keys.up_arrow) {
            modalInterface.prevButton();
        } else if (keys.down || keys.down_arrow) {
            modalInterface.nextButton();
        } else if (keys.f || keys.button0 || keys.button1 || keys.button2 || keys.button3) {
            modalInterface.clickButton();
            Modal.destroy(modalInterface);
        }

        then = now - (elapsed % FPS_INTERVAL);
    }
}

export default {update}