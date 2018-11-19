import {getNextRankByScore, getRankByScore} from './rank';

let score    = 0;
let rank     = getRankByScore(0);
let nextRank = getNextRankByScore(0);

function add(delta: number): void {
    score += delta;
    rank     = getRankByScore(score);
    nextRank = getNextRankByScore(score);
}

function getScoreRank() {
    return {rank, score, nextRank};
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