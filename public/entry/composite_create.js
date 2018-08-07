var Checkbox = require('~/ui/checkbox.js'),
    Slider = require('~/ui/slider.js'),
    Calendar = require('~/ui/calendar.js'),
    cropper = require('~/ui/cropper.js'),
    Day = require('~/lib/day.js');

/*///////////////////////////////////////////////////////////////////*/

//获取组合ID
var __combinationid = function() {
    var match = location.href.match(/\d+$/);
    if (!match) return null;
    return match[0];
}();



$(function() {

    var peep = $("#peep_price"); //瞄一眼
    var textarea = $('#composite-intro textarea'); //组合简介
    var isFreePrice = false;
    var el_name = $("#fName") //组合名称
    var el_cover //组合封面
    var el_intro = $("#fIntro");

    yn.wordCount(textarea, {
        limit: 100,
        indicate: $('#info-word-count')
    })

    //操作风格
    var fStyle = new Checkbox({
        container: $('#composite-style .checkboxs'),
        values: [{ value: 0, text: "保守型" }, { value: 1, text: "稳健性" }, { value: 2, text: "激进型" }],
    }).render();


    //最长期限
    var fMaxTime = new Checkbox({
        container: $('#max-life .checkboxs'),
        values: [{ value: 30, text: "30天" }, { value: 60, text: "60天" }, { value: 90, text: "90天" }, { value: 180, text: "180天" }],
        onChange: function(values) {
            var val = beginTime.val();
            if (val) {
                var day = new Day(val);
                endTime.text(day.add(values[0]))
            }
        }
    }).render();


    //免费订阅
    var freeFeed = new Checkbox({
        container: $('#feedPayType'),
        values: [{ value: "pay", text: "付费订阅" }, { value: "free", text: "免费订阅" }],
        select: 0,
        onChange: function(value) {
            switchPayType(value);
        }
    }).render();

    var switchPayType = function(value) {
        var wrap = $("#FeedPayType-items");
        value == "pay" ? wrap.show() : wrap.hide();
        isFreePrice = value == 'free' ? true : false
    }


    //日历
    var beginTime = $('#beginTime');
    var endTime = $("#endTime");
    Calendar.add(beginTime, function(info) {
        beginTime.val(info.day)
        var time = new Day(info.day);
        endTime.text(time.add(fMaxTime.getValues()[0]))
    });


    //止损线
    var downline = new Slider({
        range: [-30, 3],
        color: "green",
        container: $('#downline'),
        unit: "%",
        formatText: ["-30%", "3%"],
        onMove: function(e) {
            e.result.val(e.range[0] + Math.ceil(e.sum * e.percent));
        }
    }).render();


    //目标收益
    var income = new Slider({
        container: $('#income'),
        range: [5, 100],
        unit: "%",
        color: "red",
        formatText: ["5%", "100%"],
        onMove: function(e) {
            e.result.val(e.range[0] + Math.ceil(e.sum * e.percent));
        }
    }).render();


    //订阅价
    var feedPrice = new Slider({
        range: [10, 6400],
        container: $('#feedPrice'),
        color: "blue",
        unit: "牛币",
        onMove: function(e) {
            var val = e.range[0] + Math.ceil(e.sum * e.percent)
            e.result.val(val);
            validatePeep(val);
        }
    }).render();

    peep.change(function() {
        var feed = +feedPrice.result.val();
        validatePeep(feed);
    })

    //验证瞄一眼价格
    function validatePeep(feed) {
        var max = Math.floor(_.min([100, feed * 0.1]));
        var min = 1;
        var val = +peep.val();
        if (val > max) {
            peep.val(max);
            return;
        }
        if (val < min) {
            return peep.val(1)
        }
        peep.val(Math.floor(peep.val()));
    }


    //显示提示
    $('.slider .item').on('mouseenter', '.doubt', function() {
        $(this).parents('.item').find('.slider-tip').show();
    }).on('mouseleave', '.doubt', function() {
        $(this).parents('.item').find('.slider-tip').hide();
    })


    //组合封面
    cropper.init($("#cropperContainer"));
    el_cover = $(".myCropper-result-image");
    cropper.onCrop = function(imageData) {
        $.post("/auth/user/ImgUpload.htm", {
            dataImg: imageData,
            user_id: ynUserId
        }, function(data) {
            if (data.status == "success") {
                layer.msg("图片上传成功")
                var src = data.returnPath;
                cropper.showThumbnail(src);
            }
        }, 'json')
    }


    //submit
    var submit = function() {
        var container = $('.submit');
        var button = container.find('button');

        //提交
        button.click(_.debounce(function() {
            submitData();
        }, 2000, { leading: true, trailing: false }))

        var validateTable = {
            a: "组合标题4-20个字",
            b: "请上传组合封面",
            c: "组合简介限制为10-100字字符",
            d: "运行开始时间不能为空",
            e: "运行开始时间不能小于当前时间",
            f: "请填写瞄一眼价格"
        }

        //提交数据
        function submitData() {

            //表单
            var val_title = _.trim(el_name.val()); //组合名称
            var val_cover = el_cover.attr('src'); //组合封面
            var val_intro = _.trim(el_intro.val()); //组合简介
            var val_btime = beginTime.val(); //开始时间
            var val_offset = (new Day(val_btime)).offset(); //运行时长
            var val_etime = endTime.text(); //结束时间
            var val_peep = +peep.val();

            var query = [
                { key: "a", assert: !val_title || val_title.length > 20 || val_title < 4 },
                { key: "b", assert: !val_cover },
                { key: "c", assert: !val_intro || val_intro.length < 10 },
                { key: "d", assert: !val_btime },
                { key: "e", assert: val_offset < 0 },
                { key: "f", assert: !val_peep }
            ]

            var filters = _.filter(query, item => item.assert);
            if (filters.length > 0) {
                layer.msg(validateTable[filters[0].key]);
                return;
            }

            var send = {
                combinationid: __combinationid,
                combination_name: val_title,
                combination_des: val_intro,
                combination_pic: val_cover,
                combination_style: fStyle.getValues()[0],
                combination_maxterm: fMaxTime.getValues()[0],
                create_id: +ynUserId,
                teacherid: +ynTeacherId,
                starttime_str: val_btime,
                endtime_str: val_etime,
                stop_line: +downline.result.val(), //止损线
                target_revenue: +income.result.val(), //目标收益
                order_price: isFreePrice ? 0 : +feedPrice.result.val(), //订阅价格
                peep_price: isFreePrice ? 0 : +val_peep //瞄一眼价格
            }

            $.post("/composite/compositeCreate.htm", send, function(data) {
                if (data == "success") {
                    layer.msg("组合创建成功")
                    setTimeout(function() {
                        window.close();
                    }, 1000)
                } else {
                    throw "error : " + data
                }
            })
        }
    }()

    //组合编辑时回填数据
    var fillData = function() {

        if (!__combinationid) return;
        var getCompositeData = function() {
            var defer = $.Deferred();
            $.ajax({
                data: {
                    user_id: ynUserId,
                    combinationid: __combinationid
                },
                dataType: 'json',
                url: "/combination/combinationProfile.htm",
                type: "GET",
                success: function(data) {
                    console.log("组合数据=", data)
                    data = data.data;
                    var isSelf = +data.teacherid == +ynTeacherId && +data.status === 2;
                    if (isSelf) {
                        defer.resolve(data)
                        return;
                    }
                    defer.reject()
                },
                fail: function() {
                    defer.reject()
                }
            })
            return defer.promise();
        }

        //填充数据
        getCompositeData().done(data => {
            __combinationid = data.combinationid;
            el_name.val(data.combination_name);
            el_intro.val(data.combination_des);
            cropper.showThumbnail(data.combination_pic);
            fStyle.select(data.combination_style);
            fMaxTime.select(_.indexOf([30, 60, 90, 180], data.combination_maxterm));
            beginTime.val(data.starttime);
            var isFree = +data.order_price === 0;
            if (isFree) freeFeed.select(1) && switchPayType('free');
            if (!isFree) {
                feedPrice.setOffset(data.order_price)
                peep.val(data.peep_price);
            }
            downline.setOffset(data.stop_line);
            income.setOffset(data.target_revenue);
        })
    }()

})
