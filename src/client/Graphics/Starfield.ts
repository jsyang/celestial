import * as PIXI from 'pixi.js';
import Random from '../Random';
import {IPoint} from '../types';

const stars: PIXI.Graphics[] = [];

interface ICreateStarParams {
    color: number;
    size: number;
    x: number;
    y: number;
}

function createStar({color, size, x, y}: ICreateStarParams): PIXI.Graphics {
    const g = new PIXI.Graphics();

    g.beginFill(color);
    g.drawRect(0, 0, size, size);
    g.lineWidth = size;
    g.endFill();

    g.x = x;
    g.y = y;

    return g;
}

const STAR: any = {
    BRIGHT: {
        speed: 0.01,
        count: 8,
        size:  2,
        color: 0xaaaaaa,
        x:     0,
        y:     0
    },
    DIM:    {
        speed: 0.3,
        count: 20,
        size:  1,
        color: 0xf0f0f0,
        x:     0,
        y:     0
    }
};

let width2  = innerWidth >> 1;
let height2 = innerHeight >> 1;

function onResize(): void {
    lastCenter = null;
}

function init(): PIXI.Graphics[] {
    let i;

    if (stars.length === 0) {
        // First initialization
        for (i = 0; i < STAR.DIM.count; i++) {
            stars.push(createStar(STAR.DIM));
        }

        for (i = 0; i < STAR.BRIGHT.count; i++) {
            stars.push(createStar(STAR.BRIGHT));
        }
    } else {
        onResize();
    }

    return stars;
}

function reinit(point: IPoint): void {
    width2  = innerWidth >> 1;
    height2 = innerHeight >> 1;

    stars.forEach(star => {
        star.x = point.x + Random.float(-width2, width2);
        star.y = point.y + Random.float(-height2, height2);
    });
}

function moveStar(dx: number, dy: number, center: IPoint, star: PIXI.Graphics): void {
    if (star.lineWidth === 1) {
        dx *= STAR.DIM.speed;
        dy *= STAR.DIM.speed;
    } else {
        dx *= STAR.BRIGHT.speed;
        dy *= STAR.BRIGHT.speed;
    }

    star.x += dx;
    star.y += dy;

    if (star.x < center.x - width2) {
        star.x = center.x + width2;
    } else if (star.x > center.x + width2) {
        star.x = center.x - width2;
    }

    if (star.y < center.y - height2) {
        star.y = center.y + height2;
    } else if (star.y > center.y + height2) {
        star.y = center.y - height2;
    }
}

let lastCenter: any = null;

function process(center: IPoint | null): void {
    if (center) {
        const {x, y} = center;

        let dx = 0;
        let dy = 0;

        if (lastCenter) {
            dx = x - lastCenter.x;
            dy = y - lastCenter.y;
        } else {
            reinit(center);
        }

        stars.forEach(moveStar.bind(null, dx, dy, center));

        lastCenter = {x, y};
    } else {
        lastCenter = null;
    }
}

export default {
    init,
    process,
    onResize
};
