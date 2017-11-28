import { Graphics } from 'pixi.js';
import { Circle, Polygon, Vector } from 'sat';

const v = (x, y) => new Vector(x, y);
const PIPI = Math.PI * 2;

function createMutableGeoInterface(graphics, collision) {
    return {
        set x(x) {
            if (x < 0) {
                x = 0;
            } else if (x > 32768) {
                x = 32768;
            }

            this.graphics.x = x;
            this.collision.pos.x = x;
        },
        set y(y) {
            if (y < 0) {
                y = 0;
            } else if (y > 32768) {
                y = 32768;
            }

            this.graphics.y = y;
            this.collision.pos.y = y;
        },
        set rotation(rotation) {
            if (rotation > PIPI) {
                rotation -= PIPI;
            } else if (rotation < -PIPI) {
                rotation += PIPI;
            }

            if (!(this.collision instanceof Circle)) {
                // SAT.Circle.setAngle() doesn't exist
                this.collision.setAngle(rotation);
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
        collision: collision
    };
}

export default function Geometry(geometryDef, options: any = {}) {
    geometryDef = { ...geometryDef, options };

    const { lineStyle, fill, path, radius, x, y, collisionPath } = geometryDef;
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
        if (collisionPath) {
            for (let i = 0; i < collisionPath.length; i += 2) {
                polygonSAT.push(v(
                    collisionPath[i],       // x
                    collisionPath[i + 1]    // y
                ));
            }
        }

        g.drawPolygon(path);
        collider = new Polygon(position, polygonSAT);
    }

    g.endFill();

    return createMutableGeoInterface(g, collider);
}