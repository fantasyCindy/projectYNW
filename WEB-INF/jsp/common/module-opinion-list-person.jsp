<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <script type="text/html" id="opinion-list-item-template">
        {{each}}
        <div class="opinion-list-item">
            <div class="info inline">
                <a href="${opinion_path}opinion/{{$value.article_id}}.htm" target="_blank" class="title">
                    <span class="value">{{$value.title}}</span>
                    <span class="trend {{$value.trendStyle}} trend{{$value.trendStyle}}">{{$value.trend_text}}</span>
                </a>
                <a href="${opinion_path}opinion/{{$value.article_id}}.htm" target="_blank" class="subject">{{$value.opinionShortContent}}</a>
                <div class="intro">
                    <span class="time">{{$value._time}}</span>
                    <span class="view">
                                <i class="icon"></i>阅读
                                <span class="value">{{$value.viewnumber}}</span>
                    <i class="icon"></i>赞
                    <span class="value">{{$value.zan_count}}</span>
                    </span>
                    <span class="common">
                                <i class="icon"></i>评论
                                <span class="value">{{$value.comment_count}}</span>
                    </span>
                </div>
            </div>
        </div>
        {{/each}}
    </script>
