window.yn = {};

/*///////////////////////////////////////////////////////////////

    log : 打印信息
    setDecimal : 设置小数
    colorValue : 着色
    filterHTML : 过滤HTML
    
    sliderMake : 幻灯片切换
    timestamp : 时间戳
    switchTimestamp : 转换为时间戳
    yn.now : 当前时间
    MarketIndex : 大盘指数(模块)

    getPayOrder : 支付订单链接

    queryStock : 查询股票
    stockPrefix : 查询股票前缀
    popStock : 弹出股票信息
    isStockCode : 验证股票
    codeFormat : 股票代码加链接

/////////////////////////// 验证  ///////////////////////////////////

    isNumber : 验证数字
    isMobile : 验证手机号
    isMail : 验证邮箱
    isWord :　验证是否为有效字符
    inputVerify : 标记验证
    isCharacter : 验证是否为(数字+英文+汉字)
    isPassword :  验证密码
    
    
///////////////////////// UI ////////////////////////////////////

    calendar : 日历
    popView : 弹层
    bootpag : 添加页码组件
    wordCount : 字数统计
    aimatecss : CSS动画
    cropbox : 上传头像图片函数
    verifyImgFile : 验证图片上传格式
    verifyPhoneCode : 验证短信
    zoomImage : 放大图片
    timeFormat : 时间格式化

    addNoteType :　添加分类
    navigation  : 导航栏
    yn.centerBox : 居中定位
    

///////////////////////////////////////////////////////////////*/

yn.log = function(value) {
    console.log(value)
};

yn.loading = function(ops) {
    _.extend(this, ops)
}

yn.loading.prototype = {
    container: null,
    type: 2,
    margin: 60,
    render: function() {
        var tag = `<div class="loading" style="text-align:center;"><img class="inline" style="margin:${this.margin}px 0;" src="/public/icons/loading${this.type}.gif"/></div>`;
        this.container.html(tag);
    }
}



////////////////////////////////////////////////////////////////


//添加分类
yn.noteTypeTag = function(ops) {
    ops = _.extend({
        select: -1
    }, ops)

    var types = ynconfig.noteType;
    var result = "";

    for (var key in types) {
        var value = types[key];
        var keyNum = +key.match(/[0-9]/)[0];
        var select = keyNum == ops.select ? "select" : ''
        var index = key.match(/\d+/)[0];
        result += `<span class="item ${select} askStock-category-item " data-id="${index}">${value}</span>`;
    }

    return result;
}

//内参分类信息
yn.referType = function(ops) {
    ops = _.extend({
        select: -1
    }, ops)
    return _.map(ynconfig.referType, function(item, i) {
        var select = ops.select == i ? "select" : "";
        return `<span class="referType-item ${select}" data-id="${item.id}">${item.name}</span>`;
    }).join('')
}

//问股分类
yn.getAskStockCategory = function(ops) {
    ops = _.extend({
        select: -1,
        hasAll: true
    }, ops)

    var data = ynconfig.askStockCategory;
    if (!ops.hasAll) {
        data = _.drop(data);
    }

    return _.map(data, function(item) {
        var select = item.id == ops.select ? "select" : "";
        if (item.id == -1) {
            item.id = ""
        }
        return `<span class="item ${select} askStock-category-item " data-id="${item.id}">${item.name}</span>`
    }).join('');
}


//观点分类信息
yn.opinionType = function(ops) {
    ops = _.extend({
        select: -1
    }, ops)

    return _.map(ynconfig.opinionType, function(item, i) {
        var select = ops.select == i ? "select" : ""
        return `<span class="opinionType-item ${select}" data-id="${item.id}">${item.name}</span>`;
    }).join('')
}


/*验证*/
yn.isNumber = function(value) {
    value = String(value);
    var result = true;
    for (var i = 0; i < value.length; i++) {
        var flag = /[0-9.]/.test(value[i]);
        if (!flag) {
            result = false;
        }
    }
    return result;
};


yn.isMobile = function(value) {
    value = String(value);
    var isNumber = yn.isNumber(value);
    if (!isNumber) {
        return false;
    }
    var reg = /^0?1[34578][0-9]{9}$/;
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
};

yn.isMail = function(value) {
    value = String(value);
    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
};

yn.isWord = function(value) {
    value = String(value);
    var reg = /[\w0-9@$!\-]+/;
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
};


