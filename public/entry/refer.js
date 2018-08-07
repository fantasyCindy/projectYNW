/*///////////////////////////////////////////////////////////////////*/
yn.navigation.name = ynconfig.navigation.h;
var referList = require('m/composite/refer-list.js');
var BestTeacher = require('m/composite/refer-best-teacher.js');
var newRefer = require('m/composite/refer-hot.js');
var error = require('e/error-type');


/*///////////////////////////////////////////////////////////////////*/


//分类
var fitler = (function() {
    var container;
    return {
        init: function() {
            container = $(".filter-items");

            //高亮
            container.on('click', '.filter-item', function() {
                yn.switch($(this))
            })

            //状态
            container.on('click', '.status-item', function() {
                list.render({
                    productStatus: $(this).data('status'),
                    currentPage: 1,
                })
                var status = $(this).data('status');
            })

            //价格
            container.on('click', '.price-item', function() {
                list.render({
                    currentPage: 1,
                    lprice: $(this).data('min'),
                    hprice: $(this).data('max')
                })
            })

            //时间
            container.on('click', '.time-item', function() {
                list.render({
                    currentPage: 1,
                    time: $(this).data('time'),
                })
            })
        }
    }
})()


/*///////////////////////////////////////////////////////////////////*/

//列表
var list = (function() {
    var container, items, bootpag, loading, props = {
        ynUserId: null,
        productStatus: "", //状态
        lprice: "", //价格下限
        hprice: "", //价格上限
        time: "", //时间
        pageSize: 10,
        currentPage: 1
    };

    var body;

    return {
        init: function() {
            container = $("#refer-list");
            items = container.find('.refer-items');
            bootpag = yn.bootpag(container)
            bootpag.on('page', (err, num) => this.render({ currentPage: num }))
            loading = new yn.loading({
                container: items,
                margin: 200,
                type: 3
            })
            body = $("body")



        },
        render: function(ops) {
            $(window).scrollTop(0)
            _.extend(props, ops)
            loading.render();
            $.getJSON('/center/reference/portaList.htm', props, function(data) {
                if (data.status == 1) {
                    if (data.data.list.length < 1) {
                        items.html(ynconfig.none({ margin: 200 }));
                        bootpag.hide()
                        return;
                    }
                    referList.render({ data: data.data.list });
                    bootpag.show().bootpag({ page: props.currentPage, total: _.max([1, Math.ceil(+data.data.total / props.pageSize)]) });
                }else () => {return layer.msg(error[data.status])}

            })
        }
    }
})()


/*///////////////////////////////////////////////////////////////////*/


$(function() {
    fitler.init();
    list.init();
    list.render();
    referList.init({ container: $(".refer-items") });
    onSelect('内参')
    // BestTeacher.render({ container: $(".refer-best .items") }) //内参牛人
    // newRefer.render({ type: "new", container: $(".refer-lastest .items") }) //最新内参
    // newRefer.render({ type: "hot", container: $(".refer-hot .items") }) //热门内参
    // newRefer.render({ type: "hd", container: $(".refer-talkest .items") }) //互动最多
})
