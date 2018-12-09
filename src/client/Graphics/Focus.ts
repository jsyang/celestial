import Starfield from './Starfield';

let focus;

const setFocus = entityOrPoint => {
    focus = entityOrPoint;
    Starfield.init();
};

const getFocus = () => focus ?
    {x: focus.x, y: focus.y} :
    {x: 0, y: 0};

export default {
    getFocus,
    setFocus
}