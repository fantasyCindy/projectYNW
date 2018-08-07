<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>实名认证</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <link rel="stylesheet" href="/private/backstage/css/backstage.css?0329">
                <link rel="stylesheet" href="/public/v2/my/myAuth.css?v=03291">

                <body>
        <%@include file="../v2/front-head-v2.jsp" %>
                        <div id="customeStock" class="clear">
                            <div class="container">
                                <%@ include file="../backstage/_menu.jsp"%>
                                    <div class="right">
                                        <div id="myAuth">
                                            <div class="title">
                                                <span>实名认证</span>
                                            </div>
                                            <form id="myAuth_form">
                                                <div class="form-group">
                                                    <label>姓名</label>
                                                    <input id="name" type="text" name="username" placeholder="填写您身份证上的名字">
                                                </div>
                                                <div class="form-group">
                                                    <label>身份证号</label>
                                                    <input id="code" type="text" name="idCard" placeholder="15或18位身份证号码">
                                                </div>
                                                <div class="form-btn">
                                                    <p class="affirm">确认</p>
                                                    <span class="mark">您每天有5次认证机会</span>
                                                    <p class="error"><span></span></p>
                                                </div>
                                            </form>
                                            <div id="success">
                                                <span class="cg"></span>
                                                <p>恭喜您认证成功</p>
                                                <p>您认证的实名信息：<span class="message"></span></p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>

                        <!-- footer -->
                        <%@include file="../common/front-foot.jsp"%>
                            <script src="/public/v2/my/myAuth.bundle.js?v=20180730"></script>
                <script>
                    onSelect('我的')
                </script>
                </body>

    </html>