/**
 * All component flags start with the prefix `can`:
 * e.g. canStoreMaterials, canSupply, canShoot, canMove
 */

var EntityDB   = require('./entityDB');
var EntityGrid = require('./entitygrid');

var ManufactureComponent     = require('./component/manufacture');
var MineComponent            = require('./component/mine');
var MetabolizeComponent      = require('./component/metabolize');
var MoveLinearlyComponent    = require('./component/moveLinearly');
var HarvestComponent         = require('./component/harvest');
var StoreMaterialComponent   = require('./component/storeMaterials');
var RepairComponent          = require('./component/repair');
var RefineComponent          = require('./component/refine');
var ConstructComponent       = require('./component/construct');
var ExplodeComponent         = require('./component/explode');
var OccupyPlanetComponent    = require('./component/occupyPlanet');
var OccupySpacePortComponent = require('./component/occupySpacePort');
var OrbitStarComponent       = require('./component/orbitStar');
var OrbitPlanetComponent     = require('./component/orbitPlanet');
var DamageComponent          = require('./component/damage');
var ShootCannonComponent     = require('./component/shootCannon');
var LimitSpeedComponent      = require('./component/limitSpeed');
var AccelerateComponent      = require('./component/accelerate');
var DockPlanetComponent      = require('./component/dockPlanet');

/**
 * @param entity
 * @param defaults
 */
function assume(entity, defaults) {
    if (defaults) {
        for (var k in defaults) {
            if (defaults.hasOwnProperty(k) && typeof entity[k] === 'undefined') {
                entity[k] = defaults[k];
            }
        }
    }
}

/**
 * Set default values for components if the entity has them
 * @param entity
 */
function init(entity) {
    entity.canDamage && assume(entity, DamageComponent.DEFAULTS);
    entity.canMine && assume(entity, MineComponent.DEFAULTS);
    entity.canMoveLinearly && assume(entity, MoveLinearlyComponent.DEFAULTS);
    entity.canOrbitStar && assume(entity, OrbitStarComponent.DEFAULTS);
    entity.canOrbitPlanet && assume(entity, OrbitPlanetComponent.DEFAULTS);
    entity.canLimitSpeed && assume(entity, LimitSpeedComponent.DEFAULTS);
    entity.canMetabolize && assume(entity, MetabolizeComponent.DEFAULTS);
    entity.canStoreMaterial && assume(entity, StoreMaterialComponent.DEFAULTS);
    entity.canHarvest && assume(entity, HarvestComponent.DEFAULTS);
    entity.canRepair && assume(entity, RepairComponent.DEFAULTS);
    entity.canRefine && assume(entity, RefineComponent.DEFAULTS);
    entity.canConstruct && assume(entity, ConstructComponent.DEFAULTS);
    entity.canExplode && assume(entity, ExplodeComponent.DEFAULTS);
    entity.canOccupyPlanet && assume(entity, OccupyPlanetComponent.DEFAULTS);
    entity.canOccupySpacePort && assume(entity, OccupySpacePortComponent.DEFAULTS);
    entity.canManufacture && assume(entity, ManufactureComponent.DEFAULTS);
    entity.canShootCannon && assume(entity, ShootCannonComponent.DEFAULTS);
    entity.canAccelerate && assume(entity, AccelerateComponent.DEFAULTS);
    entity.canDockPlanet && assume(entity, DockPlanetComponent.DEFAULTS);

    entity.isInitialized = true;
}

/**
 * Apply component behaviors
 * @param entity
 */
function process(entity) {
    if (!entity.isInitialized) {
        init(entity);
    }

    if (entity.hp > 0) {
        // Change position
        entity.canOccupyPlanet && OccupyPlanetComponent.process(entity);
        entity.canOccupySpacePort && OccupySpacePortComponent.process(entity);
        entity.canMoveLinearly && MoveLinearlyComponent.process(entity);
        entity.canOrbitStar && OrbitStarComponent.process(entity);
        entity.canOrbitPlanet && OrbitPlanetComponent.process(entity);
        entity.canLimitSpeed && LimitSpeedComponent.process(entity);
        entity.canAccelerate && AccelerateComponent.process(entity);
        entity.canDockPlanet && DockPlanetComponent.process(entity);

        // Affect other entities
        entity.canDamage && DamageComponent.process(entity);
        entity.canStoreMaterial && StoreMaterialComponent.process(entity);
        entity.canHarvest && HarvestComponent.process(entity);
        entity.canMine && MineComponent.process(entity);
        entity.canRepair && RepairComponent.process(entity);
        entity.canRefine && RefineComponent.process(entity);
        entity.canConstruct && ConstructComponent.process(entity);
        entity.canManufacture && ManufactureComponent.process(entity);
        entity.canShootCannon && ShootCannonComponent.process(entity);

        // Metabolize
        entity.canMetabolize && MetabolizeComponent.process(entity);

        EntityGrid.add(entity);
    } else {

        entity.canExplode && ExplodeComponent.process(entity);
        EntityDB.remove(entity);
    }

}

module.exports = {
    init    : init,
    process : process
};