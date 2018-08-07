var getData = function(ops, callback) {
    $.post('/banned/bannedList.do', ops, back => {
        var data = JSON.parse(back)
        data = JSON.parse(data.data)
        callback(data)
        console.log('data', data);
    })
}

var list = (function() {
    var container, items, orderTime, btnTimes, query, bootpag, page, params = {
        currentPage: 1,
        pageSize: 10
    };

    var create = item => {
        return `<div class="list"><span class="small">${item.id}</span>
                <span class="small">${item.userName}</span>
                <span class="small">${item.teacherName}</span>
                <span class="small">${item._bannedText}</span>
                <span class="small">${item.createTime}</span>
                <span class="small">${item._text}</span>
                <span class="small">${item.appealNum}</span>
                <button class="small delBanned" data-id="${item.id}">解禁</button></div>`
    }
    var handle = arr => {
        return _.map(arr, item => {
            if (item.isAppeal == '0') {
                item._isAppeal = '0'
            } else {
                item._isAppeal = '1'
            }
            item._text = ['未申诉', '已申诉'][item._isAppeal]
            item._bannedText = [ '问股', '直播互动', '观点评论', '拉黑'][item.bannedType]
            return item
        })
    }

    return {
        init: function() {
            container = $('#list .items')
            orderTime = $('.btn.btnTime')
            btnTimes = $('.btn.btnTimes')
            query = $('.btn.query')
            page = $('.page')
            bootpag = myBootpag(page);
            bootpag.on('page', function(err, n) {
                params.currentPage = n;
                list.render()
            })
            container.on('click', '.delBanned', function() {
                var id = $(this).data('id');
                $.post('/banned/delBanned.do', { ids: id }, back => {
                    if (back == 'success') {
                        layer.msg('已解除禁言')
                        list.render()
                    }
                })
            })

            var text = {
                "0": '按时间排序(正序)',
                "1": '按时间排序(倒序)',
                "2": '按申诉次数排序(正序)',
                "3": '按申诉次数排序(倒序)'
            }
            query.on('click', function() {
                var ops = {
                    isAppeal: $('.querySelect').val(),
                    phone: $('.queryPhone').val()
                }
                list.render(ops)
                $('.btn-wrap button').removeClass('select')
                $('.queryPhone').val('')
            })
            var ops = {
                order: ''
            }
            $('.btnTime.up').on('click', function() {
                $('.btn-wrap button').removeClass('select')
                $(this).addClass('select')
                ops = {
                    order: 0
                }
                list.render(ops)
            })
            $('.btnTime.down').on('click', function() {
                $('.btn-wrap button').removeClass('select')
                $(this).addClass('select')
                ops = {
                    order: 1
                }
                list.render(ops)
            })
            $('.btnTimes.up').on('click', function() {
                $('.btn-wrap button').removeClass('select')
                $(this).addClass('select')
                ops = {
                    order: 2
                }
                list.render(ops)
            })
            $('.btnTimes.down').on('click', function() {
                $('.btn-wrap button').removeClass('select')
                $(this).addClass('select')
                ops = {
                    order: 3
                }
                list.render(ops)
            })


        },
        render: function(ops) {
            _.extend(params, ops)
            getData(params, back => {
                if (back.total == '0') {
                    page.hide()
                    return container.html(`<div style="width:1200px;height:100px;text-align:center;line-height:100px;font-size:20px;background:#fff;">暂无数据</div>`)
                }
                page.show()
                var html = _.map(handle(back.rows), item => create(item)).join('')
                container.html(html)
                back.pageNumber = _.max([1, Math.ceil(+back.total / params.pageSize)])
                bootpag.bootpag({ page: params.currentPage, total: back.pageNumber })
            })
        }
    }

})()


//添加页码组件
//selector支持css选择器和jquery对象
function myBootpag(selector, ops) {
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
    list.init();
    list.render()
})
