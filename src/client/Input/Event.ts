export interface IInputEvent {
    PAUSE: boolean;
    SPECIAL: boolean;
    TURN_LEFT: boolean;
    TURN_RIGHT: boolean;
    ACCELERATE: boolean;
    SHOOT: boolean;
    FOCUS_NEXT_ENEMY: boolean;
    TARGET_NEXT_ENEMY: boolean;
    TOGGLE_RADAR: boolean;
    NAV_POINT_SET: boolean;
    NAV_POINT_CLEAR: boolean;
    analogAngle?: number;
}