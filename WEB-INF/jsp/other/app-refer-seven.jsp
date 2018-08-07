<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/session-info.jsp" %>
            <title>新手权益，7天免费体验内参</title>
            <meta charset="utf-8">
            <meta name="renderer" content="webkit">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <meta content=always name=referrer>
            <meta http-equiv="Content-Language" content="zh-CN" />
            <meta http-equiv="Cache-Control" content="no-siteapp" />
            <meta name="baidu-site-verification" content="98ebBPqVhQ" />
            <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no, width=device-width">
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="format-detection" content="telephone=no" />
            <link rel="stylesheet" href="/public/module/layui-master/dist/css/layui.css" media="all">
            <link rel="stylesheet" href="/public/css/mobile/app-refer-seven.css?0111" />
    </head>

    <body>
        <div id="app-refer-seven">
            <div class="seven-head">
                <img src="/public/images/yn-h5/seven-head.jpg" alt="" />
                <!-- <div class="seven-user-status logout" style="position:relative;top:10px;margin-bottom:11px;">退出</div> -->
                <div class="seven-user">
                    <script>
                    if (ynIsLogin == 'success') {
                        document.write('<div class="seven-user-status">已登录</div>')
                    } else {
                        document.write('<div class="seven-user-status seven-register">注册</div>')
                    }
                    </script>
                </div>
            </div>
            <div class="seven01"><img src="/public/images/yn-h5/seven-01.png?1" alt="" /></div>
            <div class="seven-msg">
                <div class="seven-price"><span class="seven-red">￥0</span>
                    <del>￥1000</del>
                </div>
                <div class="seven-get-btn" data-id="100">立即领取</div>
                <!-- <div class="seven-get-btn" data-id="388">立即领取</div> -->
            </div>
            <div class="seven02"><img src="/public/images/yn-h5/seven-02.png" alt="" /></div>
            <div class="seven-msg">
                <div class="seven-price"><span class="seven-red">￥0</span>
                    <del>￥1188</del>
                </div>
                <div class="seven-get-btn" data-id="91">立即领取</div>
                <!-- <div class="seven-get-btn" data-id="394">立即领取</div> -->
            </div>
            <div class="seven03"><img src="/public/images/yn-h5/seven-03.png" alt="" /></div>
            <div class="seven-msg">
                <div class="seven-price"><span class="seven-red">￥0</span>
                    <del>￥1111</del>
                </div>
                <div class="seven-get-btn" data-id="97">立即领取</div>
                <!-- <div class="seven-get-btn" data-id="390">立即领取</div> -->
            </div>
            <div class="seven04"><img src="/public/images/yn-h5/seven-04.jpg?2" alt="" /></div>
            <div class="seven-tip">
                <div class="seven-t1">温馨提示</div>
                <div class="seven-t2">新人领取的内参免费使用时间为七天，从领取内参的当日开始计算时间。</div>
                <div class="seven-t2">如果过程中遇到问题，请联系约投顾客服，联系电话：010-82177313</div>
            </div>
            <div class="seven-t3">*本活动由约投顾主办，约投顾拥有最终解释权！</div>
            <div class="seven-done">
                <div class="seven-win">
                    <img class="seven-notice" src="/public/images/yn-h5/seven-success.png" alt="" />
                    <img class="seven-know seven-know-btn" src="/public/images/yn-h5/seven-btn.png" alt="" />
                    <img class="seven-close seven-know-btn" src="/public/images/yn-h5/seven-close.png" alt="" />
                </div>
            </div>
        </div>
        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script src="/public/module/layui-master/dist/layui.js"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
        <script src="/public/js/wxShare.js?1226"></script>
        <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?cdf5cc671e64a2ce9d27df535342c9ae";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();

        wxShare({
            title: '股市执业大牛 [开年内参] 首发，0元体验特权限时领!',
            desc: '选股/选时/买卖/风控/心态---专属投顾一站解决。',
            imgUrl: 'http://www.yuetougu.com/public/images/yn-h5/yn-logo.png'
        })
        layui.use('layer', function() {
            //领取内参
            var gift = (function() {
                var container, success,
                    href = window.location.href,
                    errorCode = {
                        "100003": "不在活动时间内哦",
                        "60020": "商品已领取，请下载约投顾APP或登录约投顾网站查看",
                        "100004": "一个账号只能领取一次~",
                        "100005": "此次活动只针对新用户哦",
                        "20011": "参数错误",
                    }
                return {
                    init: function() {
                        container = $('#app-refer-seven')
                        success = container.find('.seven-done')
                            //点击关闭弹窗
                        success.on('click', '.seven-know-btn', function() {
                                success.hide()
                            })
                            //点击注册
                        container.on('click', '.seven-register', function() {
                                gift.goRegister()
                            })
                            //点击领取内参
                        container.on('click', '.seven-get-btn', function() {
                                var self = this
                                if ($(self).hasClass('seven-ready')) return;
                                if (!ynIsLogin) {
                                    gift.goRegister()
                                } else {
                                    var id = $(this).data('id')
                                    $.post('/refer/receiveRefer.htm', {
                                        'source': 3,
                                        'goodsId': id
                                    }, function(back) {
                                        back = JSON.parse(back)
                                        if (back.status == '1') {
                                            success.show()
                                            container.find('.seven-get-btn').text('已失效').addClass('seven-already seven-ready')
                                            $(self).text('已领取').removeClass('seven-already')
                                        } else {
                                            return layer.msg(errorCode[back.status])
                                        }
                                    })
                                }
                            })
                            //logout
                        container.on('click', '.logout', function() {
                            $.post("/html/logout.htm", function(data) {
                                data = JSON.parse(data)
                                if (data.status == "1") {
                                    window.location.reload()
                                }
                            });
                        })
                    },
                    goRegister: function() {
                        window.location.href = '/appwelfare.htm?url=' + href
                    }
                }
            })()


            $(function() {
                gift.init()
            })
        })
        </script>
    </body>

    </html>
