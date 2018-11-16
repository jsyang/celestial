const webpackConfigAssign = require('webpack-config-assign');
const baseConfig          = require('./webpack.config.base');

module.exports = webpackConfigAssign({
    name:         'client',
    target:       'web',
    entry:        {
        main: './src/client/index.ts',
    },
    output:       {
        publicPath: '/',
        filename:   'client/[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}, baseConfig);