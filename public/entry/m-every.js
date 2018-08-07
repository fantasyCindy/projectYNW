window.m={}
window.m_config={
	//导航栏
    navigation: {
        a: "问股",
        b: "直播",
        c: "观点",
        d: "内参"
    },
    livelist:[
        {path:'rqhot',name:'人气最高',index:'0'},
        {path:'gdhot',name:'观点最多',index:'1'},
        {path:'hdhot',name:'互动最多',index:'2'},
    ],
    none: function(ops) {
        ops = $.extend({
            text: "暂无记录",
            margin: 260,
            fontSize: 14
        }, ops)
        return "<p class='nothing' style='background:white;text-align:center;padding:" + ops.margin + "px 0;font-size:" + ops.fontSize + "px'>" +
            "<i class='fa fa-exclamation-circle fa-lg' style='margin-right:5px'></i>" + ops.text + "</p>"
    },
    more: function() {
        return '<p class="loadMore">加载更多</p>';
    },
    link:function(path,paths){
        var param = {
            name:null,
            index:0
        };
        paths.forEach(item => {
            if (path.indexOf(item.path) != -1) {
                param.index=item.index;
                param.name = item.name;
            }
        })
        return param;
    }
}

//导航高亮
m.navigation = function() {
    var container, li,icon;
    var getName = function(path) {
        var paths = [
            { key: "m-ask", name: "问股" },
            { key: "m-live", name: "直播" },
            { key: "m-opinion", name: "观点" },
            { key: "m-refer", name: "内参" }
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
            container = $('#yn-tag');
            li = container.find('.column span');
            icon=container.find('.column_box .column_list');
        },
        select: function() {
            //优先使用指定的值, 再从地址中识别
            var name = this.name || getName(location.href);
            li.each(function(i) {
                if ($(this).text() == name) {
                    $(this).addClass("cur");

                }
            })
            icon.each(function(i){
            	if ($(this).data('name') == name) {
            		$(this).show();
            	}
            })
        }
    }

}()

//app下载弹窗
m.alert=function(){
	var container;
	var creat=`<div id="art"><a href="http://www.yuetougu.com/app/returnAppJsp.htm"><img src="/public/images/yn-h5/art.png"/></a><span class="close icon-close"></span></div>`
	return {
		init:function(){
			var _this=this;
			$('body').append(creat);
			container=$('#art');
			container.on('click','.close',function(){
				_this.hide();
			})
		},
		show:function(){
			container.show();
		},
		hide:function(){
			container.hide();
		}
	}
}()

//返回上一步
m.return=function(){
	var container;
	return {
		init:function(){
			container=$('#return');
		},
		last:function($el){
			container.on('click',$el,function(){
				history.go(-1);
			})
		}
	}
}()

m.getUrlParam = function(name){
    var reg= new RegExp("(^|&)"+name +"=([^&]*)(&|$)");
    var r= window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}

$(function(){
	m.navigation.init()
    m.navigation.select()
    m.alert.init()
    m.return.init();
})