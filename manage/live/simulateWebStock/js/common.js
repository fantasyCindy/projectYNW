//how to use the function below: 
//$.include('file/ajaxa.js');$.include('file/ajaxa.css'); 
//or $.includePath = 'file/';$.include(['ajaxa.js','ajaxa.css']);(only if .js and .css files are in the same directory) 
$.extend({  
     includePath: '',  
     include: function(file){
        var files = typeof file == "string" ? [file]:file;
        for (var i = 0; i < files.length; i++){
            var name = files[i].replace(/^\s|\s$/g,"");
            var att = name.split('.');
            var ext = att[att.length - 1].toLowerCase();
            var isCSS = ext == "css";
            var tag = isCSS ? "link" : "script";
            var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
            var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";
            if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">");
        }
    }
});
//使用方法
$.includePath =path+'/live/simulateWebStock/';
$.include(['js/jquery.js','js/jQuery.asyncLoading.js','js/ajaxa.js','js/toTop.js']);
hrefValue = window.location.href; //获取当前页面的地址
if (hrefValue="访问地址"){
    //引用css文件
}
$.include('css/bootstrap.min.css');//基本公用
$.include('css/base.css');//基本公用
$.include('css/head.css');//基本公用
$.include('css/footer.css');//基本公用


