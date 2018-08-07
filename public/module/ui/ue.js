module.exports = function(id) {
   
        return UE.getEditor(id, {
            toolbars: [
                [
                    'bold', //加粗
                    'indent', //首行缩进
                    'snapscreen', //截图
                    'underline', //下划线
                    'pasteplain', //纯文本粘贴模式
                    'horizontal', //分隔线
                    'removeformat', //清除格式
                    'fontsize', //字号
                    'forecolor', //文字颜色
                    'simpleupload', //单图上传
                    'insertimage', //多图上传
                    'justifyleft', //居左对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    'fullscreen', //全屏
                    'imagecenter', //居中
                    'lineheight', //行间距
                ]
            ],
            enableAutoSave: false,
            saveInterval: 36000000,
            initialFrameHeight: 250,
            elementPathEnabled: false,
            wordCount: false,
            enableContextMenu: false,
            pasteplain: true,
            autotypeset: {
                removeClass: true,
                clearFontSize: true,
                removeEmptyline: true, //去掉空行
                removeEmptyNode: false, // 去掉空节点
                autotypeset: true,
                indentValue: '2em'
            }
        });
    }

