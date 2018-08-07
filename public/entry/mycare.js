/*///////////////////////////////////////////////////////////////////*/
require('~/center/center.js')
var profile = require('base/teacher-profile.js'); //鼠标放到老师头像是显示详细信息
var Str = require('m/lib/string.js');
var popStock = require('m/ui/popStock.js');
var error = require('e/error-type');
/*///////////////////////////////////////////////////////////////////*/

var bootpag, loading;


//关注
var filter = function() {
    var container
    return {
        init: function() {
            container = $(".filter");
            container.on('click', 'td', function() {
                yn.switch($(this))
                var type = $(this).data('type');
                var className = $(this).attr('class');
                className.indexOf("live") != -1 && feed.render({ mtype: $(this).data('type'), currentPage: 1 });
                className.indexOf('composite') != -1 && composite.render({ currentPage: 1 });
                className.indexOf('topic') != -1 && topic.render({ currentPage: 1 });
            })
        }
    }
}()


//动态
var feed = function() {
    var container, items, param = {
        pageSize: 15,
        currentPage: 1,
        source: 0,
        mtype: ""
    }

    var strategy = [
        { name: "发布了直播", type: "直播", link: live_path + "live/", behind: '/' },
        { name: "回答了问股", type: "问股", link: ask_path + "consultation/", behind: '.htm' },
        { name: "发表了观点", type: "观点", link: news_path + "opinion/", behind: '.htm' },
        {},
        { name: "发布了内参", type: "内参", link: live_path + "reference/", behind: '.htm' }
    ]

    var handle = data => {
        return _.map(data, item => {
            var type = item.tmessagetype;
            console.log("=type==",item.tmessagetype)
            item._name = item.teacher.nickname + strategy[type].name;
            item._content = item.tmessagetitle;
            item._time = yn.timeFormat(item.createtime);
            item._photo = item.teacher.photo;
            item._type = strategy[type].type;
            item._link = strategy[type].link + item.urllink.match(/\d+$/)[0] + strategy[type].behind;
            item._userid = item.teacher.user_id;
            item._teacherid = item.teacher.teacherid;
            return item;
        })
    }
    return {
        init: function() {
            container = $('#mycare');
            items = container.find('.items');
        },
        render: function(_param) {
            loading.render()
            _.extend(param, _param);
            $.getJSON("/app/getTeacherMessage.htm?", param, data => {
                console.log("关注数据", data)

                if (data.status == 1) {
                    if (!data.data || data.data.list.length < 1) {
                        items.html(ynconfig.none({ margin: 200 }));
                        return bootpag.hide();
                    }
                    data = data.data;
                    items.html(template('feed-template', handle(data.list)));
                    var pageNumber = _.max([1, Math.ceil(data.total / param.pageSize)]);
                    bootpag.show().bootpag({ page: param.currentPage, total: pageNumber })
                } else {
                    return layer.msg(error[data.status])
                }
            })
        }
    }
}()


//组合消息
var composite = function() {
    var container, items, param = { source: 0, messagetype: 4, currentPage: 1, pageSize: 10 };
    var getData = callback => $.getJSON("/app/getMessage.htm", param, data => callback(data));
    var creatItem = item => {
        return `<div class="composite-msg-item">
                <div class="composite-msg-avatar" data-userid="${item.senduserid}"><img src="${item.image_path}"/></div>
                <div class="composite-msg-info">
                    <div class="composite-msg-title">${item.messagetitle}</div>
                    <div class="composite-msg-content">
                        <span class="name">${item.sendusername}</span>
                        <span class="time">${item._time}</span>
                        <span class="composite-msg-type type${item._type}"></span>
                        <span class="stock">${item._stock}</span>
                    </div>
                </div>
            </div>`
    }
    var handleData = arr => {
        return _.filter(_.map(arr, item => {
            var content = item.messagecontent;
            var match = content.match(/(卖出|买入)了(.+)\((\d+)\)/);
            if (!match) return false;
            var typeObj = { "卖出": 1, "买入": 0 }
            item._type = typeObj[match[1]];
            console.log("_type", item._ty)
            var stockName = match[2];
            var stockCode = match[3];
            item._time = item.createtime.match(/\d+-\d+\s+\d+:\d+/)[0];
            item._stock = Str.AddCodeLink({ code: stockCode, show: stockName + stockCode });
            return item;
        }), item => item)
    }
    return {
        init: function() {
            container = $('#mycare');
            items = container.find('.items');
        },
        render: function() {
            loading.render();
            getData(data => {
                if (data.status != 1) return layer.msg(`错误 : ${status}`)
                data = data.data;
                if (!data || data.length < 1) {
                    bootpag.hide();
                    items.html(ynconfig.none({ margin: 200 }));
                    return;
                }
                var pageNumber = _.min([1, Math.ceil(data.total / param.pageSize)]);
                bootpag.bootpag({ page: param.currentPage, total: pageNumber });
                items.html(_.map(handleData(data.list), item => creatItem(item)).join(""));
            })
        }
    }
}();


