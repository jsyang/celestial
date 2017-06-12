import Graphics from '../Graphics';
import {getDistSquared} from '.';

const byType = {};

function add(entity) {
    const {type} = entity;

    if (byType[type]) {
        byType[type].push(entity);
    } else {
        byType[type] = [entity];
    }
}

const getByType = (type: string): Array<any> => byType[type] || [];

function remove(entity) {
    entity.hp = 0;

    // Break references so entity can be GC'd
    entity.planet && delete entity.planet[entity.type.toLowerCase()];
    delete entity.target;

    const byTypeCollection = getByType(entity.type);
    const byTypeIndex      = byTypeCollection.indexOf(entity);

    if (byTypeIndex !== -1) {
        byTypeCollection.splice(byTypeIndex, 1);
    }

    Graphics.removeChild(entity.graphics);
}

function getAbsoluteNearestByType(entity, type) {
    let nearest;
    let nearestDist2 = Infinity;
    const entities   = getByType(type);

    if (entities) {
        entities.forEach(
            e => {
                const dist2 = getDistSquared(entity, e);
                if (dist2 < nearestDist2) {
                    nearestDist2 = dist2;
                    nearest      = e;
                }
            }
        );
    }

    return nearest;
}

export default {
    add,
    remove,
    getByType,
    getAbsoluteNearestByType
}
