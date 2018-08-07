<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <title>炒股之后，竟然被前任害成了满仓戏精。。。</title>
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
        <style>
            * {
                padding: 0;
                margin: 0;
            }

            body {
                background: #000014;
                font-family: "Microsoft YaHei";
            }

            .ex-contact-me {
                max-width: 800px;
                width: 100%;
                height: 100%;
                margin: 0 auto;
                position: relative;
                background: #000014;
            }

            .ex-contact-me.ex-end-style,
            body.ex-end-style {
                background: #fff;
            }

            .ex-contact-me img {
                margin-top: 5%;
                width: 100%;
            }

            .ex-contact-me .hand-ani {
                width: 25%;
                height: 100px;
                margin: 0 auto;
                display: none;
            }

            #ex-video {
                width: 100%;
                position: fixed;
                top: 0;
                left: 0;
                z-index: -1;
                opacity: 0;
                background: #fff;
                display: none;
            }

            #video {
                display: block;
                margin: 0 auto;
            }

            .ex-loading {
                width: 20%;
                margin: 0 auto;
                text-align: center;
            }

            .ex-loading img {
                display: block;
                width: 100%;
            }

            .ex-loading img.ex-load {
                width: 85%;
                position: relative;
                top: -10px;
                left: 4px;
            }

            .clear:after {
                content: '';
                display: block;
                clear: both;
                _zoom: 1;
                *zoom: 1;
            }

            /*下载*/

            .ex-download {
                background: #fff;
                display: none;
            }

            .ex-download img {
                margin-top: 0;
            }

            /*下载按钮*/

            .ex-download-btn {
                display: block;
                width: 135px;
                height: 35px;
                text-align: center;
                line-height: 35px;
                margin: 0 auto;
                color: #fff;
                background: #e32f14;
                text-decoration: none;
            }
        </style>
    </head>

    <body>
        <div class="ex-contact-me">
            <div class="ex-contact-first">
                <img class="start-ani" src="/public/images/yn-h5/ex-bg.gif" alt="" />
                <div class="ex-loading">
                    <img src="/public/images/yn-h5/ex-loading-text.png" alt="" />
                    <img class="ex-load" src="/public/images/yn-h5/ex-loading.gif" alt="" />
                </div>
                <div class="hand-ani"></div>
            </div>
            <div class="ex-download">
                <img src="/public/images/yn-h5/ex-download.jpg?4" alt="" />
                <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.yueniuwang.yueniu" class="ex-download-btn">立即下载</a>
            </div>
            <div id="ex-video">
                <video id="video" webkit-playsinline="true" preload playsinline="true" x5-video-player-type="h5" style="object-fit:fill"
                    type="video/mp4"></video>
            </div>
        </div>
        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
        <script src="/public/js/wxShare.js?122277"></script>
        <script>
            wxShare({
                title: '炒股之后，竟然被前任害成了满仓戏精。。。',
                desc: "戏码不足？+仓！",
                link: 'http://www.yuetougu.com/ex-contact-me.htm',
                imgUrl: 'http://www.yuetougu.com/public/images/yn-h5/ex-share.png?11'
            })
            var video = (function () {
                var container, hand, first_screen, media, xmlHttp = null,
                    ex_video
                return {
                    init: function () {
                        container = $('.ex-contact-me')
                        first_screen = container.find('.ex-contact-first')
                        hand = container.find('.hand-ani');
                        ex_video = document.getElementById("ex-video");
                        media = document.getElementById("video");
                        ex_download = container.find('.ex-download')
                        media.style.height = window.innerHeight + 'px'

                        //检测video是否播放完毕
                        $(media).on("ended", function () {
                            setTimeout(function () {
                                video.videoHide()
                                ex_download.fadeIn()
                                media.currentTime = 0
                                $('body').addClass('ex-end-style')
                                container.addClass('ex-end-style')
                            }, 500)


                        });
                        //点击演戏
                        container.on('click', '.hand-ani', function () {
                            first_screen.hide()
                            video.videoShow()
                        })
                    },
                    videoShow: function () {
                        ex_video.style.display = 'block'
                        ex_video.style.opacity = '1'
                        ex_video.style.zIndex = '1'
                        media.play()
                        ex_download.hide()
                    },
                    videoHide: function () {
                        ex_video.style.display = 'none'
                        ex_video.style.opacity = '0'
                        ex_video.style.zIndex = '-1'
                    },
                    getVideo: function ({
                        url,
                        success,
                        fail
                    }) {
                        var ajax = new XMLHttpRequest();
                        ajax.responseType = "blob";
                        ajax.open("get", url)
                        ajax.send()
                        ajax.onreadystatechange = function (readyState) {
                            if (ajax.status !== 200 && (typeof fail == "function")) {
                                return fail()
                            }
                            var state = ajax.readyState

                            if (state == 2) {
                                var size = ajax.getResponseHeader("Content-Length")
                            }

                            if (typeof success == "function") {
                                if (state == 3) {
                                    success("loading")
                                }
                                if (state == 4) {
                                    var a = (window.URL || window.webkitURL || window || {}).createObjectURL(
                                        ajax.response)
                                    media.src = a
                                    success("done")
                                }
                            }
                        }
                    }
                }
            })()
            $(function () {
                video.init()
                video.getVideo({
                    url: "/public/media/ex1.mp4",
                    success: state => {
                        if (state == "loading") {}

                        if (state == "done") {
                            setTimeout(function () {
                                $('.ex-loading').hide()
                                $('.hand-ani').show().html(
                                    '<img src="/public/images/yn-h5/ex-hand.gif?1" alt="" />'
                                )
                            }, 1000)

                        }
                    }
                });
            })
        </script>
    </body>

    </html>