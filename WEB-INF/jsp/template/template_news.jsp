<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">
<!-- 资讯模板页面 -->

<head>
    <title>###head.title###</title>
    <meta name="viewport" content="width=device-width" initial-scale="1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="keywords" content="###article.keywords###" />
    <meta name="description" content="###article.description###" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <meta content=always name=referrer>
    <meta http-equiv="Content-Language" content="zh-CN" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <meta name="baidu-site-verification" content="98ebBPqVhQ" />
    <link rel="stylesheet" href="/public/css/font-awesome.min.css">
    <link rel="stylesheet" href="/public/css/all.css">
    <link rel="stylesheet" href="/public/css/template_news.css?20171205">
    <script>
    var isMobile = function() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsWM) {
            return true;
        }
        return false;
    }();
    </script>

    <body>
        <iframe src="/jumpSession.htm" frameborder="0" height="0" class="hide"></iframe>
        <div class="header">
            <div class="container">
                <a href="http://yuetougu.com" class="item">首页</a>
                <a href="http://ask.yuetougu.com/" class="item">问股</a>
                <a href="http://live.yuetougu.com/" class="item">直播</a>
                <a href="http://opinion.yuetougu.com/" class="item">观点</a>
                <a href="http://video.yuetougu.com/" class="item">视频</a>
                <a href="http://news.yuetougu.com/" class="item">资讯</a>
                <a href="http://news.yuetougu.com/myCenters.htm" class="item">我的</a>
            </div>
        </div>
        <a class="banner" href="/opinion/index.htm" target="_blank"></a>
        <!-- /////////////////////////////////////////////////////////////////// -->
        <!-- content -->
        <div class="container">
            <div id="newsDetail">
                <div class="title-1" data-id="###article.backnews_id###" data-type="1">###article.title###</div>
                <div class="publish">
                    <span class="time">约投顾</span>
                    <span class="time">###article.create_time###</span>
                    <span class="viewCount">阅读(<span class="viewCountValue"></span>)</span>
                </div>
                <div class="content">###article.content###</div>
                <div class="tip">
                    <p class="content" style="text-align: left;color:#d72621;font-size:16px;">风险提示:以上内容仅代表个人观点，不构成投资建议，股市有风险，投资需谨慎。</p>
                </div>
                <div class="pubCommon">
                    <div class="title-3">发表评论</div>
                    <textarea name="" id="textarea_pubCommon" cols="30" rows="5" placeholder="快来发表伟大言论吧!"></textarea>
                    <div class="wordCount"><span class="value">200</span>/200</div>
                    <button class="submit">发表评论</button>
                </div>
                <div class="comment">
                    <div class="title-3">精彩评论(<span class="totalCount"></span>)</div>
                    <div class="items"></div>
                </div>
            </div>
            <!--  -->
            <div id="rightBar">
                <!-- 看涨跌 -->
                <div id="rising">
                    <div class="title clear">
                        <span class="thisclass" data-id="0">牛人看涨</span>
                        <span data-id="1">牛人看跌</span>
                    </div>
                    <div class="content"></div>
                    <script type="text/html" id="rising-template">
                        {{each}}
                        <div class="item" data-code="{{$value.stockcode}}">
                            <div class="stockcode">
                                <a href="/marketLine.htm?stockcode={{$value.stockcode}}" target="_blank">{{$value.stockname}}{{$value.stockcode}}</a>
                                <span class="chg fr stockInfo">
                            <span class="price"/marketLine.htm?stockcode=></span>
                                <span class="up"></span>
                                <span class="money"></span>
                                </span>
                            </div>
                            <div class="percent">
                                <div class="upline inline" style="width:{{$value.upWidth}}%;"></div>
                                <div class="downline inline" style="width:{{$value.downWidth}}%;"></div>
                            </div>
                            <div class="state">
                                <span>{{$value.onNum}}人看涨</span>
                                <span class="fr">{{$value.downNum}}人看跌</span>
                            </div>
                        </div>
                        {{/each}}
                    </script>
                </div>
            </div>
        </div>
        <!-- /////////////////////////////////////////////////////////////////// -->
        <!-- foot -->
        <div class="foot">
            <div class="container">
                <a class="item" href="http://us.yuetougu.com/about.htm" target="_blank">北京约牛网络技术有限公司</a>
                <a class="item" href="http://us.yuetougu.com/law.htm" target="_blank">法律声明</a>
                <a class="item" href="http://us.yuetougu.com/mianze.htm" target="_blank">免责条款</a>
                <a class="item" href="http://us.yuetougu.com/fengxian.htm" target="_blank">风险提示</a>
                <a class="item" href="http://us.yuetougu.com/zhaopin.htm" target="_blank">招纳贤士</a>
            </div>
        </div>
        <!-- login -->
        <div id="contentart">
            <div id="login">
                <div class="topti">
                    <span class="title">登录</span>
                    <span class="close"><i class="fa fa-times"></i></span>
                </div>
                <div class="w300">
                    <form id="yn-form-login">
                        <div class="prompt" id="prompt" style="display: none;">
                            <img src="/public/images/stop.png">
                            <span id="errorMsg">账户名与密码不匹配，请重新输入</span>
                        </div>
                        <div class="inpt phone">
                            <a><i class="fa fa-user"></i></a>
                            <input type="text" name="userName" placeholder="昵称/已验证手机号">
                        </div>
                        <div class="inpt password">
                            <a><i class="fa fa-lock"></i></a>
                            <input type="password" name="password" placeholder="密码">
                        </div>
                        <div class="box">
                            <!--  <input type="checkbox" value="y" name="isLogin" />
                            <span>自动登录</span> -->
                            <a href="/public/user/forget.htm" target="_blank" class="fr">忘记密码？</a>
                        </div>
                        <div class="info">
                            <button class="submit">登录</button>
                        </div>
                        <p class="three"><span>第三方登录</span></p>
                        <center class="threepto">
                            <a href="/qqlogin.htm"><img src="/public/images/qq.png" onclick=""></a>
                            <a href="/weixinLogin.htm"><img src="/public/images/weix.png" onclick=""></a>
                            <a href="/weibologin.htm"><img src="/public/images/sina.png" onclick=""></a>
                        </center>
                        <center class="register">还没有帐号?<a href="/user/register.htm" target="_blank">立即注册</a></center>
                    </form>
                </div>
            </div>
        </div>
        <!-- template -->
        <script id="news-comment-template" type="text/html">
            {{each}}
            <div class="news-comment-item">
                <div class="avatar inline">
                    <img src="{{$value.photo}}">
                </div>
                <div class="info inline">
                    <div class="user">
                        <span class="name">{{$value.nickname}}</span>
                        <span class="time">{{$value.create_time}}</span>
                    </div>
                    <div class="subject">{{$value.content}}</div>
                </div>
            </div>
            {{/each}}
        </script>
        <script type="text/javascript">
        var backnews_id = '###article.backnews_id###';
        </script>
        <script src="/public/js/jquery.js"></script>
        <script src="/public/js/lodash.js"></script>
        <script src="/public/js/template.js"></script>
        <script src="/public/js/layer/layer.js"></script>
        <script src="/public/js/bootpag.js"></script>
        <script src="/public/js/ynplugin.js"></script>
        <script src="/public/source/yncommon.min.js"></script>
        <script src="/public/source/ynmodule.min.js"></script>
        <script src="/public/source/yndata.min.js"></script>
        <!-- <script src="/public/bundle/every.bundle.js"></script> -->
        <script>
        var tag = $('#newsDetail .time');
        for (var i = 0; i < tag.length; i++) {
            var time = tag[i].innerHTML;
            time = time.substr(0, 10);
            tag[i].innerHTML = time;
        }
        window.onload = function() {
            var imgs = document.getElementsByTagName('img');
            for (var i = 0; i < imgs.length; i++) {
                var img = imgs[i];
                img.onclick = function() {
                    passValue(this.src)
                }
            }
        };


        function passValue(src) {
            console.log(src);
        };
        </script>
        <script src="/public/source/template_news.js?2017112955"></script>
    </body>

</html>
