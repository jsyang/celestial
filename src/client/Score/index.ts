import {getNextRankByScore, getRankByScore} from './rank';

let score    = 0;
let rank     = getRankByScore(0);
let nextRank = getNextRankByScore(0);

function add(delta: number): void {
    score += delta;
    updateByScore();
}

function updateByScore() {
    rank     = getRankByScore(score);
    nextRank = getNextRankByScore(score);
}

function getScoreRank() {
    return {rank, score, nextRank};
}

let battleResults = [0, 0];

function addBattleResult(result: -1 | 1) {
    battleResults.push(result);
    battleResults.shift();
}

function getIsGameOver() {
    return (battleResults[0] + battleResults[1]) === -2;
}

function setAll(_score, _battleResults) {
    battleResults = [..._battleResults];
    score         = _score;
    updateByScore();
}

export default {
    add,
    setAll,
    addBattleResult,
    getIsGameOver,
    getScoreRank,
    getAll: () => ({score, battleResults})
}