var topic = (function() {
        var container, params = {
            source: 0,
            messagetype: 9,
            currentPage: 1,
            pageSize: 10
        }
        var flag = ''
        var newList = []
        var creatItem = item => {
            return `<div class="topic-item">
            <span class="topic-item-photo"><img src="${item.image_path}" alt=""></span>
            <span class="topic-item-content">
            <span class="topic-item-content-name">${item.messagecontent}<i class="topic-teacher-icon"></i></span>
            <span class="topic-item-title"><a href='/app/topicDetail.htm?topic_id=${item.goods_id}' target="_blank">#${item.messagetitle}#</a></span>
            <span class="topic-item-time">${item._time}</span>
            </span>
        </div>`
        }

        var handle = data => {
            return _.map(data, item => {
                // item._time = yn.timeFormat(item.createtime);
                item._time = item.createtime.substr(0, 11)
                return item;
            })
        }
        return {
            init: function() {
                container = $('#mycare')
            },
            render: function(ops) {
                params = _.extend(params, ops)
                loading.render();
                $.getJSON(__path + '/app/getMessage.htm', params, back => {
                    if (back.status == 1) {
                        if (back.data.list.length < 1) {
                            container.find('.items').html(ynconfig.none({ margin: 200 }));
                            bootpag.hide();
                            return;
                        } else {
                            handle(back.data.list).forEach(item => {
                                if (item._time != flag) {
                                    newList.push(`<div class="topic-date">${item._time}</div>`)
                                }
                                newList.push(`<div class="topic-item">
                                    <span class="topic-item-photo"><img src="${item.image_path}" alt=""></span>
                                    <span class="topic-item-content">
                                    <span class="topic-item-content-name">${item.messagecontent}<i class="topic-teacher-icon"></i>评论了话题</span>
                                    <span class="topic-item-title"><a href='/app/topicDetail.htm?topic_id=${item.goods_id}' target="_blank">#${item.messagetitle}#</a></span>  
                                    </span>
                                </div>`)
                                flag = item._time
                            })
                            container.find('.items').html(newList.join(''))
                            newList = []
                            bootpag.show();
                            var pageNumber = _.max([1, Math.ceil(+back.data.total / params.pageSize)]);
                            bootpag.bootpag({ page: params.currentPage, total: pageNumber });
                        }
                    }else {
                        return layer.msg(error[back.status])
                    }
                })
            }
        }
    })()
    /*///////////////////////////////////////////////////////////////////*/


$(function() {



    var container = $("#mycare");
    var items = container.find('.items');
    bootpag = yn.bootpag(container).on('page', (err, num) => {
        var cur = $(".filter .select");
        var className = cur.attr('class');
        className.indexOf("live") != -1 && feed.render({ mtype: cur.data('type'), currentPage: num });
        className.indexOf('composite') != -1 && composite.render({ currentPage: num })
        className.indexOf('topic') != -1 && topic.render({ currentPage: num })
    });

    loading = new yn.loading({ container: items });

    yn.centerMenu.init({
        render: 'my',
        light: '我的关注'
    });

    profile.init();
    profile.add('.avatar')
    filter.init();
    feed.init();

    feed.render();
    composite.init();

    popStock.init();
    popStock.add('.fire-pop-stock');

    topic.init()
})
