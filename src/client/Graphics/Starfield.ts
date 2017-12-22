import * as PIXI from 'pixi.js';
import Random from '../Random';

const stars: Array<PIXI.Graphics> = [];

function createStar(stage: PIXI.Graphics, {color, size, x, y}): PIXI.Graphics {
    const g = new PIXI.Graphics();

    g.beginFill(color);
    g.drawRect(0, 0, size, size);
    g.lineWidth = size;
    g.endFill();

    g.x = x;
    g.y = y;

    stage.addChild(g);

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

let width2;
let height2;

function init(stage) {
    let i;

    for (i = 0; i < STAR.DIM.count; i++) {
        stars.push(createStar(stage, STAR.DIM));
    }

    for (i = 0; i < STAR.BRIGHT.count; i++) {
        stars.push(createStar(stage, STAR.BRIGHT));
    }

    reinit({x: width2, y: height2});
}

function reinit(point) {
    width2  = innerWidth >> 1;
    height2 = innerHeight >> 1;

    stars.forEach(star => {
        star.x = point.x + Random.float(-width2, width2);
        star.y = point.y + Random.float(-height2, height2);
    });
}


function moveStar(star, dx, dy, center) {
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

function process(center, dx, dy) {
    stars.forEach(star => moveStar(star, dx, dy, center));
}

export default {
    init,
    reinit,
    process
};