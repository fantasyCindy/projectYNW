var yn = {}

/*/*==================================================*/
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
//target对象复制source对象
yn.extend = function(target, source) {
    if (source) {
        for (key in source) {
            var value = source[key];
            if (typeof value !== undefined) {
                target[key] = value
            }
        }
    }
    return target;
}


//setDecimal(1.256689, 2) => 1.25
yn.setDecimal = function(number, count) {
    count = Number(count);
    number = Number(number);
    var step = function() {
        var result = "1";
        for (var i = 0; i < count; i++) {
            result = result + "0";
        }
        return Number(result);
    }();
    return Math.floor(number *= step) / step;
}


//数字着色
yn.colorValue = function(value, suffix) {
    suffix ? suffix : suffix = "";
    if (value <= 0) {
        return '<span class="green">' + value + suffix + '</span>'
    }
    if (value > 0) {
        return '<span class="red">' + value + suffix + '</span>'
    }
}



//实时查询股票
yn.queryStock = function(code, callback) {
    var reg = /[0-9]{6,}/;
    if (!reg.test(String(code))) {
        alert("请输入正确的股票代码")
        return;
    }
    var prefixs = { 0: "sz", 3: "sz", 6: "sh" }
    var prefix = prefixs[String(code).substr(0, 1)];
    console.log("正在查询" + prefix + code);
    $.ajax({
        cache: true,
        url: "http://hq.sinajs.cn/list=" + prefix + code,
        type: "GET",
        dataType: 'script',
        success: function(data) {
            var responding = eval('hq_str_' + prefix + code + '.split(",")');
            if (responding.length < 5) {
                alert('暂时未能查到该股票信息');
                return;
            }
            if (responding[3] === "0.00" || responding[3] === "0") {
                responding[3] = responding[2];
            }
            //停牌
            if (responding[32] == "03") {
                responding = _.map(responding, function(item) {
                    if (item === "0.00" || item === "0") {
                        item = "--"
                    }
                    return item;
                })
            }
            console.log(responding);
            callback(responding);
        }
    })
}



//显示股票列表
yn.showStockList = function(id, callback) {
    var showData;
    $("#" + id).typeahead({
        source: function(query, process) {
            $.getJSON(path + "/html/queryStock.htmlx", { stockcode: query }, function(_backData) {
                process(showData);
            })
        },
        labeler: ['stock_code'],
        propName: 'stock_code',
        highlighter: function(item) {
            return "" + item.stock_code + "  " + item.stock_name + "  " + item.pinyin;
        },
        updater: function(item) {
            for (var i = 0; i < showData.length; i++) {
                var checkedData = showData[i];
                var stock_code = checkedData.stock_code;
                if (item == stock_code) {
                    callback(checkedData.stock_code);
                    return checkedData.stock_code + "  " + checkedData.stock_name;
                }
            }
        }
    });
}


/*验证*/

yn.isNumber = function(value) {
    value = String(value);
    var result = true;
    for (var i = 0; i < value.length; i++) {
        var flag = /[0-9]/.test(value[i]);
        if (!flag) {
            result = false;
        }
    }
    return result;
}


yn.isMobile = function(value) {
    value = String(value);
    var isNumber = yn.isNumber(value);
    if (!isNumber) {
        return false;
    }
    var reg = /^0?1[3458][0-9]{9}$/;
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
}

yn.isMail = function(value) {
    value = String(value);
    var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
}

yn.isWord = function(value){
    value = String(value);
    var reg = /[\w0-9@$!\-]+/
    if (reg.test(value)) {
        return true;
    } else {
        return false;
    }
}

yn.inputVerify = function(id, ops) {

    ops2 = yn.extend({
        focus: function() {},
        blur: function() {}
    }, ops);

    (function(ops2) {
        $(id).focus(function() {
            $(id).attr('data-verify', '0');
            ops2.focus();
        })
    })(ops2);

    (function(ops2) {
        $(id).blur(function() {
            ops2.blur();
        });
    })(ops2)
}



/*日历组件*/

