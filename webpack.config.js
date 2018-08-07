var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, "./public/bundle");
// var buildPath = path.resolve(__dirname, "./public/v2/news");
// var buildPath = path.resolve(__dirname, "./public/v2/index");
// var buildPath = path.resolve(__dirname, "./public/v2/my");
// var buildPath = path.resolve(__dirname, "./public/v2/base");
var nodemodulesPath = path.resolve(__dirname, './node_modules');

//
module.exports = {
    entry: {
        /*///////////////////////////////////////////////////////////////////*/
        // h5
        // 'm-about-common': './public/entry/m-about-common', // 1
        // m_opinionList: './public/entry/m_opinionList', //观点列表 2
        // m_askInfo: './public/entry/m_askInfo', //观点列表 3
        // 'm-askDetail':'./public/entry/m-askDetail',//问股想详情 4
        // 'm-liveList':'./public/entry/m-liveList',//问股想详情 5

        // 约牛网
        // every: './public/entry/every',// 6
        // index: './public/entry/index', //首页 7
        // register: './public/entry/register', //注册 8

        // video: './public/entry/video', //直播视频 9
        // videoDetail: './public/entry/videoDetail.js'  //视频详情 10

        // 问股
        // askStock: './public/entry/askStock', // 问股 11
        // askStockDetail: './public/entry/askStockDetail', // 问股详情 12

        // 直播
        // livelist: './public/entry/livelist', //直播列表 (list.jsp) 13
        // liveDetail_live: './public/entry/liveDetail_live', //直播室 14
        // liveDetail_refer: './public/entry/liveDetail_refer', //内参 15
        // liveDetail_master: './public/entry/liveDetail_master', //主页(liveDetail) 16
        // liveDetail_answer: './public/entry/liveDetail_answer', //问答 17
        // liveDetail_opinion: './public/entry/liveDetail_opinion', //观点 18
        // liveDetail_composite: './public/entry/liveDetail_composite', //组合 19
        // liveDetail_tactics: './public/entry/liveDetail_tactics', //名家战法 20

        // 资讯+观点
        // newslist: './public/entry/newslist', //资讯列表 21
        // opinion: './public/entry/opinion', //观点列表 22
        // opinionCategory: './public/entry/opinionCategory', //观点-二级页面 23
        // opinionDetail: './public/entry/opinionDetail', //观点详情 (newsDetail.jsp) 24


        //v2 
        //
        // 'headline': './public/v2/news/headline.js',  //前台约牛头条 25
        // 'learnStock': './public/v2/news/learnStock.js', //前台学炒股 26
        // 'learnStockDetail': './public/v2/news/learnStockDetail.js', //前台学炒股 27
        // index: './public/v2/index/index.js'  //v2首页 28
        // myAppraisal: './public/v2/my/myAppraisal.js' //风险评估 29 
        // every: './public/v2/base/every.js'  //v2 every 30
        // main: './public/v2/live-list/main.js' //v2直播 31


        // 内参
        // refer: './public/entry/refer', //内参列表 32
        // referDetail: './public/entry/referDetail', //内参详情 (myReferList.jsp) 33

        // 组合
        // composite: './public/entry/composite', //组合列表 34
        // composite_detail: './public/entry/composite_detail', //组合详情 35
        // composite_create: './public/entry/composite_create', //发布组合 36

        // 我的
        // myCare_teacher: './public/entry/myCare_teacher', //我关注的话题 37
        // mycare: './public/entry/mycare', //我的关注 38
        // myrefer: './public/entry/myrefer', //我的内参 39
        // myVideo: './public/entry/myVideo', //我的视频 40
        // myInfo: './public/entry/myInfo', //我的设置 41
        // mySetting: './public/entry/mySetting', //老师端我的设置 42
        // myWallet: './public/entry/myWallet', //我的钱包 (myIncome.jsp) 43
        // myAsk: './public/entry/myAsk', //我的提问(userQuestion.jsp) 44
        // myOpinion: './public/entry/myOpinion', //我的观点 45
        // myComposite: './public/entry/myComposite', //我的组合 46
        // myrefer: './public/entry/myrefer', //我的内参 47
        // myLive: './public/entry/myLive', //我的直播 48
        // myCenter: './public/entry/myCenter', //我的自选 49
        // myAnswer: './public/entry/myAnswer', //我的问答 50
        // myFans: './public/entry/myFans', //我的粉丝 (myNewPush.jsp) 51
        // updatePassword: './public/entry/updatePassword', //修改密码 52
        // myMessage: './public/entry/myMessage', //我的私信 53
        // 'myTactics': './public/entry/myTactics', //我的战法 54

        // manage_news : './public/entry/manage_news.js',  , // 后台 55
        // findTeacher : './public/entry/findTeacher.js', //找投顾 56
        // forget : './public/entry/forget.js', // 找回密码 57

        // 'manage_news':'./public/entry/manage_news.js' , //后台资讯 58
        // 'headline': './public/entry/headline.js', //后台约牛头条 59
        // 'learning_stock': './public/entry/learning_stock.js', //学炒股 60

        // 'vip-teacher-reply': './public/entry/vip-teacher-reply.js' , //操盘内线回复列表 61
        // help: './private/help/help.js' , //帮助中心 62
        // applog: './public/entry/applog.js',  //applog 63
        // banned: './public/entry/banned.js' ,   //禁言 64
        // 'vip-banned-list': './public/entry/vip-banned-list.js' , //禁言列表 65

        // counselor_enter: './public/entry/counselor_enter.js',  //投顾入驻 66
        // talent_enter: './public/entry/talent_enter.js' , //投顾入驻 67
        // 'threeRegister': './public/entry/threeregister.js',  //第三方登录 68
        // 'leaflet-bug': './public/entry/leaflet-bug.js'  //找错 69

        // 'referOrder': './public/entry/referOrder.js',   //后台内参订单管理 70
        // referActivity: './public/entry/referActivity.js',  //298内参活动 71

        // 'app-welfare-index': './public/entry/app-welfare-index.js',  //移动端298注册 72
        /*///////////////////////////////////////////////////////////////////*/
    },
    output: {
        path: buildPath,
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/public/bundle/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "~": path.join(__dirname, 'public/module'),
            "m": path.join(__dirname, 'public/module'),
            "module": path.join(__dirname, 'public/module'),
            "base": path.join(__dirname, '/public/v2/base'),
            "comp": path.join(__dirname, 'public/comp'),
            'vmodule': path.join(__dirname, 'public/v2/module'),
            "public": path.join(__dirname, '/public'),
            "mcomp": path.join(__dirname, 'public/mobile/comp'),
            "e": path.join(__dirname, 'enum')
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
        }, {
            test: /\.js$/,
            loader: 'babel-loader!uglify-template-string-loader',
            exclude: [nodemodulesPath]
        }],
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: false
        //     }
        // }),

        new webpack.NoErrorsPlugin()
    ]
};