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

export default {
    add,
    getScoreRank
}