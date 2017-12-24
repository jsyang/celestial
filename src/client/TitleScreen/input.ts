import Input from '../Input';
import TitleScreen from '.';

let then           = 0; // Time stamp of last animation frame
const FPS          = 15;
const FPS_INTERVAL = 1000 / FPS;


function update() {
    const now     = Date.now();
    const elapsed = now - then;

    if (elapsed > FPS_INTERVAL) {
        const keys = Input.getDevice().getInputState() as any;

        if (keys.up || keys.up_arrow) {
            TitleScreen.prevButton();
        } else if (keys.down || keys.down_arrow) {
            TitleScreen.nextButton();
        } else if (keys.f || keys.button0) {
            TitleScreen.clickButton();
        }

        then = now - (elapsed % FPS_INTERVAL);
    }
}

export default {update}