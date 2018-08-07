$(function() {

    var news = {
        container: $('#zdxw'),
        hasMoreData: true,
        loadMore: $("#loadMoreData"),
        page: 1,
        row: 10,
        bootpag: null,
        init: function() {
            var _this = this;
            this.event();
            this.render();
            this.bootpag = yn.bootpag("#bootpag");
            this.bootpag.on('page', function(e, n) {
                _this.page = n;
                $('body').animate({ scrollTop: '0px' });
                _this.render();
            })
        },
        render: function() {
            var _this = this;
            yndata.getNews({ page: this.page, row: this.row }).done(function(data) {
                _this.bootpag.bootpag({ page: _this.page, total: data.pageNumber })
                _this.container.html(template('news-template', data.rows));
            })
        },
        event: function() {
            var _this = this;
            this.loadMore.on("click", function() {
                if (_this.hasMoreData) {
                    _this.loadMore.html("加载中，请稍后...");
                    _this.render();
                }
            });
        }
    }


    /*
    大盘指数: 指数名称，当前点数，当前价格，涨跌率，成交量（手），成交额（万元）
    var hq_str_s_sh000001="上证指数,3041.8371,-12.4589,-0.41,887806,10394632";
    var hq_str_s_sz399001="深证成指,10763.18,-60.035,-0.55,107517677,17420522";
     */
    var index = {
        init: function() {
            this.render()
        },
        getData: function(callback) {
            var url = "http://hq.sinajs.cn/rn=" + yn.timestamp() + "&list=s_sh000001,s_sz399001,s_sh000300,hkHSI,b_NKY"
            console.log(url)
            $.ajax({
                dataType: "script",
                cache: true,
                url: url,
                success: function(data) {
                    callback(data);
                }
            });
        },
        render: function() {
            var _this = this;
            this.getData(function(data) {
                //...
            })
        }
    }

    ///////////////////////////////////////

    news.init();

});
