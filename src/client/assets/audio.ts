import Focus from '../Graphics/Focus';
import {getDistSquared} from '../entityHelpers';
import {IPoint} from '../types';
import memoize from 'fast-memoize';
import startupOptions from '../startupOptions';

const audioContext = new AudioContext();

// Dictionary of audio clips, keyed by clip name
const audioBuffers: Record<string, any> = {};

interface IAudioFile {
    name: string;
    arrayBuffer: ArrayBuffer;
}

export function defineSound({name, arrayBuffer}: IAudioFile): void {
    try {
        audioContext.decodeAudioData(arrayBuffer)
            .then(decodedAudioBuffer => {
                audioBuffers[name] = decodedAudioBuffer;
            });
    } catch (e) {
        console.warn(`Failed to decode audio file "${name}"! ${e.toString()}`);
    }
}

const isAudioEnabled = !startupOptions.isAudioMuted;

export function playSound(name: string): void {
    if (!isAudioEnabled) return;

    const source  = audioContext.createBufferSource();
    source.buffer = audioBuffers[name];
    source.connect(audioContext.destination);
    source.start();
}

const INAUDIBLE_DIST2           = (3000 ** 2) >> 12;
const LN_INAUDIBLE_DIST2_FACTOR = 1 / Math.log(INAUDIBLE_DIST2);

const getGainValue         = dist2 => 1 - (Math.log(dist2) * LN_INAUDIBLE_DIST2_FACTOR);
const getGainValueMemoized = memoize(getGainValue);

// Sound sources farther away are quieter
// Don't play sounds that are too far away from the focus
export function playSoundLocalized(name: string, sourceEntity: IPoint): void {
    if (!isAudioEnabled) return;

    const focus = Focus.getFocus();
    const dist2 = Math.max(getDistSquared(sourceEntity, focus) >> 12, 1);

    if (dist2 < INAUDIBLE_DIST2) {
        const source   = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();

        source.buffer       = audioBuffers[name];
        gainNode.gain.value = getGainValueMemoized(dist2);
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start();
    }
}