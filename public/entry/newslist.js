/*///////////////////////////////////////////////////////////////////*/

var types = ["", "热门资讯", "涨停揭秘", "宏观要闻", "个股资讯"];

/**
 * 新闻列表
 */
var newslist = function() {
    var container, items, bootpag, page = 1,
        row = 6,
        body = $('body'),
        title,
        type

    function handle(data) {
        return _.map(data, function(item) {
            item.create_time = yn.timeFormat(item.create_time);
            item.create_time = item.create_time.substr(0,10)
            item.content = yn.filterHTML(item.content, {
                trim: true,
                substr: 200
            })
            return item;
        })
    }

    return {
        init: function() {
            var _this = this;
            container = $("#newslist");
            items = container.find('.items');
            title = $("#title-top");
            bootpag = yn.bootpag('.list')
            bootpag.on('page', function(err, n) {
                page = n;
                _this.render(type);
                body.velocity("scroll", { duration: 350, offset: 0 })
            })

            var loading = new yn.loading();
            loading.container = items;
            loading.type = 3;
            loading.margin = 200
            loading.render()
        },
        render: function(_type) {
            type = _type;
            title.text(types[type])
            getNewsList({ page: page, row: row, type: type }).done(function(data) {
                console.log("资讯", data)
                data.rows = handle(data.rows);
                items.html(template('newslist-item-template', data.rows));
                bootpag.bootpag({ page: page, total: data.pageNumber })
            })
        }
    }
}()


//涨停揭秘/宏观要闻/个股资讯
var newsOther = function() {
    var container, page = 1,
        row = 5;

    function handleData(data) {
        return _.map(data, function(item) {
            item.title = item.title.substr(0, 18) + '...'
            return item;
        })
    }

    return {
        init: function() {
            container = $('.yn-right');
        },
        render: function(type) {
            getNewsList({ page: page, row: row, type: type }).done(function(data) {
                console.log("其他资讯", data)
                data.title = types[type];
                data._type = type;
                data.rows = handleData(data.rows);
                container.find('.news-item-' + type).html(template('list-template', data))
            })
        }
    }
}()

////////////////////////////////////////////////////////////////

$(function() {

    var marketIndex = yn.MarketIndex();
    marketIndex.render($("#stockIndex"), "column")

    newslist.init();
    newsOther.init();

    var range = [
        { t: 1, key: 1 },
        { t: 2, key: 2 },
        { t: 3, key: 3 },
        { t: 4, key: 4 }
    ];
    var i = 0;
    var match = window.location.href.match(/list=([1-4])/);
    if (match) {
        i = match[1] - 1;
    }

    //排序
    range[i].t = 0;
    range.sort(function(a, b) {
        return a.t - b.t;
    })

    newslist.render(range[0].key);
    newsOther.render(range[1].key);
    newsOther.render(range[2].key);
    newsOther.render(range[3].key);
});


/*///////////////////////////////////////////////////////////////////*/

//获取新闻资讯
//type :  ["热门资讯", "涨停揭秘", "宏观要闻", "个股资讯", "重点新闻"]
function getNewsList(ops) {
    var defer = $.Deferred();

    ops = _.extend({
        type: "", //
        page: 1,
        row: 20
    }, ops)

    var send = {
        backnews_type: ops.type,
        currentPage: ops.page,
        pageSize: ops.row
    }

    $.getJSON("/article/queryNews.htm", send, function(data) {
        data.pageNumber = _.max([1, Math.ceil(+data.total / ops.row)])
        defer.resolve(data);
    })

    return defer.promise()
}
