import {defineSound} from './Audio';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

const REGEX_FILENAME_TO_SOUNDNAME = /(^sounds\/|\.ogg$)/gi;

interface IZipObject {
    name: string;
    async: Function;
}

function loadAudioFromZip(zip: any): Promise<void> {
    let soundNames: string[]                             = [];
    let loadAllSoundBuffers: Array<Promise<ArrayBuffer>> = [];

    zip.folder('sounds/')
        .forEach(
            (relativePath, file: IZipObject) => {
                // Get sound name from sound file name
                soundNames.push(file.name.replace(REGEX_FILENAME_TO_SOUNDNAME, ''));

                // Load sound buffers
                loadAllSoundBuffers.push(file.async('arraybuffer'));
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
        .then(zip => loadAudioFromZip(zip));
}

export default {load};