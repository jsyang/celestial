// A simple tally to count occurrences of values

export default class Tally {
    counts = {};

    add(value: any) {
        if (typeof this.counts[value] === 'undefined') {
            this.counts[value] = 1;
        } else {
            this.counts[value]++;
        }
    }
}