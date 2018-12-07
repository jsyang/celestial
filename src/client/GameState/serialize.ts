import Entity from "../Entity";


const IGNORE_KEYS = new RegExp([
    'geo',
    'mass',

    // Entity references need to be handled specially for serialization / de-serialization
    'pbase',
    'plab',
    'pcolony',
    'sensorarray',
    'spacedock',
    'pcomm',
    'target',
    'attackTarget',
    'anchor',
    'attackTurretPositions',
    'shield',
    'fighter',
    'colonizationTarget',
    'planet',
    'star',
    'spaceport'
].join('|'));

export function serialize(): string {
    const allEntities    = Entity.getAll();
    const objects: any[] = [];

    // Fastest as nested for loops, rather than composable
    let objectified;
    let entity;

    for (let i = allEntities.length - 1; i >= 0; i--) {
        objectified = {};
        entity      = allEntities[i];

        for (let key in entity) {
            if (IGNORE_KEYS.test(key)) continue;

            let value = entity[key];
            if (typeof value !== 'function') {
                // Uncomment to find potential circular references
                /*
                if (typeof value === 'object') {
                    console.log(key, value);
                }
                */
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
