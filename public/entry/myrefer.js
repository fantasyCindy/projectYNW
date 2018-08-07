require('~/center/center.js')
var referList = require('~/composite/refer-list.js');
var error = require('e/error-type');
var User, Teacher, params = {
    audit: "", //[0,1]是否审核
    type: ynIsTeacher ? 1 : 0, //老师or用户
    status: "", //审核状态 0=待审核, 2=未通过
    productStatus: 0, //[0,1,2] 更新/预售/结束
    puiblisherid: ynUserId,
    currentPage: 1,
    pageSize: 10,
}



// 获取内参数据
var getReferData = function(ops) {
    _.extend(params, ops)
    var defer = $.Deferred();
    $.getJSON('/center/reference/list.htm', params, data => {
        data.pageNumber = _.max([1, Math.ceil(+data.data.total / params.pageSize)]);
        defer.resolve(data);
    })
    return defer.promise();
}

/*///////////////////////////////////////////////////////////////////*/

// 普通用户端
User = function() {

    // 页码
    var bootpag = yn.bootpag('#contentWrap');
    bootpag.on('page', function(e, num) {
        list.render({
            currentPage: num
        })
    })

    // 菜单
    var menu = (function() {
        var container = $(".category")
        var create = function() {
            return `<table><tr>
                        <td class="menu-item select" data-value="0">更新中</td>
                        <td class="menu-item" data-value="1">预售中</td>
                        <td class="menu-item" data-value="2">已结束</td>
                    </tr></table>`
        }

        container.on('click', '.menu-item', function() {
            container.find('.select').removeClass('select')
            $(this).addClass('select')
            var value = $(this).data('value')
            list.render({
                productStatus: value
            })
        })

        return {
            render() {
                container.html(create())
            }
        }

    })()

    // 列表
    var list = (function() {
        var container = $(".contentBar");
        var items = container.find('.items');
        referList.init({ container: items });
        var loading = new yn.loading({ container: items })
        return {
            render(ops) {
                loading.render()
                getReferData(ops).done(back => {
                    if (back.status == 1) {
                        if (back.data.list.length < 1) {
                            bootpag.hide()
                            items.html(ynconfig.none({ margin: 200, text: "列表为空" }))
                            return;
                        }
                        referList.render({ data: back.data.list })
                        bootpag.show().bootpag({ total: back.pageNumber })
                    }else () => {return layer.msg(error[data.status])}

                })
            }
        }
    })()

    // call
    menu.render()
    list.render()
}


/*///////////////////////////////////////////////////////////////////*/

// 老师端
Teacher = function() {
    if (__isIE8) {
        return window.location.href(`${__path}/index.htm`)
    }

    var App = require('comp/myrefer.vue')
    new Vue({
        el: '#teacherBar',
        render: h => h(App)
    })
}

/*///////////////////////////////////////////////////////////////////*/

$(function() {
    yn.centerMenu.init({
        render: 'my',
        light: '我的内参'
    })
    ynIsTeacher ? Teacher() : User()
})