yn.calendar = function(selector) {
    var caltag = '<div id="yncalendar">' +
        '<table><thead>' +
        '<tr><th class="info" colspan="7"><span id="leftMonth">《</span><span><span class="year"></span>年<span class="month"></span>月</span><span id="rightMonth">》</span></th></tr>' +
        '<tr class="week-title"><th class="weekend">日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th class="weekend">六</th></tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr class="firstRow"><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' +
        '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' +
        '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' +
        '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' +
        '<tr><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' +
        '<tr id="lastRow"><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td><td class="date"></td></tr>' +
        '</tbody>' +
        '</table>' +
        '</div>'

    if (!$('#yncalendar').get(0)) {
        $('body').append(caltag);
    }

    var inputs = $(selector),
        calendar = $('#yncalendar'),
        now = getToday(),
        shouldHide = true;

    inputs.on('focus', function() {
        //获得焦点时标记为触发器
        $('.yncalendar-fire').removeClass('yncalendar-fire')
        $(this).addClass('yncalendar-fire');
        var fire = $('.yncalendar-fire');
        calendar.css({
            'display': 'inline-block',
            'top': fire.offset().top + inputs.outerHeight() + 2 + 'px',
            'left': fire.offset().left + 'px'
        });
        var year = calendar.find('.year').text() - 0;
        var month = calendar.find('.month').text() - 0;
        if (year != now[0] || month != now[1]) {
            show(now[0], now[1]);
        }
    })

    inputs.blur(function() {
        if (shouldHide) {
            calendar.hide();
        }
    })

    //取值
    calendar.on('click', '.date', function() {
        var year = calendar.find('.year').text(),
            month = calendar.find('.month').text(),
            day = $(this).find('p').text(),
            date = [year, month, day];
        $('.yncalendar-fire').val(date.join('-'));
        calendar.hide();
    })

    //今天日期
    function getToday() {
        var now = new Date();
        var today = Number(now.getDate());
        var month = Number(now.getMonth() + 1);
        var year = Number(now.getFullYear());
        return [year, month, today];
    }

    calendar.on('mouseenter', function() {
        shouldHide = false;
    })

    calendar.on('mouseleave', function() {
        shouldHide = true;
    })

    //导航
    calendar.on('click', "#leftMonth", function() {
        var time = getBeforeMonth();
        show(time[0], time[1]);
    });
    calendar.on('click', "#rightMonth", function() {
        var time = getAfterMonth();
        show(time[0], time[1]);
    });


    //下个月是多少
    function getAfterMonth() {
        var year = calendar.find(".year").text() - 0;
        var month = calendar.find(".month").text() - 0;
        if (month == 12) {
            return [++year, 1];
        }
        return [year, ++month];
    }

    //上个月是多少
    function getBeforeMonth() {
        var year = calendar.find(".year").text() - 0;
        var month = calendar.find(".month").text() - 0;
        if (month == 1) {
            return [--year, 12];
        }
        return [year, --month];
    }


    function show(year, month) {
        calendar.find(".year").text(year);
        calendar.find(".month").text(month);
        calendar.find('.value').remove();
        calendar.find(".today").removeClass('today');
        var dayCount = getCountInMonth(year, month);
        var tags = createTag(dayCount);
        var offset = firstDayInMonth(year, month); //判断1号是星期几
        var len = tags.length;
        for (var i = 0; i < len; i++) {
            calendar.find('.date').eq(offset + i).html(tags[i]);
        }
        //color today
        if (String(year) == String(now[0]) && String(month) == String(now[1])) {
            calendar.find(".date").eq(now[2] - 1).addClass("today");
        }
        $('#lastRow').show();
        if ($('#lastRow').find('.value').length < 1) {
            $('#lastRow').hide();
        }
    }

    //每个月1号星期几
    function firstDayInMonth(year, month) {
        var date = new Date(year, month - 1, 1);
        return date.getDay();
    }

    //获取每个月的天数
    function getCountInMonth(year, month) {
        var monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year % 400 == 0) {
            monthArray[1] = 29;
        } else if (year % 4 == 0 && year % 100 != 0) {
            monthArray[1] = 29;
        }
        return monthArray[month - 1];
    }

    function createTag(count) {
        var tag = [];
        for (var i = 1; i <= count; i++) {
            tag.push('<p class="value">' + i + '</p>')
        }
        return tag;
    }
}
