const path = require('path');
const webpack = require('webpack');

const isProd = (process.env.NODE_ENV === 'production');

const devtool = isProd ?
    'source-map' : 'inline-eval-cheap-source-map';

const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    })
];

module.exports = {
    cache: true,
    devtool: devtool,

    output: {
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        // Turn on for further performance improvements
        // https://webpack.js.org/configuration/resolve/#resolve-unsafecache
        unsafeCache: false,
        modules: ['node_modules', 'src'],
        extensions: [
            '.ts',
            '.tsx',
            '.js'
        ]
    },

    plugins: plugins,

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                loaders: [
                    'babel-loader?cacheDirectory',
                    'ts-loader?silent=true'
                ]
            }
        ]
    }
};