let freeLookPosition = {x: 0, y: 0};
const DPOSITION      = 40;

export const setFreelookPosition = ({x, y}) => freeLookPosition = {x, y};

export default function controlFreelook(inputState: any) {
    if (inputState.up_arrow || inputState.up) {
        freeLookPosition.y -= DPOSITION;
    }

    if (inputState.down_arrow || inputState.down) {
        freeLookPosition.y += DPOSITION;
    }

    if (inputState.left_arrow || inputState.left) {
        freeLookPosition.x -= DPOSITION;
    }

    if (inputState.right_arrow || inputState.right) {
        freeLookPosition.x += DPOSITION;
    }

    return freeLookPosition;
}