//数字英文和汉字
yn.isCharacter = function(value) {
    value = String(value);
    var len = value.length;
    var reg = /[0-9a-zA-Z\u4E00-\u9FA5]+/;
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
}

//身份证号码
yn.isCard = function(value) {
    value = String(value);
    var reg = /(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)/;
    if (reg.test(value)) {
        return true
    } else {
        return false;
    }
}

yn.isPassword = function(value) {
    var reg = /[0-9]*[a-zA-Z]+[0-9]*/;
    if (reg.test(value) && value.length >= 6) {
        return true
    } else {
        return false;
    }
}

yn.isStockCode = function(value) {
    value = String(value);
    var reg = /[036][0-9]{5}/
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
}



/*

===依赖===

如果需要显示错误提示, 在同级或父级内包含类名为.error-msg的标签.

===参数===

    id : css选择器
    rightColor : String,  表单正确时边框颜色, 默认为自身颜色.
    errorColor : String,  表单错误时边框颜色, 默认为红色.
    focus : Function,  默认隐藏错误信息, 验证标记为0
    blur : Function, 默认根据布尔返回值: 标记或显示错误提示


Sample: --验证手机号
yn.inputVerify("#mobile", {
    blur: function(_this) {  // 回调参数_this指的是当前验证的表单
        return yn.isMobile(_this.val());
    }
})

===更新===

2016.5.17 --增加异步验证支持
- blur回调函数中如果返回的是promise对象, 则在根据resolve函数中的返回的布尔值, 作为标记验证
- Sample--图片验证码
        yn.inputVerify("#validCode", {
            blur: function(_this) {
                var defer = $.Deferred();
                var val = _this.val();
                $.get("/validateImgCode.htm", { code: val }, function(data) {
                    if (data == "success") {
                        defer.resolve(true);
                    } else {
                        defer.resolve(false);
                    }
                })
                return defer.promise();
            }
        })


 */

yn.inputVerify = function(id, ops) {
    var _this = function() {
        if (typeof id == "string") {
            return $(id);
        } else {
            return id;
        }
    }()

    ops = _.extend({
        borderColor: _this.css('borderColor'),
        rightColor: "#00DD00",
        errorColor: "red",
        errorMsg: null,
        focus: function() {},
        blur: function() {}
    }, ops);

    (function(ops, _this) {
        _this.focus(function() {
            //find msg
            var parent = _this.parent();
            var msg = parent.find('.error-msg');
            if (msg.get(0) === undefined) {
                msg = parent.parent().find('.error-msg');
            }
            msg.hide();
            _this.data('verify', '0').css('borderColor', ops.borderColor);
            ops.focus(_this);
        })
    })(ops, _this);

    (function(ops, _this) {
        _this.blur(function() {
            //find msg
            var parent = _this.parent();
            var msg = parent.find('.error-msg');
            if (msg.get(0) === undefined) {
                msg = parent.parent().find('.error-msg');
            }

            var _verify = function(flag) {
                if (flag) {
                    _this.data('verify', '1').css('borderColor', ops.rightColor);
                } else {
                    msg.show();
                    _this.css('borderColor', ops.errorColor);
                }
            }
            var result = ops.blur(_this);

            //defer
            if (result.hasOwnProperty('done')) {
                result.done(function(data) {
                    _verify(data);
                })
                return;
            }

            //normal
            _verify(result);

        });
    })(ops, _this)
}


yn.now = function(ops) {
    ops = _.extend({
        pad: false,
        join: false
    }, ops);

    var now = new Date();
    var today = Number(now.getDate());
    var month = Number(now.getMonth() + 1);
    var year = Number(now.getFullYear());
    var h = +now.getHours();
    var m = +now.getMinutes();
    var s = +now.getSeconds();

    var result = [year, month, today, h, m, s];

    if (ops.pad) {
        result = _.map(result, function(item) {
            item = _.padLeft(item, 2, "0")
            return item;
        });
        if (ops.join) {
            return `${result[0]}-${result[1]}-${result[2]} ${result[3]}:${result[4]}:${result[5]}`
        }
        return result
    }

    return result;
}



/**
 * 设置小数位数
 * yn.setDecimal(1.256689, 2) => 1.25
 * ops.step : 小数位数
 * ops.math : 截取方法
 * 
 */
