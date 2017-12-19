export enum IEventType {
    TURN_LEFT,
    TURN_RIGHT,
    ACCELERATE,
    SHOOT,
    RESTART_GAME
}

export interface IInputEvent {
    SHOOT_SPECIAL: boolean;
    TURN_LEFT: boolean;
    TURN_RIGHT: boolean;
    ACCELERATE: boolean;
    SHOOT: boolean;
    RESTART_GAME: boolean;
    analogAngle?: number;
}