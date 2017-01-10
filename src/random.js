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

module.exports = {
    int     : int,
    float   : float
};
