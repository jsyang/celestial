import * as PIXI from 'pixi.js';
import Graphics from '../../Graphics';
import GameScreenControl from '../control';

const MARGIN_EDGE = 12;

const display = new PIXI.Graphics();
display.x     = MARGIN_EDGE;
display.y     = MARGIN_EDGE + 100 + 14 * 3 + 4 * MARGIN_EDGE;

const labelWeaponName = new PIXI.Text(
    'Unarmed',
    {
        fontFamily: 'arial',
        fontSize:   12,
        fill:       0xf8f8f8,
        align:      'left'
    }
);

labelWeaponName.x = 0;
labelWeaponName.y = 0;

const labelWeaponAmmo = new PIXI.Text(
    '',
    {
        fontFamily: 'arial',
        fontSize:   12,
        fill:       0xff0000,
        align:      'left'
    }
);

labelWeaponAmmo.x = 0;
labelWeaponAmmo.y = 14;

display.addChild(labelWeaponName);
display.addChild(labelWeaponAmmo);

function update() {
    const entity = GameScreenControl.getControlledEntity();

    labelWeaponName.text = '';
    labelWeaponAmmo.text = '';

    if (entity && entity.canAttack) {
        const {attackWeapon, ammo_HomingMissile, ammo_ClusterRocket, ammo_LaserBolt} = entity;

        labelWeaponName.text = attackWeapon;

        switch (attackWeapon) {
            case 'HomingMissile':
                labelWeaponAmmo.text = '|'.repeat(ammo_HomingMissile);
                break;
            case 'ClusterRocket':
                labelWeaponAmmo.text = '|'.repeat(ammo_ClusterRocket);
                break;
            case 'LaserBolt':
                labelWeaponAmmo.text = '|'.repeat(ammo_LaserBolt);
                break;
            case 'HeavyCannon':
            case 'Cannon':
            default:
                labelWeaponAmmo.text = 'Infinite ammo';
                break
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
