// Standard interface to handle both vector graphics positioning
// as well as collisions

import {Graphics} from 'pixi.js';
import {pointInPolygon, pointInCircle, Circle, Polygon, Vector} from 'sat';
import {IPoint} from './types';
import {MAX_COORDINATE} from './constants';

const v    = (x, y) => new Vector(x, y);
const PIPI = Math.PI * 2;

function createMutableGeoInterface(graphics, collider) {
    return {
        set x(x) {
            if (x < 0) {
                x = 0;
            } else if (x > MAX_COORDINATE) {
                x = MAX_COORDINATE;
            }

            this.graphics.x     = x;
            this.collider.pos.x = x;
        },
        set y(y) {
            if (y < 0) {
                y = 0;
            } else if (y > MAX_COORDINATE) {
                y = MAX_COORDINATE;
            }

            this.graphics.y     = y;
            this.collider.pos.y = y;
        },
        set rotation(rotation) {
            if (rotation > PIPI) {
                rotation -= PIPI;
            } else if (rotation < -PIPI) {
                rotation += PIPI;
            }

            if (!(this.collider instanceof Circle)) {
                // SAT.Circle.setAngle() doesn't exist
                this.collider.setAngle(rotation);
                this.graphics.rotation = rotation;

            }
        },

        get x() {
            return this.graphics.x;
        },
        get y() {
            return this.graphics.y;
        },
        get rotation() {
            return this.graphics.rotation;
        },

        graphics: graphics,
        collider: collider
    };
}

export function testPointInEntity({x, y}: IPoint, entity) {
    const {collider} = entity.geo;
    const point      = v(x, y);

    if (collider instanceof Circle) {
        return pointInCircle(point, collider);
    } else {
        return pointInPolygon(point, collider);
    }
}

export const transformPolygon = (poly, dx = 0, dy = 0, sx = 1, sy = 1) =>
    poly.map((coord, index) => index % 2 === 0 ? coord * sx + dx : coord * sy + dy);

export default function Geometry(geometryDef, options: any = {}) {
    geometryDef = {...geometryDef, options};

    const {lineStyle, fill, path, radius, x, y, collisionPath} = geometryDef;
    let collider;

    // Graphics set up
    const g = new Graphics();

    if (lineStyle) {
        g.lineStyle(lineStyle.width, lineStyle.color, lineStyle.alpha);
    }

    if (fill) {
        g.beginFill(fill.color, fill.alpha);
    } else {
        g.beginFill(0, 0);
    }

    g.x = x || 0;
    g.y = y || 0;

    const position = v(g.x, g.y);

    if (geometryDef.type === 'circle') {
        g.drawCircle(0, 0, radius);
        collider = new Circle(position, radius);
    } else {
        const polygonSAT: Vector[] = [];

        // Use default path if collisionPath isn't explicitly set
        let colliderPath = collisionPath || path;

        for (let i = 0; i < colliderPath.length; i += 2) {
            polygonSAT.push(v(
                colliderPath[i],       // x
                colliderPath[i + 1]    // y
            ));
        }

        g.drawPolygon(path);
        collider = new Polygon(position, polygonSAT);
    }

    g.endFill();

    return createMutableGeoInterface(g, collider);
}