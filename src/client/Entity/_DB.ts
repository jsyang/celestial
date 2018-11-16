import Graphics from '../Graphics';

const byType = {};

function add(entity) {
    const {type} = entity;

    if (byType[type]) {
        byType[type].push(entity);
    } else {
        byType[type] = [entity];
    }

    Graphics.addChild(entity.geo.graphics);
}

const getByType = (type: string): Array<any> => byType[type] || [];

function remove(entity) {
    entity.hp = 0;

    // Break references to planet and spaceport
    const childType = entity.type.toLowerCase();
    entity.planet && delete entity.planet[childType];
    entity.spaceport && delete entity.spaceport[childType];

    // Blow up the docked fighter as well if SpacePort
    if (entity.fighter) {
        entity.fighter.hp = 0;
        entity.fighter.undockSpacePort();
        delete entity.fighter;
    }

    if (entity.anchor) {
        // Break reference to shield holder
        entity.anchor.shield = null;
        delete entity.anchor;
    }

    delete entity.shield;
    delete entity.attackTarget;
    delete entity.colonizationTarget;

    const byTypeCollection = getByType(entity.type);
    const byTypeIndex      = byTypeCollection.indexOf(entity);

    if (byTypeIndex !== -1) {
        byTypeCollection.splice(byTypeIndex, 1);
    }

    Graphics.removeChild(entity.geo.graphics);
}

function getAll() {
    let allEntities = [];

    // [].push is fastest
    Object.keys(byType).forEach(entityType => Array.prototype.push.apply(allEntities, byType[entityType]));

    return allEntities;
}

function clearAll() {
    Object.keys(byType).forEach(
        type => {
            byType[type].forEach(remove);
            delete byType[type];
        }
    );
}

export default {
    add,
    remove,
    getAll,
    clearAll,
    getByType
};
