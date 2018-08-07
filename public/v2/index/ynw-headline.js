/*	
	jsp结构
    <!-- 约牛头条 -->
    <div class="ynw-headline">
        <div class="title-1">
            <span class="title-icon"></span>
            <a href="${live_path}/live/" class="text">约牛头条</a>
            <span class="color153 f1 ml10">股坛价值咨询</span>
            <div class="action f1 fr">
                <a href="" target="_blank" >更多</a>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </div>
        </div>
        <div class="headline-content"></div>
    </div>

	初始化
	ynwHeadline.init()

	获取数据
	ynwHeadline.render()
*/

require('./ynw-headline.css')
var ajax = require('module/ajax.js')

var ynwHeadline = function() {
    var query = { 
        page: 1, 
        size: 7,
    },container,headlineContent;

    var create = arr => {
        var obj = arr[0]
        var link = __path + `/headlines/${obj.type}/${obj.articleid}.htm`
        return `<a target="_blank" href="${link}" class="headline-top">
                    <p class="headline-top-title f3 b">${obj.title}</p>
                    <div class="headline-top-content f2">${obj.shortContent}</div>
                </a>`
    }
    var createNormal = arr => {
        return _.map(arr, item => {
            var link = __path + `/headlines/${item.type}/${item.articleid}.htm`
            return `<a target="_blank" href="${link}" class="headline-list headline-item f5"><i class="headline-icon"></i>${item.title}</a>`
        }).join("")
    }
    
    return {
        init: function() {
            container = $(".ynw-headline");
            headlineContent = container.find(".headline-content");
            var loading = new yntool.loading({
                container: headlineContent,
                type: 3
            }).render()
        },
        render: function() {
            getData({
                query,
                callback:function(back){
                    var html = createNormal(_.takeRight(back.rows,6))
                    var content = create(_.take(back.rows,1))
                    headlineContent.html(content+html)
                }
            }) 
        }
    }
}();

// 获取数据
var getData = (ops)=>{
    ajax.getJSON("/headlines/index.htm",{
        pageSize: ops.query.size,
        currentPage: ops.query.page,
    },data => {
        ops.callback(data);
    })
};

module.exports = ynwHeadline
