<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <script type="text/html" id="opinion-list-item-template">
        {{each}}
        <div class="opinion-list-item">
            <span class="avatar"><img width="100%" src="{{$value.photo}}" /></span>
            <div class="info inline">
                <p class="name">{{$value.createrName}}</p>
                <a href="{{$value.detail}}" target="_blank" class="title">
                    <span class="value">{{$value.title}}</span>
                    <span class="trend {{$value.trendStyle}} trend{{$value.trendStyle}}">{{$value.trend_text}}</span>
                </a>
                <a href="{{$value.detail}}" target="_blank" class="subject">{{$value.opinionShortContent}}</a>
                <div class="intro">
                    <span class="time">{{$value.create_time}}</span>
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
