export interface IInputEvent {
    PAUSE: boolean;
    SPECIAL: boolean;
    TURN_LEFT: boolean;
    TURN_RIGHT: boolean;
    ACCELERATE: boolean;
    SHOOT: boolean;
    NEXT_ENEMY_FIGHTER: boolean;
    TOGGLE_RADAR: boolean;
    analogAngle?: number;
}