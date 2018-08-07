<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>资讯发布</title>
        <link rel="stylesheet" href="/public/css/font-awesome.min.css">
        <link rel="stylesheet" href="/public/css/all.css">
        <link rel="stylesheet" href="/public/css/manage_news.css?45465">
        <style>
        .editContents {
            margin-top: 10px;
            margin-left: 20px;
        }
        
        .editContents textarea {
            padding: 10px;
            font-size: 15px;
        }
        </style>

        <body>
            <div class="title-1 flex">
                <span class="item select" data-type="list" style="border:none">约牛头条</span>
                <span class="item hide" data-type="publish"></span>
                <span class="flex1"></span>
            </div>
            <!-- 新闻列表 -->
            <div id="list" class="content-child column">
                <div class="header flex">
                    <label></label>
                    <span class="title">标题</span>
                    <span class="category s15">分类</span>
                    <span class="key_word">关键字</span>
                    <span class="time">时间</span>
                    <span class="action">操作</span>
                </div>
                <div class="items flex column"></div>
            </div>
            <!-- 发布资讯 -->
            <div id="publish" class="content-child flex column" style="display: none">
                <div class="flex">
                    <div class="left flex column">
                        <div class="line flex">
                            <span class="label">标题</span>
                            <input type="text" class="flex1" id="news-title">
                        </div>
                        <div class="line uploadImage">
                            <div class="inline flex">
                                <span class="label">图片</span>
                                <button class="uploadBtn">上传图片</button>
                            </div>
                            <div id="thumb-wrap"><img id="thumb" src="" width="100%"></div>
                        </div>
                        <div class="flex column">
                            <div class="keyword">关键字</div>
                            <select name="" class="keyw">
                                <option value="热点">热点</option>
                                <option value="利好消息">利好消息</option>
                                <option value="机会解读">机会解读</option>
                                <option value="风险提示">风险提示</option>
                                <option value="新股">新股</option>
                                <option value="重要公告">重要公告</option>
                                <option value="涨停分析">涨停分析</option>
                                <option value="投资要闻">投资要闻</option>
                                <option value="时评">时评</option>
                                <option value="投资专题">投资专题</option>
                                <option value="观点精选">观点精选</option>
                                <option value="早盘必读">早盘必读</option>
                                <option value="板块异动">板块异动</option>
                                <option value="投资日历">投资日历</option>
                                <option value="龙虎解读">龙虎解读</option>
                                <option value="牛股分析">牛股分析</option>
                                <option value="午评">午评</option>
                                <option value="收评">收评</option>
                                <option value="诊股精选">诊股精选</option>
                                <option value="投顾精选">投顾精选</option>
                                <option value="投资热点">投资热点</option>
                                <option value="涨停解读">涨停解读</option>
                                <option value="宏观要闻">宏观要闻</option>
                            </select>
                        </div>
                    </div>
                    <div class="editContents">
                        <label for="">内容</label>
                        <!-- <textarea name="" id="" cols="70" rows="25"></textarea> -->
                        <script id="edit-headline" type="text/plain"></script>
                    </div>
                </div>
                <div class="line submit">
                    <button class="btn publish">保存</button>
                    <button class="btn reset">重置</button>
                </div>
            </div>
            <!-- 观点列表 -->
            <div id="relatedOpinion" class="content-child column" style="display: none">
                <div style="margin-bottom:15px;" class="back">
                    <button>返回头条列表</button>
                </div>
                <div class="titleBar">
                    <div class="qtitle">
                        <label for="">标题</label>
                        <input type="text">
                    </div>
                    <div class="qname">
                        <label for="">创建人</label>
                        <input type="text">
                    </div>
                    <div class="query"><button>查询</button></div>
                </div>
                <label style="font-size:20px;font-weight:bold;display: block;">观点列表</label>
                <div class="header flex" style="border-bottom:1px solid #ccc">
                    <label></label>
                    <span class="small s50 title">标题</span>
                    <span class="small s30 key_word">创建人</span>
                    <span class="small s15 action">操作</span>
                </div>
                <div class="relatedItems"></div>
                <div class="page"></div>
            </div>
            <!-- 已相关 -->
             <div id="alreadyOpinion" class="content-child column" style="display: none">
                <div style="margin-bottom:15px;" class="back">
                    <button>返回头条列表</button>
                </div>
                <label style="font-size:20px;font-weight:bold;display: block;">相关观点列表</label>
                <div class="header flex" style="border-bottom:1px solid #ccc">
                    <label></label>
                    <span class="small s50 title">标题</span>
                    <span class="small s30 key_word">创建人</span>
                    <span class="small s15 action">操作</span>
                </div>
                <div class="alreadyItems"></div>
                <div class="page"></div>
            </div>
            <script src="/public/js/jquery.js"></script>
            <script src="/public/js/cropper.min.js"></script>
            <script src="/public/js/layer/layer.js"></script>
            <script src="/public/js/lodash.js"></script>
            <script src="/public/js/bootpag.js"></script>
            <script src="/public/ueditor/ueditor.config.js"></script>
            <script src="/public/ueditor/ueditor.all.min.js"></script>
            <script src="/public/ueditor/lang/zh-cn/zh-cn.js"></script>
            <script src="/public/bundle/headline.bundle.js?1227"></script>
        </body>

        </html>
