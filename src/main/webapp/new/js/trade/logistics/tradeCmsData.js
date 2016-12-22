/**
 * 图片错误样式函数
 * @param error
 * @param element

function imgErrorPlacement(error, element){
	var html = "<div class='formError' style='margin-top: 30px; opacity: 0.87;'>"+
		"<div class='formErrorContent'>"+
		"</div>"+
		"<div class='formErrorArrow formErrorArrowBottom'>"+
		"<div class='line1'></div>"+
		"<div class='line2'></div>"+
		"<div class='line3'></div>"+
		"<div class='line4'></div>"+
		"<div class='line5'></div>"+
		"<div class='line6'></div>"+
		"<div class='line7'></div>"+
		"<div class='line8'></div>"+
		"<div class='line9'></div>"+
		"<div class='line10'></div>"+
		"</div>"+
		"</div>";
	var div = $(html);
	error.appendTo(div.find(".formErrorContent"));
	element.parents(".uploadlay").find(".upload_filepathtxt").after(div);
	var content = div.parent();
	var rhide = false;
} */

//验证上传图片的格式
jQuery.validator.addMethod("isImg",function(value,element){
	var img = /.(jpg|jpeg|png|bmp|JPG|JPEG|PNG|BMP)$/;
	return this.optional(element) || img.test(value);
},"请上传jpg|jpeg|png|bmp格式的图片！")

//LOGO图片
$(".uploadImgForm").each(function(){
	$(this).validate({
		onfocusout: false,
		onkeyup: true,
//		errorPlacement: function(error, element){
//			imgErrorPlacement(error, element);
//		},
		rules:{
			"file": {
				required: true,
				isImg: true
			}
		},
		messages: {
			"file":{
				required: "请选择图片！"
			}
		}
	});
})

//var x;  
//var y;  
//var width;  
//var height;
//function initJcrop(formObj){
//	var width = parseInt(formObj.find(".width").text());
//	var height = parseInt(formObj.find(".height").text());
//	var jcrop_api, boundx, boundy;  
//    //使原图具有裁剪功能
//	formObj.parent().parent().next().find(".imgTarget").Jcrop({  
//        onChange: updatePreview,  
//        onSelect: updatePreview,  
//        aspectRatio: width / height,
////        allowResize: false,
//        allowSelect: false
//    },function(){  
//        // Use the API to get the real image size  
//        var bounds = this.getBounds();  
//        boundx = bounds[0];  
//        boundy = bounds[1];  
//        // Store the API in the jcrop_api variable  
//        jcrop_api = this;  
//        jcrop_api.setSelect([0, 0, width, height]);
//        parent.dyniframesize();
//    }); 
//    //裁剪过程中，每改变裁剪大小执行该函数</span>  
//    function updatePreview(c){  
//        if (parseInt(c.w) > 0){    
//        	formObj.find('.width').val(c.w);  //c.w 裁剪区域的宽  
//        	formObj.find('.height').val(c.h); //c.h 裁剪区域的高  
//        	formObj.find('.x').val(c.x);  //c.x 裁剪区域左上角顶点相对于图片左上角顶点的x坐标  
//        	formObj.find('.y').val(c.y);  //c.y 裁剪区域顶点的y坐标</span>  
//        }  
//	}; 
//}

var cropzoom;
var cropzoom_width = 800;
var cropzoom_height = 350;
function uploadImg(obj){
	var formObj = $(obj).parents(".uploadImgForm");
	
	formObj.parents(".imgDiv").next().hide();
	formObj.parents(".imgDiv").next().find(".img_view img").remove();
	formObj.find(".fileupload").attr("disabled", "disabled").addClass("btn_forbidden");
	
	if(!formObj.valid()){
		return false;
	}
	
	formObj.parents(".imgDiv").next().find(".img_view").append("<img src='' alt='' class='imgTarget'/>");
	
	formObj.ajaxSubmit({
		url: 'uploadImg.do',
		type: 'post',
		dataType: 'json',
		success: function(data){
			if(data.msg == "success"){
				var a = new Date().getTime();
				formObj.parents(".imgDiv").next().find(".imgTarget").attr("src", data.filePath + "?a=" + a).attr("rel", data.filePath + "?a=" + a);
				formObj.parents(".imgDiv").next().show();
				var width = parseInt(formObj.find(".width").text()) - 1;
				var height = parseInt(formObj.find(".height").text()) - 1;
				
				//如果上传图片的长宽大小比建议的长宽小，则给予提示
				if(data.width < width || data.height < height){
					formObj.parents(".imgDiv").next().hide();
					$.alertPlus("您选择的图片尺寸太小，请上传不小于建议长宽的图片！", 9, "提示");
					return false;
				}
				
				formObj.find(".fileupload").removeAttr("disabled").removeClass("btn_forbidden");
				
				cropzoom = formObj.parents(".imgDiv").next().find(".img_view").cropzoom({ 
					width: cropzoom_width, 
					height: cropzoom_height, 
					bgColor: '#ccc', 
					enableRotation: false, 
					enableZoom: false, 
					selector: { 
						w: width, 
						h: height, 
						centered: true, 
						bgInfoLayer: '#fff', 
						borderColor: 'blue', 
						borderColorHover: 'blue',
						showPositionsOnDrag: false,
						showDimetionsOnDrag: false,
						aspectRatio: true
					}, 
					image: { 
						source: data.filePath + "?a=" + a,
						width: data.width,
						height: data.height,
						minZoom: 100,
						maxZoom: 100,
						startZoom: 100
					} 
				}); 
				
				parent.dyniframesize();
			} else{
				$.alertPlus(data.msg, 2, "提示");
				formObj.find(".fileupload").attr("disabled", "disabled").addClass("btn_forbidden");
			}
		},
		error: function(err){
			$.alertPlus("操作失败，请注意检查图片大小是否超过限制！", 2, "提示");
			formObj.find(".fileupload").attr("disabled", "disabled").addClass("btn_forbidden");
		}
	});
	
}

