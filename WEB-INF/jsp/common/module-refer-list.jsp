<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <script type="text/html" id="refer-list-template">
        <p class="total">共<span color="red">{{total}}</span>个内参</p>
        {{each}}
        <div class="list">
            <a href="{{$value.linkhref}}" target="_blank">
                <p class="title">{{$value.title}}</p>
                <div class="user_info clear">
                    <div class="user_head fl">
                        <span class="status status{{$value.productStatus}}">{{$value.status}}</span>
                        <div class="cover"><img src="{{$value.productImg}}" /></div>
                    </div>
                    <div class="content fl">{{$value.productInfo}}</div>
                </div>
            </a>
            <div class="sub_detail clear">
                <span>{{$value.pubtime}}</span>
                <span>来自：<font color="red">{{$value.puiblisher}}</font></span>
                <span>服务期：{{$value.startTime}}－{{$value.endTime}}｜<font color="red">{{$value.subscribenumber}}</font>人订阅</span>
                <a class="lookdetail-btn fr" data-id="{{$value.reference_id}}" data-teachid="{{$value.teacherid}}" data-is_od="{{$value.is_od}}">{{$value.seedetail}}</a>
            </div>
        </div>
        {{/each}}
    </script>
