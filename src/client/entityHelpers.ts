import {IPoint} from './types';

export function getDistSquared(e1: IPoint, e2: IPoint): number {
    const dx = e2.x - e1.x;
    const dy = e2.y - e1.y;

    return dx ** 2 + dy ** 2;
}

export function getAngleFromTo(e1: IPoint, e2: IPoint): number {
    const dx = e2.x - e1.x;
    const dy = e2.y - e1.y;

    return Math.atan2(dy, dx);
}
