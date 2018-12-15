export function setClickable(pixiElement: any, onClick: Function) {
    pixiElement.interactive         = true;
    pixiElement.interactiveChildren = false;
    pixiElement.buttonMode          = true;

    pixiElement.click = onClick;
    pixiElement.tap   = onClick;
}
