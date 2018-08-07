<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <div id="answerWindow" class="hide">
        <div class="answerWindow-wrap">
            <div class="title">
                <i class="icon-title fa fa-edit"></i>
                <div class="name">回答问题</div>
                <i class="close-window fa fa-times-circle hide"></i>
            </div>
            <div class="hide question"></div>
            <div class="content">
                <div class="top">
                    <div class="category action">
                        <span class="name">选择分类：</span>
                        <div class="items inline"></div>
                    </div>
                    <div class="judge action hide">
                        <span class="stockInfo">趋势判断：<span class="value"></span></span>
                        <button class="judge-item judge-item0 up" data-id="0">看涨<i class="fa fa-long-arrow-up"></i></button>
                        <button class="judge-item  judge-item1 down" data-id="1">看跌<i class="fa fa-long-arrow-down"></i></button>
                    </div>
                </div>
                <script id="answerWindow-edit" type="text/plain"></script>
                <div class="bottom">
                    <div class="search">
                        <input type="text" placeholder="搜索股票" .s>
                        <i class="fa fa-search"></i>
                    </div>
                </div>
            </div>
            <button class="submit">提交</button>
        </div>
    </div>
