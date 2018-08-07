<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
        <title>约牛，让股民与牛人相约</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
            <link rel="stylesheet" href="/public/css/feedback.css?0329" />
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div class="container" id="feedback">
                <div class="yn-title-1">
                    <span class="yn-title-1-icon"></span>
                    <span class="txt">意见与投诉</span>
                </div>
                <div class="wrap">
                    <div class="line">
                        <input id="feed-phone" type="text" class="field" placeholder="输入手机号, 方便我们联系您">
                    </div>
                    <div class="line">
                        <textarea id="feed-content" placeholder="输入内容" class="field"></textarea>
                    </div>
                    <div class="line wordCount">
                        <p class="complain fl hide">
                            <input type="text" class="comCode fl" placeholder="验证码" id="feed-code" name="comCode">
                            <img src="/validCode.htm" id="imgCodeId"><span>
                            <a id="changeImg" >换一张</a></span>
                        </p>
                        <p class="fr"><span class="value">200</span>/200</p>
                    </div>
                    <div class="line align-c">
                        <button class="submit inline">提交</button>
                    </div>
                </div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
    </body>
    <script>
    $(function() {
        if (!ynIsLogin) {
            yn.login.render();
            $('#login').on('click', '.close', function() {
                window.location.href = "/index.htm"
            })
            return;
        }
        var feedback = function() {
            var container = $("#feedback"),
                button = container.find('button.submit'),
                code = $('#feed-code'),
                textarea = $('#feed-content'),
                phone = $('#feed-phone')

            button.click(_.debounce(function() {
                submit();
            }, 2000, {
                leading: true,
                trailing: false
            }))

            yn.wordCount(textarea, {
                indicate: $('.wordCount .value'),
                limit: 200
            })

            var submit = function() {
                if (!yn.isMobile(phone.val())) {
                    layer.msg("请检查手机号是否输入正确");
                    return;
                }

                var val = textarea.val()
                val = _.trim(val)
                if (!val) {
                    layer.msg("内容不能为空");
                    return;
                }

                $.post("/feedback/add.htm", {creatorid:ynUserId,content:val,status:0}, function(data) {
                    data = JSON.parse(data)
                    if (data.status == "1") {
                        layer.alert("收到您宝贵的意见，我们会做得更好");
                        reset();
                    }
                })
            }

            var reset = function() {
                phone.val("");
                textarea.val("")
                $('.value').html('200')
            }
        }()

    })
    </script>

    </html>
