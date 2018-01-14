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

    // Break references so entity can be GC'd
    const childType = entity.type.toLowerCase();
    entity.planet && delete entity.planet[childType];
    entity.spaceport && delete entity.spaceport[childType];

    // Blow up the docked fighter as well if SpacePort
    if (entity.fighter) {
        entity.fighter.undockSpacePort();
        entity.fighter.hp = 0;
    }

    delete entity.target;

    const byTypeCollection = getByType(entity.type);
    const byTypeIndex      = byTypeCollection.indexOf(entity);

    if (byTypeIndex !== -1) {
        byTypeCollection.splice(byTypeIndex, 1);
    }

    Graphics.removeChild(entity.geo.graphics);
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
    clearAll,
    getByType
}
