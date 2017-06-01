/**
 * Audio interface
 */
var audioContext;
var audioBuffers;

function init() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioBuffers = {};
}

/**
 * @param {string} name
 * @param {ArrayBuffer} arrayBuffer
 */
function define(name, arrayBuffer) {
    // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/decodeAudioData 
    audioContext.decodeAudioData(arrayBuffer)
        .then(function (decodedAudioBuffer) {
            audioBuffers[name] = decodedAudioBuffer;
        });
}

/**
 * @param {string} name
 */
function play(name) {
    var source    = audioContext.createBufferSource();
    source.buffer = audioBuffers[name];
    source.connect(audioContext.destination);
    source.start();
}

module.exports = {
    init   : init,
    define : define,
    play   : play
};