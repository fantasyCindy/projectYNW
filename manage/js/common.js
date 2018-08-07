function showModal(_modalId, _content, _size, _isNew) {
	if (!_size) {
		_size = ""
	}
	if ($("#" + _modalId) && $("#" + _modalId).hasClass("modal") && !_isNew) {
		$("#" + _modalId).find(".modal-body").html(_content);
		$("#" + _modalId).modal("show")
	} else {
		if ($("#" + _modalId)) {
			$("#" + _modalId).parent().remove()
		}
		var _processModalWin = "";
		_processModalWin += '<div class="modal fade" id="' + _modalId + '" data-backdrop="static"><div class="modal-dialog ' + _size + '"><div class="modal-content"><div class="modal-body">';
		_processModalWin += _content;
		_processModalWin += "</div></div></div></div>";
		var modalWin = document.createElement("div");
		modalWin.innerHTML = _processModalWin;
		$(document.body).append(modalWin);
		$("#" + _modalId).modal("show")
	}
}
function showProcessWin() {
	var _modalId = "showProcessWinId";
	var _modalContent = '<center><i class="fa fa-spinner fa-spin fa-4x"></i><h3>处理中</h3></center>';
	showModal(_modalId, _modalContent, "modal-sm", true);
	return $("#" + _modalId)
}
function closeProcessWin(_hideFinishCallback) {
	if (_hideFinishCallback) {
		$("#showProcessWinId").on("hidden.bs.modal", function() {
			_hideFinishCallback()
		})
	}
	$("#showProcessWinId").modal("hide")
}
function showMsg(_content) {
	var _modalId = "showMsgWinId";
	var _modalContent = "<center>" + _content + "</center>";
	showModal(_modalId, _modalContent, null, true);
	setTimeout(function() {
		$("#" + _modalId).modal("hide");
	}, 1000)
}
function showOnlyMsg(_content) {
	var index = layer.msg(_content);
	setTimeout(function() {
		layer.close(index);
	}, 3000);
}

function showOnlyErr(_content) {
	layer.alert(_content, {
		title:"错误信息", 
	    icon: 2,
	    skin: 'layer-ext-moon'
	});
}

function showLoading(_content){
	var index = layer.load(1, {
	    shade: [0.8, '#393D49'], 
	    content:"<span style='padding-left:40px;'>"+_content+"</span>"
	});
	return index;
}

