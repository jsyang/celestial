/**
 * Random functions
 */

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function int(min, max) {
    return Math.round(float(min, max));
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function float(min, max) {
    return min + Math.random() * (max - min);
}

/**
 * @param {Array} a
 * @returns {any}
 */
function arrayElement(a) {
    return a[int(0, a.length - 1)];
}

module.exports = {
    int          : int,
    float        : float,
    arrayElement : arrayElement
};
