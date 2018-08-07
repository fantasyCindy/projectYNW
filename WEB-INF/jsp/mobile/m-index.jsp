<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html>
    <head>
        <%@ include file="../common/session-info.jsp" %>
            <title>约投顾,股票投资服务平台-大盘个股走势,股市直播,行情分析 </title>
            <meta name="renderer" content="webkit">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta content=always name=referrer>
            <meta http-equiv="Content-Language" content="zh-CN" />
            <meta http-equiv="Cache-Control" content="no-siteapp" />
            <meta name="baidu-site-verification" content="98ebBPqVhQ" />
            <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="format-detection" content="telephone=no" />
            <link href="http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
            <link rel="stylesheet" type="text/css" href="/public/css/m-index.css">
            <link rel="stylesheet" type="text/css" href="/public/css/reset.css">
</head>
<body>
    <div class="logo-bar">
        <img src="/public/images/yn-h5/logo.jpg">
        约投顾
    </div>
    <div class="yn-download">
        <p class="logo"></p>
        <span>在App内打开</span>
        <span>点击下载App</span>
    </div>
    <div id="yn-tag" class="bt20">
        <div class="column">
            <span data-name="live">直播</span>
            <span data-name="ask">问股</span>
            <span data-name="opinion">观点</span>
            <span data-name="refer">内参</span>
        </div>
        <div class="column_box">
            <div class="live">
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/live_01.jpg">
                        <p>互动最多</p>
                    </div>
                </a>
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/live_02.jpg">
                        <p>观点最多</p>
                    </div>
                </a>
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/live_03.jpg">
                        <p>人气最高</p>
                    </div>
                </a>
            </div>
            <div class="ask hide">
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/ask_01.jpg">
                        <p>解答排行</p>
                    </div>
                </a>
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/ask_02.jpg">
                        <p>热问股票</p>
                    </div>
                </a>
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/ask_03.jpg">
                        <p>牛人看涨</p>
                    </div>
                </a>
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/ask_04.jpg">
                        <p>牛人看跌</p>
                    </div>
                </a>
            </div>
            <div class="opinion hide">
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/opinion_01.jpg">
                        <p>大盘观点</p>
                    </div>
                </a>
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/opinion_02.jpg">
                        <p>热点题材</p>
                    </div>
                </a>
            </div>
            <div class="refer hide">
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/refer_01.jpg">
                        <p>当前预售</p>
                    </div>
                </a>
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/refer_02.jpg">
                        <p>火热进行</p>
                    </div>
                </a>
                <a href="" target="_blank">
                    <div class="icon_list">
                        <img src="/public/images/yn-h5/refer_03.jpg">
                        <p>成功完成</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div id="yn_live" class="wrap_box">
        <div id="new_live" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/liveing.png">直播动态<a href="" target="_blank" class="more-icon fa fa-angle-right"></a></p>
            <div class="wrap_list">
                <a href="">
                    <div class="wrap_title">
                        2016年8月6日周一股市
                    </div>
                    <div class="intro clear">
                        <span class="photo"></span>
                        <span class="userName">天啸大户</span>|
                        <span class="quantity">86</span>人参与
                        <span class="time">7:18</span>
                    </div>
                </a>
            </div>
        </div>
        <div id="recommend" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/live.png">推荐直播<a href="" target="_blank" class="more-icon fa fa-angle-right"></a></p>
            <div class="wrap_list clear">
                <a href="" target="_blank">
                    <div class="wrap_cont clear">
                        <div class="photo"></div>
                        <div class="wrap_intro">
                            <div class="wrap_title">
                                约牛解股
                            </div>
                            <div class="intro">
                                职业投资人，金融系学士，近十年Agu交烦
                            </div>
                        </div>
                    </div>
                    <div class="quantity">
                        <p>36</p>
                        人参与
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div id="yn_ask" class="wrap_box hide">
        <p class="headline bt20"><img src="/public/images/yn-h5/ask.png">我的问答<a href="" target="_blank" class="more">立即查看</a></p>
        <div id="new_ask" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/new.png">最新问答<i class="more-icon fa fa-angle-right"></i></p>
            <div class="wrap_list">
                <div class="quesition_list">
                    <span class="ques_icon">问</span>
                    测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                </div>
                <div class="ask_list">
                    <span class="ask_icon">答</span>
                    测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                </div>
                <div class="user clear">
                    <span class="photo"></span>
                    天下飘红
                    <span class="time">
                        7:18
                    </span>
                </div>
            </div>
        </div>
        <div id="hot_ask" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/ques.png">精彩问答<i class="more-icon fa fa-angle-right"></i></p>
            <div class="wrap_list">
                <div class="quesition_list">
                    <span class="ques_icon">问</span>
                    测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                </div>
                <div class="ask_list">
                    <span class="ask_icon">答</span>
                    测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                </div>
                <div class="user clear">
                    <span class="photo"></span>
                    天下飘红
                    <span class="time">
                        7:18
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div id="yn_opinion" class="wrap_box hide">
        <div id="new_opinion" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/new.png">最新观点<a href="" target="_blank" class="more-icon fa fa-angle-right"></a></p>
            <div class="wrap_list">
                <a href="" target="_blank">
                    <div class="wrap_title">
                        <span class="icon">荐</span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </div>
                    <div class="wrap_description">
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </div>
                    <div class="user clear">
                        <span class="photo"></span>
                        天下飘红 |
                        <span class="time">
                            7:18
                        </span>
                        <span class="day">
                            2017-04-01
                        </span>
                    </div>
                </a>
            </div>
        </div>
        <div id="hot_opinion" class="bt20">
            <p class="headline"><img src="/public/images/yn-h5/hot.png">最新观点<a href="" target="_blank" class="more-icon fa fa-angle-right"></a></p>
            <div class="wrap_list">
                <a href="" target="_blank">
                    <div class="wrap_title">
                        <span class="icon">荐</span>
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </div>
                    <div class="wrap_description">
                        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    </div>
                    <div class="user clear">
                        <span class="photo"></span>
                        天下飘红 |
                        <span class="time">
                            7:18
                        </span>
                        <span class="day">
                            2017-04-01
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div id="yn_refer" class="wrap_box hide">
        <p class="headline bt20"><img src="/public/images/yn-h5/hot.png">热门内参</p>
        <p class="headline bt20"><img src="/public/images/yn-h5/new.png">最新内参</p>
    </div>
    <script src="http://cdn.bootcss.com/zepto/1.2.0/zepto.min.js"></script>
    <script src="https://cdn.bootcss.com/lodash.js/4.17.4/lodash.min.js"></script>
    <script type="text/javascript">
        var tag=(function(){
            var container,children=[
                {tag:'live',tag1:'live',tag2:'yn_live'},
                {tag:'ask',tag1:'ask',tag2:'yn_ask'},
                {tag:'opinion',tag1:'opinion',tag2:'yn_opinion'},
                {tag:'refer',tag1:'refer',tag2:'yn_refer'},
            ];
            var handle=function(tag){
                children.map(function(item){
                    if (item.tag==tag) {
                        var items=_.find(children,data=>data.tag==tag)
                        $('.'+items.tag1+',#'+items.tag2+'').show();
                    }else{
                        $('.'+item.tag1+',#'+item.tag2+'').hide();
                    }
                })
            }
            return {
                init:function(){
                    container=$('#yn-tag');
                    container.find('.column').on('click','span',function(){
                        var tag=$(this).data('name');
                        handle(tag)
                    })
                }
            }
        })()
        $(function(){
            tag.init();
        })
    </script>
</body>
</html>
