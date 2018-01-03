export enum IEventType {
    TURN_LEFT,
    TURN_RIGHT,
    ACCELERATE,
    SHOOT,
    SPECIAL
}

export interface IInputEvent {
    SPECIAL: boolean;
    TURN_LEFT: boolean;
    TURN_RIGHT: boolean;
    ACCELERATE: boolean;
    SHOOT: boolean;
    analogAngle?: number;
}