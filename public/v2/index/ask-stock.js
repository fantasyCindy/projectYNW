/*	
	jsp结构
	<!-- 投顾问股 -->
    <div class="ask-stock">
        <div class="title-1">
            <span class="title-icon"></span>
            <a href="${live_path}/live/" class="text">投顾问股</a>
            <span class="f2 ml15 ask-btn">立即提问</span>
            <div class="action f1 fr">
                <a href="" target="_blank" >更多</a>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
        </div>
        <div class="stock-content"></div>
    </div>

	初始化
	askStock.init()

	获取数据
	askStock.render()
*/

require('./ask-stock.css')
var ajax = require('module/ajax.js')
var local = require('module/lib/localData.js');
var askWindow = require('base/askWindow.js');//提问


var askStock = function() {
    var query = { 
        page: 1,
        row: 10,
        best: '', //最新问答="" 精彩问答=1
        type: '' //分类
    },container,stockContent,answerLong,isTrue = true;

    var createNormal = arr => {
        return _.map(arr, item => {

            var ask = `${ask_path}consultation/${item.noteid}.htm`;//问股链接
            var live = `${live_path}live/${item.answeruserid}/`;//老师链接
            item._answercontent = item.answercontent.replace(/<img.+?>/g,'[图片]')
            var answer = item.answercontentStr?item.answercontentStr.substr(0, 70):item._answercontent;//回答
            var ishide = item.answercontentStr.length > 70?'show':'hide';//回答
            var time = item.answertime.substr(5, 11);//时间
            return `<div class="stocklist">
                        <p class="ask overflow">
                            <i class="ask-icon fl"></i>
                            <a class="ask-width  color222 fl f5" target="_blank" href="${ask}" title="${item.questioncontent}">${item.questioncontent}</a>
                        </p>
                        <div class="ask-answer color666 f2 overflow relative">
                            <i class="ask-icon fl"></i>
                            <a class="ask-width ask-answer-content color666 fl" target="_blank" href='${ask}' title='${answer}'>${answer}</a>
                            <span class="ask-off cursor ${ishide}">
                                <span class="ask-off-text">展开</span>
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </span>
                        </div>
                        <div class="ask-teacher">
                            <a href="${live}" target="_blank" title="${item.teachertitle}" class="color999">
                                <img class="image" src="${item.photo}" alt="${item.teachertitle}" />
                                <span>${item.teachertitle}</span>
                            </a>
                            <span class="fr color999 ask-time f1">${time}</span>
                        </div>
                    </div>`
        }).join("")
    }
    
    return {
        init: function() {
            container = $(".ask-stock");
            stockContent = container.find(".stock-content");
            var loading = new yntool.loading({
                container: stockContent,
                type: 3
            }).render()
            stockContent.on('click','.ask-off',function(){
                var index = $(this).parents('.stocklist').index()
                var data = answerLong[index]
                var item = data._answercontent
                var items = data.answercontentStr?data.answercontentStr.substr(0, 70):data._answercontent
                if(isTrue){
                    $(this).parent().find('.ask-answer-content').html(item)
                    $(this).find('.ask-off-text').html('收起')
                }else{
                    $(this).parent().find('.ask-answer-content').html(items)
                    $(this).find('.ask-off-text').html('展开')
                }
                isTrue = !isTrue
            })
            container.on('click','.ask-btn',function(){
                askWindow.render()
            })
        },
        render: function() {
            getData({
                query,
                callback:function(back){
                    answerLong = back
                    var html = createNormal(back)
                    stockContent.html(html)
                }
            }) 
        }
    }
}();

// 获取数据
var getData = (ops)=>{
    var key = 'lastestNote' + local.joinKey(ops.query)
    var cache = local.get(key, { timeout: 600 })
    if (cache && cache.valid) {
        ops.callback(cache.data)
        return;
    }
    ajax.getJSON("/consultation/lastedNote.htm",{
        pageSize: ops.query.row,
        currentPage: ops.query.page,
        is_adopt: ops.query.best,
        note_type: ops.query.type,
    },data => {
        if(data.status == '1'){
            ops.callback(data);
            local.set(key, data)
        }else{
            return console.log("data.status",data.status)
        }
        
    })
};

module.exports = askStock
