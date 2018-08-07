var ajax = require('public/module/ajax.js')
var local = require('public/v2/base/localData.js')
var error = require('e/error-type');
var living = function() {
    var container = $("#trends");
    var items = container.find('.trends-list');
    var row = 10;
    var view = 5;
    var viewData, poolData, timer;
    var hasCache = false;

    var handleData = function(data) {
        return _.map(data, item => {
            item._shortContent = yntool.filterHTML(item.shortContent, { substr: 50, trim: true });
            var _link = `${live_path}live/${item.teacherid}/` //跳转链接

            return `<div class="trends-item clear" id="living${item.id}">
                        <div class="photo fl tc">
                            <span class="avatar" data-teacherid="${item.teacherid}">
                                <img src="${item.teacherPhoto}">
                            </span>
                            <span class="time f2">
                                ${item.pubtimeString}
                            </span>
                        </div>
                        <div class="content fl">
                            <p class="title f3 b">
                                <a href="${_link}" target="_blank">${item.teacherName}</a>
                                <span class="subhead f2"><i class='item-icon'><img src="${item.type_ioc}" alt="" /></i>${item.type_name}</span></p>
                            <div class="subject f2">
                                ${item._shortContent}
                            </div>
                        </div>
                        <a href="${_link}" target="_blank" title="" class="enter fr tc f2">立即参与</a>
                    </div>`;
        }).join("")
    }

    var loading = new yntool.loading({
        container: items,
        type: 3,
        margin: 100
    });

    var animate = function() {
        timer = setInterval(function() {
            //交换数据
            var viewLast = viewData.pop();
            var newData = poolData.shift();
            poolData.push(viewLast);
            viewData.unshift(newData);

            items.find('.trends-item:last').remove();
            items.prepend(handleData([newData]));

            var newItem = $("#living" + newData.id);
            newItem.velocity('transition.perspectiveDownIn')

        }, 4000);
    }
    return {
        render: function() {

            var key = 'live_dynamic'
            var cache = local.get(key, { timeout: 3600 })
            if (cache && cache.valid) {
                items.html(cache.data);
            }

            // clear
            clearInterval(timer);
            timer = null;

            ajax.getJSON(__path + "/html/lastBroadcasting.htm", { pageSize: row }, function(data) {
                if (data.status == 1) {
                    var len = data.data.length;
                    if (len <= view && len > 0) {
                        data = handleData(data.data)
                        items.html(data);
                        local.set(key, data) //缓存 
                        return;
                    }
                    if (len == 0) {
                        container.hide()
                        return
                    }

                    // 动态滚动
                    data.data = _.chunk(data.data, view);
                    viewData = data.data[0];
                    poolData = data.data[1];
                    items.html(handleData(viewData));
                    local.set(key, viewData) //缓存 
                    animate();
                } else() => {
                    return layer.msg(error[data.status])
                }

            })
        }
    }
}()

module.exports = living