//上传剪切后的图片
$(".upload").find(".fileupload").live("click", function(event){
	event.stopPropagation();
	
	var formObj = $(this).parents(".uploadImgForm");
	
	if(!formObj.valid()){
		return false;
	}
	
	var imgSelector = cropzoom.cropzoom.getParameters(cropzoom);
	
	if(imgSelector.selectorX > imgSelector.imageX
			&& imgSelector.selectorX + imgSelector.selectorW < imgSelector.imageX + imgSelector.imageW
			&& imgSelector.selectorY > imgSelector.imageY
			&& imgSelector.selectorY + imgSelector.selectorH < imgSelector.imageY + imgSelector.imageH){
		formObj.find('.width').val(imgSelector.selectorW);  //c.w 裁剪区域的宽  
		formObj.find('.height').val(imgSelector.selectorH); //c.h 裁剪区域的高  
		formObj.find('.x').val((imgSelector.selectorX - imgSelector.imageX).toFixed(0));  //c.x 裁剪区域左上角顶点相对于图片左上角顶点的x坐标  
		formObj.find('.y').val((imgSelector.selectorY - imgSelector.imageY).toFixed(0));  //c.y 裁剪区域顶点的y坐标 
	} else{
		$.alertPlus("请选择图片区域内进行裁剪！", 9, "提示");
		return false;
	}
	
	formObj.ajaxSubmit({
		url: 'cutImg.do',
		type: 'post',
		dataType: 'json',
		success: function(data){
			if(data.msg == "success"){
				formObj.parents(".imgDiv").next().hide();
				formObj.find(".fileupload").attr("disabled", "disabled").addClass("btn_forbidden");
				parent.dyniframesize();
				$.alertPlus("上传图片成功！", 1, "提示");
			} else{
				$.alertPlus(data.msg, 2, "提示");
			}
		},
		error: function(err){
			$.alertPlus("裁剪后上传图片出错！", 2, "提示");
		}
	});
});



var companyDescEditor;
KindEditor.options.cssData = 'body { font-size: 12px; font-family: "微软雅黑"; color: #666666; font-style:normal;  }';
KindEditor.ready(function(K) {
	companyDescEditor = K.create('textarea[name="companyRes.companyDesc"]', {
		//字体
		fontname: '微软雅黑',
		fontsize: '12px',
		forecolor: '#999999',
		//true时显示浏览远程服务器按钮。默认值: false
		allowFileManager : false,
//		noDisableItems: true,
//		designMode: false,
		allowPreviewEmoticons: false,
		//true时显示图片上传按钮。默认值: true
		allowImageUpload: false,
		//true时显示Flash上传按钮。默认值: true
		allowFlashUpload: false,
		//true时显示视音频上传按钮。默认值: true
		allowMediaUpload: false,
		//true时显示文件上传按钮。默认值: true
		allowFileUpload: false,
		//2或1或0，2时可以拖动改变宽度和高度，1时只能改变高度，0时不能拖动。默认值: 2
		resizeType: 0,
		//true时显示网络图片标签，false时不显示。默认值: true
		allowImageRemote: false,
		/*配置编辑器的工具栏，其中”/”表示换行，”|”表示分隔符。默认值:
    	[
	        'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
	        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
	        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
	        'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
	        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
	        'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
	        'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
	        'anchor', 'link', 'unlink', '|', 'about'
    	]*/

		items:
			[
		        'source', '|', 'justifyleft', 'justifycenter', 'justifyright',
		        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
		        'superscript', 'selectall', '|',
		        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
		        'italic', 'underline', 'strikethrough', 'removeformat', '|',
		        'hr', 'pagebreak'
	    	]
	});
});

$("#descForm").validate({
	rules: {
		"companyRes.serviceTel": {
			required: true,
			mobileOrTel: true,
			toFilter: true,
			maxlength: 20
		}
	},
	messages: {
		"companyRes.serviceTel": {
			required: "请输入公司服务电话！",
			mobileOrTel: "请输入正确的公司服务电话！",
			toFilter: "请输入正确的公司服务电话！",
			maxlength: "请输入正确的公司服务电话，长度最大为{0}个字符！"
		}
	}
});

//更新公司服务电话和公司介绍
$("#subDesc").live("click", function(){
	
	if(!$("#descForm").valid()){
		return false;
	}
	var text = companyDescEditor.text();
	if(!text){
		$.alertPlus("请填写公司介绍！", 9, "提示");
		return false;
	}
	if(toFilter.test(text)){
		$.alertPlus("请填写正确的公司介绍！", 9, "提示");
		return false;
	}
	
	$("#companyDesc").val(companyDescEditor.html());
	$("#companyDescText").val(text);
	$("#descForm").ajaxSubmit({
        url : "updateComDesc.do",
        type : "post",
        dataType : "json",
        success: function(data) {
            if (data.msg == "success") {
                $.alertPlus("更新公司介绍成功！", 1, "提示");
            } else {
                $.alertPlus(data.msg, 2, "提示");
            }
        },
        error:function(){
        	$.alertPlus("服务忙，请稍后再试", 8, "提示");
        }
    });
	
});