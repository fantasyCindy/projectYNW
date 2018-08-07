require('~/center/center') // 个人中心通用设置
var http = require('m/http')

yn.centerMenu.init({
    render: 'my',
    light: '风险评估'
})

/*///////////////////////////////////////////////////////////////////*/

var createElement = function(arr) {
    var count = 0;
    var words = ["A", "B", "C", "D", "E", "F", "G", "H"]
    var createList = options => {
        return options.map((item, index) => {
            var charactor = words[index]
            var len = item.content.length;
            var float = len > 15 ? "" : "fl";

            return `<div class="question-option ${float}" data-score="${item.score}">
                        <i class="icon-check-normal"></i>
                        <span class="label">${item.content}</span>
                    </div>`
        }).join("")
    }

    return arr.map((item, index) => {
        count = index
        var list = createList(item.answerList)
        return ` <div class="question-item" data-id="${item.riskid}">
                    <div class="question-title">${index + 1}.${item.topic}:</div>
                    <div class="question-options">${list}</div>
                </div>`
    }).join("")
}

// 测试题
var appraisal = (function() {

    var container = $('.questionBar')
    var items = container.find('.ques-items')
    var backData = null
    var selectCount = 0
    var selectIds = {}

    container.on('click', '.question-option', function() {
        $(this).addClass('active').siblings().removeClass('active')
        var score = $(this).data('score')
        $(this).parent().data('score', score)
        var parent = $(this).parents('.question-item')
        parent.removeClass('unselect').addClass('select')

        var id = parent.data('id')
        if (!selectIds[id]) {
            selectCount += 1
        }
        selectIds[id] = score
        if (selectCount == backData.length) {
            $('.submit button').addClass('ready')
        }
    })

    var reset = function() {
        selectCount = 0
        selectIds = {}
        $('.submit button').removeClass('ready')
    }

    // submit
    container.on('click', '.submit button', function() {
        var el = $(this)
        var unselectCount = 0
        $('.question-item').each(function() {
            var classname = $(this).attr('class')
            if (classname.indexOf('select') < 0) {
                $(this).addClass('unselect')
                unselectCount++
            }
        })
        if (unselectCount > 0) {
            return layer.msg(`您还有未选择的问题`)
        }

        var sum = 0
        for (var key in selectIds) {
            sum += +selectIds[key]
        }

        http.postJSON(`${__path}/app/submitRiskanswer.htm`, {
            score: sum
        }, back => {
            reset()
            container.hide()
            result.render()
            countDown.render()
        })
    })

    var loading = new yn.loading({
        container: items,
        margin: 300
    })

    return {
        render: function() {
            loading.render()
            container.show()
            http.getJSON(`${__path}/app/riskproblem.htm`, back => {
                backData = back.data
                items.html(createElement(backData))
            })
        }
    }

})()


// 显示跳转倒计时
var countDown = (function() {
    var container = $('.appraisal-back')
    var count = $('.appraisal-count')
    var timer = null

    // 跳转地址
    var href = window.location.href;
    var match = href.match(/\?jump=(.+)$/);
    var jump = match ? match[1] : "";

    var reset = function() {
        container.hide()
        count.text(5)
        timer = null
    }

    return {
        render() {
            if (!jump) return;
            container.show()
            timer = setInterval(function() {
                var value = +count.text()
                if (value > 1) {
                    value -= 1
                    count.text(value)
                } else {
                    window.location.href = jump
                }
            }, 1000)
        },
        cancel() {
            if (!jump) return;
            clearInterval(timer)
            reset()
        }
    }
})()


var result = (function() {
    var container = $('.appraisal-done')
    var value = container.find('.value')

    // 重新测评
    container.on('click', 'button', function() {
        container.hide()
        appraisal.render()
        countDown.cancel()
    })

    return {
        render() {
            http.postJSON(`${__path}/app/userIsRisk.htm`, back => {
                // 获取评估信息
                if (back.status == 1) {
                    value.text(back.data)
                    container.show()
                } else {
                    appraisal.render()
                }
            })
        }
    }
})()

result.render()