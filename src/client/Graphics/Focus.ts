import Starfield from './Starfield';

let focus;
let lastFocusX = 0;
let lastFocusY = 0;

const setFocus = entityOrPoint => {
    focus = entityOrPoint;
    Starfield.init();
};

const getFocus = () => {
    if (focus && focus.hp > 0) {
        lastFocusX = focus.x;
        lastFocusY = focus.y;
    }

    return {x: lastFocusX, y: lastFocusY};
}

export default {
    getFocus,
    setFocus
}
