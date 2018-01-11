/**
 * All updates to the grid are written on a per-frame basis.
 * The nextEntityGrid becomes the current entityGrid when EntityGrid.commit() is called.
 */
import {getDistSquared} from '.';
import {MAX_COORDINATE} from '../constants';

/**
 * Each cell within the entityGrid covers an area (1<<11) x (1<<11)
 * 2048 x 2048 = 32 cells x 32 cells = 1024 possible cells vs 4096 possible cell previously
 *
 * todo: might be good to have this changeable
 * ex: celestial bodies would be much less than number of cells to keep track of them.
 * i.e. they could all sit in the same cell / array
 */
const GRID_SIZE_BIT_SHIFT = 11;
const GRID_WIDTH          = MAX_COORDINATE >> GRID_SIZE_BIT_SHIFT;


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

/**
 * Filter for neighbor type, minDistance2 from a particular entity
 */
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

const TARGETABLE = {
    Freighter:   true,
    Fighter:     true,
    PBase:       true,
    PColony:     true,
    PComm:       true,
    PLab:        true,
    Probe:       true,
    SensorArray: true,
    SpaceDock:   true,
    SpacePort:   true
};

const isTargetable = e => e.type in TARGETABLE;

export default class EntityGrid {
    grid: any     = [];
    nextGrid: any = [];

    /** Prepare grid for next game logic update cycle **/
    prepareNext() {
        this.grid     = this.nextGrid;
        this.nextGrid = [];

        return this;
    }

    /** Mark entity as one that should be tracked in the next game update **/
    commit(entity) {
        const {nextGrid} = this;

        if (entity.hp > 0) {
            const index = getEntityToGridIndex(entity, 0, 0);
            if (nextGrid[index] instanceof Array) {
                nextGrid[index].push(entity);
            } else {
                nextGrid[index] = [entity];
            }
        }

        return this;
    }

    get1CellRadiusAroundEntity(entity) {
        const {grid} = this;

        return [].concat(
            grid[getEntityToGridIndex(entity, -1, -1)],
            grid[getEntityToGridIndex(entity, 0, -1)],
            grid[getEntityToGridIndex(entity, 1, -1)],
            grid[getEntityToGridIndex(entity, -1, 0)],
            grid[getEntityToGridIndex(entity, 0, 0)],
            grid[getEntityToGridIndex(entity, 1, 0)],
            grid[getEntityToGridIndex(entity, 0, 1)],
            grid[getEntityToGridIndex(entity, -1, 1)],
            grid[getEntityToGridIndex(entity, 1, 1)]
        ).filter(Boolean);
    }

    /**
     * Get all neighbors within 1 block around `entity`
     */
    getNearest(entity, filterType?, minDistance2?) {
        let nearest = this.get1CellRadiusAroundEntity(entity);

        if (filterType || minDistance2) {
            nearest = nearest.filter(filterNearestResult.bind(entity, filterType, minDistance2));
        }

        return nearest;
    }

    getNearestEnemyTarget(entity, searchDist2) {
        const enemies = this.get1CellRadiusAroundEntity(entity)
            .filter(
                (e: any) => (e.team !== entity.team) && isTargetable(e)
            );

        let nearest;
        let nearestDist2 = Infinity;

        if (enemies) {
            enemies.forEach(
                e => {
                    const dist2 = getDistSquared(entity, e);
                    if (dist2 <= searchDist2 && dist2 < nearestDist2) {
                        nearestDist2 = dist2;
                        nearest      = e;
                    }
                }
            );
        }

        return nearest;
    }
}

// export default {
//     prepareNext,
//     commit,
//     getNearest,
//     getNearestEnemyTarget
// }
