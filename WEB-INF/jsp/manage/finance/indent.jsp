<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html>
    <html lang="zh-CN">

    <head>
        <%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
            <link rel="stylesheet" href="/public/css/yncalendar.css">
            <style>
                .hid {
                    display: none;
                }
                
                #indent {
                    padding: 15px;
                    width: 90%;
                }
                
                #myIncome .myIncome-title {
                    display: inline-block;
                    color: rgb(90, 90, 90);
                }
                
                #myIncome .myIncome-title .balance {
                    color: rgb(150, 150, 150);
                    margin: 0 10px;
                }
                
                #myIncome .myIncome-title .deposit-href {
                    display: inline-block;
                    color: #fff;
                    padding: 0 6px;
                    border-radius: 5px;
                    background: #f00029;
                }
                
                #myIncome .data-linkage {
                    display: inline-table;
                    margin-left: 25px;
                }
                
                #myIncome .data-linkage select {
                    border: 1px solid #c7c7c7;
                    color: rgb(90, 90, 90);
                    text-indent: 10px;
                    border-radius: 3px;
                    font-size: 14px;
                    line-height: 22px;
                    transition: box-show .2s linear;
                    background: rgb(250, 250, 250);
                    width: 100px;
                }
                
                #myIncome .income-statistics {
                    margin-top: 30px;
                    border: 1px solid #f0f1f1;
                    overflow: hidden;
                }
                
                #myIncome .income-statistics .data-statistics {
                    position: relative;
                    width: 68%;
                    display: inline-table;
                    margin: 20px 10px;
                }
                
                #myIncome .data-statistics .line {
                    display: inline-block;
                    height: 93px;
                    width: 1px;
                    border-left: 1px solid #e4e4e5;
                    position: absolute;
                    top: 16px;
                    right: 0;
                }
                
                #myIncome .data-statistics .item {
                    margin-bottom: 20px;
                }
                
                #myIncome .data-statistics td {
                    position: relative;
                    text-align: center;
                }
                
                #myIncome .data-statistics span {
                    display: block;
                }
                
                #myIncome .data-statistics span.data-title {
                    color: rgb(30, 30, 30);
                }
                
                #myIncome .data-statistics span.data-total {
                    color: rgb(90, 90, 90);
                }
                
                #myIncome span.data-total font {
                    margin-right: 5px;
                }
                
                #myIncome .income-statistics #myIcome-chart {
                    width: 29%;
                    display: inline-table;
                    float: right;
                    border-left: 1px solid #d7d8d9;
                    height: 158px;
                }
                
                #indent .inquire-indent {
                    margin-top: 15px;
                }
                
                #indent .inquire-indent table {
                    width: 100%;
                    color: rgb(30, 30, 30);
                    line-height: 22px;
                }
                
                #indent .txtbox {
                    text-align: center;
                    border: 1px solid #c7c7c7;
                    height: 24px;
                    line-height: 24px;
                    font-size: 13px;
                    width: 118px;
                    border-radius: 3px;
                    margin: 0 5px;
                    -webkit-transition: box-shadow .2s linear;
                    transition: box-shadow .2s linear;
                }
                
                #indent .inquire-indent select {
                    border: 1px solid #c7c7c7;
                    color: rgb(90, 90, 90);
                    border-radius: 3px;
                    font-size: 14px;
                    line-height: 24px;
                    height: 24px;
                    transition: box-show .2s linear;
                    background: rgb(250, 250, 250);
                    width: 60px;
                }
                
                #indent .inquire-indent .inquire-btn {
                    color: #fff;
                    display: inline-block;
                    padding: 0 3px;
                    background: #f00029;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                #myIncome #indent-list .username {
                    cursor: pointer;
                    text-decoration: underline;
                }
                
                #myIncome .indent-wrap {
                    margin-top: 30px;
                }
                
                #myIncome .indent-wrap .statistics-result {
                    color: rgb(30, 30, 30);
                    margin-bottom: 10px;
                }
                
                #myIncome .indent-wrap table {
                    width: 100%;
                    color: rgb(90, 90, 90);
                }
                
                #myIncome .indent-wrap table tr {
                    border: 1px solid #e7e8ea;
                    line-height: 40px;
                }
                
                #myIncome .indent-wrap td {
                    text-indent: 10px;
                }
                
                #myIncome .indent-wrap thead {
                    background: #f5f5f6;
                    color: rgb(30, 30, 30);
                }
                
                #myIncome .indent-wrap .operate {
                    color: #579dfe;
                    cursor: pointer;
                }
                
                #myIncome .indent-wrap .operate:hover {
                    text-decoration: underline;
                }
                
                #indentable {
                    z-index: 1;
                    color: rgb(90, 90, 90);
                    padding: 20px;
                    border: 1px solid rgb(200, 200, 200);
                    background: white;
                    width: 885px;
                    height: 319px;
                    border-radius: 6px;
                }
                
                #indentable>.close {
                    font-size: 28px;
                    position: absolute;
                    right: 5px;
                    top: 5px;
                    cursor: pointer;
                }
                
                #indentable .indent-status span {
                    color: rgb(30, 30, 30);
                    margin-right: 30px;
                    font-size: 18px;
                }
                
                #indentable p {
                    line-height: 35px;
                }
                
                #indentable table {
                    margin-top: 20px;
                    width: 100%;
                    color: rgb(30, 30, 30);
                }
                
                #indentable table tr {
                    text-align: center;
                    line-height: 40px;
                    border-top: 1px solid #eaebec;
                    border-bottom: 1px solid #eaebec;
                }
            </style>
    </head>

    <body>
        <div id="indent">
            <div class="myicome-type bootpag" id="myIncome">
                <div class="myIncome-title">

                </div>
                <div class="data-linkage">
                    日期<input id="allmarketTime" autocomplete="off" name="indentqueryallTime" placeholder="选取日期回车查询" type="text" class="txtbox showdate texts">
                </div>
                <div class="totalmoney"></div>
                <div class="inquire-indent">
                    <form id="parameter">
                        <table>
                            <tbody>
                                <tr>
                                    <td>日期<input id="startTime" autocomplete="off" name="startTime" type="text" class="txtbox showdate texts">至<input id="endTime" autocomplete="off" name="endTime" type="text" class="txtbox showdate texts"></td>
                                    <td>订单类型
                                        <select id="indent_type" name="type">
                      <option value="">全部</option>
                      <option value="1">打赏</option>
                      <option value="2">送礼物</option>
                      <option value="3">购买产品</option>
                    </select>
                                    </td>
                                    <td>订单状态
                                        <select id="indent_status" name="orderState">
                      <option value="">全部</option>
                      <option value="0">未支付</option>
                      <option value="1">已完成</option>
                      <option value="2">已取消</option>
                      <option value="3">退款申请</option>
                      <option value="4">退款成功</option>
                      <option value="5">订单关闭</option>
                      <option value="6">服务中</option>
                    </select>
                                    </td>
                                    <td>订单来源
                                        <select id="indent_source" name="source">
                      <option value="">全部</option>
                      <option value="1">WEB</option>
                      <option value="2">IOS</option>
                      <option value="3">ANDROID</option>
                    </select>
                                    </td>
                                    <td>订单号:<input id="indent_num" name="orderNum" type="text" class="txtbox showdate texts" />
                                        <span class="inquire-btn">查询</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
                <div class="indent-wrap">
                    <p class="statistics-result"></p>
                    <table>
                        <thead>
                            <tr>
                                <td>订单用户</td>0
                                <td>订单名称</td>
                                <td>消费类型</td>
                                <td>全部</td>
                                <td>优惠</td>
                                <td>实付款</td>
                                <td>订单状态</td>
                                <td>订单号</td>
                                <td>订单来源</td>
                                <td>操作</td>
                            </tr>
                        </thead>
                        <tbody id="indent-list">

                        </tbody>
                    </table>
                </div>
            </div>
            <div id="indentable" class="hid">

            </div>
            <%@include file="/WEB-INF/jsp/common/moudule-judgePay.jsp"%>
                <script type="text/html" id="indent-list-template">
                    {{each}}
                    <tr>
                        <td>
                            <span class="username" data-name="{{$value.nickname}}" data-id="{{$value.userid}}">{{$value.nickname}}</span>
                        </td>
                        <td>{{$value.orderName}}</td>
                        <td>{{$value.goodsType}}</td>
                        <td>{{$value.totalPrice}}</td>
                        <td>{{$value.discount_price}}</td>
                        <td>{{$value.actual_price}}</td>
                        <td>{{$value.orderState}}</td>
                        <td>{{$value.orderNum}}</td>
                        <td>{{$value.pay_source}}</td>
                        <td><span class="operate" data-id="{{$value.orderNum}}">详情</span></td>
                    </tr>
                    {{/each}}
                </script>
                <script type="text/html" id="myIncome-title-template">
                    <font color="#e20000" size="4">用户类型</font>
                    <select id="is_inside">
            <option value="">全部用户</option>
       			<option value="1">内部用户</option>
       			<option value="0">注册用户</option>
          </select>
                </script>
                <script type="text/html" id="myIncome-title-sub-template">
                    <font color="#e20000" size="4">{{payorder[0].nickname}}的消费记录</font>
                    <span>(账户余额：{{balance}})牛币</span>
                </script>
                <script type="text/html" id="totalmoney-template">
                    <div class="income-statistics">
                        <table class="data-statistics">
                            <tbody>
                                <tr>
                                    <td>
                                        <p class="item">
                                            <span class="data-title">投资内参总{{moneystatus}}额</span>
                                            <span class="data-total"><font color="#e20000" size="4">{{neican_price}}</font>牛币</span>
                                        </p>
                                        <p>
                                            <span class="data-title">礼物总{{moneystatus}}额</span>
                                            <span class="data-total"><font color="#e20000" size="4">{{liwu_price}}</font>牛币</span>
                                        </p>
                                        <i class="line"></i>
                                    </td>
                                    <td>
                                        <p class="item">
                                            <span class="data-title">投资组合总{{moneystatus}}额</span>
                                            <span class="data-total"><font color="#e20000" size="4">{{zuhe_price}}</font>牛币</span>
                                        </p>
                                        <p>
                                            <span class="data-title">打赏总{{moneystatus}}额</span>
                                            <span class="data-total"><font color="#e20000" size="4">{{dahsang_price}}</font>牛币</span>
                                        </p>
                                        <i class="line"></i>
                                    </td>
                                    <td>
                                        <p class="item">
                                            <span class="data-title">课程总{{moneystatus}}额</span>
                                            <span class="data-total"><font color="#e20000" size="4">{{kecheng_price}}</font>牛币</span>
                                        </p>
                                        <p>
                                            <span class="data-title">合计总{{moneystatus}}额</span>
                                            <span class="data-total"><font color="#e20000" size="4">{{total_price}}</font>牛币</span>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="myIcome-chart">
                        </div>
                    </div>
                </script>
                <script type="text/html" id="indentable-template">
                    <i class="close fa fa-times-circle"></i>
                    <p class="indent-status"><span>订单详情</span>
                        <font color="#e20000" size="4">状态：{{orderState}}</font>
                    </p>
                    <p>订单号：{{orderNum}}</p>
                    <p>订单时间：{{orderTime}}</p>
                    <p class="indent-status"><span>购买详情</span></p>
                    <table>
                        {{if goodsType == 0}}
                        <thead>
                            <tr>
                                <td>类型</td>
                                <td>名称</td>
                                <td>受赏人</td>
                                <td>金额（牛币）</td>
                                <td>优惠（牛币）</td>
                                <td>实付款（牛币）</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>观点</td>
                                <td><span>{{orderName}}</span></td>
                                <td>{{teacherName}}</td>
                                <td>{{totalPrice}}</td>
                                <td>{{discount_price}}</td>
                                <td>{{actual_price}}</td>
                            </tr>
                        </tbody>
                        {{/if}} {{if goodsType ==1}}
                        <thead>
                            <tr>
                                <td>类型</td>
                                <td>名称</td>
                                <td>创建人</td>
                                <td>目标收益</td>
                                <td>金额（牛币）</td>
                                <td>优惠（牛币）</td>
                                <td>实付款（牛币）</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>组合</td>
                                <td><span>{{orderName}}</span></td>
                                <td>{{teacherName}}</td>
                                <td></td>
                                <td>{{totalPrice}}</td>
                                <td>{{discount_price}}</td>
                                <td>{{actual_price}}</td>
                            </tr>
                        </tbody>
                        {{/if}} {{if goodsType ==2}}
                        <thead>
                            <tr>
                                <td>类型</td>
                                <td>名称</td>
                                <td>创建人</td>
                                <td>金额（牛币）</td>
                                <td>优惠（牛币）</td>
                                <td>实付款（牛币）</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>课程</td>
                                <td><span>{{orderName}}</span></td>
                                <td>{{teacherName}}</td>
                                <td>{{totalPrice}}</td>
                                <td>{{discount_price}}</td>
                                <td>{{actual_price}}</td>
                            </tr>
                        </tbody>
                        {{/if}} {{if goodsType ==3}}
                        <thead>
                            <tr>
                                <td>类型</td>
                                <td>名称</td>
                                <td>创建人</td>
                                <td>金额（牛币）</td>
                                <td>优惠（牛币）</td>
                                <td>实付款（牛币）</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>内参</td>
                                <td><span>{{orderName}}</span></td>
                                <td>{{teacherName}}</td>
                                <td>{{totalPrice}}</td>
                                <td>{{discount_price}}</td>
                                <td>{{actual_price}}</td>
                            </tr>
                        </tbody>
                        {{/if}} {{if goodsType ==4}}
                        <thead>
                            <tr>
                                <td>类型</td>
                                <td>名称</td>
                                <td>创建人</td>
                                <td>金额（牛币）</td>
                                <td>优惠（牛币）</td>
                                <td>实付款（牛币）</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>问股</td>
                                <td><span>{{orderName}}</span></td>
                                <td>{{teacherName}}</td>
                                <td>{{totalPrice}}</td>
                                <td>{{discount_price}}</td>
                                <td>{{actual_price}}</td>
                            </tr>
                        </tbody>
                        {{/if}} {{if goodsType ==5}}
                        <thead>
                            <tr>
                                <td>类型</td>
                                <td>名称</td>
                                <td>创建人</td>
                                <td>金额（牛币）</td>
                                <td>优惠（牛币）</td>
                                <td>实付款（牛币）</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>直播</td>
                                <td><span>{{orderName}}</span></td>
                                <td>{{teacherName}}</td>
                                <td>{{totalPrice}}</td>
                                <td>{{discount_price}}</td>
                                <td>{{actual_price}}</td>
                            </tr>
                        </tbody>
                        {{/if}}
                    </table>
                </script>
                <script src="/public/js/highcharts.js"></script>
                <script src="/public/source/yncommon.min.js"></script>
                <script src="/public/bundle/indent.bundle.js?00010"></script>
    </body>

    </html>