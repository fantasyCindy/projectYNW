<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/session-info.jsp" %>
            <title>内参简介</title>
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
            <link rel="stylesheet" href="/public/css/mobile/app-referDetail.css?0109" />
    </head>

    <body>
        <!-- H5购买内参页 -->
        <div id="app-refer">
            <div class="app-refer-wrap">
            </div>
            <div class="buyBtn">订阅</div>
            <script type="text/html" id="referDetail_template">
                <div class="app-refer-top">
                    <div class="app-refer-title"><i class="app-refer-title-icon"></i>{{title}}</div>
                    <div class="app-refer-middle clear">
                        <div class="app-refer-cover"><img src="{{productImg}}" alt="" /></div>
                        <div class="app-refer-msg">
                            <div class="app-refer-line1 app-refer-line"><img src="{{productImg}}" alt="" /><span class="app-teacher-name">{{puiblisher}}<i class="app-teacher-icon"><img src="http://www.yuetougu.com/public/icons/touziguwen.png" alt="" /></i></span></div>
                            <div class="app-refer-line2 app-refer-line">更新频率：<span class="colorRed">{{updateDay}}交易日{{updatefrequency}}次</span></div>
                            <div class="app-refer-line4 app-refer-line colorRed">￥{{price}}</div>
                        </div>
                    </div>
                    <div class="app-refer-time">服务时间：{{startTime}}——{{endTime}}</div>
                </div>
                <div id="app-refer-introduction">
                    <div class="app-refer-introduction-title">内参简介:</div>
                    <div class="app-refer-introduction-content">{{#productInfo}}</div>
                </div>
        </div>
        </script>
        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script src="/public/js/template.js"></script>
        <script>
        var path = '${path}'
        var href = window.location.href
        var match = href.match(/referid=(\d+)/)
        var referid = match ? match[1] : ''
        var referStatus;


        var referDetail = (function() {
            var container, items

            return {
                init: function() {
                    container = $('#app-refer')
                    items = container.find('.app-refer-wrap')

                    //购买
                    container.on('click', '.buyBtn', function() {
                        if (!ynIsLogin) {
                            window.location.href = '/appwelfare.htm?url=' + href
                        } else if (ynIsLogin == 'success') {
                            // if (referStatus == 1 || referStatus == 0) {
                            $.post('/app/isBuyRefer.htm', {
                                    referid: referid
                                }, function(back) {
                                    if (back.status == 1) {
                                        window.location.href = '/appwelfare.htm?url=' + href + 'router=/welfare/pay'
                                    } else if (back.status == 60020) {
                                        return alert('商品已购买,请到约投顾网站或下载APP查看')
                                    }
                                }, 'json')
                                // } 
                                // else if (referStatus == 2) {
                                //     return alert('内参已结束，不能购买')
                                // }
                        }
                    })
                },
                render: function() {
                    $.getJSON(path + '/reference/referbyid.htm', {
                        id: referid
                    }, function(back) {
                        if (back.status == 1) {
                            referStatus = back.status
                            items.html(template("referDetail_template", back.data))
                        } else {
                            return alert(参数为空)
                        }
                    })
                }
            }
        })()

        $(function() {
            referDetail.init();
            referDetail.render();
        })
        </script>
    </body>

    </html>
