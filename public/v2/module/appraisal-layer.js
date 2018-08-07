/*
去评估弹窗

*/

require('./isRisk.css')

var create = `<div id="isRisk" style="display:none">
            <div class="isRisk-title">风险评估<i class="close fa fa-close"></i></div>
                <p>只需一次风险评估，方便我们永久为您更好地服务！</p>
                <div class="isRisk-btn"><a href="/backstage/myAppraisal.htm?">去评估</a></div>
            </div>`;

var isRisk = (function () {
    var container, a

    return {
        init: function (ops) {
            $('body').append(create)
            container = $('#isRisk')
            a = container.find('.isRisk-btn a')
            var w = $(window).width();
            var h = $(window).height();
            var cw = container.outerWidth()
            var ch = container.outerHeight()
            container.css({
                left: (w - cw) / 2 + "px",
                top: (h - ch) / 2 + "px"
            })

            container.on('click', '.close', function () {
                container.hide()
            })
        },
        render: function (jump) {
            if (jump) {
                var link = a.attr('href')
                a.attr('href', `${link}jump=${jump}`)
            }
            container.show()
        }
    }
})()



module.exports = isRisk