import GamePad from './GamePad';
import Keyboard from './Keyboard';

enum DeviceType {
    Keyboard = 0,
    GamePad
}

let device;

function init() {
    const isForcedGamepad = location.search.indexOf('gamepad') > -1;

    if (isForcedGamepad) {
        device = DeviceType.GamePad;
    } else {
        device = DeviceType.Keyboard;
    }
}

const getDevice = () => device === DeviceType.Keyboard ? Keyboard : GamePad;

export default {
    init,
    getDevice
};