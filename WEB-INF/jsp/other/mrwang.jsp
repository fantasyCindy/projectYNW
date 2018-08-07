<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
path = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
pageContext.setAttribute("path", path);

%>
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-cn">

    <head>
            <title>约投顾，跟专业投顾一起炒股</title>
            <meta name="description" content="我在约投顾跟着牛人炒股，邀请你一起赚钱-约投顾！
邀请小伙伴来约投顾，双方都可获得牛人内参，立即行动吧！" />
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
                *{
                    padding:0;
                    margin:0;
                }
                body{
                    width:100%;
                    font-family:'微软雅黑';
                    background:#f9543e;
                }
               #app-refer-activity{
                    max-width:800px;
                    margin: 0 auto;
                    background:#f9543e;
                    padding-bottom:15%;
                }
                img{
                    width:100%;
                    display:block;
                    margin:0 auto;
                }
               .refer-activity-top img{
                    width:100%;
                }
                .refer-activity-invite{
                    margin-top:20px;
                }
                .refer-activity-invite img{
                    width:98%;
                }
                .refer-activity-btn {
                    margin-top:30px;
                    width:100%;
                    position:relative;
                }
                .refer-activity-content{
                     position:absolute;
                    width:80%;
                    left:50%;
                    margin-left:-40%;
                    top:30%;
                }
                .refer-phoneNum{
                    border-radius:4px;
                    overflow:hidden;
                    border:1px solid #A83D05;
                }
                .refer-phoneNum input{
                    display:block;
                    width:100%;
                    height:35px;
                    border:none;
                    background:#fdedd5;
                    padding-left:10px;
                }
                
                .phone-err{
                    color:red;
                    font-size:13px;
                    display:none;
                }
                .refer-activity-btn img{
                    width:98%;
                }
                .refer-activity-introduce{
                    margin-top:30px;
                }
                .refer-activity-introduce img{
                    width:98%;
                }
                .refer-receive{
                    width:80%;
                    margin:0 auto;
                    margin-top:10px;
                }
                .app-download-win{
                    width:100%;
                    height:100%;
                    background:rgba(0,0,0,0.5);
                    position:fixed;
                    top:0;
                    left:0;
                    display:none;
                }
                .app-download-content{
                    width:90%;
                    /* height:33%; */
                    background:#fff;
                    border-radius:5px;
                    position:absolute;
                    bottom:30%;
                    left:50%;
                    margin-left:-45%;
                    padding-bottom:30px;
                }
                .app-download-text{
                    width:80%;
                    margin:20px auto;
                    color:red;
                    text-align:center;
                }
                .app-download-btn{
                    width:60%;
                    height:40px;
                    background:#eeeded;
                    border:1px solid #999;
                    text-align:center;
                    line-height:40px;
                    margin: 0 auto;
                    border-radius:2px;
                    color:#777474;
                }
                .phone-err-wrap{
                    height:20px;
                    margin-top:5px;
                }
            </style>
    </head>

    <body>
       <div id="app-refer-activity">
        <div class="refer-activity-top"><img src="/public/images/app-activity/tou_gu.jpg" alt=""></div>
        <div class="refer-activity-invite"><img src="/public/images/app-activity/nei_can.png" alt=""></div>
        <div class="refer-activity-btn"><img src="/public/images/app-activity/huo_dong.png" alt="">
        <div class="refer-activity-content">
            <div class="refer-phoneNum"><input type="text" placeholder="绑定手机号，和好友一起免费领内参"></div>
            <div class="phone-err-wrap">
                <div class="phone-err-1 phone-err">该手机号错误，请重新输入</div>
                <div class="phone-err-2 phone-err">号码已助力，可在APP上直接注册</div>
                <div class="phone-err-3 phone-err">账号已经注册</div>
            </div>
            <div class="refer-receive"><img src="/public/images/app-activity/button.png" alt=""></div>
        </div>
        </div>
        <div class="refer-activity-introduce"><img src="/public/images/app-activity/yue_tou_gu.png" alt=""></div>
        
       <%-- 弹窗 --%>
            <div class="app-download-win">
                <div class="app-download-content">
                    <div class="app-download-text">用此手机号在APP完成注册后，您和好友都将获得一份股票投资内参7天免费使用权限！</div>
                    <div class="app-download-btn">立即下载（<span class="app-download-count">3</span>s）</div>
                </div>
            </div>
       </div>
        <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
        <script>
        var path = '${path}'
        var href = window.location.href;
        var match = href.match(/\?userid=([0-9]+)/)
        var matcha = href.match(/\&source=([0-9])/)
        var userid = match ? match[1] : ''
        var source = matcha ? matcha[1] : ''
        console.log("=userid==",userid)
        console.log("=source==",source)
       var event = (function(){
           var container, btn, wrap
           return {
               init: function(){
                container = $('#app-refer-activity')
                btn = container.find('.refer-receive')
                wrap = container.find('.app-download-win')
                err = container.find('.phone-err-wrap')
                //立即领取
                btn.on('click',function(){
                    var val = container.find('.refer-phoneNum input').val().trim()
                    if(!/^1[34578][0-9]{9}$/.test(val)){
                        err.find('.phone-err').hide()
                        err.find('.phone-err-1').show()
                        return
                    }
                    if(!userid || !source) return alert('参数错误')
                    var params = {
                        phone: val,
                        userid: userid,
                        source : source
                    }
                    $.post(path + '/user/addSharePhone.htm',params,function(back){
                        if(back.status == 30009){
                        err.find('.phone-err').hide()
                            err.find('.phone-err-2').show()
                            return 
                        }else if(back.status == 30004){
                        err.find('.phone-err').hide()
                            err.find('.phone-err-3').show()
                            return 
                        }else if(back.status == 1){
                           downloadWin.render()
                        }
                    },'json')
                })
               }
           }
       })()

       var downloadWin = (function(){
           var container, count
           return {
               init: function(){
                   container = $('.app-download-win')
                   count = container.find('.app-download-count')
               },
               render: function(){
                   container.show()
                   
                //隐藏弹窗
                container.on('click', function(){
                    $(this).hide()
                    count.text(3)
                    clearInterval(timer)
                })
                   container.on('click','.app-download-btn',function(){
                       window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yueniuwang.yueniu'
                   })
                   var val = count.text()
                   var timer = setInterval(function(){
                       if(val == 1){
                           clearInterval(timer)
                           window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yueniuwang.yueniu'
                       }else if(val > 0){
                           --val
                           count.text(val)
                       }
                   },1000)
               }
           }
       })()

       $(function(){
           event.init()
           downloadWin.init()
       })
        </script>
    </body>

    </html>
