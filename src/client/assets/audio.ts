import Entity from '../Entity';
import Focus from '../Graphics/Focus';

let audioContext = new AudioContext();

// Dictionary of audio clips, keyed by clip name
let audioBuffers = {};

export function defineSound({name, arrayBuffer}) {
    try {
        // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/decodeAudioData
        audioContext.decodeAudioData(arrayBuffer)
            .then(decodedAudioBuffer => {
                audioBuffers[name] = decodedAudioBuffer;
            });
    } catch (e) {
        console.warn(`Failed to decode audio file "${name}"! ${e.toString()}`);
    }

}

export function playSound(name: string) {
    const source  = audioContext.createBufferSource();
    source.buffer = audioBuffers[name];
    source.connect(audioContext.destination);
    source.start();
}

const INAUDIBLE_DIST2           = 3000 ** 2;
const LN_INAUDIBLE_DIST2_FACTOR = 1 / Math.log(INAUDIBLE_DIST2);

// Sound sources farther away are quieter
// Don't play sounds that are too far away from the focus
export function playSoundLocalized(name: string, sourceEntity) {
    const focus = Focus.getFocus();
    const dist2 = Math.max(Entity.getDistSquared(sourceEntity, focus), 1);

    if (dist2 < INAUDIBLE_DIST2) {
        const source   = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();

        source.buffer       = audioBuffers[name];
        gainNode.gain.value = 1 - (Math.log(dist2) * LN_INAUDIBLE_DIST2_FACTOR);
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start();
    }
}
