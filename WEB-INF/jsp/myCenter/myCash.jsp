<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>

    <head>
    		<%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
    		<title>约投顾—股票行情|股市分析|股民学习|入门基础知识|开户交易|走势图查询|炒股APP投资软件下载|直播室在线|分析师大盘解析|万人股票行情交互社区官网</title>
        	<%@ include file="../common/front-common.jspf"%>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <link rel="stylesheet" href="/private/backstage/css/backstage.css">
            <link rel="stylesheet" href="/private/myCenter/css/myCash.css">
            <link rel="stylesheet" href="/public/css/yncalendar.css">
            <body>
                <%@include file="../common/front-head.jsp"%>
                    <div id="customeStock">
                        <div class="container">
                             <%@ include file="../backstage/_menu.jsp"%>   
                            <!---->
                            <div class="right">
                            	<div id="myCash">
                            	    <div id="deposit">
                            	        <div class="titlebar">
	                            	    	<span class="title-1">提现</span>
	                            	    	<span class="check-log fr">查看提现记录</span>
                            	    	</div>
                                        <p class="deposit-type">请选择提现方式：<span class="thisclass" data-type="bank">银行卡</span><span data-type="alipay">支付宝</span><span data-type="wechat">微信</span></p>
                                        <div class="pattern">
	                                        <form id="form1" data-type="bank">
	                                        	<table>
	                                        		<tbody>
	                                        			<tr>
	                                        				<td align="right">银行：</td>
	                                        				<td>
	                                        				    <select class="bank">
	                                        				    	<option>中国建设银行</option>
	                                        				    	<option>中国工商银行</option>
	                                        				    	<option>中国农业银行</option>
	                                        				    	<option>中国农商银行</option>
	                                        				    </select>
	                                        				</td>
	                                        			</tr>
	                                        			<tr>
	                                        				<td align="right">银行卡号：</td>
	                                        				<td><input type="text" placeholder="填写正确的银行卡卡号" /></td>
	                                        			</tr>
	                                        			<tr>
	                                        				<td align="right">开户行：</td>
	                                        				<td><input type="text" placeholder="请填写正确的开户行地址" /></td>
	                                        			</tr>
	                                        			<tr>
	                                        				<td align="right">持卡人姓名：</td>
	                                        				<td><input type="text" placeholder="请填写正确的姓名" /></td>
	                                        			</tr>
	                                        		</tbody>
	                                        	</table>
	                                        </form>
	                                        <form id="form2" data-type="alipay" class="hid">
	                                        	<table>
	                                        		<tbody>
	                                        			<tr>
	                                        				<td align="right">支付宝帐号：</td>
	                                        				<td><input type="text" placeholder="请填写正确的支付宝帐号" /></td>
	                                        			</tr>
	                                        			<tr>
	                                        				<td align="right">姓名：</td>
	                                        				<td><input type="text" placeholder="填写实名认证姓名" /></td>
	                                        			</tr>
	                                        		</tbody>
	                                        	</table>
	                                        </form>
	                                        <form id="form3" data-type="wechat" class="hid">
	                                        	<table>
	                                        		<tbody>
	                                        			<tr>
	                                        				<td align="right">微信帐号：</td>
	                                        				<td><input type="text" placeholder="请填写正确的微信帐号" /></td>
	                                        			</tr>
	                                        			<tr>
	                                        				<td align="right">绑定手机号：</td>
	                                        				<td><input type="text" placeholder="填写正确的手机号" /></td>
	                                        			</tr>
	                                        			<tr>
	                                        				<td align="right">微信昵称：</td>
	                                        				<td><input type="text" placeholder="填写正确的微信昵称" /></td>
	                                        			</tr>
	                                        		</tbody>
	                                        	</table>
	                                        </form>
                                        </div>
                                        <div class="deposit-money">
	                                        <p>
	                                        	<span>提现金额：<input type="text" placeholder="输入金额" />元<span>
	                                        	<font color="#e20000">提示：</font>
	                                        	<span class="balance">当前账户余额为1000牛币，扣除平台分成300元，可提现700元。</span>
	                                        </p>
	                                        <span class="deposit-btn">确定</span>
                                        </div>
                            	    </div>
                            	    <div id="deposit-log" class="hid">
                            	        <p class="return"><span class="return-btn"><返回</span></p>
                            	    	<div class="inquire-indent">
		                        			<table>
		                        				<tbody>
		                        					<tr>
		                        						<td>日期<input id="depositstartTime" autocomplete="off" name="depositstartTime1" type="text" class="txtbox showdate texts">至<input id="depositendTime" autocomplete="off" name="depositendTime1" type="text" class="txtbox showdate texts"></td>
		                        						<td>提现类型
		                                                    <select>
		                                                    	<option>全部</option>
		                                                    </select>
		                        						</td>
		                        						<td>提现状态
		                                                    <select>
		                                                    	<option>全部</option>
		                                                    </select>
		                        						</td>
		                        						<td>流水号:<input type="text" class="txtbox showdate texts" />
		                                                    <span class="inquire-btn">查询</span>
		                        						</td>
		                        					</tr>
		                        				</tbody>
		                        			</table>
		                        		</div>
		                        		<div class="deposit-wrap">
			                        		<table>
			                        			<thead>
			                        				<tr>
			                        					<td>提现金额（元）</td>
			                        					<td>提现类型</td>
			                        					<td>申请时间</td>
			                        					<td>提现状态</td>
			                        					<td>流水号</td>
			                        					<td>操作</td>
			                        				</tr>
			                        			</thead>
			                        			<tbody>
			                        				<tr>
			                        					<td>999.00</td>
			                        					<td>银行卡</td>
			                        					<td>2016-07-28</td>
			                        					<td>待审核</td>
			                        					<td>201607250927404327</td>
			                        					<td><span class="operate">详情</span></td>
			                        				</tr>
			                        			</tbody>
			                        		</table>
		                        		</div>
                            	    </div>
                            	</div>
                            </div>
                        </div>
                    </div>
                   
                    <!-- footer -->
                    <%@include file="../common/front-foot.jsp"%>
                    <script src="/public/source/myCash.js"></script>
            </body>

    </html>