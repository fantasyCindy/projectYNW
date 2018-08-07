<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="upload-img">
    <iframe></iframe>
    <div class="thickdiv"></div>
    <div class="thickbox">
        <div class="thicktitle"><span>上传图片</span></div>
        <a id="closeBox" class="thickclose">×</a>
        <div class="container">
            <div class="imageBox">
                <div class="thumbBox"></div>
                <div class="spinner">Loading...</div>
            </div>
            <div class="action">
                <div class="new-contentarea tc">
                    <a style="display: block;" href="javascript:void(0)" class="upload-img">
                        <label for="upload-file">选择图片</label>
                    </a>
                    <input class="" name="upload-file" id="upload-file" type="file">
                </div>
                <input id="btnCrop" class="Btnsty_peyton" value="预览" type="button">
                <input id="btnZoomIn" class="Btnsty_peyton" value="+" type="button">
                <input id="btnZoomOut" class="Btnsty_peyton" value="-" type="button">
            </div>
            <div class="cropped"></div>
        </div>
        <button>确认上传</button>
        <span>确认上传前，请先预览效果。</span>
    </div>
</div>
