//收益最高的组合
module.exports = (function() {
    var param = {
        container: null,
        pageSize: 4,
        currentPage: 1
    }

    return {
        render: function(param) {
            alert("--10:15:41--")
            $.getJSON("/composite/compositeIndex.htm", param, function(data) {
                console.log("首页组合", data);
            })
        }
    }

})()
