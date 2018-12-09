import Graphics from '../../Graphics';
import GameOptionsModal from '../../UI/Modal/GameOptionsModal';

const modal = GameOptionsModal.create();

function onResize() {
    modal.modal.x = (innerWidth - modal.modal.width) * 0.5;
    modal.modal.y = (innerHeight - modal.modal.height) * 0.5;
}

function setVisible(isVisible) {
    modal.modal.renderable = isVisible;

    if (isVisible) {
        onResize();
    }
}

function init() {
    modal.modal.renderable = false;
    Graphics.addChildToHUD(modal.modal);
}

const UPDATE_CYCLE_MAX = Math.PI * 2;
const UPDATE_INCREMENT = Math.PI / 64;
const HALF_COLOR       = 0xff >> 1;
let updateCycle        = 0;

function update() {
    if (modal.modal.renderable) {
        updateCycle += updateCycle >= UPDATE_CYCLE_MAX ?
            -UPDATE_CYCLE_MAX : UPDATE_INCREMENT;

        modal.modal.tint = 0x010101 *
            Math.round(HALF_COLOR * (
                1 +
                Math.sin(updateCycle)
            ));
    }
}

export default {
    modal,
    init,
    update,
    setVisible,
    onResize
}
