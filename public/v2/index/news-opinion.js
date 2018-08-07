/*	
	jsp结构
	<!-- 最新观点 -->
    <div class="news-opinion">
        <div class="title-1">
            <span class="title-icon"></span>
            <span class="text">最新观点</span>
            <div class="action f1 fr">
                <a href="${opinion_path}/opinion/">更多</a>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
        </div>
        <div class="content frame-shadow">
            <p class="news-title f5"></p>
            <div class="news-opinion-content"></div>
        </div>
    </div>

	初始化
	newsOpinion.init()

	获取数据
	newsOpinion.render()
*/

require('./news-opinion.css')
var ajax = require('module/ajax.js')
var local = require('module/lib/localData.js');

var newsOpinion = function() {
    var query = { 
        page: 1, 
        size: 6,
        type: 0, // 观点分类   0大盘, 1题材, 2鉴股, 3股票学堂 ,null查询全部
    },container,news_opinion_content,news_title;
    var opinion_type = { type: 0 };
    var createNormal = (arr,obj) => {
        var type = ['dapan','ticai'][obj.type]//链接地址根据分类来判断
        return _.map(arr, item => {
            item._opinionShortContent = item.opinionShortContent.length > 103?item.opinionShortContent.substring(0,103) + '...':item.opinionShortContent
            return `<a href="${opinion_path}${type}/${item.create_id}/${item.article_id}.htm" title="${item.title}" class="item news-content" target="_blank">
                        <div class="line line1 overflow">
                            <div class="image fl overflow"><img src="${item.photo}" /></div>
                            <div class="string fl">
                                <div class="opinion-lastest-title f3">
                                    <span class="txt">${item.title}</span>
                                </div>
                                <div class="subtext f2">${item._opinionShortContent}</div>
                                <div class="author f2 color999">
                                    <span class="name author-list">${item.createrName}</span>
                                    <span class="time author-list"><i class="author-icon"></i>${item.create_timeStr}</span>
                                    <span class="viewCount author-list"><i class="author-icon"></i>${item.viewnumber}</span>
                                </div>
                            </div>
                        </div>
                    </a>`
        }).join("")
    }
    var create = () =>{
        return`<span class="news-list select cursor" data-type="0">大盘</span><span class="news-list cursor" data-type="1">题材</span>`
    }
    return {
        init: function() {
            var self = this
        	container = $(".news-opinion");
            news_opinion_content = container.find('.news-opinion-content');
        	news_title = container.find('.news-title');
            var loading = new yntool.loading({
                container: news_opinion_content,
                type: 3
            }).render()
            news_title.html(create)
            news_title.on('mouseover','.news-list',function(){
                $(this).addClass('select').siblings().removeClass('select')
                var type = $(this).data('type')
                query.type = type
                self.render({type:type})
            })
        },
        render: function(ops) {
            _.extend(opinion_type,ops)
            getData({
                query,
                callback:function(back){
                    var html = createNormal(back.rows,opinion_type)
                    news_opinion_content.html(html)
                }
            }) 
        }
    }
}();

// 获取数据
var getData = (ops)=>{
    var key = 'queryNewOpinions' + local.joinKey(ops.query);
    var cache = local.get(key, { timeout: 300 })
    if (cache && cache.valid) return ops.callback(cache.data);

    ajax.getJSON("/opinion/queryNewOpinions.htm",{
        pageSize: ops.query.size,
        currentPage: ops.query.page,
        classify: ops.query.type,
        teacherid: ""
    },data => {
        ops.callback(data);
        local.set(key, data)
    })
};

module.exports = newsOpinion
