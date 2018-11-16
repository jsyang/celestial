import {getRankByScore} from './rank';

let score = 0;
let rank  = getRankByScore(0);

function add(delta: number): void {
    score += delta;
    rank = getRankByScore(score);
}

function getScoreRank() {
    return {rank, score};
}

let consecutiveSectorWins = 0;

function addSectorResult(result: -1 | 1) {
    consecutiveSectorWins += result;
}

function getIsGameOver() {
    return consecutiveSectorWins < -1;
}

export default {
    add,
    addSectorResult,
    getIsGameOver,
    getScoreRank
}