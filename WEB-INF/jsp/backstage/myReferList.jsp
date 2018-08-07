<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <script>
        var path = ''
        var href = window.location.href
        if (href.indexOf('yuetougu') != '-1') {
            path = 　"http://www.yuetougu.com"
        } else {
            path = "http://101.201.41.116:8080"
        }
        var match = href.match(/reference\/(\d+).htm/)
        var referid = match ? match[1] : ''

        var matcha = href.match(/ecode=([^]+)/)
        var ecode = matcha ? matcha[1] : ''
        var isMobile = navigator.userAgent.match(/iPhone|Android/i)
        if (isMobile) window.location.href = path + '/app-referDetail.htm?referid=' + referid + '&ecode=' + ecode
        </script>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>${refer.puiblisher}:${refer.title}-约投顾内参,有价值的内参</title>
            <meta name="keywords" content="${refer.puiblisher}:${refer.title},约投顾内参" />
            <meta name="description" content="${refer.productInfoStr}" />
            <%@ include file="../v2/front-common-v2.jspf" %>
                <link rel="stylesheet" href="${path}/public/module/qqface/sprite.css?123" />
                <link rel="stylesheet" href="${path}/private/backstage/css/myReferList.css?0730">
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div class="img-wrap">
                <div class="img-container">
                    <img id="img-wrap-img" src="" alt="">
                </div>
            </div>
            <div id="myReferList">
                <div class="refer_wrap clear">
                    <div class="wrap_fl fl">
                        <div class="refer_isFeed hide">
                            <div class="refer_detail wrap b220">
                                <div class="refer_title"><i class="refer-title-icon"></i><span class="title">${refer.puiblisher}：${refer.title}</span><span id="update"></span></div>
                                <div class="refer_cover clear relative">
                                    <span class="refer-status-icon refer-status-${refer.productStatus}"></span>
                                    <div class="inline refer_photo fl" style="background:url(${refer.productImg}) no-repeat center;background-size: auto 100%;"></div>
                                    <div class="refer_intro fl inline">
                                        <span class="value">${refer.productInfo}</span>
                                    </div>
                                </div>
                                <div class="addition clear">
                                    <c:if test="${refer.referenceType == 0}">
                                    <span class="fl">服务期：无限期</c:if>
                                    <c:if test="${refer.referenceType == 1}">
                                    <span class="fl">服务期：<span class="servestartTime">${refer.startTime}</span>－<span class="servendTime">${refer.endTime}</span></c:if>｜
                                    <span class="orderNum" data-tid="${refer.subscribenumber}"></span>人订阅</span>
                                    <span class="fr">共<span class="total-refer-count"></span>条内参</span>
                                </div>
                                <!-- 内容 -->
                                <div class="refer_content"></div>
                            </div>
                            <!-- 评论 -->
                            <div class="refer_comment wrap b220">
                                <div class="comm_total"><span class="yn-title-1-icon"></span><b>评论<span class="cmentnum"></span></b></div>
                                <div class="comment_list">
                                    <div class="comment_bar"></div>
                                </div>
                            </div>
                            <!-- 发表评论 -->
                            <div class="postContainer"></div>
                        </div>
                        <div class="refer_notFeed hide">
                            <div class="refer_detail wrap b220">
                                <div class="refer_title"><i class="refer-title-icon"></i><span class="title relative">${refer.puiblisher}：${refer.title}<span class="refer-intro-status-icon refer-intro-status-${refer.productStatus}"></span></span>
                                </div>
                                <span id="update"></span>
                                <div class="refer_cover clear relative">
                                    <div class="inline refer_photo fl" style="background:url(${refer.productImg}) no-repeat center;background-size: auto 100%;"></div>
                                    <div class="refer_intro fl inline">
                                        <div class="refer_intro_line">
                                            <c:if test="${refer.referenceType == 0}">
                                            <span class="">服务期：无限期</c:if>
                                            <c:if test="${refer.referenceType == 1}">
                                            <span class="">服务期：<span class="servestartTime">${refer.startTime}</span>至<span class="servendTime">${refer.endTime}</span>｜</c:if>｜
                                            <span class="orderNum refer_intro_red" data-tid="${refer.subscribenumber}"></span>人订阅</span>
                                        </div>
                                        <div class="refer_intro_line"><span>更新频率：<span>${refer.updateDay}</span>交易日<span>${refer.updatefrequency}</span>次</span>
                                        </div>
                                        <div class="refer_intro_line">
                                            <p class="yetday runInfo"></p>
                                        </div>
                                        <div class="refer_intro_line">
                                            <span>订阅价<span class="refer_intro_red price">
                                                <c:if test="${refer.referenceType == 0}">￥${refer.price}元/月</c:if>
                                                <c:if test="${refer.referenceType == 1}">￥${refer.price}</c:if>
                                            </span></span>
                                        </div>
                                        <div class="refer_intro_line">
                                            <div class="refer_intro_feedBtn action-feed">立即订阅</div>
                                            <!--  <c:if test="${refer.id == '85'}">
                                                <div class="refer_intro_feedBtn gray">已售罄</div>
                                            </c:if> -->
                                            <!-- <c:if test="${refer.id != '85'}"> -->
                                            <!-- </c:if> -->
                                        </div>
                                        <!-- <span class="value">${refer.productInfo}</span> -->
                                    </div>
                                    
                                </div>
                                <c:if test="${refer.referenceType == 0}">
                                        <div class="refer-tips">温馨提示：此内参无限期运行，每次购买为一个月的服务周期</div>
                                    </c:if>
                            </div>
                            <div class="refer-intro-text b220">
                                <div class="refer-intro-text-title">内参介绍</div>
                                <div class="refer-intro-text-content">${refer.productInfo}</div>
                                <div class="refer-intro-text-alert">
                                    <div class="alert-top"><i class="alert-icon"></i>股市有风险 入市需谨慎！</div>
                                    <div class="alert-bottom">用户应了解证券投资面临的各种市场风险，了解证券业务的内涵和基本规则，用户应自主作出投资决策，并独立承担投资风险。网站不承担任何经济和法律责任。</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="wrap_fr fr">
                        <!-- 订阅状态 -->
                        <div class="subscription wrap b220 product hide">
                            <span class="status status${refer.productStatus}"></span>
                            <c:if test="${refer.referenceType == 0}"><span class="right-price">订阅价<font color='red'>${refer.price}</font>牛币/月</span></c:if>
                            <c:if test="${refer.referenceType == 1}"><span class="right-price">订阅价<font color='red'>${refer.price}</font>牛币</span></c:if>
                            <p class="yetday runInfo"></p>
                            <div class="progress"><span class="progress_bar"></span></div>
                            <p class="info feedBtn"></p>
                        </div>
                        <!-- 个人简介 -->
                        <div class="person-info wrap b220"></div>
                        <!-- ta的内参 -->
                        <div class="person-refer wrap b220">
                            <div class="yn-title-1">
                                <span class="yn-title-1-icon"></span>
                                <span class="txt">TA的内参</span>
                            </div>
                            <a class="more" href="/refer/${refer.teacherid}" target="_blank">
                                <i class="fa fa-angle-right fa-lg"></i>
                            </a>
                            <div class="items"></div>
                        </div>
                        <div class="specialtys wrap b220">
                            <div class="yn-title-1">
                                <span class="yn-title-1-icon"></span>
                                <span class="txt">擅长领域</span>
                            </div>
                            <div class="items">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 更新内参 -->
            <div id="uprefer" class="uprefer hide">
                <p class="title">更新内参</p>
                <i class="close fa fa-times-circle fa-2x"></i>
                <div class="wrap">
                    <div id="messageContainerWrap" class="qwindow talkWindow-left-child">
                        <form id="formId">
                            <input type="hidden" id="_periodicalid" />
                            <script id="ueditContainer" name="content" type="text/plain"></script>
                            <div class="info">
                                <input class="fl" type="text" data-provide="typeahead" id="insertStockCodeInput" placeholder="插入股票代码/拼音" />
                                <span class="txt"></span>
                                <div class="submit fr">发表</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- 上传文档参 -->
            <div id="upload" class="uprefer upload hide">
                <p class="title">上传pdf文档</p>
                <i class="close fa fa-times-circle fa-2x"></i>
                <div class="wrap">
                    <div class="upload-title clear">文档标题<input class="up-title" type="text" placeholder="1-40字" /></div>
                    <div class="uploadFile" id="uploadFile"><span class="upload-icon"></span>请在此处上传附件文档<input type="file" class="upbtn" /></div>
                    <div class="uploadFile hide" id="uploadFile-wrap"><span class="uploadfile-icon"></span><span class="fileName"></span><i class="delete"></i></div>

                    <div class="upload-tip">注：仅支持pdf格式文件；</div>
                    <div class="upload-tip" style="margin-left:97px;">文件大小需小于2M</div>
                    <div class="submit">提交</div>
                </div>
            </div>
            <!-- 邀请码弹窗 -->
            <div id="pay-ecode" class="hide">
                <div class="pay-container">
                    <div class="pay-employee-title">请输入邀请码</div>
                    <div class="pay-employee-input">
                        <input type="text">
                    </div>
                    <div class="pay-employee-bar">
                        <span class="pay-btn pay-sure">确定</span>
                        <span class="pay-btn pay-cancel">取消</span>
                    </div>
                </div>
            </div>
            <!-- 评论 -->
            <script type="text/html" id="comment_bar_template">
                {{each}}
                <div class="comment_item clear {{$value._style}} {{$value._isSelf}}">
                    <div class="user_head fl"><img src="{{$value.photo}}"></div>
                    <div class="user_detail fl">
                        <div class="ho">
                            <div class="user_name relative">
                                <span class="user_nickName">{{$value._nickName}}<i class="teacher-icon {{$value._teacherIcon}}"></i></span>
                                <span class="floor fr">{{$value._create_time}}</span>
                                <i class="delete icon fa fa-times" data-id="{{$value.id}}"></i>
                            </div>
                            <p class="user_content">{{#$value._reply}}{{#$value._content}}</p>
                            <p class="user_floor">
                                <a href="#ynPostComment" class="reply fl {{$value._replyTeacher}}" data-name="{{$value.nickName}}" data-id="{{$value.commentId}}" data-createid="{{$value.create_id}}">回复</a>
                            </p>
                        </div>
                    </div>
                </div>
                {{/each}}
            </script>
            <%@  include file="../common/moudule-ask.jsp" %>
                <%@ include file="../common/module-face.jsp" %>
                    <%@ include file="../common/front-foot.jsp" %>
                        <script type="text/javascript">
                        var __data = {
                            status: "${refer.productStatus}",
                            id: "${refer.id}",
                            createId: "${refer.teacherid}",
                            pubId: "${refer.puiblisherid}",
                            name: "${refer.puiblisher}",
                            start: "${refer.startTime}",
                            end: "${refer.endTime}",
                            isOrder: "${refer.is_od}" == "1",
                            price: "${refer.price}",
                            icon: ["run", "ready", "end"][+"${refer.productStatus}"],
                            isSelf: "${refer.teacherid}" == ynTeacherId,
                            now: "${refer.systemTime}",
                            isactivity: "${refer.isactivity}",
                            referenceType:"${refer.referenceType}"
                        }
                        </script>
                        <script src="/public/module/layui-master/dist/layui.js"></script>
                        <script type="text/javascript" src="/public/ueditor/ueditor.config.js"></script>
                        <script type="text/javascript" src="/public/ueditor/ueditor.all.min.js"></script>
                        <script type="text/javascript" src="/public/ueditor/lang/zh-cn/zh-cn.js"></script>
                        <script type="text/javascript" src="/public/bundle/referDetail.bundle.js?0806"></script>
    </body>

    </html>
