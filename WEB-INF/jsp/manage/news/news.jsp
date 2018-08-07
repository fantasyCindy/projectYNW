<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE>

    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>资讯发布</title>
        <link rel="stylesheet" href="/public/css/font-awesome.min.css">
        <link rel="stylesheet" href="/public/css/all.css">
        <link rel="stylesheet" href="/public/css/manage_news.css?01121">

        <body>
            <div class="title-1 flex">
                <span class="item select item-list" data-type="list">资讯列表</span>
                <span class="item" data-type="publish">发布资讯</span>
                <span class="flex1"></span>
            </div>
            <!-- 新闻列表 -->
            <div id="list" class="content-child column">
                <div class="form-group flex">
                    <input type="text" placeholder="请输入标题" class="input_title">
                    <div class="linea">
                        <span class="label">按分类查询</span>
                        <span class="classify active first" data-classify="pc">pc端资讯</span>
                        <span class="classify" data-classify="mobile">移动端资讯</span>
                        <span class="classify" data-classify="classic">移动端精选</span>
                        <select name="" class="category1 pc show">
                            <option value="1">热门资讯</option>
                            <option value="2">涨停揭秘</option>
                            <option value="3">宏观要闻</option>
                            <option value="4">个股资讯</option>
                        </select>
                        <select name="" class="category1 mobile hide">
                            <option value="6">风险提示</option>
                            <option value="7">利好消息</option>
                            <option value="8">投资新闻</option>
                        </select>
                        <select name="" class="category1 classic hide">
                            <option value="9">战法精研</option>
                            <option value="10">热点专题</option>
                            <option value="11">名家解盘</option>
                        </select>
                    </div>
                    <span class="btn-inquire">查询</span>
                    <span class="btn-reset">清空</span>
                    <span class="btn-severity">重新发布</span>
                    <span class="btn-natchSeverity">全部更新</span>
                    <label class="fascicule">每页
                        <select id="branches">
                            <option value="12">12</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="350">350</option>
                            <option value="500">500</option>
                        </select>条</label>
                </div>
                <div class="header flex">
                    <label>
                        <input type="checkbox" id="checkAll">全选</label>
                    <span class="title flex1">标题</span>
                    <span class="small category">分类</span>
                    <span class="small time">时间</span>
                    <span class="small action">操作</span>
                </div>
                <div class="items flex column"></div>
                <div class="key-layer hide">
                    <div class="layer-container">
                        <div class="layer-title">编辑<i class="fa fa-times close" aria-hidden="true" style="font-size:20px;float:right;margin-right:10px;position:relative;top:9px;cursor:pointer;"></i></div>
                        <select name="" class="layer-select hide">
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
                        <div class="editTitle">
                            <label for="">标题</label>
                            <input type="text">
                        </div>
                        <div class="editTag">
                            <label for="">标签</label>
                            <div class="selectTag">
                                <div class="exist">
                                </div>
                                <input type="text" placeholder="按回车键添加标签" class="addTagInput">
                            </div>
                        </div>
                        <div class="editContent">
                            <label for="" style="display:inline-block;top:-205px;left:-10px;position: relative;">内容</label>
                            <textarea name="" id="" cols="50" rows="12" placeholder="请编辑内容"></textarea>
                        </div>
                        <div class="layer-btn">确定</div>
                    </div>
                </div>
                <!-- 推送弹框 -->
                <div class="push hide">
                    <div class="layer-container">
                        <div class="layer-title">请编辑标题<i class="fa fa-times close" aria-hidden="true" style="font-size:20px;float:right;margin-right:10px;position:relative;top:9px;cursor:pointer;"></i></div>
                        <div class="push-msg"><span class="label">标题</span>
                            <input class="push-title" type="text">
                        </div>
                        <div class="push-platform"><span class="label">分平台推送</span>
                            <label for="" class="push-label">全部</label><input name="push-source" class="push-source" type="radio" data-source="0">
                            <label for="" class="push-label">ios</label><input name="push-source" class="push-source" type="radio" data-source="1">
                            <label for="" class="push-label">android</label><input name="push-source" class="push-source" type="radio" data-source="2">
                        </div>
                        <div class="push-btn">确认推送</div>
                    </div>
                </div>
            </div>
            <!-- 发布资讯 -->
            <div id="publish" class="content-child flex column" style="display: none">
                <div class="flex">
                    <div class="left flex column">
                        <div class="line flex">
                            <span class="label">标题</span>
                            <input type="text" class="flex1" id="news-title">
                        </div>
                        <div class="linea">
                            <div class="label">分类</div>
                            <span class="classify active first" data-classify="pc">pc端资讯</span>
                            <span class="classify second" data-classify="mobile">移动端资讯</span>
                            <span class="classify third" data-classify="classic">移动端精选</span>
                            <select name="" class="category1 pc show">
                                <option value="1">热门资讯</option>
                                <option value="2">涨停揭秘</option>
                                <option value="3">宏观要闻</option>
                                <option value="4">个股资讯</option>
                            </select>
                            <select name="" class="category1 mobile hide">
                                <option value="6">风险提示</option>
                                <option value="7">利好消息</option>
                                <option value="8">投资新闻</option>
                            </select>
                            <select name="" class="category1 classic hide">
                                <option value="9">战法精研</option>
                                <option value="10">热点专题</option>
                                <option value="11">名家解盘</option>
                            </select>
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
                            <input type="text block" placeholder="新闻关键字" id="value-keywords" />
                           <!--  <div class="pub-selectTag">
                                <div class="pub-exist">
                                </div>
                                <input type="text" placeholder="按回车键添加标签" class="pub-addTagInput">
                            </div> -->
                        </div>
                        <div class="flex column" style="margin-top:10px">
                            <div class="descrip">描述</div>
                            <textarea name="" id="value-description" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    <div class="right flex flex1">
                        <script id="ueditContainer" name="content" type="text/plain"></script>
                    </div>
                </div>
                <div class="line submit">
                    <button class="btn publish">发布</button>
                    <button class="btn reset">重置</button>
                </div>
            </div>
            <script src="/public/js/jquery.js"></script>
            <script src="/public/js/cropper.min.js"></script>
            <script src="/public/js/layer/layer.js"></script>
            <script src="/public/js/lodash.js"></script>
            <script src="/public/js/bootpag.js"></script>
            <script src="/public/ueditor/ueditor.config.js"></script>
            <script src="/public/ueditor/ueditor.all.min.js"></script>
            <script src="/public/ueditor/lang/zh-cn/zh-cn.js"></script>
            <script src="/public/bundle/manage_news.bundle.js?01122"></script>
        </body>

        </html>