yn.setDecimal = function(origin, ops) {
    var number = parseFloat(origin);
    if (isNaN(number)) {
        console.log(`setDecimal error : ${origin} is not valid! `)
        return origin
    }
    ops = _.extend({
        step: 2,
        math: "floor"
    }, ops);

    if (number === 0) {
        return _.padRight("0.", ops.step + 2, "0")
    }

    //处理负数
    var prefix = "";
    if (number < 0) {
        number = Math.abs(number);
        prefix = "-";
    }

    //去掉多余的位数
    var step = +_.padRight("1", ops.step + 1, "0"); //相乘的基数:2=>100, 3=>1000
    var zoom = number * step;
    if (zoom < 1) return String(origin).match(/[0.]+[^0]/)[0];

    number = Math[ops.math](zoom) / step;
    var result = String(number).split(".");
    if (result.length < 2) {
        result[1] = "";
    }
    result[1] = _.padRight(result[1], ops.step, "0")
    return prefix + result.join(".");
}


/**
 * [数字着色]
 * @param  {[String/Number]} value [传入值]
 * @param  {[type]} ops   [description]
 * @return {[type]}       [description]
 */
yn.colorValue = function(value, ops) {
    var result = '';
    ops = _.extend({
        suffix: '', //结果添加后缀
        left: Number(value), // 表达式的左侧
        right: 0, //表达式的右侧
        upColor: 'red', //结果为正的颜色
        lowColor: "#17cb17", //结果为负的颜色
        display: value //输出的字符
    }, ops);

    //计算结果为负
    if (ops.left <= ops.right) {
        result = '<span style="color:' + ops.lowColor + '">' + ops.display + ops.suffix + '</span>';
    }
    //计算结果为正
    if (ops.left > ops.right) {
        result = '<span style="color:' + ops.upColor + '">' + ops.display + ops.suffix + '</span>';
    }
    return result;
};



/*
着色
    根据表示的计算结果返回带有颜色的标签
*/
yn.color = function(value, ops) {
    ops = _.extend({
        upColor: '#d53', //结果为正的颜色
        lowColor: "#390", //结果为负的颜色
        display: value,
        exp: () => +value > 0
    }, ops);

    //计算结果为负
    if (ops.exp()) {
        return `<span style="color: ${ops.upColor}">${ops.display}</span>`
    } else {
        return `<span style="color:${ops.lowColor}">${ops.display}</span>`;
    }
};



/**
 * 实时查询股票
 * @param  {[String]} code [股票代码]
 * @param  {[Object]} ops  [可选项]
 * @return {[Array]}      [返回数组]
 */
yn.queryStock = function(code, ops) {
    var defer = $.Deferred();
    ops = _.extend({
        handle: false, // 是否返回处理过的数据 : 截取2位小数, [33=涨跌幅, 34=涨跌额, 35=涨停价, 36=跌停价]
        color: false // 是否着色,对现价[3],涨跌幅[33]着色, 涨跌额[34]
    }, ops)
    var reg = /[0-9]{6,}/;
    if (!reg.test(String(code))) {
        yn.log("yn.queryStock : stock code is error...");
        return defer.reject();
    }

    var prefixs = { 0: "sz", 3: "sz", 6: "sh" };
    var prefix = prefixs[String(code).substr(0, 1)];
    $.ajax({
        cache: true,
        url: "http://hq.sinajs.cn/list=" + prefix + code,
        type: "GET",
        dataType: 'script',
        success: function(data) {
            var res = eval('hq_str_' + prefix + code + '.split(",")');
            if (res.length < 5) {
                return defer.reject();
            }
            if (parseInt(res[3]) === 0) {
                res[3] = res[2];
            }

            //格式化数据
            if (ops.handle) {
                res = _.map(res, function(item) {
                    var result = parseFloat(item);
                    if (result === 0) {
                        return "---"
                    }
                    if (!result) {
                        return item;
                    }
                    return yn.setDecimal(item);
                })

                res[33] = yn.setDecimal((res[3] - res[2]) / res[2] * 100); //涨跌幅
                res[34] = yn.setDecimal(res[3] - res[2]); //涨跌额
                res[35] = yn.setDecimal(res[1] * 1.1) //涨停价
                res[36] = yn.setDecimal(res[1] * 0.9) //跌停价

                //成交量
                res[8] = function() {
                    return yn.setDecimal(res[8] / 1000000) + "万手";
                }()

                // 成交额
                res[9] = function() {
                    if (res[9] == "---") {
                        return "---";
                    }
                    var value = res[9] / 10000;
                    if (value > 10000) {
                        value = yn.setDecimal(value / 10000) + "亿元";
                    } else {
                        value = yn.setDecimal(value) + "万元"
                    }
                    return value;
                }();

                //数据格式化前的值
                var now = res[1];

                //数据着色
                if (ops.color) {
                    res[1] = yn.colorValue(res[1], { //开盘价
                        right: res[2]
                    })
                    res[3] = yn.colorValue(res[3], {
                        left: res[34]
                    });
                    res[4] = yn.colorValue(res[4], { //最高价
                        right: now
                    })
                    res[5] = yn.colorValue(res[5], { //最低价
                        right: now
                    })
                    res[33] = yn.colorValue(res[33], {
                        suffix: "%"
                    }); //涨跌幅

                    res[34] = yn.colorValue(res[34]);
                    res[35] = yn.colorValue(res[35], { //涨停价
                        right: now
                    })
                    res[36] = yn.colorValue(res[36], { //跌停价
                        right: now
                    })
                }
            }
            defer.resolve(res);
        }
    });
    return defer.promise();
};


