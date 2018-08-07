var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, "../public/bundle/");
var nodemodulesPath = path.resolve(__dirname, './node_modules');

module.exports = {
    entry: {

        myWallet: path.join(__dirname, '../public/entry/myWallet'), 
    },

    output: {
        path: buildPath,
        filename: '[name].bundle.js',
        chunkFilename: '__[name].chunk.js',
        publicPath: '/public/bundle/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "~": path.join(__dirname, '../public/module'),
            "base": path.join(__dirname, '../public/v2/base'),
            "m": path.join(__dirname, '../public/module'),
            "comp": path.join(__dirname, '../public/comp'),
            "mobile": path.join(__dirname, '../WEB-INF/jsp/mobile'),
            "vmodule": path.join(__dirname, '../public/v2/module')
        }
    },
    module: {
        loaders: [{　　　　　　 test: /\.(png|jpg)$/, 　　　　　　loader: 'url-loader?limit=4192'　　　　 }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader?presets[]=es2015',
            exclude: [nodemodulesPath]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            exclude: [nodemodulesPath]
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                // drop_console: true
            }
        }),
        new webpack.NoErrorsPlugin()
    ]
};
