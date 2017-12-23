import Random from '../random';
import Entity from '../Entity';

import DockPlanetComponent from './dockPlanet';
import OrbitPlanetComponent from './orbitPlanet';

const PRODUCT = {
    Freighter: {cost: 300, time: 120},
    Fighter:   {cost: 500, time: 90}
};

const DEFAULTS = {
    PRODUCT,
    orderManufacture,
    isManufacturing: false,
    manufactureTime: 0,
    manufactureType: undefined
};

function orderManufacture(type) {
    this.isManufacturing = true;
    this.manufactureTime = this.PRODUCT[type].time;
    this.manufactureType = type;
}

/**
 * Manufactures spacecraft
 */
function process(entity) {
    if (entity.isManufacturing) {

        const shouldManufacture =
                  entity.planet.pbase &&
                  entity.planet.pbase.materialsFinished >= entity.PRODUCT[entity.manufactureType].cost;

        if (shouldManufacture) {
            if (entity.manufactureTime > 0) {
                entity.manufactureTime--;
            } else {
                const productOptions = {
                    x:    entity.x + Random.float(-1, 1),
                    y:    entity.y + Random.float(-1, 1),
                    team: entity.team
                };

                const product = Entity.create(entity.manufactureType, productOptions);

                if (entity.manufactureType === 'Fighter') {
                    if (entity.type === 'SpacePort') {
                        // todo: Dock in SpacePort
                        DockPlanetComponent.DEFAULTS
                            .dockPlanet.call(product, entity.planet);
                    } else {
                        DockPlanetComponent.DEFAULTS
                            .dockPlanet.call(product, entity.planet);
                    }

                } else if (entity.manufactureType === 'Freighter') {
                    OrbitPlanetComponent.DEFAULTS
                        .enterPlanetOrbit.call(product, entity.planet);
                }

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
