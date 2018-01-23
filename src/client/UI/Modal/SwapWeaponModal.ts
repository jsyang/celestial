import * as PIXI from 'pixi.js';
import Modal from '.';
import Button from '../Button';

const DEFAULT_WEAPON = 'Cannon';

function create({fighter, onClickWeapon}) {
    const {attackWeapon} = fighter;

    // Fighter may be docked on SpacePort or on Planet, handle both cases
    const planet          = fighter.planet ? fighter.planet : fighter.spaceport.planet;
    const {plab}          = planet;
    const availableWeapon = plab && plab.developWeapon_weaponReady;

    const modal = Modal.create({width: 400, height: 200});

    let buttonStackY = 200;

    [DEFAULT_WEAPON, availableWeapon]
        .filter(Boolean)
        .map(weaponName => {
            buttonStackY -= 40 + 20;
            const weaponButton = Button.create({
                text:    `Switch to ${weaponName}`,
                width:   360,
                onClick: () => {
                    if (plab) {
                        fighter.attackWeapon           = plab.developWeapon_weaponReady;
                        plab.developWeapon_weaponReady = attackWeapon;
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