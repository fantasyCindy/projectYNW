<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <div id="quiz-overlay" class="hide">
        <div id="quiz">
            <p class="title">向投顾提问</p>
            <i class="close fa fa-times-circle fa-2x"></i>
            <div class="wrap">
                <div class="ipt">
                    <input id="entry" type="text" class="texts" placeholder="股票代码/拼音/名字" title="股票代码/拼音/名字">
                </div>
                <input id="teacherid" type="hidden" class="texts" />
                <input id="stock_name" type="hidden" class="texts" />
                <div class="varieties">
                    <p class="vartitle"><span>品种</span></p>
                </div>
                <div class="text">
                    <textarea placeholder="请描述您的问题" class="texts"></textarea>
                </div>
                <div class="num"><span>签约和开户问题请进入<a target="_blank" href="/helpcenter.htm">帮助中心</a></span>
                    <span class="fr"><span id="textCount_1">100</span>/100</span>
                </div>
                <div class="info">
                    <input type="button" class="submit" value="提交问题" />
                </div>
            </div>
        </div>
    </div>
