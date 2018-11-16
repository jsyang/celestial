const RANK_MIN_SCORE_NEEDED = [
    {name: 'Peasant', scoreNeeded: -Infinity},
    {name: 'Recruit', scoreNeeded: 0},
    {name: 'Cadet', scoreNeeded: 100},
    {name: 'Private', scoreNeeded: 500},
    {name: 'Lieutenant', scoreNeeded: 1000},
    {name: 'Captain', scoreNeeded: 2000},
    {name: 'Major', scoreNeeded: 3500},
    {name: 'Colonel', scoreNeeded: 7000},
    {name: 'Rear Admiral', scoreNeeded: 12000},
    {name: 'Vice Admiral', scoreNeeded: 18000},
    {name: 'Fleet Admiral', scoreNeeded: 24000},
    {name: 'Fleet Commander', scoreNeeded: 50000}
];

export const getRankByScore = (score: number) =>
    RANK_MIN_SCORE_NEEDED[
    RANK_MIN_SCORE_NEEDED.findIndex(rank => score < rank.scoreNeeded) - 1
        ].name;
