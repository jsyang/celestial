import {compress, decompress} from "lz-string";

import Entity from "../Entity";
import getEntityProperties, {PROPERTY_IS_REFERENCE} from './getEntityProperties';
import Score from "../Score";
import GameScreenControl from "../GameScreen/control";
import LivingEntity from '../Entity/LivingEntity';
import Focus from '../Graphics/Focus';
import TeamSystem from '../GameScreen/TeamSystem';

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

    // Second pass, inflate references
    Entity.getAll().forEach(inflateReferencesForEntity);
    TeamSystem.init();
}

export function saveToLocalStorage() {
    const json = serialize();
    localStorage.setItem('entities', compress(json));

    const controlledEntity = GameScreenControl.getLastControlledLivingEntity();
    if (controlledEntity && controlledEntity instanceof LivingEntity) {
        localStorage.setItem('controlledEntity', (controlledEntity as any)._creationId);
    }

    const score = Score.getAll();
    localStorage.setItem('score', compress(JSON.stringify(score)));
}

export function restoreFromLocalStorage() {
    const json = decompress(localStorage.getItem('entities'));
    deserialize(json);

    const controlledEntityId  = parseFloat(localStorage.getItem('controlledEntity') || '');
    const newControlledEntity = Entity.getAll().find((e: any) => e._creationId === controlledEntityId);
    if (newControlledEntity) {
        GameScreenControl.setControlledEntity(newControlledEntity);
        GameScreenControl.setControlToHuman();
        Focus.setFocus(newControlledEntity);
    }

    const savedScores = JSON.parse(decompress(localStorage.getItem('score')));
    Score.setAll(savedScores.score, savedScores.battleResults);
}