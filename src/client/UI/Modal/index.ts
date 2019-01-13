import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';

function updateButtonState() {
    this.buttons.forEach((button, index) => {
        if (index === this.activeIndex) {
            button.mouseover();
        } else {
            button.mouseout();
        }
    });
}

function prevButton() {
    this.activeIndex--;

    if (this.activeIndex < 0) {
        this.activeIndex = 0;
    }

    this.updateButtonState();
}

function nextButton() {
    this.activeIndex++;

    const maxIndex = this.buttons.length - 1;
    if (this.activeIndex > maxIndex) {
        this.activeIndex = maxIndex;
    }

    this.updateButtonState();
}

function clickButton() {
    const activeButton = this.buttons[this.activeIndex];

    if (activeButton) {
        activeButton.emit('pointerdown');
        activeButton.emit('pointerup');
    }
}

function create({width = 640, height = 480}) {
    const modal = new PIXI.Graphics();
    modal.lineStyle(1, 0xffffff, 1);
    modal.beginFill(0, 1);
    modal.drawRect(0, 0, width, height);
    modal.endFill();

    const onResize = () => {
        modal.x = (innerWidth - width) / 2;
        modal.y = (innerHeight - height) / 2;
    };

    onResize();

    return {
        id: Date.now().toString(16),
        modal,
        onResize,

        // Handle input for contained buttons
        activeIndex: -1,
        buttons:     [] as any,
        updateButtonState,
        prevButton,
        nextButton,
        clickButton
    };
}

function destroy({modal}) {
    Graphics.removeChildFromHUD(modal);
}

export default {
    create,
    destroy
}
