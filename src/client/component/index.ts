/**
 * All component flags start with the prefix `can`:
 * e.g. canStoreMaterials, canSupply, canShoot, canMove
 */

import Entity from '../Entity';

import AttackComponent from './attack';
import AutoTargetEnemyComponent from './autoTargetEnemy';
import ManufactureComponent from './manufacture';
import MineComponent from './mine';
import MetabolizeComponent from './metabolize';
import MoveLinearlyComponent from './moveLinearly';
import MoveToTargetComponent from './moveToColonizationTarget';
import HarvestComponent from './harvest';
import StoreMaterialComponent from './storeMaterials';
import RepairComponent from './repair';
import AnchorComponent from './anchor';
import BeShieldedComponent from './beShielded';
import RefineComponent from './refine';
import ConstructComponent from './construct';
import ExplodeComponent from './explode';
import OccupyPlanetComponent from './occupyPlanet';
import OccupySpacePortComponent from './occupySpacePort';
import OrbitStarComponent from './orbitStar';
import OrbitPlanetComponent from './orbitPlanet';
import DamageComponent from './damage';
import ShootCannonComponent from './shootCannon';
import ShootHeavyCannonComponent from './shootHeavyCannon';
import ShootLaserBoltComponent from './shootLaserBolt';
import ShootHomingMissileComponent from './shootHomingMissile';
import ShootClusterRocketComponent from './shootClusterRocket';
import LimitSpeedComponent from './limitSpeed';
import AccelerateToAttackTargetComponent from './accelerateToAttackTarget';
import AccelerateFighterToAttackTargetComponent from './accelerateFighterToAttackTarget';
import DisplayHitComponent from './displayHit';
import DockPlanetComponent from './dockPlanet';
import DockSpacePortComponent from './dockSpacePort';
import CarryFighterComponent from './carryFighter';
import ColonizePlanetComponent from './colonizePlanet';
import ShimmerComponent from './shimmer';
import DevelopEquipmentComponent from './developEquipment';
import GravitateComponent from './gravitate';
import FlockComponent from './flock';

import {isHumanTeam} from '../constants';
import Score from '../Score';

// In order of update() precedence
const ALL_COMPONENTS = [
    // Change position
    FlockComponent,
    DockPlanetComponent,
    DockSpacePortComponent,
    AnchorComponent,
    OccupyPlanetComponent,
    OccupySpacePortComponent,
    AccelerateToAttackTargetComponent,
    AccelerateFighterToAttackTargetComponent,
    MoveLinearlyComponent,
    MoveToTargetComponent,
    OrbitStarComponent,
    OrbitPlanetComponent,
    LimitSpeedComponent,

    // Affect other entities
    AutoTargetEnemyComponent,
    DamageComponent,
    StoreMaterialComponent,
    HarvestComponent,
    MineComponent,
    DevelopEquipmentComponent,
    RepairComponent,
    RefineComponent,
    ConstructComponent,
    ManufactureComponent,
    AttackComponent,
    ShootCannonComponent,
    ShootHeavyCannonComponent,
    ShootLaserBoltComponent,
    ShootHomingMissileComponent,
    ShootClusterRocketComponent,
    ColonizePlanetComponent,
    CarryFighterComponent,

    // Metabolize
    MetabolizeComponent,
    DisplayHitComponent,
    ShimmerComponent,
    ExplodeComponent,
    GravitateComponent,
    BeShieldedComponent
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
                        if (typeof entity[defaultPropertyKey] === 'undefined') {
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
    } else {
        // Special case for exploding when dead
        if (entity[ExplodeComponent.componentFlag]) {
            ExplodeComponent.process(entity);
        }
    }

    if (entity.hp > 0) {
        Entity.commit(entity);
    } else {
        Entity.destroy(entity);

        // Add to human score when enemy objects are destroyed

        if (isHumanTeam(entity.team)) {
            if (!isNaN(entity.lastDamagedByTeam) && !isHumanTeam(entity.lastDamagedByTeam)) {
                Score.add(-2 * entity.maxHp);
            }
        } else {
            if (isHumanTeam(entity.lastDamagedByTeam)) {
                Score.add(entity.maxHp);
            }
        }
    }
}

export default {
    init,
    update
}
