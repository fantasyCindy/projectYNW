<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
        <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

        <head>
            <title>${article.title}</title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
            <meta name="viewport" content="width=device-width" initial-scale="1">
            <meta http-equiv="Content-Language" content="zh-CN" />
            <script>
            var __code = "${article.stockcode}";
            var __isVip = "${article.is_vip}";
            </script>
            <link href="http://apps.bdimg.com/libs/fontawesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />
            <link rel="stylesheet" type="text/css" href="/public/css/m-common.css">
            <link rel="stylesheet" href="/public/cms/css/theNewsDetail.css?20180515" />
            <script type="text/javascript" src="/public/js/Zepto.min.js"></script>
            <script type="text/javascript" src="/public/cms/js/theNewsDetail.js?v=20180514"></script>
        </head>

        <body>
            <div class="logo-bar">
                <a class="jump"><img src="/public/images/yn-h5/logo.jpg"></a>
                <span class="textTop">约投顾</span>
                <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yueniu.finance&ckey=CK1396958283535" class="download">下载APP</a>
            </div>
            <div class="app">
                <div class="content">
                    <div class="top hide">
                        <div class="title color333"><i class="t-icon"></i>${article.title}</div>
                        <div class="msg color666">
                            <div class="photo"><img src="${teacher[0].photo_path}" alt=""></div>
                            <div class="name color666">${teacher[0].title}</div>
                            <div class="time color999">${fn:substring(article.create_time,0,16)}</div>
                            <div class="count">${article.viewnumber}</div>
                        </div>
                    </div>
                    <div class="article color333" id="articleContent">${article.content}</div>
                    <div class="reminder color666">风险提示:以上内容仅代表个人观点，不构成投资建议，股市有风险，投资需谨慎。</div>
                </div>
                <div class="text color999">以上言论仅代表个人观点</div>
            </div>
            <div id="demo"></div>
            <div class="wx hide" id="wxcode" style="background: #F9FAFC;margin-top: 20px;padding:5px;display: none">
                <p style="text-align: center;">约投顾
                    <br /> 微信号：yueniuwang</p>
                <p style="text-align: center;">众多牛人云集，还不快来约！</p>
                <div class="imgw">
                    <img src="/public/images/wechatewm.jpg" alt="" style="display: block;width:150px;margin:auto">
                </div>
                <p style="text-align: center;">长按识别二维码关注！</p>
            </div>
            <footer class="footer">
                <nav>
                    <ul>
                        <li><a href="/mobile/m-live.htm" title="关于我们">首页</a></li>
                        <li><a href="/m-about.htm" title="关于我们">关于我们</a></li>
                        <li><a href="/m-law.htm" title="法律声明">法律声明</a></li>
                        <li><a href="/m-mianze.htm" title="免责条款">免责条款</a></li>
                        <li><a href="/m-fengxian.htm" title="风险提示">风险提示</a></li>
                        <li><a href="/m-help.htm" title="帮助中心">帮助中心</a></li>
                    </ul>
                </nav>
                <p class="tc">Copyright©2018云南产业投资管理有限公司</p>
            </footer>
            <script>
            var _hmt = _hmt || [];
            (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?cdf5cc671e64a2ce9d27df535342c9ae";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
            })();

            window.onload = function() {
                var imgs = document.getElementsByTagName('img');
                for (var i = 0; i < imgs.length; i++) {
                    var img = imgs[i];
                    img.onclick = function() {
                        passValue(this.src)
                    }
                }
                $('#articleContent').find('a').removeAttr('href')
            }
            
            var href = window.location.href
            if (href.indexOf("app=yngp") != '-1') {
                $('.textTop').html("约牛股票")
            }
            $('.jump').click(function(){
                if(href.indexOf('app=yngp') != '-1'){
                    window.location.href =  "http://m.live.yuetougu.com/?app=yngp"
                }else{
                     window.location.href="http://m.live.yuetougu.com/"
                }
            })
            function passValue(src) {
                console.log(src)
            }
            var fontSize = OCObject.getFontSize();
            $('.app .article').addClass(fontSize)

            </script>
        </body>

        </html>
