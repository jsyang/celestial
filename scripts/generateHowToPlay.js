const {readFileSync, writeFileSync} = require('fs');

const rfS = f => readFileSync(f).toString();

writeFileSync(
    'how-to-play/index.html',
    `<html><style>${rfS('src/how-to-play.css')}</style><body>${require('snarkdown')(rfS('src/how-to-play.md'))}</body></html>`
);