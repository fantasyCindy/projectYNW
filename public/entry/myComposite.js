require('~/center/center.js')
var HandleCompositeData = require('~/composite/handleData.js').handleData;
var Path = require('~/lib/path.js');

/*///////////////////////////////////////////////////////////////////*/

function showUser() {
    $("#teacherComposite").remove();
    $("#userComposite").show();
    userList().init().render();
}

function showTeacher() {
    $("#teacherComposite").show();
    $("#userComposite").remove();
    menuTeacher();
    listTeacher.init().render();
}

/*///////////////////////////////////////////////////////////////////*/


//菜单
var menuTeacher = function() {
    var container = $("#teacherComposite .switch")

    //组合
    container.on('click', 'td.item', function() {
        yn.switch($(this));
        listTeacher.render({
            cStatus: $(this).data('value'),
            currentPage: 1
        })
    })

    //审核
    container.on('click', 'td.verify', function() {
        yn.switch($(this));
        listTeacher.render({
            cStatus: "",
            currentPage: 1,
            audit: "1",
            status: "0",
        })
    })

    //切换审核状态
    $('#teacherComposite').on('change', '#menu-state', function() {
        listTeacher.render({
            cStatus: "",
            currentPage: 1,
            audit: "1",
            status: $(this).val(),
        })
    })

}

/*///////////////////////////////////////////////////////////////////*/

//列表
var listTeacher = function() {
    var container, bootpag, loading;

    var createTable = ops => {
        ops = _.extend({
            state: '状态',
            startTime: ''
        }, ops)

        var head = ops => {
            return `<tr><th>组合名称</th><th>投资风格</th><th>当前收益</th>
                        <th>最长期限</th><th>订阅价</th>${startTime}<th>${ops.state}</th>
                    <th>操作</th></tr>`
        }

        var body = ops => {
            ` <tr>
                <td class="name">${item._name}}</td>
                <td class="style">${item._style}}</td>
                <td class="income">${item._income}}%</td>
                <td class="max">${item.combination_maxterm}}天</td>
                <td class="feed">￥${item.order_price}}</td>
                <td class="state">${item._state}}</td>
                <td class="look">${item._linkHtml}}</td>
            </tr>`
        }
    }

    var handleDate = function(data, param) {
        var isApprove = !!param.audit;

        //处理审核
        var approve = {
            menu: function() {
                //根据参数中的状态值排序
                var _data = _.sortBy([
                    '<option value="0">待审核</option>',
                    '<option value="2">驳回</option>'
                ], function(item) {
                    var num = +item.match(/\d/)[0];
                    return +param.status == num ? -1 : num
                }).join("")
                return `<select id="menu-state">${_data}</select>`
            },
            action: function(item) {
                var status = +item.status;
                var id = item.combinationid;
                var editLink = Path.composite.create(id)
                item._state = ["待审核", "审核通过", "驳回"][status];
                var actions = {
                    0: `<a dta-id="${id}" class="action-item delete">删除</a>`,
                    2: `<a href="${editLink}" target="_blank" class="action-item edit">编辑</a>`
                }
                item._linkHtml = actions[status];
                return item;
            }
        }

        data._menu_state = isApprove ? approve.menu() : '状态'; //设置状态菜单
        data.rows = _.map(data.rows, function(item) {
            item._name = item.combination_name.substr(0, 10) + "..."
            item._state = ynconfig.composite_state[+item.combination_status][1];
            var _link = `/combination/${item.combinationid}.htm`;
            item._linkHtml = `<a href="${_link}" target="_blank">查看详情</a>`
            item._style = ynconfig.composite_style[item.combination_style][1];
            item._income = parseFloat(item.target_revenue);
            if (isApprove) item = approve.action(item);
            return item
        })
        return data;
    }

    return {
        init: function() {
            container = $("#teacherComposite .list");
            bootpag = yn.bootpag($('#teacherComposite .page'))
            bootpag.on('page', (err, n) => {
                this.render({ currentPage: n });
            })

            loading = new ynmodule.loading({
                container: container,
                type: 3,
                margin: 100
            });

            //删除
            container.on('click', '.delete .fa', function() {
                var el = $(this);
                var send = {
                    operType: "del",
                    ids: $(this).data('id')
                }
                $.post("/combination/doOperateSelected.htm", send, function(data) {
                    if (data == "success") {
                        layer.msg("删除成功");
                        el.parents('tr').remove()
                    } else {
                        throw data;
                    }
                })
            })
            return this;
        },
        render: function(ops) {
            var self = this;
            var param = {
                user_id: ynUserId,
                audit: "", //是否是审核菜单
                status: "", //审核状态 : 0:待审核 1 审核通过 2 驳回
                type: 1, //根据type区分用户和老师 0用户 1老师
                cStatus: 1, //组合状态: 0 预售中 1 进行中 2 完成 3 提前关闭 4 提起完成 5 到期失败 6 触及止损
                pageSize: 20,
                currentPage: 1
            }
            if (ops) _.extend(param, ops);
            loading.render();
            $.getJSON("/composite/compositeList.htm", param, function(data) {
                console.log("我的组合", data);
                container.show()
                if (data.rows.length < 1) {
                    bootpag.hide();
                    if (param.audit) {
                        container.html(template('approve-template'))
                        $("#menu-state").val(param.status)
                        return
                    }
                    return container.html(ynconfig.none({ margin: 100 }))
                }
                data = handleDate(data, param);
                container.html(template('teacherComposite-template', data))
                var pageNumber = _.max([1, Math.ceil(+data.total / param.pageSize)])
                bootpag.show().bootpag({ page: self.page, total: pageNumber })
            })
        }
    }
}()

/*///////////////////////////////////////////////////////////////////*/



var userList = function() {
    var container, menu, items, loading, bootpag

    return {
        init: function() {
            var self = this;
            container = $("#userComposite .composite-items");
            items = container.find('.items');
            menu = $("#userComposite .switch");
            menu.on('click', '.item', function() {
                yn.switch($(this));
                var value = +$(this).data('value');
                self.render({
                    cStatus: value
                })
            })
            loading = new ynmodule.loading({
                container: items,
                margin: 100
            })
            bootpag = yn.bootpag(container);
            return this;
        },
        render: function(ops) {
            var param = {
                user_id: ynUserId,
                audit: "", //是否是审核菜单
                status: "", //审核状态 : 0:待审核 1 审核通过 2 驳回
                type: 0, //根据type区分用户和老师 0用户 1老师
                cStatus: 1, //组合状态: 0 预售中 1 进行中 2 完成 3 提前关闭 4 提起完成 5 到期失败 6 触及止损
                pageSize: 20,
                currentPage: 1
            }
            if (ops) _.extend(param, ops);
            loading.render();
            $.getJSON("/composite/compositeList.htm", param, function(data) {
                console.log("我的组合", data);
                container.show();
                if (data.rows.length < 1) {
                    bootpag.hide()
                    items.html(ynconfig.none({ margin: 100 }))
                    return;
                }
                var rows = HandleCompositeData(data.rows)
                items.html(template('composite-item-template', rows))
                var pageNumber = _.max([1, Math.ceil(+data.total / param.pageSize)])
                bootpag.show().bootpag({ page: self.page, total: pageNumber });
            })
        }
    }
}


/*///////////////////////////////////////////////////////////////////*/


$(function() {

    yn.centerMenu.init({
        render: 'my',
        light: '我的组合'
    });

    if (!ynIsLogin) {
        yn.login.render();
        return;
    }

    //route 
    if (ynIsTeacher) {
        showTeacher()
    } else {
        showUser()
    }
})
