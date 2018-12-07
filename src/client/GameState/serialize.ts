import Entity from "../Entity";


const IGNORE_KEYS = new RegExp([
    'geo',
    'mass',

    // Entity references need to be handled specially for serialization / de-serialization
    'attackTarget',
    'anchor',
    'attackTurretPositions',
    'shield',
    'fighter',
    'colonizationTarget',
    'planet',
    'spaceport'
].join('|'));

export function serialize(): string {
    const allEntities       = Entity.getByType('Fighter');
    const objects: object[] = [];

    // Fastest as nested for loops, rather than composable
    let objectified;
    for (let i = allEntities.length - 1; i >= 0; i--) {
        objectified = {};
        let entity  = allEntities[i];

        for (let key in entity) {
            if (IGNORE_KEYS.test(key)) continue;

            let value = entity[key];
            if (typeof value !== 'function') {
                objectified[key] = value;
            }
        }

        objectified.x        = entity.x;
        objectified.y        = entity.y;
        objectified.rotation = entity.rotation;

        objects.push(objectified);
    }

    return JSON.stringify(objects, null, 2);
}
