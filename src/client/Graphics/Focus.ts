import LivingEntity from '../Entity/LivingEntity';

let focus;

const setFocus = entityOrPoint => focus = entityOrPoint;

const getFocus = () => {
    if (focus instanceof LivingEntity) {
        return {x: focus.x, y: focus.y};
    } else {
        return focus;
    }
};

export default {
    getFocus,
    setFocus
}