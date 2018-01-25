import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from '../Button';

const DEFAULT_WEAPON = 'Cannon';

function create({fighter, onClickWeapon}) {
    const {attackWeapon} = fighter;

    // Fighter may be docked on SpacePort or on Planet, handle both cases
    const planet             = fighter.planet ? fighter.planet : fighter.spaceport.planet;
    const {plab}             = planet;
    const availableEquipment = plab && plab.developEquipment_equipmentReady;

    const modal = Modal.create({width: 400, height: 200});

    let buttonStackY = 200;

    [DEFAULT_WEAPON, availableEquipment]
        .filter(Boolean)
        .map(weaponName => {
            buttonStackY -= 40 + 20;
            const weaponButton = Button.create({
                text:    `Switch to ${weaponName}`,
                width:   360,
                onClick: () => {
                    // Swap only effective if Fighter is armed with something
                    // better than a Cannon
                    if (plab && plab.developEquipment_equipmentReady !== 'Shield') {
                        fighter.attackWeapon                 = plab.developEquipment_equipmentReady || DEFAULT_WEAPON;
                        plab.developEquipment_equipmentReady = attackWeapon === DEFAULT_WEAPON ? '' : attackWeapon;
                    }

                    onClickWeapon();
                    Modal.destroy(modal);
                }
            });
            weaponButton.x     = 20;
            weaponButton.y     = buttonStackY;

            modal.modal.addChild(weaponButton);
            modal.buttons.push(weaponButton);
        });

    // Since they stack from the bottom visually, the first added button should now be the last one in the array
    modal.buttons.reverse();

    const label = new PIXI.Text(
        `Fighter is armed with ${fighter.attackWeapon}.`,
        {
            fontFamily: 'arial',
            fontSize:   12,
            fill:       0xffffff,
            align:      'center'
        }
    );
    label.x     = (400 - label.width) / 2;
    label.y     = 30;

    modal.modal.addChild(label);

    return modal;
}

export default {
    create
}