// Standard interface to handle both vector graphics positioning
// as well as collisions

import {Graphics} from 'pixi.js';
import {pointInPolygon, Circle, Polygon, Vector} from 'sat';
import {IPoint} from './types';

const v    = (x, y) => new Vector(x, y);
const PIPI = Math.PI * 2;

function createMutableGeoInterface(graphics, collider) {
    return {
        set x(x) {
            if (x < 0) {
                x = 0;
            } else if (x > 32768) {
                x = 32768;
            }

            this.graphics.x     = x;
            this.collider.pos.x = x;
        },
        set y(y) {
            if (y < 0) {
                y = 0;
            } else if (y > 32768) {
                y = 32768;
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
    return pointInPolygon(v(x, y), entity.geo.collider);
}

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