/**
 * All component flags start with the prefix `can`:
 * e.g. canStoreMaterials, canSupply, canShoot, canMove
 */

import Entity from '../Entity';

import ManufactureComponent     from './manufacture';
import MineComponent            from './mine';
import MetabolizeComponent      from './metabolize';
import MoveLinearlyComponent    from './moveLinearly';
import MoveToTargetComponent    from './moveToTarget';
import HarvestComponent         from './harvest';
import StoreMaterialComponent   from './storeMaterials';
import RepairComponent          from './repair';
import RefineComponent          from './refine';
import ConstructComponent       from './construct';
import ExplodeComponent         from './explode';
import OccupyPlanetComponent    from './occupyPlanet';
import OccupySpacePortComponent from './occupySpacePort';
import OrbitStarComponent       from './orbitStar';
import OrbitPlanetComponent     from './orbitPlanet';
import DamageComponent          from './damage';
import ShootCannonComponent     from './shootCannon';
import LimitSpeedComponent      from './limitSpeed';
import AccelerateComponent      from './accelerate';
import DisplayHitComponent      from './displayHit';
import DockPlanetComponent      from './dockPlanet';
import ColonizePlanetComponent  from './colonizePlanet';


// In order of update() precedence
// ExplodeComponent excluded for now
const ALL_COMPONENTS = [
    // Change position
    OccupyPlanetComponent,
    OccupySpacePortComponent,
    MoveLinearlyComponent,
    MoveToTargetComponent,
    OrbitStarComponent,
    OrbitPlanetComponent,
    LimitSpeedComponent,
    AccelerateComponent,
    DockPlanetComponent,

    // Affect other entities
    DamageComponent,
    StoreMaterialComponent,
    HarvestComponent,
    MineComponent,
    RepairComponent,
    RefineComponent,
    ConstructComponent,
    ManufactureComponent,
    ShootCannonComponent,
    ColonizePlanetComponent,

    // Metabolize
    MetabolizeComponent,
    DisplayHitComponent,
    ExplodeComponent
];

/**
 * Set default values for components if the entity has them
 */
function init(entity) {
    ALL_COMPONENTS
        .forEach((component: any) => {
            if (component.DEFAULTS && entity[component.componentFlag]) {
                Object.keys(component.DEFAULTS)
                    .forEach(defaultPropertyKey => {
                        // Only set defaults if there isn't a value already set
                        if(typeof entity[defaultPropertyKey] === 'undefined') {
                            entity[defaultPropertyKey] = component.DEFAULTS[defaultPropertyKey];
                        }
                    });
            }
        });
}

function update(entity) {
    if (entity.hp > 0) {
        ALL_COMPONENTS.forEach((component: any) => {
            if (entity[component.componentFlag] && component.process) {
                component.process(entity);
            }
        });
    }

    if (entity.hp > 0) {
        Entity.commit(entity);
    } else {
        Entity.destroy(entity);
    }
}

export default {
    init,
    update
}