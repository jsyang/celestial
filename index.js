const http    = require('http');
const express = require('express');
const app     = express();

const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const webpackConfig = require('./webpack.config');
const compiler      = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    noInfo:     true,
    publicPath: webpackConfig.output.publicPath
}));

app.use(express.static('./'));

http.createServer(app).listen(3000, function (err) {
    if (err) {
        throw err;
    }

    const addr = this.address();
    console.log('[server] Listening at http://%s:%d', addr.address, addr.port);
});