/* 

        var layer = require('valid-img-model.js')
        layer.get().render({
            callback: (type, info) =>{
                 if(type == "yes"){
                      alert(info.value)
                 }
            }
        })

 */

/*///////////////////////////////////////////////////////////////////*/

require('./valid-img-model.css')
var lo = require('m/lib/lo.js')

module.exports = (function () {
    var instance, params = {
        callback: null
    },
        imgCode, input

    var create = function () {

        $('body').append(`<div id="model-valid-img">
                        <div class="box">
                            <div class="title">请输入图片验证码</div>   
                            <div class="contentBar">
                                <div class="valid-img">
                                  <input type="text"/>
                                  <img src="/validCode.htm"/>
                                </div>
                            </div>
                            <div class="bottom">
                                <span class="no b-btn">取消</span>
                                <span class="yes b-btn">确定</span>
                            </div>
                        </div>
                </div>`)

        var container = $('#model-valid-img')
        imgCode = container.find('.valid-img img')
        input = container.find('input')

        //更新图片验证码
        var updateImgCode = function () {
            imgCode.attr('src', '/validCode.htm?' + Math.random())
        }

        // 切换验证码
        container.on('click', 'img', function () {
            updateImgCode()
        })

        // 取消
        container.on('click', '.no', function () {
            container.hide();
            (typeof params.callback == "function") && params.callback('no')
        })

        // 确定
        container.on('click', '.yes', function () {

            if (!$('.valid-img input').val()) {
                return layer.msg("请输入验证码")
            }

            container.hide();
            if (typeof params.callback == "function") {
                params.callback('yes', { value: input.val() })
            }
        })

        var reset = function () {
            updateImgCode()
            input.val("")
        }

        return {
            render(ops) {
                params = lo.extend(params, ops)
                reset()
                container.fadeIn(300)
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
})()
