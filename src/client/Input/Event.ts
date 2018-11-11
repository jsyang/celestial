export enum IEventType {
    TURN_LEFT,
    TURN_RIGHT,
    ACCELERATE,
    SHOOT,
    SPECIAL,
    PAUSE,
    NEXT_ENEMY_FIGHTER,
    PREV_ENEMY_FIGHTER
}

export interface IInputEvent {
    PAUSE: boolean;
    SPECIAL: boolean;
    TURN_LEFT: boolean;
    TURN_RIGHT: boolean;
    ACCELERATE: boolean;
    SHOOT: boolean;
    NEXT_ENEMY_FIGHTER: boolean;
    PREV_ENEMY_FIGHTER: boolean;
    analogAngle?: number;
}