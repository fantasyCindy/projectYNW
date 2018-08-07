/**
 * 分时图
 *
   // 语法:
 
   module.render({
         code: String ---股票代码
         name: String ---股票名称
         container: jQquery 
   })


       
   // 使用

   $(function){
       module.render({
              code: '000000'
              name: '平安银行'
              container: $('.container')
       })
    }
  
 */

var fn = require('m/lib/fn.js')
var custom = require('m/ajax/customStock.js')

module.exports = (function() {

    var createItem = item => {
        return `<div class="title">
                    <a href="${item.href}" target="_blank">
                        <span class="name">${item.name}</span><span class="code">${item.code}</span>
                    </a>
                    <button class="addCustom"><span class="icon-plus">+</span>自选</button>
                </div>
                <div class="content"><div class="imgw"><img src="${item.src}" /></div></div>`
    }

    return {

        render: function(ops) {

            //没有股票代码则不显示
            if (!ops.name || !ops.code) {
                return
            }


            var container = ops.container;

            var data = {
                src: "http://image.sinajs.cn/newchart/min/n/" + fn.stockPrefix(ops.code) + ".gif",
                code: ops.code,
                name: ops.name,
                href: "/marketLine.htm?stockcode=" + ops.code
            }

            container.html(createItem(data))

            //添加自选
            container.on('click', '.addCustom', () => {
                if (!ynIsLogin) return yn.login.render();
                custom.add({ stockcode: ops.code, stockname: ops.name })
            })
        }
    }

})()
