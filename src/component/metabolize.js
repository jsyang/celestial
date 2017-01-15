/**
 * Sheds HP constantly
 * @param entity
 */
function process(entity) {
    entity.hp--;
}

module.exports = {
    process : process
};