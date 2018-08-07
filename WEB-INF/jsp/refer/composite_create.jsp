<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <title>约牛，让股民与牛人相约</title>
        <%@ include file="../common/front-common.jspf" %>
            <link rel="stylesheet" href="/public/css/cropper.min.css" />
            <link rel="stylesheet" href="/public/css/composite_create.css" />
    </head>

    <body>
        <!-- 引入头部 -->
        <%@ include file="../common/front-head.jsp" %>
            <div id="composite_create">
                <div class="yn-title-1">
                    <span class="icon"></span>
                    <span class="title-txt">创建组合</span>
                </div>
                <div class="contents">
                    <!-- 名称 -->
                    <div class="line name">
                        <span class="title-txt">组合名称</span>
                        <input type="text" class="inline" id="fName" />
                        <div class="tip bottom">
                            <span class="value">4-20个字, 可输入中英文和数字</span>
                        </div>
                    </div>
                    <!-- 简介 -->
                    <div class="line vertical-top intro" id="composite-intro">
                        <span class="title-txt">组合简介</span>
                        <textarea name="" id="fIntro" cols="30" rows="8" class="inline"></textarea>
                        <div class="inline sample">
                            <p class="sample-title">范例一</p>
                            <p class="sample-content">分析基本面, 精选长期趋势上涨的股票</p>
                            <p class="sample-title">范例二</p>
                            <p class="sample-content">把握市场机会, 专注投资重组股</p>
                        </div>
                        <div class="tip bottom">
                            <span class="value"><strong id="info-word-count">100</strong>/100</span>
                        </div>
                    </div>
                    <!-- 图片裁切 -->
                    <div id="cropperContainer"></div>
                    <!--  -->
                    <div class="line separator"></div>
                    <div class="line" id="composite-style">
                        <div class="title-txt">操作风格</div>
                        <div class="checkboxs"></div>
                    </div>
                    <div class="line" id="max-life">
                        <div class="title-txt">最长期限<span class="tip right">(组合到期后,根据最终收益判断是否成功)</span></div>
                        <div class="checkboxs"></div>
                    </div>
                    <div class="line time">
                        <div class="title-txt">运行时间</div>
                        <div class="content">
                            <input type="text" class="begin" id="beginTime" />
                            <i class="fa fa-calendar"></i>
                            <span class="divide">至</span>
                            <span id="endTime"></span>
                        </div>
                    </div>
                    <div class="separator"></div>
                    <div class="line slider">
                        <div class="item">
                            <div class="static">
                                <span class="txt">订阅方式</span>
                            </div>
                            <div class="item inline free" id="feedPayType"></div>
                        </div>
                        <div id="FeedPayType-items">
                            <div class="item">
                                <div class="static">
                                    <span class="txt">订阅价</span>
                                    <i class="doubt fa fa-question-circle"></i>
                                </div>
                                <div id="feedPrice" class="inline"></div>
                                <div class="slider-tip">
                                    <span>最高价=400+12000*收益率*时间系数</span>
                                </div>
                            </div>
                            <div class="item glance">
                                <div class="static">
                                    <span class="txt">瞄一眼价格</span>
                                    <i class="doubt fa fa-question-circle"></i>
                                </div>
                                <div class="inline">
                                    <input type="text" value="1" class="ac" id="peep_price" />
                                    <span class="txt">牛币，（最高为订阅价的0.1倍, 且不能大于100牛币）</span>
                                </div>
                                <div class="slider-tip">
                                    <span>支付30分钟后可以查看运行中的组合调仓和持仓记录,最高价为订阅价的0.1倍, 价格限制为1-100牛币</span>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="static">
                                <span class="txt">止损线</span>
                                <i class="doubt fa fa-question-circle"></i>
                            </div>
                            <div id="downline" class="inline"></div>
                            <div class="slider-tip">
                                <span>触及止损线, 组合结束并认定为失败</span>
                            </div>
                        </div>
                        <div class="item">
                            <div class="static">
                                <span class="txt">目标收益</span>
                                <i class="doubt fa fa-question-circle"></i>
                            </div>
                            <div id="income" class="inline"></div>
                            <div class="slider-tip">
                                <span>目标收益不低于止损线绝对值的1.5倍</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="submit">
                    <button>提交审核</button>
                </div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
                <script src="/public/js/cropper.min.js"></script>
                <script src="/public/bundle/composite_create.bundle.js"></script>
    </body>

    </html>