//股票前缀
yn.stockPrefix = function(code) {
    code = String(code);
    var prefix = { "0": "sz", "3": "sz", "6": "sh" };
    return prefix[code.substr(0, 1)] + code;
};


/**
 * 大盘指数 (已导出模块)
 * */

yn.MarketIndex = function() {
    var container = null;
    var cacheData = [];

    var getData = function(callback) {
        $.getJSON("/html/querySinaMarketData1.htm", function(data) {
            callback(_.map(["上证指数", "深证成指", "中小板指", "创业板指"], function(item) {
                item = handleData(data.market[item]);
                return item;
            }));
        });

        var handleData = function(data) {
            data.curdot = yn.setDecimal(data.curdot);
            var rate = parseFloat(data.rate);
            data.color = rate > 0 ? "red" : "green"
            if (rate === 0) {
                data.color = "gray";
            }
            return data;
        }
    }

    var createHTML = function(data, index) {
        return `<div id="mi-${index}-color" class="marketIndex-item ${data.color}">
                        <div class="line1">
                            <span id="mi-${index}-name" class="name">${data.name}</span>
                            <span id="mi-${index}-curdot"  class="curdot">${data.curdot}</span>
                            <span class="icon"></span>
                        </div>  
                        <div class="line2">
                            <span id="mi-${index}-curprice"  class="price">${data.curprice}</span>
                            <span id="mi-${index}-rate"  class="rate">${data.rate}</span>
                        </div>
                    </div>`
    }

    var isEqual = function(a, b) {
        if (!a || !b) return false;
        var result = true;
        _.forEach(a, function(item, index) {
            if (item !== b[index]) {
                result = false;
            }
        })
        return result
    }

    var compile = function() {
        getData(function(data) {
            _.forEach(data, function(item, index) {
                if (!isEqual(item, cacheData[index])) {
                    var tag = createHTML(item, index);
                    container.find('td').eq(index).html(tag);
                    cacheData[index] = item;
                }
            })
        })
    }

    return {
        render: function(_container, layout) {
            container = _container;
            layout = layout || "line"
            var types = {
                line: '<table class="line" id="MarketIndex"><tr><td></td><td></td><td></td><td></td></tr></table>',
                column: '<table class="column" id="MarketIndex"><tr><td></td><td></td></tr><tr><td></td><td></td></tr></table>'
            }
            container.html(types[layout]);
            compile();
            setInterval(function() {
                compile();
            }, 5000)
        }
    }
}

