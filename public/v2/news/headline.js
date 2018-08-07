//约牛头条列表
// var list = (function() {
//     var container, bootpag, page, params = {
//         currentPage: 1,
//         pageSize: 10
//     }

//     var create = arr => {
//         return _.map(arr, item => {
//             return `<div class="list">
//                     <div class="title"><a href="${item.link}" target="_blank">${item.title}</a></div>
//                     <div class="content">${item._shortContent}</div>
//                     <div class="msg">
//                         <span class="keywords">${item.keywords}</span>
//                         <span class="time">${item._create_time}</span>
//                     </div>
//                 </div>`
//         }).join('')
//     }
//     var handleData = arr => {
//         return _.map(arr, item => {
//             item._create_time = item.create_time.substr(5, 11)
//             item.link = `/headlines/${item.type}/${item.articleid}.htm`
//             if (item.shortContent.length > 200) {
//                 item._shortContent = item.shortContent.substr(0, 200) + '..'
//             } else {
//                 item._shortContent = item.shortContent
//             }
//             return item;
//         })
//     }
//     return {
//         init: function() {
//             container = $('.container')
//             page = $('.page')
//             bootpag = yntool.bootpag(page);
//             bootpag.on('page', function(err, n) {
//                 params.currentPage = n;
//                 list.render()
//             })
//         },
//         render: function() {
//             $.getJSON('/headlines/index.htm', params, back => {
//                 // if (back.rows.length >= 1) {
//                 container.html(create(handleData(back.rows)))
//                 back.pageNumber = _.max([1, Math.ceil(+back.total / params.pageSize)])
//                 bootpag.bootpag({ page: params.currentPage, total: back.pageNumber })
//                     // }
//             })
//         }
//     }
// })()



// $(function() {
    // list.init()
    // list.render()
// })


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
    // 页码跳转
    if (__total != 0) {
        var pagination = bootpag($('.container'))
        pagination.bootpag({ page: __page, total: __total / 10 })
        pagination.on('page', (err, num) => {
            location.href = `${news_path}headline.htm?pn=${num}`
        })
    }

})