
<!-- USE -->
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
  	<%@ include file="/WEB-INF/jsp/manage/common/common.jspf" %>
    <link rel="stylesheet" href="/public/css/yncalendar.css">
    <style>
      .hid{display:none;}
      #indent{padding:15px;width:90%;}
      #recharge .deposit-wrap{
        margin-top:35px;
      }
      #recharge .deposit-wrap table{
          width:100%;
      }
      #recharge .deposit-wrap thead{
        background:#f5f5f5;
        color:rgb(30,30,30);
      }
      #recharge .deposit-wrap tbody{
        color:rgb(90,90,90);
      }
      #recharge .deposit-wrap td{
        text-indent:10px;
      }
      #recharge .deposit-wrap tr{
        border-bottom:1px solid #e1e2e7;
        line-height:40px;
      }
      #recharge .deposit-wrap .operate{
        color:#579dfe;
        cursor:pointer;
      }
      #recharge .deposit-wrap .operate:hover{
        text-decoration:underline;
      }
      #rechargetable{
        z-index:1;
        width:500px;
        color:rgb(90,90,90);
        padding:20px;
        position:fixed;
        border:1px solid rgb(200,200,200);
        background:white;
        border-radius:6px;
      }
      #rechargetable > .close{
        font-size:28px;
        position:absolute;
        right:5px;
        top:5px;
        cursor:pointer;
      }
      #rechargetable .status span{
        color:rgb(30,30,30);
          margin-right:30px;
          font-size:18px;
      }
      #rechargetable p{
        line-height:28px;
      }
      #indent .inquire-indent{
        margin-top:15px;
      }
      #indent .inquire-indent table{
        width:100%;
        color:rgb(30,30,30);
        line-height:22px;
      }
      #indent .txtbox{
        text-align:center;
        border:1px solid #c7c7c7;
        height:24px;
        line-height:24px;
        font-size: 13px;
        width:118px;
        border-radius:3px;
        margin:0 5px;
          -webkit-transition: box-shadow .2s linear;
          transition: box-shadow .2s linear;
      }
      #indent .inquire-indent select{
        border:1px solid #c7c7c7;
        color:rgb(90,90,90);
        border-radius:3px;
        font-size:14px;
        line-height:24px;
        height:24px;
        transition:box-show .2s linear;
        background:rgb(250,250,250);
        width:60px;
      }
      #indent .inquire-indent .inquire-btn{
        color:#fff;
        display:inline-block;
        padding:0 3px;
        background:#f00029;
        border-radius:4px;
        cursor:pointer;
      }
      
      #indentable{
        z-index:1;
        color:rgb(90,90,90);
        padding:20px;
        position:fixed;
        border:1px solid rgb(200,200,200);
        background:white;
        width:885px;
        border-radius:6px;
      }
      #indentable > .close{
        font-size:28px;
        position:absolute;
        right:5px;
        top:5px;
        cursor:pointer;
      }
      #indentable .indent-status span{
        color:rgb(30,30,30);
          margin-right:30px;
          font-size:18px;
      }
      #indentable p{
        line-height:35px;
      }
      #indentable table{
        margin-top:20px;
        width:100%;
        color:rgb(30,30,30);
      }
      #indentable table tr{
        text-align:center;
        line-height:40px;
        border-top:1px solid #eaebec;
        border-bottom:1px solid #eaebec;
      }
    </style>
	</head>
  <body>
      <div id="indent">
        <div class="myicome-type bootpag" id="recharge">
            <div class="inquire-indent">
              <form id="parameter">
                  <table>
                      <tbody>
                          <tr>
                              <td>日期<input id="startTime" autocomplete="off" name="startTime" type="text" class="txtbox showdate texts">至<input id="endTime" autocomplete="off" name="endTime" type="text" class="txtbox showdate texts"></td>
                              <td>充值方式
                                  <select id="pay_type" name="payMode">
                                      <option value="">全部</option>
                                      <option value="1">支付宝</option>
                                      <option value="2">微信</option>
                                      <option value="3">IOS平台支付</option>
                                      <option value="4">余额支付（虚拟币）</option>
                                      <option value="5">转账</option>
                                      <option value="6">后台</option>
                                  </select>
                              </td>
                              <td>充值状态
                                  <select id="pay_status" name="status">
                                      <option value="">全部</option>
                                      <option value="0">未支付</option>
                                      <option value="1">已支付</option>
                                      <option value="2">已取消</option>
                                      <option value="3">申请退款</option>
                                      <option value="4">退款成功</option>
                                      <option value="5">订单关闭</option>
                                  </select>
                              </td>
                              <td>流水号:<input type="text" id="pay_num" class="txtbox showdate texts" name="orderNum" />
                                  <span class="inquire-btn">查询</span>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </form>
            </div>
            <div class="deposit-wrap">
                <table>
                    <thead>
                        <tr>
                            <td>充值方式</td>
                            <td>充值金额</td>
                            <td>充值时间</td>
                            <td>充值状态</td>
                            <td>充值用户</td>
                            <td>流水号</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody id="payrecord">
                        
                    </tbody>
                </table>
            </div>
        </div>
      </div>
      <div id="rechargetable" class="hid">
          
      </div>
      
      <script type="text/html" id="payrecord-template">
      {{each}}
          <tr>
              <td>{{$value.payMode}}</td>
              <td>{{$value.totalPrice}}</td>
              <td>{{$value.orderTime}}</td>
              <td>{{$value.orderState}}</td>
              <td>{{$value.nickname}}</td>
              <td>{{$value.orderNum}}</td>
              <td><span class="operate" data-num="{{$value.orderNum}}">详情</span></td>
          </tr>
      {{/each}}
      </script>
      <script type="text/html" id="rechargetable-template">
          <i class="close fa fa-times-circle"></i>
          <p class="status"><span>充值详情</span><font color="#e20000" size="4">状态：{{orderState}}</font></p>
          <p>本次充值：¥<span>{{actual_price}}</span>牛币</p>
          <p>消费金额：¥<span>{{totalPrice}}</span></p>
          <p>充值方式：<span>{{payMode}}</span></p>
          <p>充值时间：<span>{{orderTime}}</span></p>
          <p>流水号:<span>{{orderNum}}</span></p>
      </script>
      <script src="/public/source/yncommon.min.js"></script>
      <script src="/public/bundle/voucher.bundle.js?0000014"></script>
  </body>
</html>
 