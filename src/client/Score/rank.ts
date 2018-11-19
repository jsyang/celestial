const RANK_MIN_SCORE_NEEDED = [
    {name: 'Serf', scoreNeeded: -Infinity},
    {name: 'Peasant', scoreNeeded: -50},
    {name: 'Recruit', scoreNeeded: 0},
    {name: 'Cadet', scoreNeeded: 200},
    {name: 'Private', scoreNeeded: 1000},
    {name: 'Corporal', scoreNeeded: 2000},
    {name: 'Lieutenant', scoreNeeded: 3200},
    {name: 'Captain', scoreNeeded: 4500},
    {name: 'Major', scoreNeeded: 6000},
    {name: 'Colonel', scoreNeeded: 8000},
    {name: 'Rear Admiral', scoreNeeded: 12000},
    {name: 'Vice Admiral', scoreNeeded: 18000},
    {name: 'Fleet Admiral', scoreNeeded: 24000},
    {name: 'Fleet Commander', scoreNeeded: 50000}
];

export const getRankByScore = (score: number) =>
    RANK_MIN_SCORE_NEEDED[
    RANK_MIN_SCORE_NEEDED.findIndex(rank => score < rank.scoreNeeded) - 1
        ];

export const getNextRankByScore = (score: number) =>
    RANK_MIN_SCORE_NEEDED[
        RANK_MIN_SCORE_NEEDED.findIndex(rank => score < rank.scoreNeeded)
        ];
