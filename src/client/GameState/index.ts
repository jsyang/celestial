import {compress, decompress} from "lz-string";

import Entity from "../Entity";
import getEntityProperties from './getEntityProperties';

export function serialize(): string {
    return JSON.stringify(
        Entity.getAll().map(getEntityProperties),
        null, 2
    );
}

export function saveToLocalStorage() {
    localStorage.setItem('entities', compress(serialize()));
}

export function loadFromLocalStorage() {
    return decompress(localStorage.getItem('entities'));
}