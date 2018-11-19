import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import GameScreenControl from '../control';

const MARGIN_EDGE = 12;
const WIDTH       = 100;
const HEIGHT      = 12;

const display = new PIXI.Graphics();
display.x     = MARGIN_EDGE;
display.y     = MARGIN_EDGE + 100 + 14 * 2 + 2 * MARGIN_EDGE;

const labelUnitName = new PIXI.Text(
    'Unknown',
    {
        fontFamily: 'arial',
        fontSize:   12,
        fill:       0xf8f8f8,
        align:      'left'
    }
);

labelUnitName.x = 0;
labelUnitName.y = 0;

const barHealth = new PIXI.Graphics();

barHealth.x = 0;
barHealth.y = 16;

const barDamage = new PIXI.Graphics();

barDamage.x = 0;
barDamage.y = 16;

display.addChild(labelUnitName);
display.addChild(barHealth);
display.addChild(barDamage);

function updateHealthAndDamage(entity) {
    const {hp, maxHp} = entity;

    const healthWidth = Math.floor(WIDTH * (hp / maxHp));

    barHealth.clear();
    barHealth.beginFill(0x66aa66, 1);
    barHealth.drawRect(0, 0, healthWidth, HEIGHT);
    barHealth.endFill();

    barDamage.clear();
    barDamage.beginFill(0xaa6666, 1);
    barDamage.drawRect(0, 0, WIDTH - healthWidth, HEIGHT);
    barDamage.endFill();
    barDamage.x = healthWidth;
}

let updateCycle        = 0;
const UPDATE_CYCLE_MAX = 10;

function update() {
    if (updateCycle > 0) {
        updateCycle--;
    } else {
        updateCycle = UPDATE_CYCLE_MAX;

        const entity = GameScreenControl.getControlledEntity();

        if (entity) {
            labelUnitName.text = entity.type;
            updateHealthAndDamage(entity);
        } else {
            labelUnitName.text = '';
            barHealth.clear();
            barDamage.clear();
        }
    }
}

function init() {
    Graphics.addChildToHUD(display);
}

export default {
    init,
    update
}
