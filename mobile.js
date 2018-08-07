var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, "./public/mobile");
var nodemodulesPath = path.resolve(__dirname, './node_modules');


// 
module.exports = {
    entry: {

        /*///////////////////////////// 操盘内线 ///////////////////////////////*/

        'm-vip-refer': './public/mobile/m-vip-refer.js',

        /*///////////////////////////// 微信公众号 ///////////////////////////////*/

        // 'wx-ask': './public/mobile/wx-ask.js', //问股
        // 'wx-news': './public/mobile/wx-news.js', //资讯
        // 'wx-opinion': './public/mobile/wx-opinion.js' //观点

    },
    output: {
        path: buildPath,
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/public/mobile/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "~": path.join(__dirname, 'public/module'),
            "m": path.join(__dirname, 'public/module'),
            "comp": path.join(__dirname, 'public/comp'),
            "mobile": path.join(__dirname, 'public/mobile/comp')
        }
    },
    module: {
        loaders: [{
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=4192'
        }, {
            test: /\.svg/,
            loader: 'svg-url-loader'
        }, {
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
