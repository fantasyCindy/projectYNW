/*
    
    ---------------天数计算---------------------------
    
    //导入模块
    var Day = require('../lib/day.js');

    //创建对象
    var a = new Day("2016-09-09")

    //获取时间戳
    a.stamp -->Number : 405341545645645

    //天数计算
    a.add(2) -->String : "2016-09-11"

    //距离今天的天数
    a.offset()  -->Number : 2

    //距离某天的天数
    a.offset("2016-09-06") -->Number : 3

 */



var now = () => (new Date()).getTime()
var isDay = str => str.match(/^(20[12]\d)[/\-]([01]*[0-9])[/\-](\d+)/)
var getStamp = function(arr) {
    var time = _.map(arr, item => _.padLeft(item, 2, "0")).join("/") + " 00:00:00"  //_.padLeft("string",length,"填充符")从左填充
    return Date.parse(time);
}

var ___day = function(val) {
    this.stamp = (function() {
        if (typeof val != "string") {
            console.log(`${val}不是字符类型`);
            return;
        }
        if (!isDay(val)) {
            console.log(`${val}格式不正确`);
            return;
        }

        var match = isDay(val)
        var timestamp = getStamp([match[1], match[2], match[3]]);

        //日期是否有效
        if (!!!timestamp) {
            console.log(`${val}不是有效的日期`);
            return;
        }
        return timestamp;
    })()
}

___day.prototype = {
    add: function(dayCount) {
        var milli = (function() {
            return 1000 * 3600 * 24 * dayCount
        })()

        var newStamp = this.stamp + milli;
        var date = new Date(newStamp);
        var year = date.getFullYear();
        var month = function() {
            var m = +date.getMonth() + 1;
            if (m < 10) {
                m = "0" + m
            }
            return m
        }();
        var day = date.getDate();
        return [year, month, day].join("-");
    },
    offset: function(_date) {
        var current = (_date && new ___day(_date).stamp + 1) || now()
        return Math.floor((this.stamp - current) / (3600 * 24 * 1000)) + 1;
    }
}


/*///////////////////////////////////////////////////////////////////*/

module.exports = ___day;
