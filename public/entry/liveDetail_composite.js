/*///////////////////////////////////////////////////////////////////*/
var liveDetailCommon = require('./liveDetail_common.js');
var Path = require("../module/lib/path.js");
var HandleData = require('../module/composite/handleData.js').handleData;

/*///////////////////////////////////////////////////////////////////*/

var filter = function() {
    var container;
    return {
        init: function() {
            container = $('.filter');
            container.on('click', '.item', function() {
                yn.switch($(this));
                composite.render({
                    cStatus: $(this).data('value')
                })
            })
        }
    }
}()

var composite = (function() {
    var container, items, teacherid, loading, bootpag,
        param = {
            user_id: ynUserId,
            status: 1, //审核状态 : 0:待审核 1 审核通过 2 驳回
            type: 0, //根据type区分用户和老师 0用户 1老师
            cStatus: 0, //组合状态: 0 预售中 1 进行中 2 完成 3 提前关闭 4 提起完成 5 到期失败 6 触及止损
            pageSize: 10,
            currentPage: 1,
            teacherid: room_teacherid
        }

    return {
        init: function() {
            var self = this;
            container = $('.composite-container');
            items = container.find('.composite-items');
            loading = new yn.loading({
                container: items
            })
            bootpag = yn.bootpag(container);
            bootpag.on('page', function(err, num) {
                self.render({
                    currentPage: num
                })
            })
        },
        render: function(_param) {
            _.extend(param, _param);
            loading.render()
            $.getJSON("/composite/compositeList.htm", param, data => {
                console.log("组合", data)
                if (!data.rows || data.rows.length < 1) {
                    items.html(ynconfig.none({ margin: 335 }))
                    bootpag.hide();
                    return;
                }
                var rows = HandleData(data.rows);
                items.html(template('composite-item-template', rows));
                var pageNumber = Math.ceil(_.max([1, +data.total / param.pageSize]))
                bootpag.show().bootpag({ page: param.currentPage, total: pageNumber })
            })
        }
    }
})()


/*///////////////////////////////////////////////////////////////////*/


$(function() {

    //
    $('.liveDetail-menu .item').each(function() {
        if ($(this).text() == "组合") {
            $(this).addClass('select');
        }
    })

    composite.init();
    filter.init();
    composite.render();
})
