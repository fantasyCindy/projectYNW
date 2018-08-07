<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
            <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾</title>
            <%@ include file="../common/front-common.jspf" %>
            <link rel="stylesheet" href="/private/backstage/css/backstage.css" />
            <style>
            textarea {
                resize: none;
                outline: none;
                width: 95%;
                border: 1px solid rgb(235, 235, 235);
                margin: 20px auto;
                padding: 25px;
                display: block;
                background: rgb(250, 250, 250);
                border-radius: 3px;
                font-size: 15px;
                line-height: 25px;
            }
            
            .textCountWrap {
                margin-left: 20px;
                color: gray;
            }
            
            button {
                display: block;
                margin: auto;
                padding: 10px 30px;
            }
            </style>
    </head>

    <body>
        <%@include file="../common/front-head.jsp" %>
            <div id="myInfo">
                <%@ include file="_menu.jsp" %>
                    <div class="right shadow">
                        <div id="contentWrap">
                            <div class="title-1">投诉建议</div>
                            <div class="content">
                                <textarea cols="30" rows="9" placeholder="内容不超过200字..."></textarea>
                                <div class="textCountWrap"><span class="textCount">200</span>/200</div>
                                <button class="red">提交</button>
                            </div>
                        </div>
                    </div>
            </div>
            <%@include file="../common/front-foot.jsp" %>
            <script src="/private/backstage/js/backstage.js"></script>
                <script type="text/javascript">
                $(function() {

                    //菜单
                    yn.centerMenu.init();
                    yn.centerMenu.render();

                    var suggest = {
                        container: $('#myInfo'),
                        input: $("textarea"),
                        button: $('button'),
                        init: function() {
                            this.event();
                            yn.wordCount(this.input, {
                                indicate: $('.textCount')
                            })
                        },
                        event: function() {
                            var _this = this;
                            this.button.click(function() {
                                yndata.feedback(_this.input.val()).done(function() {
                                    _this.input.val("")
                                });
                            })
                        }
                    }
                    suggest.init();
                })
                </script>
    </body>

    </html>