function showErr(_content) {
	var _modalId = "showErrWinId";
	var _modalContent = '<center style="font-size:24px;"><i class="fa fa-warning fa-lg"></i>' + _content + '<br/><br/><p><a href="javascript:void(0);" class="btn btn-danger" onclick="$(\'#' + _modalId + "').modal('hide');\">关闭</a></p></center>";
	showModal(_modalId, _modalContent, null, true);
	return $("#" + _modalId)
}
function showConfirm(_content, _okCallback, _cancelCallback) {
	var _modalId = "showConfirmWinId";
	var _modalContent = '<center style="font-size:24px;"><i class="fa fa-warning fa-lg"></i>' + _content + "<br/><br/>";
	_modalContent += '<p><a href="javascript:void(0);" class="btn btn-success okbtn" >确认</a>&nbsp;';
	_modalContent += '<a href="javascript:void(0);" class="btn btn-danger cancelbtn" >取消</a></p></center>';
	showModal(_modalId, _modalContent, null, true);
	$("#" + _modalId).find(".okbtn").unbind("click");
	$("#" + _modalId).find(".cancelbtn").unbind("click");
	$("#" + _modalId).find(".okbtn").bind("click", function() {
		$("#" + _modalId).modal("hide");
		_okCallback()
	});
	$("#" + _modalId).find(".cancelbtn").bind("click", function() {
		$("#" + _modalId).modal("hide");
		_cancelCallback()
	})
}
function showOkCancel(_content, _okCallback, _cancelCallback) {
	var _modalId = "showConfirmWinId";
	var _modalContent = '<center style="font-size:24px;"><i class="fa fa-warning fa-lg"></i>' + _content + "<br/><br/>";
	_modalContent += '<p><a href="javascript:void(0);" class="btn btn-success okbtn" >通过</a>&nbsp;';
	_modalContent += '<a href="javascript:void(0);" class="btn btn-danger cancelbtn" >不通过</a></p></center>';
	showModal(_modalId, _modalContent, null, true);
	$("#" + _modalId).find(".okbtn").unbind("click");
	$("#" + _modalId).find(".cancelbtn").unbind("click");
	$("#" + _modalId).find(".okbtn").bind("click", function() {
		$("#" + _modalId).modal("hide");
		_okCallback()
	});
	$("#" + _modalId).find(".cancelbtn").bind("click", function() {
		$("#" + _modalId).modal("hide");
		_cancelCallback()
	})
}
function loadData4Form(_form, obj) {
	var key, value, tagName, type, arr;
	for (x in obj) {
		key = x;
		value = obj[x];
		_form.find("[name='" + key + "'],[name='" + key + "[]']").each(function() {
			tagName = $(this)[0].tagName;
			type = $(this).attr("type");
			if (tagName == "INPUT") {
				if (type == "radio") {
					$(this).attr("checked", $(this).val() == value)
				} else {
					if (type == "checkbox") {
						arr = value.split(",");
						for (var i = 0; i < arr.length; i++) {
							if ($(this).val() == arr[i]) {
								$(this).attr("checked", true);
								break
							}
						}
					} else {
						$(this).val(value)
					}
				}
			} else {
				if (tagName == "SELECT" || tagName == "TEXTAREA") {
					$(this).val(value)
				}
			}
		})
	}
}
function isArray(obj) {
	return Object.prototype.toString.call(obj) === "[object Array]"
};


function removeItem(arys,item){
	var _arrray = new Array();
   for(var i=0;i < arys.length;i++) { 
       if(item != arys[i]){
       	_arrray.push(arys[i])
       }
   }  
   return _arrray;
}

function validateImgFile(fileId){
   var fileVal = $("#"+fileId).val();
   if(fileVal == ""){
	   showOnlyErr("请选择上传的文件!");
	   return;
   }
   if(fileVal.lastIndexOf(".") == -1){
	   showOnlyErr("上传图片格式只支持:jpg、jpeg、png等文件格式");
	  return;
   }
   var fileSuffix = fileVal.substring(fileVal.lastIndexOf(".")+1,fileVal.length);
   var upperSuffix = fileSuffix.toUpperCase();
   if("JPEG" != upperSuffix && "PNG" != upperSuffix && "JPG" != upperSuffix){
	   showOnlyErr("上传图片格式只支持:jpg、jpeg、png等文件格式");
	   return;
   }
   return true;
}

function validateVideoFile(fileId){
	   var fileVal = $("#"+fileId).val();
	   if(fileVal == ""){
		   showOnlyErr("请选择上传的文件!");
		   return;
	   }
	   if(fileVal.lastIndexOf(".") == -1){
		   showOnlyErr("上传视频格式只支持:Mp4等文件格式");
		  return;
	   }
	   var fileSuffix = fileVal.substring(fileVal.lastIndexOf(".")+1,fileVal.length);
	   var upperSuffix = fileSuffix.toUpperCase();
	   if("MP4" != upperSuffix){
		   showOnlyErr("上传视频格式只支持:Mp4等文件格式");
		   return;
	   }
	   return true;
	}
function validButtonPermission() {
	var menuCodeArr;
	if (menuCodeStr && menuCodeStr.length > 0) {
		menuCodeArr = menuCodeStr.split(",");
	}
	$('.btn').each(function() {
		var menucode = $(this).attr('menucode');
		if (menucode) {
			var hide = true;
			if (menuCodeArr) {
				for (var i = 0; i < menuCodeArr.length; i++) {
					if (menucode == menuCodeArr[i]) hide = false;
				}
			}
			if (hide)
				$(this).hide();
		}
	});
}
$(function(){
	validButtonPermission();
});
