//导航高亮

window.m={}
m.navigation = function() {
    var container, li,icon;
    var getName = function(path) {
        var paths = [
            { key: "m-about", name: "关于我们" },
            { key: "m-law", name: "法律声明" },
            { key: "m-mianze", name: "免责条款" },
            { key: "m-fengxian", name: "风险提示" },
            { key: "m-account", name: "企业账户" },
            { key: "m-help", name: "帮助中心" },
            { key: "m-zhaopin", name: "招贤纳士" },
            { key: "m-contact", name: "联系我们" }
        ];
        var name = "";
        paths.forEach(item => {
            if (path.indexOf(item.key) != -1) {
                name = item.name;
            }
        })
        return name;
    }
    return {
        name: null,
        init: function() {
            container = $('#navbar');
            li = container.find('.navbar-collapse li');
            container.on('click','.navbar-toggle',function(){
                event.stopPropagation();
                container.find('.navbar-collapse').slideToggle(200);
            })
            document.onclick = function(){
                container.find('.navbar-collapse').hide(200)
            }
        },
        select: function() {
            //优先使用指定的值, 再从地址中识别
            var name = this.name || getName(location.href);
            li.each(function(i) {
                if ($(this).text() == name) {
                    container.find('.title').html(name);
                    $(this).addClass("active");
                }
            })
        }
    }

}()

$(function(){
    m.navigation.init()
    m.navigation.select()
})