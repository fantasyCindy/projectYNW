<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <div class="ynmodule-overlay feedback" class="hide">
        <div class="ynmodule">
            <p class="title"><span>意见与投诉</span></p>
            <i class="close fa fa-times-circle fa-2x"></i>
            <div class="wrap">
                <div class="line">
                    <input type="text" class="field" placeholder="输入手机号, 方便我们联系您">
                </div>
                <div class="line">
                    <textarea placeholder="输入内容" class="field"></textarea>
                </div>
                <div class="line wordCount">
                    <p class="complain fl">
                        <input type="text" class="comCode fl" aria-label="..." placeholder="验证码" id="comCode" name="comCode">
                            <img src="/validCode.htm" id="imgCodeId"><span>
                            <a id="changeImg" >换一张</a></span>
                    </p>
                    <p class="fr"><span class="value">200</span>/200</p>
                </div>
                <div class="line">
                    <button class="submit fr">提交</button>
                </div>
            </div>
        </div>
    </div>
