$(function() {
    tag.init()
    tag.render()
})

var tag = (function() {
    var container, tag, type = 3;
    var getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    var createItems = arr => {
        return arr.map(item => {
            return `<div class="wrap_list clear">
		                <a href="/mobile/m-liveing.htm?teacherid=${item.teacherid}">
		                    <div class="wrap_cont clear">
		                        <div class="photo"><img src="${item.photo}"/></div>
		                        <div class="wrap_intro">
		                            <div class="wrap_title">${item.title}</div>
		                            <div class="intro">${item.content}</div>
		                        </div>
		                    </div>
		                    <div class="quantity"><p>${item.popularity}</p>人参与</div>
		                </a>
		            </div>`
        }).join('')
    }
    return {
        init: function() {
            var _this = this;
            var nav = m_config.link(location.href, m_config.livelist);
            container = $('#liveList');
            tag = $('#tag');
            type = parseInt(nav.index) + 1;
            tag.find('.item').eq(nav.index).addClass('select');
            this.render();
            tag.on('click', '.item', function() {
                $(this).parent().find('.item').removeClass('select');
                $(this).addClass('select');
                type = $(this).data('type');
                _this.render();
            })
        },
        render: function() {
            var send = {
                order: "attentionnumber", // pinyininitials按拼音排序
                sort: "desc", //desc=?
                type: type //1=最热, 2=观点最多, 3=互动最多
            }
            $.getJSON('/html/broadcastingList.htm', send, function(data) {
                if(data.status == 1){
                    container.html(createItems(data.data))
                }
            })
        }
    }
})()
