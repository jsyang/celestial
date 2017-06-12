let audioContext = new AudioContext();
let audioBuffers = {};

export function defineSound({name, arrayBuffer}) {
    // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/decodeAudioData 
    audioContext.decodeAudioData(arrayBuffer)
        .then(decodedAudioBuffer => {
            audioBuffers[name] = decodedAudioBuffer;
        });
}

export function playSound(name: string) {
    const source  = audioContext.createBufferSource();
    source.buffer = audioBuffers[name];
    source.connect(audioContext.destination);
    source.start();
}

export default {
    defineSound,
    playSound
};