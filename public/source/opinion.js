//鉴股
var authenticate = function() {

    var container,
        items,
        page = 1,
        row = 3

    function handleData(data) {
        return _.map(data, function(item, i) {
            item.index = i + 1;
            item.stock_trend_text = ["看涨", "看跌"][+item.stock_trend];
            item.create_time = yn.timeFormat(item.create_time);
            item.detail = "/article/newDetail.htm?article_id=" + item.article_id
            return item;
        })
    }

    return {
        init: function() {
            container = $('.judge');
            items = container.find('.items');
        },
        render: function() {
            yndata.getOpinion({ type: 2, page: page, row: row }).done(function(data) {
                data.rows = handleData(data.rows);
                items.html(template('judge-template', data.rows))
            })
        }
    }
}()


//分类
var stockType = function() {
    var container,
        page = 1,
        row = 5,
        items,

        handleData = function(data, type) {
            var result = _.map(data, function(item) {
                item.create_time = yn.timeFormat(item.create_time);
                item.detail = "/article/newDetail.htm?article_id=" + item.article_id
                return item
            })

            return {
                title: ynconfig.opinionType[type].name,
                type: type,
                mainData: result[0],
                listData: _.takeRight(result, 4)
            }
        },

        event = function() {
            container.on('click', '.more', function() {
                var type = $(this).data('type');
            })
        }


    return {
        init: function() {
            container = $('#stockType');
            items = container.find('.items');
            event()
        },
        render: function(type) {
            yndata.getOpinion({ page: page, row: row, type: +type }).done(function(data) {
                data = handleData(data.rows, type);
                console.log(data)
                items.find('.type' + type).html(template('stockType-template', data))
            })
        }
    }
}()

//最新观点
var lastest = function() {
    var container,
        items,
        page = 1,
        row = 5

    function handleData(data) {
        return _.map(data, function(item) {
            item.create_time = yn.timeFormat(item.create_time);
            item.detail = "/article/newDetail.htm?article_id=" + item.article_id;
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
            yndata.getOpinion({ page: page, row: row, }).done(function(data) {
                data.rows = handleData(data.rows);
                items.append(template('lastest-template', data.rows))
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
            item.detail = "/article/newDetail.htm?article_id=" + item.article_id
            return item;
        })
    }

    return {
        init: function() {
            container = $(".bestTeachers");
            items = container.find('.items');
        },
        render: function() {
            yndata.getOpinionBest({ page: page, row: row }).done(function(data) {
                console.log("观点牛人", data)
                data.rows = handleData(data.rows);
                items.append(template('bestTeachers-template', data.rows))
            })
        }
    }
}()


$(function() {
    authenticate.init();
    authenticate.render();
    stockType.init();

    stockType.render(1);
    stockType.render(0);
    stockType.render(3);

    lastest.init();
    lastest.render()
    bestTeachers.init();
    bestTeachers.render();
})
