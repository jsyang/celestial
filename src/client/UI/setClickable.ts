export function setClickable(pixiElement: any, onClick: Function) {
    pixiElement.interactive         = true;
    pixiElement.interactiveChildren = false;
    pixiElement.buttonMode          = true;

    let wasPointerDown = false;

    pixiElement.on('pointerdown', () => wasPointerDown = true);
    pixiElement.on('pointerupoutside', () => wasPointerDown = false);
    pixiElement.on('pointerup', () => {
        if (wasPointerDown) {
            onClick();
        }

        wasPointerDown = false;
    });
}
