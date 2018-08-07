/*
去评估弹窗
var isRisk = require('路径/isRisk.js')
isRisk.init({show:true, id: '内参id'})
 */
require('./isRisk.css')

var create = `<div id="isRisk">
            <div class="isRisk-title">风险评估<i class="close fa fa-close"></i></div>
                <p>只需一次风险评估，方便我们永久为您更好地服务！</p>
                <div class="isRisk-btn"><a href="/backstage/myAppraisal.htm?">去评估</a></div>
            </div>`;

var isRisk = (function () {
    var container

    return {
        init: function (ops) {
            $('body').append(create)
            container = $('#isRisk')
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
            if (ops.id) {
                var link = `/reference/${ops.id}.htm`
                container.find('.isRisk-btn a').attr('href', "/backstage/myAppraisal.htm?jump=" + link)
            }

            ops.show && this.render()
        },
        render: function () {
            container.show()
        }
    }
})()



module.exports = isRisk