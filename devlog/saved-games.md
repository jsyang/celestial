# Implementing saved games
_Tags: #featuredev, #code_
 
2018-12-16

Celestial Combat is a game large in ambition and scope. Battles
often span multiple solar systems with hundreds of spacecraft and
planets with caches of materials for war production.

As the gameplay solidified, finding a way to persist player progress grew more important. 
Saving score and progress within a battle means players are likely to come back to the game.

## Serialization

At the heart of saved games is a computer science concept called [_serialization_](https://en.wikipedia.org/wiki/Serialization).
When you serialize the state of a program, you are turning the things represented in 
memory into a _series of bytes_. They can be a certain format: e.g. JSON or a predefined
binary structure. 

The [ECS](entity-component-system.md) architecture of Celestial Combat makes serialization easy. 
Game entities are all very basic classes that inherit a set of 
properties such as position (x,y) and a `type` field from the `LivingEntity` base class, 
then add their own properties to them, mostly fields relating to Components within the ECS pattern.

The vast majority of these can be serialized via `JSON.stringify(...)` but what about
fields that serve as references to other game entities? For instance, a planet that is
occupied by a faction has references to its planetary structures:

```
class Planet extends LivingEntity {

    // Simple serialization
    canOrbitStar      = true;
    canStoreMaterial  = true;
    materialsRaw      = 0;
    materialsFinished = 0;
    hp                = 2000;
    mass              = 180;

    ...

    // JSON.stringify(planetInstance) will fail here
    star?: Star;
    pbase?: PBase;
    plab?: PLab;
    pcolony?: PColony;
    pcomm?: PComm;
    spacedock?: SpaceDock;
    sensorarray?: SensorArray;
    spaceport?: SpacePort;
    
    ...
}
```

Handling references was not immediately straightforward and to implement 
saving games, we would need to solve this problem and preserve those references somehow.

### Creation IDs

If we can recognize that a game state is essentially an instance of a relational database,
then we have a simple solution for this: use auto-incrementing primary keys or IDs to uniquely
map references from one entity to another. In Celestial Combat, an ID is a number.   

These changes were done in a few steps:

1. Within the `create()` of `src/client/Entity/index.ts`, we need to assign an ID field
that is auto-incrementing. Its value is not mutated during the course of the game.

2. This field needs to be set to a specific value when loading (deserializing) a saved game. Make it
auto-increment by default or have it take a `creationId` just like any other field during the `create()` call. 

3. Use of Components (as part of ECS) adds specific references to other entities to implement its
behavior. `const F_` inside `src/client/GameState/getEntityProperties.ts` defines a serialization map
for this purpose.

4. Entities are made up of Components. So map an entire Entity to a set of such Components.
`const FIELDS_BY_ENTITY` in `src/client/GameState/getEntityProperties.ts`.

## Deserialization

Once serialized, the game will need some way of recreating those references when loading a saved game.
The game can do this in 2 passes:

1. Deserialize the saved game data into an intermediate game state. All entities are created and have their
non-reference fields filled in. Reference fields are not yet linked and remain represented as numbers.

2. Inflate the references. From a collection of all entities, find by ID and set the values of the 
reference fields: numbers are mapped to entity instances.

```
function inflateReferencesForEntity(entity, index, allEntities) {
    Object.keys(entity)
        .forEach(prop => {
            const value = entity[prop];

            if (PROPERTY_IS_REFERENCE.test(prop) && !isNaN(value)) {
                entity[prop] = allEntities.find(e => e._creationId === value);
            }
        });
}

function deserialize(json: string): void {
    const all         = JSON.parse(json);
    let maxCreationId = 0;

    Entity.clearAll();

    // First pass, create all the entities, leaving references as numbers
    all.forEach(e => {
        Entity.create(e.type, e);

        if (maxCreationId < e._creationId) {
            maxCreationId = e._creationId;
        }
    });

    ...

    // Second pass, inflate references
    Entity.getAll().forEach(inflateReferencesForEntity);
    
    ...
}

```

## Saved game storage

Currently, Celestial Combat stores only supports storing a single saved game 
as compressed JSON in localStorage. It uses the `lz-string` compression package
because:

- it is pure JS
- has no dependencies of its own
- is space-efficient (meant for use with localStorage)

Of course, we also want to save other info about a game session, not just entities:
- rank
- score
- number of consecutive wins / losses (for game over)

These are easily handled by `JSON.stringify()` and `JSON.parse()` and stored in the same
manner. Each being assigned its own localStorage key.

You can find the all source code for saving / loading games under 
`src/client/GameState`.

Thanks for reading!