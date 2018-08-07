<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
        <%@ include file="/WEB-INF/jsp/common/seo.jspf" %>
            <title>约投顾，让股民与牛人相约</title>
            <%@ include file="../v2/front-common-v2.jspf" %>
                <style>
                body {
                    background: #fff;
                }
                
                #security {
                    width: 1200px;
                    margin: 18px auto 170px;
                }
                
                .red {
                    color: #d72621;
                }
                
                .security-title {
                    padding: 0 0 10px;
                    color: #999;
                }
                
                .security-title a {
                    color: #999;
                }
                
                .security-con {
                    color: #3a3a3a;
                    line-height: 26px;
                    font-weight: bold;
                    padding: 50px;
                    background: url(/public/images/composite/bgsecurity.jpg) no-repeat;
                    height: 456px;
                }
                
                .s-c-title {
                    text-align: center;
                    margin: 25px 0 22px;
                }
                
                .relative {
                    position: relative;
                    margin-bottom: 30px;
                }
                
                .relative1 {
                    margin: 30px 0 15px 0;
                }

                .relative .error {
                    position: absolute;
                    top: 0;
                    left: 315px;
                    color: #d72621;
                    font-weight: normal;
                }
                
                .relative .yes {
                    position: absolute;
                    top: 0;
                    left: 315px;
                    color: #49bc68;
                    font-weight: normal;
                }
                
                .relative input {
                    padding: 5px;
                    border:1px solid rgb(206, 206, 206);
                }
                
                .relative .icon {
                    width: 20px;
                    height: 20px;
                    background: url(/public/images/composite/error.png) no-repeat center;
                    display: inline-block;
                    background-size: 18px;
                    margin-right: 4px;
                    position: relative;
                    top: 5px;
                }
                
                .relative .yes .icon {
                    background: url(/public/images/composite/yes.png) no-repeat center;
                    background-size: 16px;
                }
                
                .relative .query {
                    background: #ccc;
                    padding: 1px 10px;
                    display: inline-block;
                    cursor: pointer;
                    user-select: none;
                }
                .select{
                    border:1px solid rgb(206, 206, 206);
                    padding: 4px;
                }
                .province{
                    position: relative;
                    top: 0;
                }
                .relative1 .yes{
                    left: 470px;
                }
                .relative1 .error{
                    left: 470px;
                }
                </style>
    </head>

    <body>
        <%@include file="../v2/front-head-v2.jsp" %>
            <div id="security">
                <p class="security-title">
                    <a href="http://www.yuetougu.com">首页</a> &gt;
                    <span>防伪验证</span>
                </p>
                <div class="security-con">
                    <h2 class="s-c-title">云南产业电话防伪验证说明</h2>
                    <p>尊敬的投资者，近期有不法分子冒充我们公司进行非法证券咨询活动，此种诈骗行为严重损害了我公司权益和客户利益，敬请广大投资者注意，为慎防投资者受骗，可在以下文本框中输入电话号码：</p>
                    <div class="relative relative1">
                        <span>电话号码：</span>
                        <select class="province select">
                            <option value="010">北京公司</option>
                            <option value="0871">云南公司</option>
                            <option value="0371">河南公司</option>
                            <option value="0791">南昌公司</option>
                        </select>
                        <select class="zoneCode select">
                            <option value="010">010</option>
                            <option value="0871">0871</option>
                            <option value="0371">0371</option>
                            <option value="0791">0791</option>
                        </select>
                        <input type="text" placeholder="请输入7或8位电话号码" class="code phone" />
                        <span class="query query1">查询</span>
                        <span class="error hide"><i class="icon"></i>该号码不是约投顾的工作电话，慎防假冒！</span>
                        <span class="yes hide"><i class="icon"></i>该号码是我们约投顾的工作电话，请放心使用！</span>
                    </div>
                    <div class="relative relative2 hide">
                        <span>微信号码：</span>
                        <input type="text" placeholder="请输入微信号码" class="code wx" />
                        <span class="query query2">查询</span>
                        <span class="error hide"><i class="icon"></i>该号码不是约投顾的工作电话/微信号码，慎防假冒！</span>
                        <span class="yes hide"><i class="icon"></i>该号码是我们约投顾的工作电话/微信号码，请放心使用！</span>
                    </div>
                    <p>我公司是首批经中国证监会认证的证券投资咨询机构（ZX0093），本公司承诺提供专业咨询服务，但不承诺投资者获取投资收益，也不与投资者约定分享投资收益或分担投资损失。市场有风险，投资需谨慎。如您有任何疑问，请及时与我们的客服专员联系或拨打<span class="red">云南产业服务监督热线 400-0000-577</span> 确认，祝您投资成功！</p>
                </div>
            </div>
            <%@ include file="../common/front-foot.jsp" %>
                <script type="text/javascript">
                $(function() {
                    var yes = $('.yes')
                    var error = $('.error')
                    var province = $('.province')
                    var zoneCode = $('.zoneCode')
                    province.change(function(){
                        var selected = $(this).val()
                        zoneCode.val(selected)
                    })
                    zoneCode.change(function(){
                        var selected = $(this).val()
                        province.val(selected)
                    })
                    
                    $('.query').click(function() {
                        var self = $(this)
                        var zcode = _.trim($(this).prev('.wx').val())
                        var phonecode = _.trim($(this).prev('.phone').val())
                        error.hide()
                        yes.hide()
                        if($(this).hasClass('query1')){
                            var zxcode = zoneCode.val()
                            if(!phonecode){
                                return layer.msg('输入的内容不能为空')
                            }
                            if(phonecode.length !=7 && phonecode.length !=8){
                                return layer.msg('请输入7或8位电话号码')
                            }

                            phonecode = zxcode + '-' + phonecode
                        }else{
                            if(!zcode){
                                return layer.msg('输入的内容不能为空')
                            }
                        }  
                           
                        $.getJSON('/employee/getComparisonDetail.htm', {
                            phone: phonecode,
                            wechat_number:zcode,
                        }, function(back) {
                            if (+back.status == 1) {
                                return self.nextAll('.yes').show()
                            }
                            if (+back.status == 30011) {
                                return self.nextAll('.error').show()
                            }
                        }, 'json')
                    })
                })

                </script>
    </body>

    </html>
