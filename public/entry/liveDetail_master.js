var liveDetailCommon = require('./liveDetail_common.js');
var opinionType = require('m/opinionType')
    /*///////////////////////////////////////////////////////////////////*/
var __href = window.location.href;
var cateMatch = __href.match(/liveDetail/)
var __cate = cateMatch ? cateMatch[0] : ""
var match = __href.match(/liveDetail\/(\d+)/)
var teacherid = match ? match[1] : ''
//观点
var opinionList = (function() {
        var container, items, params = {
            currentPage: 1,
            pageSize: 4,
            classify: '0',
            teacherid: teacherid
        }
        var handle = arr => {
            return _.map(arr, item => {
                item._time = item.create_time.substr(6,11);
                return item;
            })
        }
        return {
            init: function() {
                container = $('#home-opinion')
                items = container.find('.category')
                items.html(opinionType.create)
                items.find('.opinion-type-item').map(function() {
                    var self = this
                    var val = $(self).attr('value')
                    if (val == 0) {
                        $(self).addClass('select')
                    }
                })
                items.on('click', '.opinion-type-item', function() {
                    var classify = $(this).attr('value')
                    opinionList.render({ classify: classify })
                    $(this).addClass('select').siblings().removeClass('select')
                })
            },
            render: function(ops) {
                _.extend(params, ops)
                $.getJSON("/opinion/queryNewOpinions.htm", params, function(data) {
                    if (data.status == 1) {
                        if (data.data.list.length < 1) {
                            container.find('.items').html(`<div class="opinion-none">暂无记录</div>`)
                            return
                        }
                        container.find('.items').html(template('opinion-list-item-template', handle(data.data.list)))
                    }

                })
            }
        }
    })()
    // $("#home-opinion .category").html(opinionType.create)
    // var href = window.location.href
    // var match = href.match(/liveDetail\/(d+)/)
    // var params = {
    //     currentPage: 1,
    //     pageSize: 4,
    //     classify: '',
    //     teacherid: ops.teacherid
    // }
    // $('.opinion-type-item').click(function(e) {
    //     params.classify = $(this).val()
    //     $.getJSON("/opinion/queryNewOpinions.htm", params, function(data) {
    //         // data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
    //         // defer.resolve(data);
    //     })
    // })


$(function() {
    if (__cate == "liveDetail") {
        var item = $($('.liveDetail-menu .item')[0])
        item.addClass('select')
    }

    opinionList.init()
    opinionList.render()
    var homt_askStock = $("#home-askStock")

    //回答分类
    var category = new ynmodule.AskStockCategory();
    category.hasAll = false;
    category.container = homt_askStock.find(".category");
    category.init();
    category.render();

    category.delegate.click = function(select) {
        mylist.type = select;
        mylist.render()
    }

    //问答列表
    var mylist = new ynmodule.AskStockWithTeacher();
    mylist.container = homt_askStock.find('.items');
    mylist.teacherid = room_teacherid;
    mylist.type = 2;
    mylist.row = 4;
    mylist.init();
    mylist.render();










    //观点列表
    // var opinionList = new ynmodule.opinionList();
    // opinionList.teacherid = room_teacherid;
    // opinionList.container = $('#home-opinion .items');
    // opinionList.type = 0;
    // opinionList.row = 4;
    // opinionList.init();
    // opinionList.render();


    //擅长领域
    var goodat = function() {
        var container = $("#home-goodat");
        var items = container.find('.items');
        var data = JSON.parse(__style);
        items.append(_.map(data, item => `<span class="item">${item.name}</span>`).join(''));
    }();


    //视频课程
    var video = function() {

        var create = arr => {
            return _.map(arr, item => {
                return `<div class="tableView-item">
            <a class="tableView-title" href="${item._link}" target="_blank">
                <span class="value">${item.title}</span>
            </a>
            <div class="tableView-info">
                <span class="time ${item._class_time}">${item._time}</span>
            </div>
        </div>`
            }).join("")
        }

        getMyVideo({
            teacherid: room_teacherid,
            row: 5
        }).done(function(data) {
            var rows = _.map(data.rows, function(item) {
                item._title = item.title;
                item._link = video_path + "video/" + item.video_id + '.htm';
                item._time = yn.timeFormat(item.create_time)
                item._class_time = "show"
                return item;
            })

            $("#home-video .items").html(create(rows))
        })
    }()
})



var getMyVideo = function(ops) {
    ops = _.extend({
        teacherid: ynTeacherId,
        page: 1,
        row: 10,
        isDraft: false
    }, ops)

    var send = {
        teacherid: ops.teacherid,
        currentPage: ops.page,
        pageSize: ops.row,
        isDraft: ops.isDraft ? 1 : 0
    }

    var defer = $.Deferred();
    $.getJSON("/video/videoList.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)]);
        defer.resolve(data);
    })
    return defer.promise();
}
