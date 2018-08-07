/*
    使用方法:
    var recommend = require('../module/composite/recommend.js')
    recommend.high.render({
        container:$("#composite .high")
    });
    recommend.ready.render({
        container:$("#composite .high")
    });

*/

/*///////////////////////////////////////////////////////////////////*/


require('./recommend.css');
var Path = require('../lib/path.js');

var createTag_high = function(data) {
    console.log('-...---',data)
    var link = `${__path}/combination/${data.combinationid}.htm`
    var style = ["保守型", "稳健型", "激进型"][data.combination_style];
    var name = data.combination_name.substr(0, 8) + ".."
    return `<div class="composite-run-high">
                <img class="bg" src="${data.combination_pic}"/>
                <div class="contents fl">
                    <p class="title">
                        <span class="type">${style}</span>
                        <span class="name">${name}</span>
                    </p>
                    <div class="income">
                        <span class="value">
                        <strong>${data.target_revenue}</strong>
                        <span class="sign">%</span>
                        </span>
                        <div class="txt">当前收益</div>
                    </div>
                    <div class="bottom">
                        <span class="liveTime">最长期限<strong>${data.combination_maxterm}</strong>天</span>
                        <a class="link ynbtn" href="${link}" target="_blank">去看看</a>
                    </div>
                </div>
                <div class="status">运行中</div>
            </div>`
}

var createTag_ready = function(data) {

    var link = `${__path}/combination/${data.combinationid}.htm`;
    console.log('----',data)
    console.log('----',data)
    console.log('----',data.combinationid)
    console.log('----',data.teacherid)
    var income = Math.floor(data.target_revenue);
    var name = function() {
        var str = data.combination_name
        if (str.length > 7) return str.substr(0, 7) + "..";
        return str;
    }()

    return `<div class="composite-ready-item">
                <div class="icon"></div>
                <div class="contents">
                    <div class="line line1">
                        <div class="name">
                            <span class="value">${name}</span>
                            <div class="action">
                                <span class="time">期限<strong>${data.combination_maxterm}</strong>天</span>
                                <a href="${link}" target="_blank" >去看看</a>
                            </div>
                        </div>
                        <div class="incom">
                            <div class="value">
                                <span class="number">${income}</span>
                                <span class="sign">%</span>
                            </div>
                            <div class="txt">目标收益</div>
                        </div>
                    </div>
                </div>
            </div>`
}


//收益最高的组合
module.exports = (function() {
    var param = {
        pageSize: 4,
        currentPage: 1
    }

    var data = null; //数据

    var getData = function(callback) {
        if (data) return callback(data);
        $.getJSON("/composite/compositeIndex.htm", param, function(_data) {
            console.log("组合数据", _data)
            data = _data;
            callback(data);
        })
    }

    return {
        high: {
            render: function(ops) {
                getData(data => {
                    var tag = createTag_high(data.highCombination);
                    ops.container.html(tag);
                })
            }
        },
        ready: {
            render: function(ops) {
                getData(data => {
                    var tags = _.map(data.ysCombination, item => createTag_ready(item)).join("")
                    ops.container.html(tags);
                })
            }
        }
    }

})()
