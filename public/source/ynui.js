///////////////////////////////////////////////////////////////////

var ynUI = {}

///////////////////////////////////////////////////////////////////
/**
 * 复选框
 * 
 *  var checkbox = new ynUI.checkbox({
     *  container : $('#composite-style'),
        values : [{value:0, text:"保守型"}, {value:1, text:"稳健性"}, {value:2, text:"激进型"}],
 *  }).render();
 * 
 * */
ynUI.checkbox = function(ops) {
    this.props = _.extend({
        container: null,
        values: null, //文字内容
        select: 0, //默认选中第一个
        multi: false, //是否可以多选
        onChange: function() {}
    }, ops)
}
ynUI.checkbox.prototype = {
    render: function() {
        var _this = this;
        var self = this.props;

        //验证
        var validate = function() {
            if (!self.container) {
                layer.msg("ynUI.checkbox : container not defined");
            }
        }()

        //显示
        var tags = function() {
            return _.map(self.values, function(item, index) {
                var select = self.select === index ? "select" : "";
                return `<span class="ynUI-checkbox-item" data-value="${item.value}">
                    <span class="icon outer"><span class="icon inner ${select}" data-value="${item.value}"></span></span>
                    <span class="txt">${item.text}</span>
                </span>`
            })
        }();

        self.container.html(tags);

        //事件
        var event = function() {
            self.container.on('click', '.ynUI-checkbox-item .outer', function() {
                var items = $(this).parent().parent();
                if (self.multi) {
                    $(this).find('.inner').toggleClass('select');
                } else {
                    items.find('.inner.select').removeClass('select');
                    $(this).find('.inner').addClass("select");
                }

                self.onChange(_this.getValues());
            })
        }();

        return this;
    },
    getValues: function() {
        var result = [];
        var self = this.props
        self.container.find('.ynUI-checkbox-item').each(function() {
            if ($(this).find('.select').length > 0) {
                result.push($(this).data('value'));
            }
        })
        return result;
    }
}


/**
 * 滑块
 *
 * 选项
 * var ops = {
        container: $('#income'),
        range: [5, 100],  //默认是[1, 100]
        unit: "%", //单位
        color: "red", //支持["black", green", "red", "blue"] 
        formatText: ["5%", "100%"], //两端字符格式化

        //滑动事件
        onMove: function(e) {
            e.result.val(e.range[0] + Math.ceil(e.sum * e.percent));
        }
    }
 
    //创建对象
    var income = new ynUI.slider(ops);

    //渲染
    income.render();

    //方法:设置值
    income.setOffset(20)

 */
ynUI.slider = function(ops) {
    this.props = _.extend({
        container: null,
        range: [1, 100],
        color: "black",
        unit: "",
        formatText: null,
        onMove: function(e) {}
    }, ops)

    this.props.formatText = ops.formatText || this.props.range
}
ynUI.slider.prototype = {
    result: null,
    render: function() {
        var self = this.props;
        var _this = this;
        var sum = Math.abs(self.range[1] - self.range[0]);
        var tags = function() {
            var left = self.formatText[0];
            var right = self.formatText[1];
            return `<div class="ynUI-slider">
                        <span class="indicate-left-text indicate-text">${left}</span>
                        <div class="inline track">
                            <span class="selectbar ${self.color}"></span>
                            <span class="scrollbar">
                                <span class="indicate"></span>
                            </span>
                        </div>
                        <span class="indicate-right-text indicate-text">${right}</span>
                        <input type="text" class="result" value="${self.range[0]}"/>
                        <span class="unit">${self.unit}</span>
                    </div>`
        }()
        self.container.html(tags);
        this.result = self.container.find('.result');
        var lastResultValue = self.range[0]; //保存上一次输入的值

        //事件
        var event = function() {
            var drag = false;
            var track = self.container.find('.track');
            var scrollbar = self.container.find('.scrollbar');
            var selectbar = self.container.find('.selectbar');

            var width = track.width();
            var begin = track.offset().left
            var end = begin + width;

            function setPosition(p) {
                scrollbar.css('left', p);
                selectbar.css('width', p);
            }

            scrollbar.on('mousedown', function() {
                drag = true;
            })

            $('body').on('mousemove', function(e) {
                if (!drag) return;
                var x = Math.floor(e.pageX);
                if (x > end || x < begin) return;

                var offset = x - begin
                setPosition(offset);

                //回调
                self.onMove({
                    result: _this.result, //结果
                    percent: offset / width, //比例值
                    sum: sum, //取值总和
                    range: self.range
                })
            })

            $('body').on('mouseup', function() {
                drag = false;
            })

            //直接输入
            _this.result.change(function() {
                var val = $(this).val();
                if (val === "") {
                    //如果为空, 设置为上一次输入的值
                    $(this).val(lastResultValue);
                }
                val = +val;
                var inRange = _.inRange(val, self.range[0], self.range[1]);
                if (inRange) {
                    var p = (val + Math.abs(self.range[0])) / sum * width;
                    setPosition(p);
                    lastResultValue = val
                } else {
                    $(this).val(lastResultValue);
                }
            })
        }()

        return this;
    },
    setOffset: function(offset) {
        var inRange = _.inRange(offset, this.props.range[0], this.props.range[1]);
        if (inRange) {
            this.result.val(offset);
            this.result.trigger('change');
        } else {
            layer.msg("ynui.slider : offset value is invalid ")
        }
    }
}


//////////////////////////////////////////////////////////////////

var UICommon = {}

UICommon.favorite = function() {}
UICommon.favorite.prototype = {
    container: null,
    render: function(flag) {
        var html = `<div class="inline">
            <span class="icon"></span>
            <span class="txt">收藏</span>
        </div>`
    }
}


///////////////////////////////////////////////////////////////////

/**
 * 可复用 可组合
 * require [lodash ]
 */


/**
 * 收藏
 */


ynUI.track = function(ops) {
    _.extend(this, ops)
}
ynUI.track.prototype = {
    container: null,
    ratio: 0,
    height: 8,
    trackColor: "#ddd",
    trainColor: "red",
    style: "",
    render: function() {
        var self = this;
        var id = _.now();
        var tag = function() {
            var fgColor = ""
            if (self.style) {
                fgColor = self.style.replace('bg-', '');
            }
            return `<div class="ynui-track-item">
                        <div class="ynui-track" style="height:${self.height}px;background:${self.trackColor};">
                            <div id="${id}-train" class="ynui-train ${self.style}" style="width:0%;background:${self.trainColor};height:${self.height}px;"></div>
                        </div>
                        <div class="ynui-track-text ${fgColor}" id="${id}-text">${self.ratio}%</div>
                    </div>`
        }()
        this.container.append(tag);
        $("#" + id + "-train").velocity({ 'width': this.ratio + "%" }, { duration: "500" });
    }
}
