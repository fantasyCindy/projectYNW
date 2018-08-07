var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, "./public/manage");
var nodemodulesPath = path.resolve(__dirname, './node_modules');


// 
module.exports = {
    entry: {

        /*//////////////////// 后台管理 ///////////////////////////////////////////////*/

        'manage-leaflet': './public/manage/manage-leaflet', //落地页管理


    },
    output: {
        path: buildPath,
        filename: '[name].bundle.js',
        chunkFilename: '__[name].chunk.js',
        publicPath: '/public/manage/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "m": path.join(__dirname, 'public/module'),
            "comp": path.join(__dirname, 'public/manage/comp')
        }
    },
    module: {
        loaders: [{
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
                drop_console: true
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),
        new webpack.NoErrorsPlugin()
    ]
};
