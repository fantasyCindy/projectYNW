window.yntool = {};

/*///////////////////////////////////////////////////////////////

    log : 打印信息

    filterHTML : 过滤HTML
    

/////////////////////////// 验证  ///////////////////////////////////


    
    
///////////////////////// UI ////////////////////////////////////

    bootpag : 添加页码组件
    loading :加载动画
    navigation  : 导航栏
    yntool.centerBox : 居中定位  

///////////////////////////////////////////////////////////////*/

yntool.log = function(value) {
    console.log(value)
};

yntool.loading = function(ops) {
    _.extend(this, ops)
}

yntool.loading.prototype = {
    container: null,
    type: 2,
    margin: 60,
    render: function() {
        var tag = '<div class="loading" style="text-align:center;"><img class="inline" style="margin:'+ this.margin + 'px 0; " src="/public/icons/loading' + this.type + '.gif "/></div>';
        this.container.html(tag);
    }
}

/*添加页码组件*/
/*selector支持css选择器和jquery对象*/
yntool.bootpag = function(selector, ops) {
    ops = _.extend({
        first: true
    }, ops)
    var timestamp = _.now();
    var id = '#' + timestamp
    var tag = '<ul id="' + timestamp +'" class="yntoolpagination"></ul>';
    var container = function() {
        if (typeof selector != "string") {
            return selector
        } else {
            return $(selector);
        }
    }()

    container.append(tag);
    var bootpag = $(id).bootpag({
        total: 1,
        page: 1,
        maxVisible: 5,
        firstLastUse: ops.first,
        first: "首页",
        last: "尾页",
        next: "下一页",
        prev: "上一页",
        leaps: false
    })
    bootpag.hide = function() {
        $(id).hide();
        return bootpag;
    }
    bootpag.show = function() {
        $(id).show();
        return bootpag;
    }
    return bootpag;
}

/*页面滚动 true or false*/
yntool.bodyScroll = function(flag) {
    if (!flag) {
        $('body').css('overflow', 'hidden');
    } else {
        $('body').css('overflow', 'auto');
    }
}



/* 过滤HTML标签  */
yntool.filterHTML = function(content, ops) {
    if (typeof content != 'string') {
        return content
    };

    ops = _.extend({
        substr: 0,
        discern: false,
        trim: false
    }, ops)

    var result = content.replace(/<.+?>/g, function(value) {
        if (value.indexOf("img") != -1) {
            return "[图片]"
        } else {
            return ""
        }
    });
    if (ops.substr > 0) {
        result = result.substr(0, ops.substr) + "...";
    }

    if (ops.discern) {
        result = yntool.codeFormat(result);
    }
    if (ops.trim) {
        var matches = result.match(/[\u4E00-\u9FA5\w\d，。？！：:'"“”%-~\[\]]+/g);
        result = matches.join("");
    }
    return result;
}


/* 居中定位  */
yntool.centerBox = function(box) {
    var w = document.body.clientWidth;
    var h1 = $(window).height()
    var h2 = document.body.clientHeight;
    var h = _.min([h1, h2]);
    var bw = box.width();
    var bh = box.height();
    var left = (w - bw) / 2 + 'px';
    var top = (h - bh) / 2 + 'px';
    box.css({
        "position": "fixed",
        "left": left,
        "top": top
    });
}

/**
 * 高亮
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
yntool.select = function(el) {
    el.parent().find('.select').removeClass('select');
    el.addClass('select');
}




/*///////////////////////////////////////////////////////////////////*/
