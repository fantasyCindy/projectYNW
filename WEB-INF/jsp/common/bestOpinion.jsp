<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <script id="bestOpinion-list-template" type="text/html">
        {{each}}
        <div class="bestOpinion-item">
            <div class="bestOpinion-item-title">
                <span class="yn-icon-circle"></span>
                <a href="/article/newDetail.htm?article_id={{$value.article_id}}" target="_blank" class="value">{{$value.title}}</a>
            </div>
            <div class="bestOpinion-item-content">
                <a href="/article/newDetail.htm?article_id={{$value.article_id}}" target="_blank" class="value">{{$value._content}}</a>
            </div>
            <div class="bestOpinion-item-info">
                <span class="time">{{$value.create_timeStr}}</span>
                <span class="view">阅读 : {{$value.viewnumber}}</span>
            </div>
        </div>
        {{/each}}
    </script>
