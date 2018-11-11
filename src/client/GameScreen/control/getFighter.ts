import Entity from "../../Entity";

let fighterIndex = -1;

export function getFighter(isNext: boolean) {
    const enemyFighters = Entity.getByType('Fighter');

    fighterIndex += isNext ? 1 : -1;

    if (!enemyFighters[fighterIndex]) {
        fighterIndex = isNext ? 0 : enemyFighters.length - 1;
    }
    return enemyFighters[fighterIndex];
}

