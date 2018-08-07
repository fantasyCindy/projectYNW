var lo = require('m/lib/lo.js')

module.exports = function() {
    var instance, params = {
        callback: null
    }

    var create = function() {

        $('body').append(`<div id="model-valid-img">
                        <div class="box">
                            <div class="title">请输入图片验证码</div>   
                            <div class="content">
                                <input type="text" />
                                <img src="/validCode.htm"/>
                            </div>
                            <div class="bottom">
                                <span class="no"></span>
                                <span class="yes"></span>
                            </div>
                        </div>
                </div>`)

        var container = $('#model-valid-img')


        // 切换验证码
        container.on('click', 'img', function() {
            $(this).attr('src', '/validCode.htm?' + Math.random())
        })

        // 取消
        container.on('click', '.no', function() {
            container.hide();
            (typeof params.callback == "function") && params.callback('no')
        })

        // 确定
        container.on('click', '.yes', function() {
            container.hide();
            (typeof params.callback == "function") && params.callback('yes')

        })

        return {
            render(ops) {
                params = lo.extend(params, ops)
                container.show()
            }
        }
    }

    return {
        get() {
            if (!instance) {
                instance = create()
            }
            return instance
        }
    }
}
