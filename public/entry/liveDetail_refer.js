var liveDetailCommon = require('./liveDetail_common.js');
var referCategory = require('../module/composite/refer-category.js');
var referList = require('../module/composite/refer-list.js');
var referData = require('../module/ajax/refer.js');
var Str = require('../module/lib/string.js');
var Path = require('../module/lib/path.js');
var error = require('e/error-type');

/*///////////////////////////////////////////////////////////////////*/
var list = (function() {
    var container, items, bootpag, page, param = {
        currentPage: 1,
        pageSize: 10,
        productStatus: ""
    };
    return {
        init: function() {
            container = $("#myRefer");
            items = $(".refer-items");
            page = $('.page')
            bootpag = yn.bootpag(page);
            bootpag.on('page', function(err, n) {
                param.currentPage = n;
                list.render()
                $('body').animate({
                    scrollTop: 0
                }, {
                    duration: 500,
                });
            })
        },
        render: function(ops) {
            _.extend(param, ops);
            referData.teacher(room_teacherid, param).done(data => {
                if (data.status == 1) {
                    if (data.data.rows.length < 1) {
                        items.html(ynconfig.none({ margin: 200 }));
                        bootpag.hide()
                        return;
                    }
                    items.html(referList.render({ data: data.data.rows }));
                    data.pageNumber = _.max([1, Math.ceil(+data.data.total / param.pageSize)])
                    bootpag.show().bootpag({ page: param.currentPage, total: data.pageNumber })
                } else() => {
                    return layer.msg(error[data.status]) }

            })
        }
    }
})()


//热门内参
var hot = (function() {
    var items;
    var create = item => `<a href="${item._link}" target="_blank" class="block hotRefer-item">${item.title}</a>`
    var handleData = arr => {
        return _.map(arr, item => {
            item._title = Str.clean(item.productInfo, 20);
            item._link = `/reference/${item.reference_id}.htm`
            return item;
        })
    }
    return {
        init: function() {
            items = $(".hotRefer-items");
        },
        render: function() {
            referData.teacherHot(room_teacherid).done(data => {
                if (data.status == 1) {
                    if (data.data.list.length < 1) {
                        items.html(ynconfig.none({ margin: 50 }))
                        return;
                    }
                    items.html(_.map(handleData(data.data.list), item => create(item)).join(""))
                } else() => {return layer.msg(error[data.status]) }                
            })
        }
    }
})()



$(function() {
    referCategory.render({
        container: $(".refer-category"),
        light: "bottom",
        select: value => {
            list.render({ productStatus: value,currentPage:1 })
        }
    });

    referList.init({ container: $(".refer-items") });
    list.init();
    list.render();
    hot.init();
    hot.render();
})
