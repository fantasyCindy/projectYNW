var webpack = require('webpack');
var path = require('path');
var p = name => path.resolve(__dirname, "../", name)

// 后台财务订单管理
var fileName = "teacherList" /* 修改*/
var folder = path.resolve(__dirname, `../manage/pages/${fileName}`)

module.exports = {
    entry: {
        teacherList: folder + "/" + fileName,
    },

    output: {
        path: folder,
        filename: 'mmm.[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            module: p('public/module'),
            enum: p('enum'),
            "m": path.join(__dirname, '../public/module'),
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