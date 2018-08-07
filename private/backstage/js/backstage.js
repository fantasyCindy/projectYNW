yn.logout.path = "/index.htm"
yn.navigation.name = ynconfig.navigation.g;


yn.centerMenu = {
    container: null,
    items: null,
    title: null,
    init: function() {
        this.container = $('#centerMenu');
        this.items = this.container.find('.items');
        this.title = this.container.find('.title .name');
    },
    render: function(ops) {
        ops = _.extend({
            type: "center"
        }, ops)

        var types = {
            center: {
                title: "个人设置",
                url: "/menu/queryWebUserMenu.htm"
            },
            my: {
                title: "个人中心",
                url: "/menu/queryWebUserMyMenu.htm"
            }
        }

        var type = types[ops.type];
        var url = type.url
        this.title.text(type.title);

        var loading = new yn.loading({
            container: this.items,
            margin: 200
        })

        loading.render();
        this.getData(url, data => {
            this.items.html(template('backstage-template', data));
        });
    },
    getData: function(url, callback) {
        $.getJSON(url, { user_id: ynUserId }, data => callback(data))
    }
}
