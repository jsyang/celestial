import {defineSound} from './audio';
import sounds from './sounds';

function load(): Promise<any> {
    return Promise.all(
        sounds.map(name =>
            fetch(`sounds/${name}`)
                .then(res => res.arrayBuffer())
                .then(arrayBuffer => defineSound({
                    name: name.split('.')[0],
                    arrayBuffer
                }))
        )
    );
}

export default {load};
