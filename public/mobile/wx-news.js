var lo = require('m/lib/lo.js')
FastClick.attach(document.body)
var loading = require('mobile/__loadMore.vue')



var screenHeight = $(window).height()

new Vue({
    el: '#app',
    data: {
        news: [],
        isLoading: true,
        style: {
            app: {
                width: '100%',
                height: screenHeight + "px"
            }
        }
    },
    components: {
        loading
    },

    methods: {
        substr(val) {
            if (val.length > 50) {
                return val.substr(0, 50) + '..'
            }
            return val
        },
        retime(val) {
            var match = val.match(/\d+-\d+\s\d+:\d+/)
            return match ? match[0] : val
        },
        goto(link) {
            window.location.href = link
        },
        getData(ops) {
            ops = lo.extend({
                limit: 10,
                direct: "down",
                sinceId: '',
                type: 0 // [热门资讯, 涨停揭秘, 宏观要闻, 个股咨询]
            }, ops)


            var handle = arr => {
                return arr.map(item => {
                    item.publish_time = this.retime(item.publish_time)
                    item.title = this.substr(item.title)
                    return item
                })
            }


            // 使用缓存数据
            if (store.cacheData.length > 0 && !ops.sinceId) {
                this.news = store.cacheData
                return
            }

            $.getJSON('/app/appTypeNews.htm', ops, back => {
                if (back.status != 1) {
                    this.isLoading = false
                    return;
                }
                console.log("===新闻列表===", back)
                var arr = back.data.data
                if (arr.length < 1) {
                    this.isLoading = false
                    return;
                }
                arr = handle(arr)
                store.cacheData = store.cacheData.concat(arr)
                this.news = ops.sinceId ? this.news.concat(arr) : arr
            })
        }
    },
    mounted() {
        this.getData();
        var $root = $('#app')
        var more = $('.loadMore')

        $root.scroll(lo.debounce(() => {
            if (this.isLoading) {
                var top = more.offset().top;
                if (top > screenHeight) return;
                this.getData({
                    direct: "up",
                    sinceId: this.news[this.news.length - 1].article_id
                })
            }
        }, 200))
    }
})
