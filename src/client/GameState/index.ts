import {compress, decompress} from "lz-string";

import Entity from "../Entity";
import getEntityProperties, {PROPERTY_IS_REFERENCE} from './getEntityProperties';
import Score from "../Score";

export function serialize(): string {
    return JSON.stringify(
        Entity.getAll().map(getEntityProperties),
        null, 2
    );
}

function inflateReferencesForEntity(entity, index, allEntities) {
    Object.keys(entity)
        .forEach(prop => {
            const value = entity[prop];

            if (PROPERTY_IS_REFERENCE.test(prop) && !isNaN(value)) {
                entity[prop] = allEntities.find(e => e._creationId === value);
            }
        });
}

export function deserialize(json: string): void {
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

    // Avoid potential creationId duplicates
    Entity.resetCreationId(maxCreationId + 10);

    const allEntities = Entity.getAll();

    // Second pass, inflate references
    allEntities.forEach(inflateReferencesForEntity);
}

export function saveToLocalStorage() {
    const json = serialize();
    localStorage.setItem('entities', compress(json));

    const score = Score.getAll();
    localStorage.setItem('score', compress(JSON.stringify(score)));
}

export function restoreFromLocalStorage() {
    const json = decompress(localStorage.getItem('entities'));
    deserialize(json);

    const savedScores = JSON.parse(decompress(localStorage.getItem('score')));
    Score.setAll(savedScores.score, savedScores.battleResults);
}