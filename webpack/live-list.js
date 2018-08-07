var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, "../public/v2/live-list/");//直播
var nodemodulesPath = path.resolve(__dirname, './node_modules');

module.exports = {
    entry: {
        main: path.join(__dirname,'../public/v2/live-list/main')//直播
        
        /*///////////////////////////////////////////////////////////////////*/
    },
    output: {
        path: buildPath,
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "base": path.join(__dirname, '../public/v2/base'),
            "index": path.join(__dirname, '../public/v2/index'),
            "public": path.join(__dirname, '../public'),
            "module": path.join(__dirname, '../public/module'),
            "~": path.join(__dirname, '../public/module'),
            "m": path.join(__dirname, '../public/module'),
            "e": path.join(__dirname, '../enum')
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
            test: /\.jsx$/,
            loader: 'babel-loader?presets[]=es2015!jsx-loader?harmony',
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
                warnings: false ,
                // drop_debugger:true,
                // drop_console:true
            }
        }),
        // new webpack.NoErrorsPlugin()
    ]
};
