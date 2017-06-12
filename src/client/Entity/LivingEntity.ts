import TEAM from './_Team';

export default class LivingEntity {
    hitTime: number;
    geo: any;
    team = TEAM.NONE;

    setChildVisible(childIndex: number, isVisible: boolean) {
        this.geo.graphics.getChildAt(childIndex).visible = isVisible;
    }

    assignTeamColor() {
        this.geo.graphics.currentPath.lineColor = TEAM._COLORS[this.team];
    }

    renderHit() {
        if (this.hitTime > 0) {
            this.hitTime--;
            this.geo.graphics.alpha = this.hitTime % 2;
        } else if (this.hitTime === 0) {
            this.hitTime            = -1;
            this.geo.graphics.alpha = 1;
        }
    }

}
