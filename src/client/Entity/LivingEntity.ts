import {TEAM, TEAM_COLOR} from '../constants';
import {IMutableGeometry} from '../Geometry';

export default class LivingEntity {
    hp: number;
    hitTime: number;
    geo: IMutableGeometry;
    team: number = TEAM.NONE;
    dx: number;
    dy: number;

    // This is probably over complicated... getters and setters
    // operating on another level of getters and setters is probably 
    // the wrong way to go about this.
    get x(): number {
        return this.geo.x;
    }

    set x(_x: number) {
        this.geo.x = _x;
    }

    get y(): number {
        return this.geo.y;
    }

    set y(_y: number) {
        this.geo.y = _y;
    }

    get rotation(): number {
        return this.geo.rotation;
    }

    set rotation(_rotation: number) {
        this.geo.rotation = _rotation;
    }

    getChildAt(childIndex: number): any {
        return this.geo.graphics.getChildAt(childIndex);
    }

    setChildVisible(childIndex: number, isVisible: boolean): void {
        const foundChild = this.getChildAt(childIndex);

        if (foundChild) {
            foundChild.visible = isVisible;
        }
    }

    assignTeamColor(): number | void {
        const color                             = TEAM_COLOR[this.team];
        this.geo.graphics.currentPath.lineColor = color;

        return color;
    }

    renderHit(): void {
        if (this.hitTime > 0) {
            this.hitTime--;
            this.geo.graphics.alpha = Math.random();
        } else if (this.hitTime === 0) {
            this.hitTime            = -1;
            this.geo.graphics.alpha = 1;
        }
    }

    accelerate(acceleration): void {
        this.dx += Math.cos(this.rotation) * acceleration;
        this.dy += Math.sin(this.rotation) * acceleration;
    }
}
