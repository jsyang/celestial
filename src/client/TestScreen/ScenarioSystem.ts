import Entity from '../Entity';
import {TEAM} from '../constants';
import Focus from '../Graphics/Focus';
import {serialize} from '../GameState';

let focusTeam = TEAM.MAGENTA;
let enemyTeam = TEAM.BLUE;

function init() {
    // todo: create a save / load game modal where this can be triggered instead
    (window as any).foo = serialize;

    // Create a base to attack

    const star = Entity.create('Star', {x: 5000, y: 5000});

    const planet = Entity.create('Planet', {
        star,
        orbitDistance: 1600 + 2 * 800,
        orbitRotation: 0
    });

    planet.team = enemyTeam;
    planet.updateFlagColor();

    const planetStructureParams = {
        team: planet.team,
        planet
    };

    planet.pbase = Entity.create('PBase', planetStructureParams);


    // Create an attacker
    const fighter = Entity.create('Fighter', {
        x:                        15000,
        y:                        15000,
        isFighterAutoAccelerated: true,
        team:                     focusTeam,
        attackTarget:             planet.pbase
    });

    Focus.setFocus(fighter);
}

export default {
    init
};
