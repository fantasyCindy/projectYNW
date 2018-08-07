<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="../common/seo.jspf" %>
            <title>约投顾 | 修改密码</title>
            <%@ include file="/WEB-INF/jsp/common/front-common.jspf" %>
                <link rel="stylesheet" href="/private/backstage/css/backstage.css" />
                <style>
                #updatePassword {
                    padding: 25px;
                }
                
                #updatePassword .item {
                    margin: 30px 0;
                    position: relative;
                }
                
                #updatePassword .item .txt {
                    text-align: right;
                    display: inline-block;
                    width: 70px;
                    margin-right: 10px;
                }
                
                #updatePassword .error-msg {
                    color: red;
                    font-size: 12px;
                    margin-left: 90px;
                    margin-top: 5px;
                }
                
                input {
                    padding: 5px 10px;
                    width: 350px;
                    display: inline-block;
                }
                
                button {
                    display: block;
                    margin: auto !important;
                }
                
                #updatePassword {
                    width: 500px;
                    padding: 25px;
                    margin: auto;
                }
                
                strong {
                    color: black;
                    margin: 0 3px;
                }
                
                .format {
                    font-size: 12px;
                    margin-left: 90px;
                    margin-top: 5px;
                    color:red;
                }
                </style>
    </head>

    <body>
        <%@include file="../common/front-head.jsp" %>
            <div id="myInfo">
                <%@ include file="_menu.jsp" %>
                    <div class="right shadow">
                        <div id="contentWrap">
                            <div class="title-1">修改密码</div>
                            <div class="content">
                                <div id="updatePassword">
                                    <div class="item">
                                        <span class="txt">原密码</span>
                                        <input type="password" id="old" placeholder="原密码" autocomplete="off" />
                                    </div>
                                    <div class="item">
                                        <span class="txt">新密码</span>
                                        <input type="password" id="new" placeholder="密码包含字母 / 数字 / 下划线且至少6位" class="verify" autocomplete="off" />
                                    </div>
                                    <div class="item">
                                        <span class="txt">确认密码</span>
                                        <input type="password" id="confirm" class="verify" autocomplete="off" />
                                    </div>
                                    <div>
                                        <button class="submit">提交</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <%@include file="../common/front-foot.jsp" %>
                <script src="${path}/public/bundle/updatePassword.bundle.js"></script>
    </body>

    </html>
