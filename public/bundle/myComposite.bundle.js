!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="/public/bundle/",e(0)}([function(t,e,n){"use strict";function r(){$("#teacherComposite").remove(),$("#userComposite").show(),c().init().render()}function i(){$("#teacherComposite").show(),$("#userComposite").remove(),s(),u.init().render()}n(1);var o=n(2).handleData,a=n(4),s=function(){var t=$("#teacherComposite .switch");t.on("click","td.item",function(){yn.switch($(this)),u.render({cStatus:$(this).data("value"),currentPage:1})}),t.on("click","td.verify",function(){yn.switch($(this)),u.render({cStatus:"",currentPage:1,audit:"1",status:"0"})}),$("#teacherComposite").on("change","#menu-state",function(){u.render({cStatus:"",currentPage:1,audit:"1",status:$(this).val()})})},u=function(){var t,e,n,r=function(t,e){var n=!!e.audit,r={menu:function(){var t=_.sortBy(['<option value="0">待审核</option>','<option value="2">驳回</option>'],function(t){var n=+t.match(/\d/)[0];return+e.status==n?-1:n}).join("");return'<select id="menu-state">'+t+"</select>"},action:function(t){var e=+t.status,n=t.combinationid,r=a.composite.create(n);t._state=["待审核","审核通过","驳回"][e];var i={0:'<a dta-id="'+n+'" class="action-item delete">删除</a>',2:'<a href="'+r+'" target="_blank" class="action-item edit">编辑</a>'};return t._linkHtml=i[e],t}};return t._menu_state=n?r.menu():"状态",t.rows=_.map(t.rows,function(t){t._name=t.combination_name.substr(0,10)+"...",t._state=ynconfig.composite_state[+t.combination_status][1];var e="/combination/"+t.combinationid+".htm";return t._linkHtml='<a href="'+e+'" target="_blank">查看详情</a>',t._style=ynconfig.composite_style[t.combination_style][1],t._income=parseFloat(t.target_revenue),n&&(t=r.action(t)),t}),t};return{init:function(){var r=this;return t=$("#teacherComposite .list"),e=yn.bootpag($("#teacherComposite .page")),e.on("page",function(t,e){r.render({currentPage:e})}),n=new ynmodule.loading({container:t,type:3,margin:100}),t.on("click",".delete .fa",function(){var t=$(this),e={operType:"del",ids:$(this).data("id")};$.post("/combination/doOperateSelected.htm",e,function(e){if("success"!=e)throw e;layer.msg("删除成功"),t.parents("tr").remove()})}),this},render:function(i){var o=this,a={user_id:ynUserId,audit:"",status:"",type:1,cStatus:1,pageSize:20,currentPage:1};i&&_.extend(a,i),n.render(),$.getJSON("/composite/compositeList.htm",a,function(n){if(console.log("我的组合",n),t.show(),n.rows.length<1)return e.hide(),a.audit?(t.html(template("approve-template")),void $("#menu-state").val(a.status)):t.html(ynconfig.none({margin:100}));n=r(n,a),t.html(template("teacherComposite-template",n));var i=_.max([1,Math.ceil(+n.total/a.pageSize)]);e.show().bootpag({page:o.page,total:i})})}}}(),c=function(){var t,e,n,r,i;return{init:function(){var o=this;return t=$("#userComposite .composite-items"),n=t.find(".items"),e=$("#userComposite .switch"),e.on("click",".item",function(){yn.switch($(this));var t=+$(this).data("value");o.render({cStatus:t})}),r=new ynmodule.loading({container:n,margin:100}),i=yn.bootpag(t),this},render:function(e){var a={user_id:ynUserId,audit:"",status:"",type:0,cStatus:1,pageSize:20,currentPage:1};e&&_.extend(a,e),r.render(),$.getJSON("/composite/compositeList.htm",a,function(e){if(console.log("我的组合",e),t.show(),e.rows.length<1)return i.hide(),void n.html(ynconfig.none({margin:100}));var r=o(e.rows);n.html(template("composite-item-template",r));var s=_.max([1,Math.ceil(+e.total/a.pageSize)]);i.show().bootpag({page:self.page,total:s})})}}};$(function(){return yn.centerMenu.init({render:"my",light:"我的组合"}),ynIsLogin?void(ynIsTeacher?i():r()):void yn.login.render()})},function(t,e){"use strict";yn.navigation.name=ynconfig.navigation.g,yn.logout.path="/index.htm",ynIsLogin||(setTimeout(function(){yn.login.render()},100),yn.login.onClose=function(){location.href="/index.htm"}),yn.centerMenu=function(){var t,e,n,r,i=function(t){return _.map(t,function(t){var e=_.trim(t.menuname)==r?"select":"";return'<a class="item '+e+'" id="'+t.menu_id+' " href="/'+t.menuurl+'">\n                    <span class="txt ">'+t.menuname+'</span>\n                    <i class="fa fa-angle-right "></i>\n                </a>'}).join("")};return{init:function(i){t=$("#centerMenu"),e=t.find(".items"),n=t.find(".title .name"),r=i.light||"",i.render&&this.render({type:i.render})},render:function(t){t=_.extend({type:"center"},t);var r={center:{title:"个人设置",url:"/menu/queryWebUserMenu.htm"},my:{title:"个人中心",url:"/menu/queryWebUserMyMenu.htm"}},o=r[t.type],a=o.url;n.text(o.title),new yn.loading({container:e,margin:200}).render(),$.getJSON(a,{user_id:ynUserId},function(t){return e.html(i(t))})}}}()},function(t,e,n){"use strict";var r=n(3),i=function(t){return t.match(/^[^\s]+/)[0]},o=[[0,"预售中"],[1,"进行中"],[2,"已结束"]],a=[[0,"保守型"],[1,"稳健性"],[2,"激进型"]],s={end:function(t){return"<a "+t.link+' class="ynbtn toFeed done" data-type="done">已结束</a>'},feed:function(t){return"<a "+t.link+' class="ynbtn toFeed">订阅</a>'},feeded:function(t){return'<a class="ynbtn" data-type="feeded">已订阅</a>'},look:function(t){return"<a "+t.link+' class="ynbtn toFeed">查看详情</a>'},peep:function(t){return"<a "+t.link+' class="ynbtn toFeed" data-type="peep">'+t.peepText+"瞄一眼</a>"},bottom:function(t){return"<a "+t.link+' class="ynbtn toFeed" data-type="bottom">已结束</a>'}},u=function(t,e){var n="detail"==e;return _.map(t,function(t){var e=+t.combination_status,u=0===e,c=1===e,m=6===e,l=e>2,p=_.min([e,2]),d=1==+t.is_od,f=ynTeacherId==t.teacherid,h=0===+t.order_price,y={link:n?"":'href="/combination/'+t.combinationid+'.htm" target="_blank"',peepText:n?+t.peep_price+"牛币· ":""},g=i(t.systemTime),v=i(t.starttime),b=i(t.endtime),w=new r(v),k=new r(b);return t._style=a[t.combination_style][1],t._content=t.combination_des.substr(0,30)+"...",t._incomeText=["目标收益","当前收益","最终收益"][p],t._income=function(){var e=u?t.target_revenue:t.now_revenue,n=yn.setDecimal(e);return 0===parseFloat(n)?'<span style="color:rgb(102,102,102)">0.00%</span>':yn.color(n,{display:n+"%",upColor:"red"})}(),t._state=o[p][1],t._stateValue=o[p][0],t._endStyle=e>2?"isEnd":"",t._price=0===+t.order_price?"免费":"￥"+t.order_price,t._icon=["ready","running","success"][p],t._status=e,t._runRatio=function(){if(u)return 0;var t=new r(g),e=k.offset(v);return Math.ceil(t.offset(v)/e*100)}(),t._time=function(){var n=[function(t){return"<strong>"+(t.count-1)+"</strong>天后运行"},function(t){return"已经运行<strong>"+t.count+"</strong>天"},function(t){return"共运行<strong>"+t.runCount+"</strong>天"}];return n[p]({count:_.min([Math.abs(w.offset(g))+1,t.combination_maxterm]),runCount:function(){if(e>2){var n=new r(i(t.completetime));return n.offset(v)+1}}()})}(),t._feed=function(){var t=[{key:"end",assert:e>=2},{key:"bottom",assert:m},{key:"feeded",assert:d&&n},{key:"look",assert:f||d&&!l},{key:"peep",assert:c&&!d&&!h},{key:"feed",assert:!0}],r=_.filter(t,function(t){return t.assert});return s[r[0].key](y)}(),t})};t.exports={handleData:u}},function(t,e){"use strict";var n=function(){return(new Date).getTime()},r=function(t){return t.match(/^(20[12]\d)[\/\-]([01]*[0-9])[\/\-](\d+)/)},i=function(t){var e=_.map(t,function(t){return _.padLeft(t,2,"0")}).join("/")+" 00:00:00";return Date.parse(e)},o=function(t){this.stamp=function(){if("string"!=typeof t)return void console.log(t+"不是字符类型");if(!r(t))return void console.log(t+"格式不正确");var e=r(t),n=i([e[1],e[2],e[3]]);return n?n:void console.log(t+"不是有效的日期")}()};o.prototype={add:function(t){var e=function(){return 864e5*t}(),n=this.stamp+e,r=new Date(n),i=r.getFullYear(),o=function(){var t=+r.getMonth()+1;return t<10&&(t="0"+t),t}(),a=r.getDate();return[i,o,a].join("-")},offset:function(t){var e=t&&new o(t).stamp+1||n();return Math.floor((this.stamp-e)/864e5)+1}},t.exports=o},function(t,e){"use strict";var n={composite:live_path+"/html/liveDetail_composite.htm"};t.exports={composite:{portal:function(){return __path+"/html/returnCompositeJsp.htm"},detail:function(t,e){return e=e||"YN",__path+"/html/CompositeDetail.htm?"+e+"ZHXQ"+t},create:function(t){return t="?EDIT"+t||"",__path+"/html/compositeCreate.htm"+t}},live:{detail:function(t){return n[t]},refer:function(t){return live_path+"/live/liveDetailRefer.htm?teacherid="+t}},refer:{detail:function(t){return __path+"/referp/list.htm?referenceid="+t}},pay:function(t){return __path+"/html/returnshortcutpayJsp.htm?orderNum="+t},video:{portal:video_path+"/video/index.htm",detail:function(t){return video_path+"/video/detail.htm?videoId="+t}},center:{stock:__path+"/myCenter/myCenter.htm"},news:{portal:news_path+"/article/index.htm"},opinion:{portal:opinion_path+"/opinion",detail:function(t){return opinion_path+"/opinion/"+t+".htm"}}}}]);