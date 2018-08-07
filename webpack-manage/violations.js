var webpack = require('webpack');
var path = require('path');
var p = name => path.resolve(__dirname, "../", name)

// 违禁词管理
var fileName = "violations" /* 修改*/
var folder = path.resolve(__dirname, `../manage/pages/${fileName}`)

module.exports = {
    entry: {
        financeOrder: folder + "/" + fileName,
    },

    output: {
        path: folder,
        filename: 'mmm.[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            module: p('public/module'),
            enum: p('enum')
        }
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: p('node_module')
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
        }]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_debugger: true,
        //         // drop_console: true
        //     }
        // }),
    ]
};