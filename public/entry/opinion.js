var path = require('m/lib/path.js')

//最新观点
var lastest = function() {
    var container,
        items,
        page = 1,
        row = 5

    function handleData(data) {
        return _.map(data, function(item) {
            item.create_time = yn.timeFormat(item.create_time);
            item.detail = path.opinion.detail(item.article_id)
            item.createrName = item.createrName || "约投顾"
            return item;
        })
    }

    return {
        init: function() {
            container = $(".lastestAiticles");
            items = container.find('.items');
        },
        render: function() {
            getOpinion({ page: page, row: row, }).done(function(data) {
                if (data.status == 1) {
                    data.data.list = handleData(data.data.list);
                    items.append(template('lastest-template', data.data.list))
                }

            })
        }
    }
}()

//观点牛人
var bestTeachers = function() {
    var container,
        items,
        page = 1,
        row = 5

    function handleData(data) {
        return _.map(data, function(item) {
            item.create_time = yn.timeFormat(item.create_time);
            item.detail = path.opinion.detail(item.article_id)
            return item;
        })
    }

    return {
        init: function() {
            container = $(".bestTeachers");
            items = container.find('.items');
        },
        render: function() {
            getOpinionBest({ page: page, row: row }).done(function(data) {
                if (data.status == 1) {
                    log("观点牛人", data)
                    data.data.list = handleData(data.data.list);
                    items.append(template('bestTeachers-template', data.data.list))
                }

            })
        }
    }
}()


/**
 * 观点数据
 *
 */
function getOpinion(ops) {
    ops = _.extend({
        teacherid: "",
        page: 1,
        row: 10,
        type: null // 观点分类   0大盘, 1题材, 2个股, 3股票学堂  ,null查询全部
    }, ops)

    var send = {
        pageSize: ops.row,
        currentPage: ops.page,
        classify: ops.type,
        teacherid: ops.teacherid
    }

    var defer = $.Deferred()
    $.getJSON("/opinion/queryNewOpinions.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.data.total / ops.row)]);
        defer.resolve(data);
    })

    return defer.promise();
}


//观点牛人
function getOpinionBest(ops) {
    ops = _.extend({
        page: 1,
        row: 10,
    }, ops)

    var send = {
        pageSize: ops.row,
        currentPage: ops.page,
    }

    var defer = $.Deferred()
    $.getJSON("/opinion/queryOpinionTeacher.htm", send, function(data) {
        defer.resolve(data);
    })

    return defer.promise();
}
// $(function() {
// authenticate.init();
// stockType.init();

// stockType.render(1);
// stockType.render(0);
// stockType.render(3);

// lastest.init();
// lastest.render()
// bestTeachers.init();
// bestTeachers.render();

// })


/*//////////////////////////支出/////////////////////////////////////////*/
var profile = require('base/teacher-profile.js'); //鼠标放到老师头像是显示详细信息
$(function() {
    profile.init();
    profile.add('.thead')
    onSelect('观点')
})
