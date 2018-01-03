const SPEED = 40;

let freeLookPosition = {x: 0, y: 0};

export const setPosition = ({x, y}) => freeLookPosition = {x, y};

function update(inputState: any) {
    if (inputState.up_arrow || inputState.up) {
        freeLookPosition.y -= SPEED;
    }

    if (inputState.down_arrow || inputState.down) {
        freeLookPosition.y += SPEED;
    }

    if (inputState.left_arrow || inputState.left) {
        freeLookPosition.x -= SPEED;
    }

    if (inputState.right_arrow || inputState.right) {
        freeLookPosition.x += SPEED;
    }

    return freeLookPosition;
}

export default {
    setPosition,
    update
}