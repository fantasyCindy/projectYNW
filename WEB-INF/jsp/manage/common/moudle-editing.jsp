<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <div id="edit-upload" class="hid">
        <p class="title">采编</p>
        <i class="close fa fa-times-circle fa-2x"></i>
        <div class="wrap">
            <p class="edit-content"></p>
            <table>
                <tbody>
                    <tr>
                        <td width="10%">显示顺序</td>
                        <td><input type="text" class="initialize" id="intervene_no" /></td>
                    </tr>
                    <tr>
                        <td>图片上传</td>
                        <td>
                            <span class="append">
                                <input id="img_srcInput" type="file" name="imageFile" class="initialize">
                                <input type="submit" id="uploadCardBtn" class="step2-input" value="上传"/>
                            </span>
                            <span class="msg-warr hid">抱歉！您最多可上传4张</span>
                        </td>
                    </tr>
                    <tr>
                        <td>URL地址</td>
                        <td>
                            <p><input type="text" id="solidhref" class="initialize" /></p>
                            <div class="vessel">
                                
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>输入内容</td>
                        <td><textarea class="initialize" id="intervene_content"></textarea></td>
                    </tr>
                </tbody>
            </table>
            <p class="upload-btn">
                <span class="confirm">确定</span>
                <span class="cancel">取消</span>
            </p>
        </div>
    </div>