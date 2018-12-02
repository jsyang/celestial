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
    OPTION1?: boolean;
    OPTION2?: boolean;
    OPTION3?: boolean;
    OPTION4?: boolean;
    OPTION5?: boolean;
    OPTION6?: boolean;
    OPTION7?: boolean;
    OPTION8?: boolean;
    OPTION9?: boolean;
    OPTION0?: boolean;
    analogAngle?: number;
}