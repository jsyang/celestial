import Entity from '../Entity';
import {TEAM} from '../constants';
import Focus from '../Graphics/Focus';

let focusTeam = TEAM.MAGENTA;
let enemyTeam = TEAM.NONE;

function init() {
    const star = Entity.create('Star', {x: 5000, y: 5000});

    const planet = Entity.create('Planet', {
        star,
        orbitDistance: 1600 + 2 * 800,
        orbitRotation: 0
    });

    planet.team = enemyTeam;
    planet.updateFlagColor();

    // Create an attacker
    const fighter = Entity.create('Fighter', {
        x:                        15000,
        y:                        15000,
        isFighterAutoAccelerated: true,
        team:                     focusTeam,
        attackTarget:             planet
    });

    Focus.setFocus(fighter);
}

export default {
    init
};
