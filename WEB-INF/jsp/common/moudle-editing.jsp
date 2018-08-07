<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <div id="edit-upload" class="hide">
        <p class="title">采编</p>
        <i class="close fa fa-times-circle fa-2x"></i>
        <div class="wrap">
            <p>[问股]002190 成飞集成，这只股行情怎样，需要减仓么？</p>
            <table>
                <body>
                    <tr>
                        <td>显示顺序</td>
                        <td><input type="text" class="initialize" /></td>
                    </tr>
                    <tr>
                        <td>图片上传</td>
                        <td>
                            <span>
                                <input id="img_srcInput" type="file" name="filename">
                                <button type="button" id="uploadCardBtn" class="step2-input initialize">立即上传</button>
                            </span>
                            <span>抱歉！您最多可上传4张</span>
                        </td>
                    </tr>
                    <tr>
                        <td>URL地址</td>
                        <td>
                            <p><input type="text" id="solidhref" class="initialize" /></p>
                            <ul class="">
                                
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td>输入内容</td>
                        <td><textarea class="initialize"></textarea></td>
                    </tr>
                </body>
                <p>
                    <span>确定</span>
                    <span>取消</span>
                </p>
            </table>
        </div>
    </div>