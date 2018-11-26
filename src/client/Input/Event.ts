export interface IInputEvent {
    PAUSE: boolean;
    SPECIAL: boolean;
    TURN_LEFT: boolean;
    TURN_RIGHT: boolean;
    ACCELERATE: boolean;
    SHOOT: boolean;
    FOCUS_NEXT_ENEMY: boolean;
    TARGET_NEXT_ENEMY: boolean;
    TARGET_CLEAR: boolean;
    TOGGLE_RADAR: boolean;
    NAV_POINT_SET: boolean;
    NAV_POINT_CLEAR: boolean;
    WINGMEN_ATTACK_TARGET: boolean;
    analogAngle?: number;
}