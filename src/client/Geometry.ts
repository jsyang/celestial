// Standard interface to handle both vector graphics positioning
// as well as collisions

import {Graphics} from 'pixi.js';
import {pointInPolygon, pointInCircle, Circle, Polygon, Vector} from 'sat';
import {IPoint} from './types';
import {MAX_COORDINATE} from './constants';
import LivingEntity from './Entity/LivingEntity';

const v    = (x, y) => new Vector(x, y);
const PIPI = Math.PI * 2;

export type Collider = Circle | Polygon;

export interface IMutableGeometry {
    x: number;
    y: number;
    rotation: number;
    graphics: Graphics;
    collider: Collider;
}

function createMutableGeoInterface(graphics: Graphics, collider: Collider): IMutableGeometry {
    return {
        set x(_x: number) {
            if (_x < 0) {
                _x = 0;
            } else if (_x > MAX_COORDINATE) {
                _x = MAX_COORDINATE;
            }

            this.graphics.x     = _x;
            this.collider.pos.x = _x;
        },
        set y(_y: number) {
            if (_y < 0) {
                _y = 0;
            } else if (_y > MAX_COORDINATE) {
                _y = MAX_COORDINATE;
            }

            this.graphics.y     = _y;
            this.collider.pos.y = _y;
        },
        set rotation(_rotation: number) {
            if (_rotation > Math.PI) {
                _rotation -= PIPI;
            } else if (_rotation < -Math.PI) {
                _rotation += PIPI;
            }

            if (!(this.collider instanceof Circle)) {
                // SAT.Circle.setAngle() doesn't exist
                this.collider.setAngle(_rotation);
                this.graphics.rotation = _rotation;
            }
        },

        get x(): number {
            return this.graphics.x;
        },
        get y(): number {
            return this.graphics.y;
        },
        get rotation(): number {
            return this.graphics.rotation;
        },

        graphics,
        collider
    };
}

export function testPointInEntity({x, y}: IPoint, entity: LivingEntity): boolean {
    const {collider} = entity.geo;
    const point      = v(x, y);

    if (collider instanceof Circle) {
        // Doesn't collide with anything
        if (collider.r === 0) {
            return false;
        } else {
            return pointInCircle(point, collider);
        }
    } else {
        return pointInPolygon(point, collider);
    }
}

export const transformPolygon = (poly: number[], dx = 0, dy = 0, scaleX = 1, scaleY = 1) =>
    poly.map((coord: number, index) => index % 2 === 0 ? coord * scaleX + dx : coord * scaleY + dy);


export enum GeometryType {
    Circle  = 'circle',
    Polygon = 'polygon'
}

interface IGeometryDefinition extends Partial<IPoint> {
    lineStyle?: {
        width: number;
        color: number;
        alpha: number;
    };
    fill?: {
        color: number;
        alpha: number;
    };
    path?: number[];
    radius?: number;
    collisionPath?: number[];
    collisionRadius?: number;
    type: GeometryType;
}

export default function Geometry(
    {
        lineStyle, fill, type,
        path, collisionPath,
        radius, collisionRadius,
        x, y
    }: IGeometryDefinition
): IMutableGeometry {

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

    if (type === 'circle') {
        g.drawCircle(0, 0, radius!);
        collider = new Circle(position, collisionRadius || radius);
    } else {
        const polygonSAT: Vector[] = [];

        // Use default path if collisionPath isn't explicitly set
        const colliderPath = collisionPath || path;

        for (let i = 0; i < colliderPath!.length; i += 2) {
            polygonSAT.push(v(
                colliderPath![i],       // x
                colliderPath![i + 1]    // y
            ));
        }

        g.drawPolygon(path!);
        collider = new Polygon(position, polygonSAT);
    }

    g.endFill();

    return createMutableGeoInterface(g, collider);
}
