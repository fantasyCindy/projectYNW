require('public/v2/index/hot-live.css')
var ajax=require('public/module/ajax.js');
var local=require('public/v2/base/localData.js')
var askWindow = require('public/v2/base/askWindow.js');//提问
var error = require('e/error-type')
var liveHall = function() {
    var query={type:1},time1,time2,container,items,count = 2,isCare,slideHeight,slide,timer;

    var create = (arr,link) => {
        return _.map(arr, item => {
            if(item.todaysubject){
                item._contentFilter = item.todaysubject.length > 40?item.todaysubject.substring(0,40)+'...':item.todaysubject//内容
            }else{
                item._contentFilter = item.shortContent?item.shortContent:'[图片]'
                item._contentFilter=yntool.filterHTML(item._contentFilter, { substr: 44, trim: true });
            }
            return `<div class="info overflow"><span class="fl color999">${item.pubtimeString}</span><a href="${link}" target="_blank" class="fl itemleft">${item._contentFilter}</a></div>`
        }).join("")
    }
    var createNormal = arr => {
        var index = 0
        return _.map(arr, item => {
            var _link = `${live_path}live/${item.teacherid}/`//跳转链接
            var opinionLink = `${live_path}dapan/${item.teacherid}/`//链接
            item._status = +item.status === 0 ? "line" : "online";//显示隐藏
            item._color = +item.status === 0 ? "" : "color153";//无直播时的样式
            if(item.todaysubject){
                item._todaysubject = item.todaysubject.length > 10?item.todaysubject.substring(0,11)+'...':item.todaysubject;
            }
            var tag = create(item.broadcastingList,_link)
            item.__bcount = +item.status === 0 ? item._todaysubject : "离线";//直播主题
            var isCare = item.isAttention?'已关注':'关注'//已关注
            index = index + 1
            return `<div class="hot-live item ${index % 2 == 0 ? 'fr':'fl'} frame-shadow ${item._status} item${index}" id="teacher${item.roomid}">
                        <div class="item-wrap ${item._color}">
                            <div class="item-top overflow">
                                <a href="${_link}" target="_blank" class="image border-radius fl"><img src="${item.photo}" alt="${item.title}"></a>
                                <div class="name fl">
                                    <a href="${_link}" target="_blank">
                                        <span class="teacherName f3 b">${item.title}</span>
                                        <span class="color666 f2"><i class='item-icon item-icon-guwen'></i>投资顾问</span>
                                    </a>
                                    <div class='f2 color666'><i class='item-icon item-icon00'></i>${item.__bcount}</div>
                                </div>
                            </div>
                            <div class="string f2 overflow relative">
                                <div class="slide">${tag}</div>
                                <div class="no-live color666">${item.description}</div>
                            </div>
                        </div>
                        <div class="item-bottom f5 overflow" data-teacherid="${item.teacherid}">
                            <span class="item-bottom-span cursor item-care fl">
                                <i class='item-icon item-icon1'></i>
                                <span class="care-live">${isCare}</span>
                            </span>
                            <span class="item-bottom-span cursor item-ask fl ">
                                <i class='item-icon item-icon2'></i>提问
                            </span>
                            <a href="${_link}" target="_blank" class="item-bottom-span cursor item-see fl">
                                <i class='item-icon item-icon3'></i>立即查看
                            </a>
                            <span class="item-bottom-status item-bottom-status1 cursor item-ask fl">
                                <i class='item-icon item-icon2'></i>提问
                            </span>
                            <a target="_blank" href="${opinionLink}" class="item-bottom-status cursor fl">
                                <i class="item-icon fa fa-file-text-o mr5" aria-hidden="true"></i>观点
                            </a>
                        </div>
                    </div>`
        }).join("")
    }
    /* 循环动画 */
    var move = function() {
        slide.each(function(i,num){
            var first = $(num).find('.info:eq(0)');
            var height = first.outerHeight();          
            $(num).velocity({ top: `-=${height}` }, {
            easing: "easeInOutSine",
                complete: function() {
                    if(height){
                        $(num).append(first.get(0).outerHTML);
                        first.remove();
                        $(num).css('top', 0);
                    }
                }
            })
        })
    }
    // 获取数据
    var getCreate = function(){
        getData({
            query,
            callback: data => {
                
                items.empty()
                items.append(createNormal(data)) 
                slideHeight = $('.string').height()
                slide = $('#hall .slide')
                time2=null;
                clearInterval(time2)
                // timer = setInterval(move,1000);  
                time2=setInterval(move,8000);  
            }
        })
    }

    return {
        init: function() {
            var _this=this;
            container = $("#hall");
            items = container.find('.hall-list');
            var loading = new yntool.loading({
                container: items,
                type: 3
            }).render()
            // 点击切换
            container.find('.title-1').on('click', '.title-btn', function() {
                $(this).parent().find('.thisclass').removeClass('thisclass');
                $(this).addClass('thisclass');
                query.type = $(this).data('type');
                _this.render()
            })
            // 点击关注
            container.on('click', '.item-care', function(){
                if (!ynIsLogin) {
                    yn.login.render();
                    return;
                }
                var teacherid = $(this).parent().data('teacherid')
                var caretext = $(this).find('.care-live').text()
                if ((+ynTeacherId == +teacherid)) return layer.msg("不能关注自己啊");
                addCare(teacherid,caretext).done(data => {
                    if(caretext=='关注'){
                        $(this).find('.care-live').text("已关注")
                    }else{
                        $(this).find('.care-live').text("关注")
                    }
                    isCare = !isCare
                });
            })
            // 点击提问
            container.on('click', '.item-ask', function(){
                var teacherid = $(this).parents('.item-bottom').data('teacherid')
                var teachername = $(this).parents('.item-bottom').prev().find('.teacherName').text()
                if (ynTeacherId == teacherid) return layer.msg("扪心自问");
                askWindow.render({
                    select: { id: teacherid, name: teachername }
                })
            })
        },
        render: function() {
         time1 = null
         clearInterval(time1)   
         getCreate()
         // time1 = setInterval(function(){
         //        getCreate()
         //    },50000);  
        }
    }
}();

var addCare = function(teacherid,care) {
    var defer = $.Deferred();
    $.post("/center/attention.htm", {teacherid: teacherid }, function(data) {
        data = JSON.parse(data)
        if (data.status == "1") {
            var html = care?'关注成功':'取消成功'
            layer.msg(html);
            defer.resolve();
        }
        else{
            layer.msg(error[data.status])
        }

    })
    return defer.promise();
}

// 获取数据
var getData = (ops)=>{
    var key = 'hotLiveRooms' + local.joinKey(ops.query)
    var cache = local.get(key, { timeout: 180 })
    if (cache && cache.valid) {
        ops.callback(cache.data)
        return;
    }
    ajax.getJSON(__path + "/html/liveRoomList.htm", {
        type: ops.query.type
    },function(back){
        ops.callback(back)
        local.set(key, back)
    })
};
module.exports = liveHall