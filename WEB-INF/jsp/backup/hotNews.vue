<template>
<div id="hotNews" class="frame hide">
    <div class="wrap">
        <div class="title">
            <span class="fafile"></span>
            <span class="text">最新资讯</span>
            <a href="/article/index.htm?hl3" target="_blank" class="more fr">更多<i class="fa fa-angle-right"></i></a>
            <div class="news-type-items">
                <span class="news-type-item select" data-type="1">热门资讯</span>
                <span class="news-type-item" data-type="2">涨停揭秘</span>
                <span class="news-type-item" data-type="3">宏观要闻</span>
                <span class="news-type-item" data-type="4">个股资讯</span>
            </div>
        </div>
        <div class="content">
            <div class="news1 newsFrame">
                <a class="imgw" href="" target="_black">
                    <img src="" width="110">
                </a>
                <div class="list"></div>
            </div>
            <div class="news3 newsFrame">
                <script id="news3-template" type="text/html">
                    {{each}}
                    <a href="{{$value.link}}" target="_black" class="imgw">
                        <img src="{{$value.title_img}}" />
                    </a>
                    {{/each}}
                </script>
            </div>
            <div class="news2 newsFrame">
                <div class="list"></div>
            </div>
            <div class="news4 newsFrame">
                <div class="list"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    
//新闻列表
var newslist = function() {
    var container, page = 1,
        row = 24,
        imagesData = [],
        list1, list2, list3, list4, image1,
        types = ["", "热门资讯", "涨停揭秘", "宏观要闻", "个股资讯"],
        newsType;


    function handle(data) {
        imagesData = [];
        return _.chain(data).map(function(item) {
            item.title = item.title.replace(/^[0-9\-]+|[，,（）]/g, '');
            //取出图片数据
            imagesData.push({
                title_img: item.title_img,
                link: item.link
            })
            return item;
        }).chunk(8).map(function(item) {
            return _.chunk(item, 2);
        }).value();
    }

    return {
        init: function() {
            container = $("#hotNews");
            newsType = container.find('.news-type-item');
            list1 = container.find('.news1 .list');
            list2 = container.find('.news2 .list');
            list3 = container.find('.news3');
            list4 = container.find('.news4 .list');
            image1 = $('#hotNews .news1 .imgw img');

            newsType.click(function() {
                var type = $(this).data('type');
                $(this).parent().find('.select').removeClass('select');
                $(this).addClass('select');
                newslist.render(type);
            })
        },
        render: function(type) {
            getNewsList({ page: page, row: row, type: type }).done(function(data) {
                var _data = handle(data.rows);

                //第一张图片
                image1.parent().attr('href', imagesData[0].link)
                image1.attr('src', imagesData[0].title_img)

                list1.html(template('hotNews-template', _data[0]))
                list2.html(template('hotNews-template', _data[1]))
                list4.html(template('hotNews-template', _data[2]))

                //三张图片
                list3.html(template('news3-template', _.slice(imagesData, 1, 4)))
            })
        }
    }
}()
</script>
<style>
    #hotNews .title .fafile {
    width: 22px;
    height: 22px;
    background: url(/public/images/homeIcon.png) no-repeat;
    display: inline-block;
    background-position: -657px -9px;
    position: relative;
    top: 5px
}

#hotNews {
    padding: 0 0 15px 0
}

#hotNews .content {
    overflow: hidden;
    height: 200px;
    position: relative;
    margin: 10px 20px 0px 20px
}

#hotNews .content a:hover {
    text-decoration: underline
}

#hotNews .content .newsFrame {
    position: absolute;
    width: 390px;
    height: 100px
}

#hotNews .content .newsFrame .list .item {
    width: 98%;
    height: 14px;
    overflow: hidden;
    margin-bottom: 10px;
    margin-left: 1px;
    font-size: 13px;
    line-height: 14px
}

#hotNews .content .newsFrame .list .item a:hover {
    color: #cf1623
}

#hotNews .content .newsFrame .list .item .fa {
    font-size: 10px;
    color: #ea544a;
    margin-left: 1px;
    -webkit-transform: scale(0.7);
    transform: scale(0.7)
}

#hotNews .content .news1 {
    top: 0;
    left: 0
}

#hotNews .content .imgw {
    float: left;
    width: 110px;
    height: 90px;
    overflow: hidden
}

#hotNews .content .imgw img {
    height: 100%
}

#hotNews .content .news1 .list {
    position: absolute;
    left: 120px;
    float: left
}

#hotNews .content .news2 {
    top: 100px;
    left: 0
}

#hotNews .content .news3 {
    top: 0;
    width: 414px;
    left: 390px;
    overflow: hidden
}

#hotNews .content .news3 .imgw {
    width: 130px;
    overflow: hidden;
    height: 90px;
    margin: 4px
}

#hotNews .content .news4 {
    top: 100px;
    left: 390px
}
</style>
