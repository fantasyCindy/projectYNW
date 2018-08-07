var error = require('e/error-type');
var recommended = (function() {
    var container, items, params = {
        currentPage: 1,
        pageSize: 10
    }

    var create = arr => {
        return _.map(arr, item => {
            return `<li class="right-item"><a href="/learning/${item.id}.htm" target="_blank">${item._title}</a></li>`
        }).join('')
    }

    var handle = arr => {
        return _.map(arr, item => {
            if (item.title.length > 18) {
                item._title = item.title.substr(0, 18) + '..'
            } else {
                item._title = item.title
            }
            return item
        })
    }

    return {
        init: function() {
            container = $('.right-list');

        },
        render: function(ops) {
            _.extend(params, ops)
            $.getJSON('/learning/studyStockRecommend.htm', params, back => {
                if (back.status == 1) {
                    container.html(create(handle(back.data.list)))
                } else() => {
                    return layer.msg(error[back.status])
                }
            })
        }
    }
})()

//添加页码组件
//selector支持css选择器和jquery对象
var bootpag = function(selector, ops) {
    ops = _.extend({
        first: true
    }, ops)
    var timestamp = _.now();
    var id = `#${timestamp}`
    var tag = `<ul id="${timestamp}" class="ynpagination"></ul>`;
    var container = function() {
        if (typeof selector != "string") {
            return selector
        } else {
            return $(selector);
        }
    }()

    container.append(tag);
    var bootpag = $(id).bootpag({
        total: 1,
        page: 1,
        maxVisible: 5,
        firstLastUse: ops.first,
        first: "首页",
        last: "尾页",
        next: "下一页",
        prev: "上一页",
        leaps: false
    })
    bootpag.hide = function() {
        $(id).hide();
        return bootpag;
    }
    bootpag.show = function() {
        $(id).show();
        return bootpag;
    }
    return bootpag;
}

$(function() {
    // list.init()
    // list.render()

    //导航高亮
    $('#learnStock .item').each(function(i, el) {
        var type = $(this).data('type')
            // $(this).attr('href', `${xuechaogu_path}/${type}`)

        if (type == __type) {
            $(this).addClass('select')
        }
        if (__type == 'xcg') {
            $('#learnStock .item.xcg').addClass('select')
        }
    })

    // 页码跳转
    if (__total != 0) {
        var pagination = bootpag($('.container'))
        pagination.bootpag({ page: __page, total: __total / 10 })
        pagination.on('page', (err, num) => {
            location.href = `${xuechaogu_path}${__type}/?pn=${num}`
        })
    }


    recommended.init()
    recommended.render()

    onSelect('学炒股')
})
