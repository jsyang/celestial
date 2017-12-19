import TEAM from './_Team';

export default class LivingEntity {
    hitTime: number;
    geo: any;
    team = TEAM.NONE;

    // This is probably over complicated... getters and setters
    // operating on another level of getters and setters is probably 
    // the wrong way to go about this.
    get x() {
        return this.geo.x;
    }

    set x(x) {
        this.geo.x = x;
    }

    get y() {
        return this.geo.y;
    }

    set y(y) {
        this.geo.y = y;
    }

    get rotation() {
        return this.geo.rotation;
    }

    set rotation(rotation) {
        this.geo.rotation = rotation;
    }

    getChildAt(childIndex:number) {
        return this.geo.graphics.getChildAt(childIndex);
    }

    setChildVisible(childIndex: number, isVisible: boolean) {
        this.getChildAt(childIndex).visible = isVisible;
    }

    assignTeamColor() {
        this.geo.graphics.currentPath.lineColor = TEAM._COLORS[this.team];
    }

    renderHit() {
        if (this.hitTime > 0) {
            this.hitTime--;
            this.geo.graphics.alpha = this.hitTime % 2;
        } else if (this.hitTime === 0) {
            this.hitTime = -1;
            this.geo.graphics.alpha = 1;
        }
    }

}
