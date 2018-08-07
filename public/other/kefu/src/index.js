$(function () {

    /*///////////////////////////////////////////////////////////////////*/

    document.oncontextmenu = function () {
        return false
    }

    var app = (function () {
        var container = $('#app')
        var current = "public"

        return {
            // 修改类型样式名称
            changeType: function (type) {
                if (current == type) return;
                var className = container.attr('class')
                var reg = new RegExp(current)
                container.attr('class', className.replace(reg, type))
                current = type
            }
        }

    })()

    /* 顶部菜单栏 */
    var topBar = (function () {
        var container = $('#app-top')

        // 点击高亮
        container.on('click', '.top-item', function () {
            $(this).addClass('active').siblings().removeClass('active')
            var type = $(this).data('value')
            app.changeType(type)
        })

    })()


    /* 列表 */
    var list = (function () {
        var container = $('#app-list')
        var create = function (arr) {
            return arr.map(item => {

            })
        }

        // 双击
        container.on('dblclick', '.list-item', function (e) {
            alert($(this).text())
        })

        // 快捷发送
        container.on('click', '.send.icon', function (e) {
            alert("快捷发送")
            return false
        })

        container.on('contextmenu', '.list-item', function (e) {
            contextmenu.render({
                x: e.pageX,
                y: e.pageY
            })
            return false
        })

    })()


    /*  右键菜单 */
    var contextmenu = (function () {
        var container = $('#contextmenu')
        var items = container.find('.items')

        var create = arr => {
            return arr.map(item => {
                var tag = ` <div class="ct-item">
                            <span class="value">${item.name}</span>
                        </div>`
            })

        }

        document.onclick = function () {
            container.hide()
        }

        // select
        container.on('click', '.ct-item', function () {

        })

        return {
            // ctx = {x, y, [[1, 2], [3, 4]]}
            render(ops) {
                container.css({
                    "top": ops.y + 10 + "px",
                    "left": Math.min(140, ops.x) + "px"
                })
                // items.html(create(ops.data))
                container.show()
            }
        }

    })()


    /*///////////////////////////////////////////////////////////////////*/
})