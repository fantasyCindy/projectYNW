/**
 *  日历模块

    var calendar = require('../module/ui/calendar.js')
 
    === usage ===
    
    // usage-1 : 默认取值info.day
    calendar.add($el)

    // usage-2 : 使用回调函数
    calendar.add($el, info => $el.val(info.time))

    ------------------------------------------ 
       
    info = { 
        year : "2016",
        month : "2016-09", 
        day : "2016-09-10", 
        time : "2016-09-10 18:20:39"
    }

 */

_.padLeft = _.padLeft || _.padStart
_.padRight = _.padRight || _.padEnd

require('./calendar.css');

var calendar = function() {
    var $container, $trigger, show = false,
        $year, $month, $date,

        delegate = {
            select: function(info) {}
        }

    //add tag to dom
    var addToDom = function() {
        var caltag = '<div id="yncalendar">' +
            '<table><thead>' +
            '<tr><th class="info" colspan="7"><span class="leftMonth">《</span><span><span class="year"></span>年<span class="month"></span>月</span><span class="rightMonth">》</span></th></tr>' +
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
            '</div>';

        $('body').append(caltag);
        $container = $("#yncalendar");
        $year = $container.find('.year');
        $month = $container.find('.month');
        $date = $container.find('.date');
    }

    var render = function(year, month) {
        $year.text(year);
        $month.text(month);
        var now = getToday();

        var dayCount = getCountInMonth(year, month);
        var dayTags = function() {
            var tag = [];
            for (var i = 1; i <= dayCount; i++) {
                tag.push('<p class="value">' + i + '</p>');
            }
            return tag;
        }()

        //reset
        $date.empty();
        $('.today').removeClass('today');

        //判断1号是星期几
        var offset = firstDayInMonth(year, month);
        for (var i = 0; i < dayCount; i++) {
            $date.eq(offset + i).html(dayTags[i]);
        }

        //着色
        if (+year == now[0] && +month == now[1]) {
            $date.eq(now[2] - 1 + offset).addClass("today");
        }

        $('#lastRow').show();
        if ($('#lastRow').find('.value').length < 1) {
            $('#lastRow').hide();
        }

        //显示
        $container.css({
            'display': 'inline-block',
            'top': $trigger.offset().top + $trigger.outerHeight() + 'px',
            'left': $trigger.offset().left + 'px'
        });
    }

    return {
        init: function() {
            addToDom();

            //点击日期
            $container.on('click', '.date', function() {
                var t = getToday({ pad: true }); //["2016", "09", "09", "18", "20", "36"];

                var _year = _.padLeft($year.text(), 2, "0");
                var _month = _.padLeft($month.text(), 2, "0");
                var _day = _.padLeft($(this).find('.value').text(), 2, "0");
                var _date = [_year, _month, _day].join('-');
                var _time = _date + " " + [t[3], t[4], t[5]].join(":");

                var result = {
                    year: _year,
                    month: [_year, _month].join('-'),
                    day: _date,
                    time: _time
                }
                delegate.select(result);
                $container.hide();
            });

            $container.on('mouseenter', function() {
                show = true;
            }).on('mouseleave', function() {
                show = false;
                $container.hide()
            })

            //切换月份
            $container.on('click', ".leftMonth", function() {
                var year = +$year.text();
                var month = +$month.text();
                var time = getBeforeMonth(year, month);
                render(time[0], time[1]);
            });

            $container.on('click', ".rightMonth", function() {
                var year = +$year.text();
                var month = +$month.text();
                var time = getAfterMonth(year, month);
                render(time[0], time[1]);
            });

            return this;
        },
        add: function($el, handler) {
            $el.focus(function() {
                var now = getToday()
                $trigger = $(this);
                render(now[0], now[1]);
                delegate.select = handler || function(info) {
                    $trigger.val(info.day)
                };
            })

            $el.blur(function() {
                if (!show) {
                    $container.hide();
                }
            })
        }
    }
}()

calendar.init()


/*///////////////////////////////////////////////////////////////////*/


function getToday(ops) {
    ops = _.extend({
        pad: false
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
        return _.map(result, function(item) {
            item = _.padLeft(item, 2, "0")
            return item;
        });
    }

    return result;
}

//下一个月
function getAfterMonth(year, month) {
    if (month == 12) {
        return [++year, 1];
    }
    return [year, ++month];
}

//上一个月
function getBeforeMonth(year, month) {
    if (month == 1) {
        return [--year, 12];
    }
    return [year, --month];
}

//每个月1号星期几
function firstDayInMonth(year, month) {
    var date = new Date(year, month - 1, 1);
    return date.getDay();
}

//获取每个月的天数
function getCountInMonth(year, month) {
    var monthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 === 0) {
        monthArray[1] = 29;
    } else if (year % 4 === 0 && year % 100 !== 0) {
        monthArray[1] = 29;
    }
    return monthArray[month - 1];
}


/*///////////////////////////////////////////////////////////////////*/


module.exports = calendar
