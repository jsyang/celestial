export enum IEventType {
    TURN_LEFT,
    TURN_RIGHT,
    ACCELERATE,
    SHOOT,
    SPECIAL,
    PAUSE
}

export interface IInputEvent {
    PAUSE: boolean;
    SPECIAL: boolean;
    TURN_LEFT: boolean;
    TURN_RIGHT: boolean;
    ACCELERATE: boolean;
    SHOOT: boolean;
    analogAngle?: number;
}