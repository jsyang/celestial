import GamePad from './GamePad';
import Keyboard from './Keyboard';
import startupOptions from '../startupOptions';

enum DeviceType {
    Keyboard = 0,
    GamePad
}

let device: DeviceType;

if (startupOptions.isGamePadInUse) {
    device = DeviceType.GamePad;
} else {
    device = DeviceType.Keyboard;
}

const getDevice = () => device === DeviceType.Keyboard ? Keyboard : GamePad;

export default {
    getDevice
};