
var profile = require('~/ui/teacher-profile.js');

/*///////////////////////////////////////////////////////////////////*/


$(function() {
    profile.init()
    profile.add('.avatar')

    var dataCache = {}

    var selectMap = {
        userhover: $('#userhover'),
        ranking: $('.ranking')
    }

    //观点最热排名
    yndata.getHotRanking({ orderType: -1 }).done(function(data) {
        console.log("观点最热排名", data)
        data = _.map(data, function(item, index) {
            item._value = item.totalViewNum;
            return item
        })
        var firstData = [data.shift()]
        dataCache.hotRanking = data;
        var totalpage = Math.ceil(data.length / 9);
        $('.hotRanking .totalIndex').text(totalpage);
        $('.hotRanking .rankContent .first').html(template('rankContent-template', firstData));
        $('.hotRanking .rankContent .first .item').addClass('select');
        $('.hotRanking .rankContent .rest .wrap').html(template('rankContent-template', _.take(data, 9)))
    })

    //回答问题最多
    yndata.getHotRanking({ orderType: 0 }).done(function(data) {
        console.log("回答问题最多", data)
        data = _.map(data, function(item, index) {
            item._value = item.answerNum;
            return item
        })
        var firstData = [data.shift()];
        dataCache.fireRanking = data;
        var totalpage = Math.ceil(data.length / 9);
        $('.fireRanking .totalIndex').text(totalpage);
        $('.fireRanking .rankContent .first').html(template('rankContent-template', firstData));
        $('.fireRanking .rankContent .first .item').addClass('select');
        $('.fireRanking .rankContent .rest').html(template('rankContent-template', _.take(data, 9)))
    })

    //直播最火
    yndata.getHotRanking({ orderType: 1 }).done(function(data) {
        console.log("直播最火", data)
        data = _.map(data, function(item, index) {
            item._value = item.popularity_number;
            return item
        })
        var firstData = [data.shift()];
        dataCache.manyRanking = data;
        var totalpage = Math.ceil(data.length / 9);
        $('.manyRanking .totalIndex').text(totalpage);
        $('.manyRanking .rankContent .first').html(template('rankContent-template', firstData));
        $('.manyRanking .rankContent .first .item').addClass('select');
        $('.manyRanking .rankContent .rest').html(template('rankContent-template', _.take(data, 9)))
    })


    //turn left
    $('.indicate.left').on('click', function() {
        var key = $(this).parents('.ranking').attr('class').replace('ranking ', '');
        changeData(key, -1);
    })

    // turn right
    $('.indicate.right').on('click', function() {
        var key = $(this).parents('.ranking').attr('class').replace('ranking ', '');
        changeData(key, 1);
    })

    //切换动画
    function changeData(key, page) {
        var count = 9;
        var container = $('.' + key);
        var data = dataCache[key];
        var current = container.find('.currentIndex');
        var totalIndex = Number(container.find('.totalIndex').text());
        var currentIndex = Number(current.text());
        var nextIndex = currentIndex + page;
        if (nextIndex === 0 || nextIndex == totalIndex + 1) {
            return;
        }
        var begin = (nextIndex - 1) * count;
        var end = nextIndex * count;
        data = _.slice(data, begin, end);
        var rest = container.find('.rest');
        rest.velocity({
            height: 0
        }, {
            duration: 300,
            easing: 'swing',
            complete: function() {
                rest.html(template('rankContent-template', data));
            }
        }).velocity('reverse')
        current.text(currentIndex + page)
    }

    //是否显示浮动窗口
    function layerControl() {
        var timer,
            showLayer = false,
            hideLayer = true;

        selectMap.ranking.on('mouseenter', '.favicon', function() {
            showLayer = true
            var trigger = $(this);
            timer = setTimeout(function() {
                if (showLayer) {
                    showUserDetail(trigger);
                }
            }, 300)
        })

        selectMap.ranking.on('mouseleave', '.favicon', function() {
            showLayer = false;
            timer = setTimeout(function() {
                if (hideLayer) {
                    selectMap.userhover.hide();
                }
            }, 300);
        })

        selectMap.userhover.on('mouseenter', function() {
            hideLayer = false;
        })

        selectMap.userhover.on('mouseleave', function() {
            selectMap.userhover.hide();
        })
    }

    //显示浮动窗口
    function showUserDetail(trigger) {
        $('.userhoveer-beyond').removeClass('userhoveer-beyond');
        var winWidth = $(window).width();
        var left = trigger.offset().left + trigger.outerWidth() - 5;
        var top = trigger.offset().top;
        var outer = selectMap.userhover.outerWidth();
        if (outer + left > winWidth) {
            selectMap.userhover.addClass('userhoveer-beyond');
            left = left - outer - trigger.outerWidth() + 5;
            selectMap.userhover.css({ 'left': left + "px", "top": top + "px" });
        } else {
            selectMap.userhover.css({ 'left': left + "px", "top": top + "px" });
        }

        //showData
        var data = {
                userid: "8956",
                username: "淘气天尊2",
                type: "金牌投顾",
                company: "深圳新兰德",
                place: "江苏南京",
                certificate: "A0780616010002",
                skill: ["基本面分析", "技术面分析", "长线操作", "波段操作", "大盘分析"],
                replay: "1429",
                satisfaction: "99%",
                favorate: "5570"
            }
            //dataCache[data.userid] = data;
        selectMap.userhover.show();
        selectMap.userhover.find('.content').html(template('userhover-template', data));
    }
})
