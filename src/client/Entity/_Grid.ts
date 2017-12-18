/**
 * All updates to the grid are written on a per-frame basis.
 * The nextEntityGrid becomes the current entityGrid when EntityGrid.commit() is called.
 */
import {getDistSquared} from '.';
import {MAX_COORDINATE} from '../constants';

const GRID_SIZE_BIT_SHIFT = 9;
const GRID_WIDTH          = MAX_COORDINATE >> GRID_SIZE_BIT_SHIFT;
// const GRID_SIZE           = 1 << GRID_SIZE_BIT_SHIFT;

// 1<<11 = 2048
// Each cell within the entityGrid covers an area 2048x2048

let entityGrid: any     = [];
let nextEntityGrid: any = [];

// Prepare grid for prepareNext game logic cycle
function prepareNext() {
    entityGrid     = nextEntityGrid;
    nextEntityGrid = [];
}

/**
 * Convert entity's game world coordinates to an index where
 * it should reside within the `entityGrid` array, given that
 * each index represents a GRID_SIZE x GRID_SIZE 2D area of the
 * game field.
 */
function getEntityToGridIndex(entity, dGx, dGy): number {
    let gX = entity.x >> GRID_SIZE_BIT_SHIFT;
    let gY = entity.y >> GRID_SIZE_BIT_SHIFT;

    gX += dGx || 0;
    gY += dGy || 0;

    return gX + gY * GRID_WIDTH;
}

// Commit this entity into the Entity Grid only if required
function commit(entity) {
    if (entity.hp > 0) {
        const index = getEntityToGridIndex(entity, 0, 0);
        if (nextEntityGrid[index] instanceof Array) {
            nextEntityGrid[index].push(entity);
        } else {
            nextEntityGrid[index] = [entity];
        }
    }

    return this;
}

function filterNearestResult(filterType, minDistance2, neighbor) {
    let isRelevant = true;

    if (minDistance2 > 0) {
        isRelevant = isRelevant && getDistSquared(this, neighbor) <= minDistance2;
    }

    if (filterType) {
        isRelevant = isRelevant && neighbor.type === filterType;
    }

    return isRelevant;
}

/**
 * Get all neighbors within 1 block around `entity`
 */
function getNearest(entity, filterType?, minDistance2?) {
    let nearest = [].concat(
        entityGrid[getEntityToGridIndex(entity, -1, -1)],
        entityGrid[getEntityToGridIndex(entity, 0, -1)],
        entityGrid[getEntityToGridIndex(entity, 1, -1)],
        entityGrid[getEntityToGridIndex(entity, -1, 0)],
        entityGrid[getEntityToGridIndex(entity, 0, 0)],
        entityGrid[getEntityToGridIndex(entity, 1, 0)],
        entityGrid[getEntityToGridIndex(entity, 0, 1)],
        entityGrid[getEntityToGridIndex(entity, -1, 1)],
        entityGrid[getEntityToGridIndex(entity, 1, 1)]
    ).filter(Boolean);

    if (filterType || minDistance2) {
        nearest = nearest.filter(filterNearestResult.bind(entity, filterType, minDistance2));
    }

    return nearest;
}

export default {
    prepareNext,
    commit,
    getNearest
}
