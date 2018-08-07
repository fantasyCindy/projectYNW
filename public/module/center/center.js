// 设置菜单高亮
yn.navigation.name = ynconfig.navigation.g;
yn.logout.path = __path;
if (!ynIsLogin) {
    setTimeout(() => {
        yn.login.render();
    }, 100)
    yn.login.onClose = function() {
        location.href = __path
    }
}



/*----

个人中心菜单

1.初始化
yn.centerMenu.init({
    render:'my',
    light:'我的观点'
}) 

1-2.渲染
yn.centerMenu.render({type:'my'}) 

----*/
yn.centerMenu = function() {
    var container, items, title, light;

    var createItems = arr => {
        return _.map(arr, item => {
            var select = _.trim(item.menuname) == light ? "select" : "";
            return `<a class="item ${select}" id="${item.menu_id} " href="/${item.menuurl}">
                    <span class="txt ">${item.menuname}</span>
                    <i class="fa fa-angle-right "></i>
                </a>`
        }).join("")
    }
    return {
        init(ops) {
            container = $('#centerMenu')
            items = container.find('.items')
            title = container.find('.title .name')
            light = ops.light || "";
            ops.render && this.render({ type: ops.render })
        },
        render(ops) {
            ops = _.extend({ type: "center" }, ops)
            var types = {
                center: { title: "个人设置", url: "/menu/queryWebUserMenu.htm" },
                my: { title: "个人中心", url: "/menu/queryWebUserMyMenu.htm" }
            }

            var type = types[ops.type];
            var url = type.url
            title.text(type.title);
            new yn.loading({ container: items, margin: 200 }).render();
            $.getJSON(url, { user_id: ynUserId }, data => items.html(createItems(data)))
        }
    }
}()