//幻灯片过渡
yn.sliderMake = function(container) {
    var bannerCount = container.find(".banner").length - 1;
    var currentIndex = 0;
    var pageIndex = container.find('.pageIndex');
    if (pageIndex.get(0)) {
        pageIndex.on('click', '.item', function() {
            var current = container.find('.banner:visible').index();
            var next = $(this).index();
            switchTo(current, next);
        });
    }

    function switchTo(currentIndex, nextIndex) {
        container.find(".banner").eq(currentIndex).fadeOut();
        container.find(".banner").eq(nextIndex).fadeIn();
        if (pageIndex.get(0)) {
            updatePageIndex(nextIndex);
        }
    }

    function updatePageIndex(nextIndex) {
        pageIndex.find('.focus').removeClass('focus');
        pageIndex.find('.item').eq(nextIndex).addClass('focus');
    }
    var switchTime;
    container.hover(function() {
        clearInterval(switchTime);
    }, function() {
        switchTime = setInterval(function() {
            var nextIndex;
            nextIndex = (currentIndex + 1) > bannerCount ? 0 : currentIndex + 1
            switchTo(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }, 5000);
    }).trigger("mouseleave");
}


yn.timestamp = function() {
    return new Date().getTime();
}


//switchTimestamp(19851206) => 946915200000
yn.switchTimestamp = function(time) {
    time = String(time);
    var year = Number(time.substr(0, 4));
    var month = Number(time.substr(4, 2)) - 1;
    var day = Number(time.substr(6, 7));
    var timestamp = Date.parse(new Date(year, month, day));
    return timestamp;
}


//添加页码组件
//selector支持css选择器和jquery对象
yn.bootpag = function(selector, ops) {
    ops = _.extend({
        first: true
    }, ops)
    var timestamp = _.now();
    var id = `#${timestamp}`
    var tag = `<ul id="${timestamp}" class="ynpagination"></ul>`;
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


//字数统计
//$input : jquery对象
//indicate : 
yn.wordCount = function($input, ops) {
    ops = _.extend({
        indicate: null,
        limit: 200
    }, ops)

    $input.keyup(_.debounce(function() {
        var val = $(this).val();
        var len = val.length;
        var last = ops.limit - len;
        if (len > ops.limit) {
            layer.msg("超出字数限制");
            val = val.substr(0, ops.limit);
            $(this).val(val);
            last = 0;
        }
        if (ops.indicate) {
            ops.indicate.text(last);
        }
    },500))
}


yn.bodyScroll = function(flag) {
    if (!flag) {
        $('body').css('overflow', 'hidden');
    } else {
        $('body').css('overflow', 'auto');
    }
}



//验证图片格式
yn.verifyImgFile = function(val) {
    if (!val) {
        layer.alert("没有选择文件");
        return false;
    }
    if (!/\.(jpg|jpeg|png)$/.test(val)) {
        layer.alert("支持:jpg、jpeg、png文件格式");
        return false;
    }
    return true;
}



/**
 * [verifyPhoneCode 校验短信验证码]
 * @param  {[String]} phone [手机号码]
 * @param  {[String]} code  [短信验证码]
 * @return {[promise]}       [延迟对象]
 */
yn.verifyPhoneCode = function(phone, code) {
    var defer = $.Deferred();
    var send = {
        phone: phone,
        phoneCode: code
    }
    $.post('/validPhoneCode.htm', send, function(data) {
        if (data == 'success') {
            defer.resolve(true);
        } else {
            defer.resolve(false);
        }
    })
    return defer.promise();
}


/**
 * 放大图片
 * @param  {[String/jQuery]} img [可以是src地址, 也可以是$igm对象]
 * @return {[type]}     [description]
 */

yn.zoomImage = function(img) {
    var src = function() {
        if (typeof img == "string") {
            return img;
        } else {
            return img.attr('src');
        }
    }();
    var body = $('body');
    var tag = '<div id="ynPopImageOverlay"><div id="ynPopImage" style="width:80%;height:80%;margin:auto;"><img style="width:100%;" src="' + src + '"/></div></div>';
    body.append(tag);
    yn.bodyScroll(false);
    var container = $('#ynPopImage');
    var overlay = $('#ynPopImageOverlay');
    overlay.click(function() {
        $(this).remove();
        yn.bodyScroll(true);
    })
}


//股票代码加上链接
yn.codeFormat = function(content) {
    return content.replace(/\$+.+?\$+/g, function(value) {
        var code = value.match(/[0-9]+/)[0];
        return `<a href="/marketLine.htm?stockcode=${code}" target="_blank" data-code="${code}" class="yn-code">${value}</a>`;
    })
}


//股票代码加上链接, 返回数组
yn.codeFormat2 = function(content) {
    var codes = [];
    var str = content.replace(/[0-9]{6}/g, function(value) {
        var code = value.match(/[0-9]+/)[0];
        var match = yn.isStockCode(code);
        if (!match) {
            return value;
        }
        codes.push(code);
        return `<a data-code="${code}" class="yn-code">${value}</a>`;
    })
    return [str, codes[0]]; //[处理后的字符串, 股票代码]
}


//  "2016-07-21 16:19:43";
//  时间转换
yn.timeFormat = function(time) {

    _time = time.replace(/[^0-9]+/g, '-').split("-");
    _time = _.map(_time, function(item, i) {
        item = +item;
        return item;
    })

    var _time = new Date(_time[0], _time[1] - 1, _time[2], _time[3], _time[4], _time[5]).getTime();
    var now = new Date().getTime();
    var off = Math.floor((now - _time) / 1000);

    if (off > 259200) {
        var match = time.match(/^[0-9]{4}-([0-9\-]+)/);
        return match ? match[1] : time;
    }

    if (off > 86400) {
        var day = Math.floor(off / 86400);
        return day + "天前";
    }

    if (off > 3600) {
        var hour = Math.floor(off / 3600);
        return hour + "小时前"
    }

    return Math.floor(off / 60) + "分钟前"
}


yn.positionShare = function(element) {
    var top = element.offset().top + element.outerHeight();
    var left = element.offset().left;
    var container = $(".bdsharebuttonbox");
    container.show().css({
        top: top,
        left: left
    })

}


//过滤HTML标签
yn.filterHTML = function(content, ops) {
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
        result = yn.codeFormat(result);
    }
    if (ops.trim) {
        var matches = result.match(/[\u4E00-\u9FA5\w\d，。？！：:'"“”%-~\[\]]+/g);
        result = matches.join("");
    }
    return result;
}


//居中定位
yn.centerBox = function(box) {
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
 * 大盘指数
大盘指数: 指数名称，当前点数，当前价格，涨跌率，成交量（手），成交额（万元）

*/

yn.stockIndex = function() {
    function getData(callback) {
        var url = "http://hq.sinajs.cn/rn=" + yn.timestamp() + "&list=s_sh000001,s_sz399001,s_sh000300,hkHSI,int_dji";
        $.ajax({
            dataType: "script",
            cache: true,
            url: url,
            success: function(data) {
                callback();
            }
        });
    }

    function handle(data) {
        var tables = _.map(data, function(item) {
            var falg = +item[2] > 0;
            item = _.map(item, function(subItem, i) {

                if (i > 0) {
                    subItem = yn.setDecimal(subItem);
                    if (i == 3) {
                        subItem = subItem + "%"
                    }
                }
                return yn.color(subItem, {
                    exp: function() {
                        return falg
                    }
                });
            })

            return `<table class="stock-index-item">
                    <tr><td colspan="2" class="name">${item[0]}</td></tr>
                    <tr><td rowspan="2" class="value">${item[1]}</td><td class="price">${item[2]}</td></tr>
                    <tr><td class="radio">${item[3]}</td></tr>
                    </table>`
        }).join("");

        return `<div class="stock-index-container">${tables}</div>`
    }

    return {
        getTags: function(callback) {
            getData(function() {
                var data = [];
                data.push(_.take(hq_str_s_sh000001.split(","), 4));
                data.push(_.take(hq_str_s_sz399001.split(","), 4));
                data.push(_.take(hq_str_s_sh000300.split(","), 4));
                data.push(_.take(hq_str_int_dji.split(","), 4));
                callback(handle(data))
            })
        }
    }
}()


//链式调用
yn.chain = function(fn) {
    this.fn = fn;
    this.next = null
}
yn.chain.prototype = {
    setNext: function(next) {
        this.next = next
    },
    handle: function() {
        var ret = this.fn.apply(this, arguments);
        if (ret == "next") {
            return this.next && this.next.handle.apply(this.next, arguments);
        }
        return ret
    }
}

/**
 * 高亮
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
yn.switch = function(el) {
    el.parent().find('.select').removeClass('select');
    el.addClass('select');
}


/**
 * 解析表情字符
 */
yn.parseFaceCode = function(content) {
    return content.replace(/\[face=([a-z]+)\]/g, '<img src="/public/icons/face/$1.gif" />')
}


/*///////////////////////////////////////////////////////////////////*/
