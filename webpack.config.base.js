const child_process              = require('child_process');
const path                       = require('path');
const webpack                    = require('webpack');
const UglifyJsPlugin             = require('uglifyjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');

const devtool = isProd ?
    '' : 'cheap-eval-source-map';

const now = new Date();

const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    isProd ? new UglifyJsPlugin() : null,
    new webpack.DefinePlugin({
        BUILD_DATE: JSON.stringify(now.toDateString()),
        BUILD_HASH: JSON.stringify(child_process.execSync('git rev-parse --short HEAD').toString())
    }),
    new ForkTsCheckerWebpackPlugin()
].filter(Boolean);

module.exports = {
    cache:   true,
    devtool: devtool,

    output: {
        path: path.resolve(__dirname)
    },

    resolve: {
        // Turn on for further performance improvements
        // https://webpack.js.org/configuration/resolve/#resolve-unsafecache
        unsafeCache: false,
        modules:     ['node_modules', 'src'],
        extensions:  [
            '.ts',
            '.tsx',
            '.js'
        ]
    },

    plugins: plugins,

    module: {
        rules: [
            {
                test:    /\.tsx?$/,
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                use:     [{
                    loader:  "ts-loader",
                    options: {
                        transpileOnly: true
                    }
                }]
            }
        ]
    }
};