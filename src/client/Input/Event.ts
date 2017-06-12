export default {
    TURN_LEFT:    0,
    TURN_RIGHT:   1,
    ACCELERATE:   2,
    SHOOT:        3,
    RESTART_GAME: 4
};

export interface IInputEvent {
    TURN_LEFT: boolean;
    TURN_RIGHT: boolean;
    ACCELERATE: boolean;
    SHOOT: boolean;
    RESTART_GAME: boolean;
    analogAngle?: number;
}