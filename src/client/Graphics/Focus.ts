let focus;

const setFocus = entityOrPoint => focus = entityOrPoint;
const getFocus = () => ({x: focus.x, y: focus.y});

export default {
    getFocus,
    setFocus
}