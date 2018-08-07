$(function() {
    var qfigure = $('.qfigure')
    var dataArr = [];
    var $body = $("body");
    var down = $(".head-down");
    var winHeight = $(window).height();
    var bodyheight = $body.height();
    down.click(function(){
        $('html, body').animate({
            scrollTop: $(".qapp").offset().top - 150
        }, 300);
    })
    //获取元素高度
    $(qfigure).each(function(i, item) {
        if (i === 0) {
            dataArr[i] = $(item).offset().top - Math.floor($(item).height() / 2) - 500
        } else {
            dataArr[i] = $(item).offset().top - Math.floor($(item).height() / 2)
        }
    });

    // 滚动
    $(window).scroll(function(e) {
        scrollTop = $(window).scrollTop();
        $(dataArr).each(function(i, item) {
            if (Math.floor(winHeight / 2) + scrollTop >= item) {
                $body.attr("id", "pg" + (i + 1))
            }
        });
        if (scrollTop + winHeight >= bodyheight) {
            $body.attr("id", "pg6")
        }
    });

    // 背景向上滑动
    $.stellar({
        horizontalScrolling: false,
        responsive: true
    });
})
