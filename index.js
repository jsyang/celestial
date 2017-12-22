const http    = require('http');
const express = require('express');
const app     = express();

const sendFile = file => ((req, res) => {
    res.sendFile(`${__dirname}/${file}`);
});

const webpack                    = require('webpack');
const webpackDevMiddleware       = require('webpack-dev-middleware');
const webpackHotMiddleware       = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config');
const clientConfig  = webpackConfig.find(_config => _config.name === 'client');
const compiler      = webpack(webpackConfig);

// Handle client-side and server-side hot-reloading
app.use(webpackDevMiddleware(compiler, {
    noInfo:     true,
    publicPath: clientConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler.compilers.find(_compiler => _compiler.name === 'client')));

app.get('/', sendFile('index.html'));
app.get('/favicon.png', sendFile('favicon.png'));
app.get('/assets.zip', sendFile('assets.zip'));

http.createServer(app).listen(3000, function (err) {
    if (err) {
        throw err;
    }

    const addr = this.address();
    console.log('[server] Listening at http://%s:%d', addr.address, addr.port);
});