/**
 * All updates to the grid are written on a per-frame basis.
 * The nextEntityGrid becomes the current entityGrid when EntityGrid.commit() is called.
 */
var Entity    = require('./entity');
var GameField = require('./gamefield');

var GRID_SIZE_BIT_SHIFT = 11;
var GRID_WIDTH          = GameField.MAX.X >> GRID_SIZE_BIT_SHIFT;
var GRID_SIZE           = 1 << GRID_SIZE_BIT_SHIFT;

// 1<<11 = 2048
// Each cell within the entityGrid covers an area 2048x2048

var entityGrid     = [];
var nextEntityGrid = [];

function commit() {
    entityGrid     = nextEntityGrid;
    nextEntityGrid = [];
}

/**
 * Convert entity's game world coordinates to an index where
 * it should reside within the `entityGrid` array, given that
 * each index represents a GRID_SIZE x GRID_SIZE 2D area of the
 * game field.
 *
 * @param {object} entity
 * @param {number} entity.x
 * @param {number} entity.y
 * @param {number} [dGx]
 * @param {number} [dGy]
 * @returns {number}
 */
function getEntityToGridIndex(entity, dGx, dGy) {
    var gX = entity.x >> GRID_SIZE_BIT_SHIFT;
    var gY = entity.y >> GRID_SIZE_BIT_SHIFT;

    gX += dGx || 0;
    gY += dGy || 0;

    return gX + gY * GRID_WIDTH;
}

/**
 * Add this entity into the Entity Grid
 * @param {object} entity
 */
function add(entity) {
    var index = getEntityToGridIndex(entity);
    if (nextEntityGrid[index] instanceof Array) {
        nextEntityGrid[index].push(entity);
    } else {
        nextEntityGrid[index] = [entity];
    }

    return this;
}

/**
 * @param {string} [filterType]
 * @param {number} [minDistance2]
 * @param {object} neighbor
 * @returns {boolean}
 */
function filterNearestResult(filterType, minDistance2, neighbor) {
    var isRelevant = true;

    if (minDistance2 > 0) {
        isRelevant = isRelevant && Entity.getDistSquared(this, neighbor) <= minDistance2;
    }

    if (filterType) {
        isRelevant = isRelevant && neighbor.type === filterType;
    }

    return isRelevant;
}

/**
 * Get all neighbors within 3x3 block around `entity`
 * @param {object} entity
 * @param {string} [filterType]
 * @param {number} [minDistance2]
 * @returns {Array.<*>}
 */
function getNearest(entity, filterType, minDistance2) {
    var nearest = [].concat(
        entityGrid[getEntityToGridIndex(entity, -1, -1)],
        entityGrid[getEntityToGridIndex(entity, 0, -1)],
        entityGrid[getEntityToGridIndex(entity, 1, -1)],
        entityGrid[getEntityToGridIndex(entity, 0, -1)],
        entityGrid[getEntityToGridIndex(entity, 0, 0)],
        entityGrid[getEntityToGridIndex(entity, 0, 1)],
        entityGrid[getEntityToGridIndex(entity, -1, 1)],
        entityGrid[getEntityToGridIndex(entity, 0, 1)],
        entityGrid[getEntityToGridIndex(entity, 1, 1)]
    ).filter(Boolean);

    if (filterType || minDistance2) {
        nearest = nearest.filter(filterNearestResult.bind(entity, filterType, minDistance2));
    }

    return nearest;
}

module.exports = {
    add        : add,
    commit     : commit,
    getNearest : getNearest
};