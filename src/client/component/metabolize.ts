/**
 * Sheds HP constantly
 */
function process(entity) {
    entity.hp--;
}

export default {
    componentFlag: 'canMetabolize',
    process
}
