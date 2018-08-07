/**
 * 滑块
 *
 * 选项
 
    //创建对象
    var o = new slider({
        container: $('#income'),
        range: [5, 100],  //默认是[1, 100]
        unit: "%", //单位
        color: "red", //支持["black", green", "red", "blue"] 
        formatText: ["5%", "100%"], //两端字符格式化

        //滑动事件
        onMove: function(e) {
            e.result.val(e.range[0] + Math.ceil(e.sum * e.percent));
        }
    }).render();

    //方法:设置值
    o.setOffset(20)

 */

require('./slider.css')

var slider = function(ops) {
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

slider.prototype = {
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

module.exports = slider
