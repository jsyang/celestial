import Entity from '../Entity';
import Random from '../Random';
import HUD from '../GameScreen/HUD';

const PRODUCT = {
    Freighter: {cost: 800, time: 1500},
    Fighter:   {cost: 500, time: 100}
};

const DEFAULTS = {
    orderManufacture,
    isManufacturing: false,
    manufactureTime: 0,
    manufactureType: undefined
};

function orderManufacture(type) {
    if (!this.isManufacturing) {
        this.isManufacturing = true;

        this.manufactureTime = PRODUCT[type].time;
        this.manufactureType = type;

        HUD.displayText(this.team, `Manufacturing new ${type}.`);
    }
}

/**
 * Manufactures spacecraft
 */
function process(entity) {
    if (entity.isManufacturing) {
        const {planet, team} = entity;

        const shouldManufacture =
                  entity.planet.pbase &&
                  entity.planet.pbase.materialsFinished >= entity.PRODUCT[entity.manufactureType].cost;

        if (shouldManufacture) {
            if (entity.manufactureTime > 0) {
                entity.manufactureTime--;
            } else {
                const x = entity.x + Random.int(-20, 20);
                const y = entity.y + Random.int(-20, 20);

                const product = Entity.create(entity.manufactureType, {x, y, team});

                if (entity.manufactureType === 'Fighter') {
                    if (planet.spaceport && !planet.spaceport.isCarryingFighter) {
                        product.dockSpacePort(planet.spaceport);
                    } else {
                        product.dockPlanet(planet);
                    }

                } else if (entity.manufactureType === 'Freighter') {
                    product.enterPlanetOrbit(planet);
                }

                HUD.displayText(team, `New ${product.type} manufactured.`);

                entity.isManufacturing = false;
                entity.manufactureType = undefined;
            }
        }
    }
}

export default {
    componentFlag: 'canManufacture',
    DEFAULTS,
    process
}
