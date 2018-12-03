const {writeFileSync} = require('fs');
const child_process   = require('child_process');

const BUILD_HASH = child_process.execSync('git rev-parse --short HEAD').toString();
const BUILD_DATE = (new Date()).toISOString();

writeFileSync('.env', [`BUILD_HASH=${BUILD_HASH}`, `BUILD_DATE=${BUILD_DATE}`].join('\n'));