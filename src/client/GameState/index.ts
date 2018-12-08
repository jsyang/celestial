import Entity from "../Entity";
import getEntityProperties from './getEntityProperties';

export function serialize(): string {
    return JSON.stringify(
        Entity.getAll().map(getEntityProperties),
        null, 2
    );
}
