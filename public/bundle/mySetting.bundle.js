!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="/public/bundle/",e(0)}([function(t,e,n){"use strict";function i(t){t=_.extend({userid:ynUserId});var e=$.Deferred();return $.getJSON("/center/queryUserInfo.htm",{user_id:t.userid},function(t){1==t.status&&(e.resolve(t),void 0===t.data.specialtys&&(t.data.specialtys=[]))}),e.promise()}function r(t,e){if(!yn.isMobile(e))return void layer.alert("请输入正确手机号码");t.html("<span id='sendCount'>60</span>秒后可以再次获取!"),t.removeClass("sendbefore").addClass("sendafter");var n=t.css("background-color"),i=t.css("border-color");t.css({background:"gray","border-color":"gray"}),t.get(0).disabled=!0;var r=setInterval(function(){var e=$("#sendCount"),o=Number(e.text());o>1?(o--,e.text(o)):(t.get(0).disabled=!1,t.html("获取手机验证码"),t.css({"background-color":n,"border-color":i}),clearInterval(r))},1e3);$.post("/sendPhoneCode.htm",{phone:e,source:1},function(t){return t=JSON.parse(t),20012==t.status?layer.msg("短信发送失败，请重试!"):30002==t.status?layer.msg("图片验证码错误"):void 0})}function o(t){var e=$.Deferred();return $.getJSON("/address/queryCity.htm?parentid="+t,function(t){if(1==t.status){var n="";_.forEach(t.data,function(t){n+='<option value="'+t.address_id+'">'+t.address_name+"</option>"}),e.resolve(n)}}),e.promise()}function a(){var t=$.Deferred();return $.getJSON("/investmenttypes/select.htm",function(e){t.resolve(e)}),t.promise()}function s(){var t=$.Deferred();return $.getJSON("/center/specialty.htm",function(e){return 1!=e.status?layer.msg(l[e.status]):void t.resolve(e.data)}),t.promise()}n(1);var c=n(2),d=c.getInstance(),l=n(7);$(function(){yn.centerMenu.init({render:"my",light:"我的资料"});var t={container:$("#personInfoBar"),titleBar:$(".titleBar"),condition:$("#signCondition"),passWord:$("#modifyPassword"),data:null,init:function(){this.event(),this.render()},render:function(){var t=this;e.container.hide(),i().done(function(e){t.container.show().html(template("personInfoBar-template",e.data)),t.data=e.data})},event:function(){var t=this;this.container.on("click",".editButton",function(){t.container.hide(),e.render(t.data)}),this.titleBar.on("click","td",function(){$(this).parent().find(".select").removeClass("select"),$(this).addClass("select");var n=$(this).data("show");"signCondition"==n&&(t.container.hide(),t.passWord.hide(),t.condition.show(),e.container.hide()),"personInfoBar"==n&&(t.container.show(),t.passWord.hide(),t.condition.hide()),"modifyPassword"==n&&(t.passWord.show(),t.container.hide(),t.condition.hide(),e.container.hide())})}},e={container:$("#teacherRegister"),data:null,favicons:$(".favicons img"),username:$("#txtUserName"),phone:$("#txtMobile"),qq:$("#txtQQ"),mail:$("#txtMail"),province:$("#select-province"),city:$("#select-city"),labelList:$("#labelList"),textarea:$("#personalInfo"),modify:$("#btnModify"),modifyState:1,submit:$("#btnSave"),faviconBtn:$("#modifyFaviconBtn"),investType:$("#investType"),init:function(){this.event(),yn.wordCount(this.textarea,{limit:350,indicate:$(".wordCount .value")})},event:function(){var e=this;this.container.on("click","#btnCancel",function(){e.container.hide(),t.render()}),this.modify.click(function(){return 1===e.modifyState&&$(this).text("获取验证码"),2===e.modifyState?void r($(this),e.phone.val()):void(e.modifyState+=1)}),this.labelList.on("click","li",function(){$(this).toggleClass("checked")}),this.investType.on("click","li",function(){$(this).toggleClass("checked")}),this.faviconBtn.click(function(){d.render({width:200,height:200}),d.onCrop=function(t){var n={dataImg:t,updateEntity:!0,user_id:ynUserId};$.post("/auth/user/headImgUpload.htm",n,function(t){if(t.status="1"){var n=t.data.photo_path;e.favicons.attr("src",n)}},"json")}}),this.province.change(function(){var t=$(this).val();o(t).done(function(t){e.city.html(t)})}),this.submit.click(function(){var t=function(){var t=_.trim(e.username.val());return/[0-9a-zA-Z\u4E00-\u9FA5]+/.test(t)&&t.length>1&&t.length<13}();if(!t)return void layer.msg("请输入有效的昵称");var n=e.qq.val().trim();if(!/^[1-9][0-9]{5,10}$/.test(n))return void layer.msg("QQ号输入错误");var i=e.phone.val().trim();if(!yn.isMobile(i))return layer.msg("手机号输入错误");var r={user_id:ynUserId,username:$.trim(e.username.val()),sex:$("input[name='sex']:checked").val(),phone:e.phone.val(),qq:e.qq.val(),email:e.mail.val(),provinceid:e.province.val(),cityid:e.city.val(),teacherid:e.data.teacherid,description:e.textarea.val().replace("\\t\\n",""),photo:e.favicons.eq(0).attr("src"),investment_style:e.investType.find(".checked").data("id"),specialtyList:function(){var t="";return e.labelList.find("li.checked").each(function(){var e=$(this).data("id");t+=e+","}),t}()};$.post("/center/user/edit.htm",r,function(t){return t=JSON.parse(t),1!=t.status?layer.msg(l[t.status]):(layer.msg("保存成功"),void setTimeout(function(){window.location.reload()},1e3))})})},render:function(t){this.data=t,this.container.show(),this.insert()},insert:function(){var t=this,e=this.data;this.favicons.attr("src",e.user_photo),this.username.val(e.username),"1"==e.sex?$("#sex-male").attr("checked","true"):$("#sex-female").attr("checked","true"),this.phone.val(e.phone).attr("disabled","false"),this.qq.val(e.qq),this.mail.val(e.email),this.province.val(e.provinceid),e.provinceid&&o(e.provinceid).done(function(n){t.city.html(n),e.cityid&&t.city.val(e.cityid)}),a().done(function(n){if(1==n.status){var i="",r="";_.forEach(n.data,function(t){r=e.investment_name==t.investment_name?"checked":"",i+='<li class="'+r+'" data-id="'+t.id+'">'+t.investment_name+"</li>"}),t.investType.html(i)}}),s().done(function(n){var i="";_.forEach(n,function(t){var n="";_.forEach(e.specialtys,function(e){+e.id==+t.id&&(n="checked")}),i+='<li class="'+n+'" data-id="'+t.id+'">'+t.name+"</li>"}),t.labelList.html(i)}),this.textarea.val($.trim(e.description))}};t.init(),e.init(),u.init(),u.event()});var u=function(){var t,e,n,i,r,o,a;return{init:function(){t=$("#customeStock"),e=$("#old"),n=$("#new"),i=$("#confirm"),r=$(".submit")},event:function(){r.on("click",function(){if(!_.trim(e.val()))return layer.msg("原密码不能为空");if(!_.trim(n.val()))return layer.msg("新密码不能为空");if(!_.trim(i.val()))return layer.msg("确认密码不能为空");if(o=/^[a-zA-Z0-9_]{6,}/.test(_.trim(n.val())),a=_.trim(n.val())===_.trim(i.val()),!o)return layer.msg("新密码格式错误");if(!a)return layer.msg("两次密码不一致");var r={user_id:ynUserId,oldPassword:_.trim(e.val()),newPassword:_.trim(n.val())};$.post("/auth/user/editPassword.htm",r,function(e){return"1"!=e.status?layer.msg(l[e.status]):(layer.msg("修改成功"),void t.find("input").val(""))},"json")})}}}()},function(t,e){"use strict";yn.navigation.name=ynconfig.navigation.g,yn.logout.path=__path,ynIsLogin||(setTimeout(function(){yn.login.render()},100),yn.login.onClose=function(){location.href=__path}),yn.centerMenu=function(){var t,e,n,i,r=function(t){return _.map(t,function(t){var e=_.trim(t.menuname)==i?"select":"";return'<a class="item '+e+'" id="'+t.menu_id+' " href="/'+t.menuurl+'">\n                    <span class="txt ">'+t.menuname+'</span>\n                    <i class="fa fa-angle-right "></i>\n                </a>'}).join("")};return{init:function(r){t=$("#centerMenu"),e=t.find(".items"),n=t.find(".title .name"),i=r.light||"",r.render&&this.render({type:r.render})},render:function(t){t=_.extend({type:"center"},t);var i={center:{title:"个人设置",url:"/menu/queryWebUserMenu.htm"},my:{title:"个人中心",url:"/menu/queryWebUserMyMenu.htm"}},o=i[t.type],a=o.url;n.text(o.title),new yn.loading({container:e,margin:200}).render(),$.getJSON(a,{user_id:ynUserId},function(t){return e.html(r(t))})}}}()},function(t,e,n){"use strict";n(3),t.exports=function(){var t,e=function(){var e,n,r,o,a,s,c,d={width:160,height:90};$("body").append(i(d)),e=$("#myCropper-overlay"),e.height($(window).height()),n=$("#myCropper"),c=document.getElementById("myCropper-canvas");var l=c.getContext("2d"),u=new FileReader,p=n.find(".myCropper-btn-choose"),f=n.find(".myCropper-btn-upload");s=n.find(".myCropper-origin-image"),a=$("#myCropper-input-choose"),o=$(".myCropper-result-image"),r=n.find(".myCropper-content"),p.click(function(){a.click(),r.show(),h()}),e.on("click",".close",function(){return e.hide()&&h()}),a.change(function(t){var e=this.files[0];u.readAsDataURL(e)});var h=function(){$(c).data("state","no"),a.val(""),s.attr("src","").cropper("destroy"),l.clearRect(0,0,d.width,d.height),o.attr("src","")};return f.click(function(){if("no"==$(c).data("state"))return layer.msg("请先选择图片");var e=c.toDataURL();t.hide(),h(),t.onCrop(e)}),u.onload=function(t){var e=t.target.result,n="free"==d.ratio?NaN:d.width/d.height;s.attr("src",e).cropper({aspectRatio:n,viewMode:1,crop:function(t){l.clearRect(0,0,d.width,d.height),l.drawImage($(this)[0],t.x,t.y,t.width,t.height,0,0,d.width,d.height),$(c).data("state","yes")}})},{render:function(t){_.extend(d,t),c.width=t.width,c.height=t.height,e.show()},hide:function(){return e.hide()},onCrop:function(){return console.log("onCrop回调方法没有实现")}}};return{getInstance:function(){return t||(t=e()),t}}}();var i=function(t){return'<div id="myCropper-overlay" class="hide">\n<div id="myCropper" class="line crop relative">\n    <span class="fa fa-times-circle absolute close"></span>\n    <div class="title">\n        <span class="myCropper-title">图片上传</span>\n    </div>\n    <div class="myCropper-content">\n        <div class="myCropper-content-left fl">  \n            <div class="myCropper-content-title">\n                <button class="myCropper-btn-choose btn">+选择图片</button>\n                <input type="file" class="hide" id="myCropper-input-choose" />\n            </div>\n            <div class="myCropper-origin">\n                <img class="myCropper-origin-image" style="max-width: 100%" />\n            </div>\n        </div>\n        <div class="myCropper-content-right fl">\n            <div class="title">图片预览</div>\n            <div class="thumb">\n                <canvas id="myCropper-canvas" width="'+t.width+'" height="'+t.height+'" data-state="no"></canvas>\n            </div>\n            <button class="myCropper-btn-upload btn">上传图片</button>\n        </div>\n    </div></div></div>'}},function(t,e,n){var i=n(4);"string"==typeof i&&(i=[[t.id,i,""]]);n(6)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(5)(),e.push([t.id,"#myCropper-overlay{position:fixed;top:0;width:100%;background:gray;background:rgba(0,0,0,.5);z-index:9999;text-align:center}#myCropper{position:relative;background:#fff;border-radius:4px;margin:auto;top:100px;box-shadow:8px 8px 15px rgba(0,0,0,.15);display:inline-block;overflow:hidden}#myCropper>.title{font-size:16px;margin-bottom:15px;text-align:left;padding:13px 20px;border-bottom:1px solid #dcdcdc}.myCropper-content{overflow:hidden;background:#fff;margin:30px;text-align:left}.myCropper-content-left{border-right:1px dashed #c7c7c7;padding-right:20px}.myCropper-btn-choose{font-size:13px;background:#000;border-color:#000;margin-bottom:10px;color:#fff;padding:5px 10px}.myCropper-origin{width:400px;height:300px;background:#dcdcdc;overflow:hidden;float:left}.myCropper-content-right{margin-left:10px;padding-left:10px}.myCropper-content-right .title{font-size:16px}.myCropper-content-right .thumb{background:#dcdcdc;margin:10px 0}#myCropper-canvas{margin-left:auto;margin-right:auto;display:block}.myCropper-btn-upload{width:160px!important;padding:10px;font-size:15px}#myCropper-overlay .close{font-size:26px;right:10px;top:10px;cursor:pointer}",""])},function(t,e){"use strict";t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(i[o]=!0)}for(r=0;r<e.length;r++){var a=e[r];"number"==typeof a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){function i(t,e){for(var n=0;n<t.length;n++){var i=t[n],r=f[i.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](i.parts[o]);for(;o<i.parts.length;o++)r.parts.push(d(i.parts[o],e))}else{for(var a=[],o=0;o<i.parts.length;o++)a.push(d(i.parts[o],e));f[i.id]={id:i.id,refs:1,parts:a}}}}function r(t){for(var e=[],n={},i=0;i<t.length;i++){var r=t[i],o=r[0],a=r[1],s=r[2],c=r[3],d={css:a,media:s,sourceMap:c};n[o]?n[o].parts.push(d):e.push(n[o]={id:o,parts:[d]})}return e}function o(t,e){var n=m(),i=b[b.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),b.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function a(t){t.parentNode.removeChild(t);var e=b.indexOf(t);e>=0&&b.splice(e,1)}function s(t){var e=document.createElement("style");return e.type="text/css",o(t,e),e}function c(t){var e=document.createElement("link");return e.rel="stylesheet",o(t,e),e}function d(t,e){var n,i,r;if(e.singleton){var o=g++;n=y||(y=s(e)),i=l.bind(null,n,o,!1),r=l.bind(null,n,o,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),i=p.bind(null,n),r=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(e),i=u.bind(null,n),r=function(){a(n)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}function l(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var o=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function u(t,e){var n=e.css,i=e.media;if(i&&t.setAttribute("media",i),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function p(t,e){var n=e.css,i=e.sourceMap;i&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var r=new Blob([n],{type:"text/css"}),o=t.href;t.href=URL.createObjectURL(r),o&&URL.revokeObjectURL(o)}var f={},h=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},v=h(function(){return/msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())}),m=h(function(){return document.head||document.getElementsByTagName("head")[0]}),y=null,g=0,b=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=v()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=r(t);return i(n,e),function(t){for(var o=[],a=0;a<n.length;a++){var s=n[a],c=f[s.id];c.refs--,o.push(c)}if(t){var d=r(t);i(d,e)}for(var a=0;a<o.length;a++){var c=o[a];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete f[c.id]}}}};var x=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){"use strict";t.exports={1:"请求成功","-1":"请求繁忙",10001:"股票代码不存在",10002:"查询条件为空",20001:"用户未登录",20002:"token为空",20003:"用户名不存在",20004:"密码为空",20005:"密码不匹配",20006:"登录失败",20007:"用户不存在",20008:"操作失败",20009:"密码不一致",20010:"TOKEN 错误",20011:"参数错误",20012:"获取验证码失败",20013:"期刊ID为空",20014:"直播室ID为空",20015:"提问内容为空",20016:"直播室未开启",20017:"直播老师未关联直播室",20018:"期刊不存在",20019:"已在其他终端登陆",20020:"提问次数超出限制",20021:"该条问题已被采纳过",20022:"不是该问题提问人",30001:"手机验证码为空",30002:"图片验证码错误",30003:"手机验证码错误",30004:"账号已存在",30005:"注册异常",30006:"第三方第一次登录",30007:"第三方非法用户",30008:"手机号为空",30009:"手机号已被绑定",30010:"手机号错误",30011:"该号码不是约投顾的工作电话，慎防假冒！",40001:"参数为空",40002:"服务器异常",40003:"已点赞",40004:"评论失败",40005:"起始值为空",40006:"查询失败",40007:"请求方向格式错误",40008:"用户自选股已经存在",40009:"关注",40010:"没有此股票信息",40011:"取消关注",40012:"直播老师不存在",40013:"股票代码和名称不匹配",40014:"买入股票时资本不够",50001:"消息为空",50002:"老师不能提问",50003:"老师不能关注",60000:"支付成功",60001:"商品ID为空",60002:"商品类型为空",60003:"订单类型为空",60004:"订单ID为空",60005:"订单不存在",60006:"支付失败",60007:"签名为空",60008:"未传支付密码",60009:"支付密码错误",60010:"账户余额不足",60011:"用户没有开通账户",60012:"支付密码格式不正确",60013:"充值来源错误",60014:"订单金额类型不存在",60015:"订单金额错误",60016:"产品购买数量错误",60017:"礼物不存在",60018:"商品类型不存在",60019:"商品不存在",60020:"商品已购买",60021:"商品已付款请等待客服人员与您联系",60022:"商品未购买",70001:"组合不存在",70002:"组合已技术评价",70003:"收益信息为空",70004:"委托记录为空",80000:"该手机号被用户举报，涉嫌违规操作，目前不能注册账号",80001:"您输入的内容违反相关规定，不能予以展示!",90000:"身份证号格式验证不通过",90001:"已通过实名制验证",90002:"还没有进行实名制验证",90003:"还没有进行风险评估",90004:"当天实名验证次数到达上线",100001:"活动注册成功",100002:"活动注册失败",100003:"活动已过期",100005:"用户不符合活动条件"}}]);