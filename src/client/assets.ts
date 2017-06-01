var audio = require('./audio');

var JSZip      = require('jszip');
var JSZipUtils = require('jszip-utils');

/**
 * @param {any} zip
 * @returns {Promise}
 */
function initAudioFromZip(zip) {
    var loadSounds = [];
    var soundNames = [];

    function addFileToLoadSoundsPromise(relativePath, file) {
        soundNames.push(
            file.name
                .replace(/^sounds\//gi, '')
                .replace(/\.ogg/gi, '')
        );
        loadSounds.push(file.async('arraybuffer'));
    }

    zip.folder('sounds/').forEach(addFileToLoadSoundsPromise);

    function defineSounds(buffers) {
        for (var i = 0; i < buffers.length; i++) {
            audio.define(soundNames[i], buffers[i]);
        }
    }

    audio.init();

    return JSZip.external.Promise
        .all(loadSounds)
        .then(defineSounds);
}

function onAssetsZipLoaded(zip) {
    JSZip.external.Promise
        .all([initAudioFromZip(zip)])
        .then(this.onAssetsReady);
}

export function init(onAssetsReady: Function) {
    // Load all resources from assets.zip
    new JSZip.external
        .Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent('assets.zip', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
        .then(function (data) { return JSZip.loadAsync(data); })
        .then(onAssetsZipLoaded.bind({ onAssetsReady: onAssetsReady }));
}