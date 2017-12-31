const webpack = require('webpack');
const webpackConfigAssign = require('webpack-config-assign');
const baseConfig = require('./webpack.config.base');

module.exports = [
    webpackConfigAssign({
        name:    'client',
        target:  'web',
        entry:   {
            main: './src/client/index.ts',
        },
        output:  {
            publicPath: '/',
            filename: 'client/[name].js'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    // https://webpack.js.org/guides/code-splitting-libraries/#implicit-common-vendor-chunk
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            })
        ]
    }, baseConfig)
];