<template>
    <!-- 股市资讯 -->
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
<style>
</style>
