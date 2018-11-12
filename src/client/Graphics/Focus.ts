let focus;

const setFocus = entityOrPoint => focus = entityOrPoint;

const getFocus = () => focus ?
    {x: focus.x, y: focus.y} :
    {x: 0, y: 0};

export default {
    getFocus,
    setFocus
}