import {defineSound} from './audio';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

const SOUND_FILENAME = /(^sounds\/|\.ogg$)/gi;

// Filter out stuff like .DS_Store
const FILTER_SOUND_FILENAME = /\.ogg$/i;

interface IZipObject {
    name: string;
    async: Function;
}

function loadAudioFromZip(zip: any): Promise<void> {
    const soundNames: string[]                        = [];
    const loadAllSoundBuffers: Promise<ArrayBuffer>[] = [];

    zip.folder('sounds/')
        .forEach(
            (relativePath, file: IZipObject) => {
                if (FILTER_SOUND_FILENAME.test(relativePath)) {
                    // Get sound name from sound file name
                    soundNames.push(file.name.replace(SOUND_FILENAME, ''));

                    // Load sound buffers
                    loadAllSoundBuffers.push(file.async('arraybuffer'));
                }
            }
        );

    return Promise.all(loadAllSoundBuffers)
        .then(arrayBuffers => arrayBuffers.forEach(
            (buffer, index) => defineSound({name: soundNames[index], arrayBuffer: buffer})
        ));
}

function load(): Promise<void> {
    return new Promise((resolve, reject) => {
        // Retrieve remote assets.zip file
        JSZipUtils.getBinaryContent('assets.zip', (err, data) => {
            err ? reject(err) : resolve(data);
        });
    })
    // Load zip file into memory
        .then(data => JSZip.loadAsync(data))
        // Load audio into memory
        .then(loadAudioFromZip);
}

export default {load};
