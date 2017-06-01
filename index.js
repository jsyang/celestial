const http    = require('http');
const express = require('express');
const app     = express();

// On the fly `.tsx?`compilation for use in CommonJS `require()` calls
require('ts-node')
    .register({
        compilerOptions: require('./compilerOptions.server.json'),
        include:         [
            "**/*.snap"
        ]
    });

const config = require('./src/shared/config');

const sendFile = file => ((req, res) => {
    res.sendFile(`${__dirname}/${file}`);
});

if (process.env.NODE_ENV === 'production') {
    app.use(require('./src/api'));
    app.use('/client', express.static('./dist/client'));
    app.get('*', require('./dist/server')());

} else {
    const webpack                    = require('webpack');
    const webpackDevMiddleware       = require('webpack-dev-middleware');
    const webpackHotMiddleware       = require('webpack-hot-middleware');
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

    const webpackConfig = require('./webpack.config');
    const clientConfig  = webpackConfig.find(_config => _config.name === 'client');
    const compiler      = webpack(webpackConfig);

    // Handle client-side and server-side hot-reloading
    app.use(webpackDevMiddleware(compiler, {
        noInfo:     true,
        publicPath: clientConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler.compilers.find(_compiler => _compiler.name === 'client')));


    // Hot-reload API
    // Throw away cached modules and re-require next time
    // Ensure there's no important state in there!
    const watcher = require('chokidar').watch('./src/api');

    const REGEX_EXPRESS_CODE_PATH = /[.\/\\]src[\/\\]api[\/\\]/;

    watcher.on('ready', function () {
        watcher.on('all', function () {
            console.log('[hot-reloading-server]', "Clearing Express node module cache");
            Object.keys(require.cache).forEach(function (id) {
                if (REGEX_EXPRESS_CODE_PATH.test(id)) delete require.cache[id];
            });
        });
    });

    app.use(function (req, res, next) {
        require('./src/api')(req, res, next);
    });

    app.get('/', sendFile('index.html'));
    app.get('/assets.zip', sendFile('assets.zip'));
}

http.createServer(app).listen(config.PORT, function (err) {
    if (err) {
        throw err;
    }

    const addr = this.address();
    console.log('[server] Listening at http://%s:%d', addr.address, addr.port);
});