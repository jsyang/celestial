import {IInputEvent} from '../Event';

let freeLookPosition = {x: 0, y: 0};
const DPOSITION      = 40;

export const setFreelookPosition = ({x, y}) => freeLookPosition = {x, y};

export default function controlFreelook(events: IInputEvent) {
    if (events.ACCELERATE) {
        freeLookPosition.y -= DPOSITION;
    }

    if (events.SHOOT_SPECIAL) {
        freeLookPosition.y += DPOSITION;
    }

    if (events.TURN_LEFT) {
        freeLookPosition.x -= DPOSITION;
    }

    if (events.TURN_RIGHT) {
        freeLookPosition.x += DPOSITION;
    }

    return freeLookPosition;
}