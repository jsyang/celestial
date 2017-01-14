/**
 * All component flags start with the prefix `can`:
 * e.g. canStoreMaterials, canSupply, canShoot, canMove
 */

var EntityDB   = require('./entityDB');
var EntityGrid = require('./entitygrid');

var HarvestComponent       = require('./component/harvest');
var StoreMaterialComponent = require('./component/storeMaterials');
var RepairComponent        = require('./component/repair');
var RefineComponent        = require('./component/refine');
var ConstructComponent     = require('./component/construct');
var ExplodeComponent       = require('./component/explode');
var OccupyPlanetComponent  = require('./component/occupyPlanet');

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
    entity.canStoreMaterial && assume(entity, StoreMaterialComponent.DEFAULTS);
    entity.canHarvest && assume(entity, HarvestComponent.DEFAULTS);
    entity.canRepair && assume(entity, RepairComponent.DEFAULTS);
    entity.canRefine && assume(entity, RefineComponent.DEFAULTS);
    entity.canConstruct && assume(entity, ConstructComponent.DEFAULTS);
    entity.canExplode && assume(entity, ExplodeComponent.DEFAULTS);
    entity.canOccupyPlanet && assume(entity, OccupyPlanetComponent.DEFAULTS);

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
        entity.canOccupyPlanet && OccupyPlanetComponent.process(entity);

        entity.canStoreMaterial && StoreMaterialComponent.process(entity);
        entity.canHarvest && HarvestComponent.process(entity);
        entity.canRepair && RepairComponent.process(entity);
        entity.canRefine && RefineComponent.process(entity);
        entity.canConstruct && ConstructComponent.process(entity);

        EntityGrid.add(entity);
    } else {

        entity.canExplode && ExplodeComponent.process(entity);
        EntityDB.remove(entity);
    }

}

module.exports = {
    process : process
};