/*  

    初始化
    banner.init()

    获取数据
    banner.render()
*/





var ajax = require('module/ajax.js')
var local = require('module/lib/localData.js');

var banner = function() {
    var query = {
            page: 1,
            row: 5,
            best: '', //最新问答="" 精彩问答=1
            type: '' // 观点分类   0大盘, 1题材, 2鉴股, 3股票学堂  ,null查询全部
        },
        container,
        banner,
        cacheData = [],
        market,
        timer,
        changeMoving,
        arrData = true

    var handle = arr => {
        return _.map(arr, item => {
            if (item.title.length > 25) {
                item._title = item.title.substr(0, 25) + "..."
            } else {
                item._title = item.title
            }
            return item
        })
    }

    // 观点列表Element
    var createNormal = arr => {
        return _.map(arr, item => {
            item._classify = ['dapan', 'ticai', 'jiangu', 'gupiaoxueyuan'][item.classify]
            return `<div class="banner-items">
                        <a href="${opinion_path}${item._classify}/${item.create_id}/${item.article_id}.htm" target="_blank" title="${item.title}">
                            <p class="f5 banner-f2">${item.createrName} | ${item._title}</p>
                            <!--<p class="f5 banner-f1 overflow">${item.title}</p>-->
                        </a>
                    </div>`
        }).join("")
    }


    return {
        init: function() {
            var self = this
            container = $(".banner-wrap");
            market = container.find('.banner-num-list')
            var bannerBg = container.find('.banner-bg')
            var bannerCount = bannerBg.find('.banner-list').length


            // 第一张轮播图直接显示
            $('.first-slider').each(function() {
                $(this).css({ 'background': `url(${__path + $(this).data('img')})` })
            })


            // 背景轮播开始
            var slidey = bannerBg.unslider({
                autoplay: true,
                speed: 800,
                delay: 6000,
                dots: true,
                pause: true,
            })

            // 左右切换
            var slide_data = slidey.data('unslider');
            container.on('click', '.next.banner-arrow', () => slide_data.next())
            container.on('click', '.prev.banner-arrow', () => slide_data.prev())


            // 背景轮播图切换回调
            var wrap_center = $('.banner-center-wrap')
            var wrap_right = $('.banner-right-wrap')
            var bannerItems = $('.slider-item')

            slidey.on('unslider.change', (e, index, slide) => {


                // 修正索引
                if (index == bannerCount) {
                    index = 0;
                }

                if (index == -1) {
                    index = bannerCount - 1;
                }

                wrap_center.css({ left: -index * 100 + '%' })
                wrap_right.css({ left: -index * 100 + '%' })

                // 轮播图切换
                bannerItems.each(function() {
                    var num = $(this).index()
                    var random = '?' + Math.ceil(Math.random() * 10)
                    if (num == index) {
                        $(this).css({ 'background': `url(${__path + $(this).data('img')})` })
                    }
                })

            })
        },
        render: function() {

            getData({
                query,
                callback: function(back) {
                    if (back.status == 1) {
                        var html = createNormal(handle(back.data.list))
                        container.find(".banner-item").html(html)
                    }
                }
            })
        }
    }
}();



// 获取数据
var getData = (ops) => {
    var key = 'queryNewOpinions' + local.joinKey(ops.query);
    var cache = local.get(key, { timeout: 600 })
    if (cache && cache.valid) return ops.callback(cache.data);

    ajax.getJSON("/opinion/queryNewOpinions.htm", {
        pageSize: ops.query.row,
        currentPage: ops.query.page,
        classify: ops.query.type,
        teacherid: ""
    }, data => {
        ops.callback(data);
        local.set(key, data)
    })
};

module.exports = banner
