function selectedPic(currInput){
	document.getElementById('textfield').value=currInput.value;
	setImagePreview('imgFile', 'oldPic', 'localImg');
}

/**
 * 图片预览
 * @param {Object} fileObj 上传文件
 * @param {Object} previewObj 预览图片的img
 * @param {Object} localImg 图片外面的层
 * @return {TypeName} 
 */
function setImagePreview(fileObj,previewObj,localImg) {
    var docObj=document.getElementById(fileObj);
    var imgObjPreview=document.getElementById(previewObj);
    if(docObj.files && docObj.files[0]){
        //火狐下，直接设img属性
        imgObjPreview.style.display = 'block';
        imgObjPreview.style.width = '250px';
        imgObjPreview.style.height = '250px';
        //imgObjPreview.src = docObj.files[0].getAsDataURL();

        //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式  
        imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
    }else{
        //IE下，使用滤镜
        docObj.select();
        var imgSrc = document.selection.createRange().text;
        var localImagId = document.getElementById(localImg);
        //必须设置初始大小
        localImagId.style.width = "250px";
        localImagId.style.height = "250px";
        //图片异常的捕捉，防止用户修改后缀来伪造图片
        try{
            localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
        }catch(e){
            alert("您上传的图片格式不正确，请重新选择!");
            return false;
        }
        imgObjPreview.style.display = 'none';
        document.selection.empty();
    }
    return true;
}

function reset_data(pre){
	window.location.href="setAccount.do";
}


var cropzoom;
var cropzoom_width = 405;
var cropzoom_height = 305;
function uploadImg(obj){
	var formObj = $(obj).parents(".uploadImgForm");
	var img = /.(jpg|jpeg|png|bmp|JPG|JPEG|PNG|BMP)$/;
	var imgUrl = $("#headFile").val();
	if(imgUrl==""|| imgUrl=="undefined" || imgUrl==undefined){
		return;
	}
	if(!img.test(imgUrl)){
		$.alertPlus("图片格式不正确!",2,"提示");
		return;
	}
	//$("#headImg").val(imgUrl);
	$("#fileType").val(imgUrl.substr(imgUrl.lastIndexOf(".")));
	var basePath = $("#basePath").val();
	formObj.ajaxSubmit({
		url: basePath+'info/infoUploadImg.do',
		type: 'post',
		dataType: 'json',
		success: function(data){
//			data = JSON.parse(data);
			if(data.msg == "success"){
				var a = new Date().getTime();
				formObj.find("#imgTarget").attr("src", data.filePath + "?a=" + a).attr("rel", data.filePath + "?a=" + a);
				formObj.find("#imgTr").show();
				var width = parseInt(formObj.find(".width").val());
				var height = parseInt(formObj.find(".height").val());
				//如果上传图片的长宽大小比建议的长宽小，则给予提示
				if(data.width < width || data.height < height){
					$.alertPlus("您选择的图片尺寸太小，请上传不小于建议长宽的图片！", 9, "提示");
					return false;
				}
				
				cropzoom = formObj.find("#img_view").cropzoom({ 
					width: cropzoom_width, 
					height: cropzoom_height, 
					bgColor: '#ccc', 
					enableRotation: false, 
					enableZoom: true, 
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
				//$(".ui-draggable").css("position","static");
//				initJcrop(formObj);
				//parent.dyniframesize();
			} else{
				$.alertPlus(data.msg, 2, "提示");
			}
		},
		error: function(err){
			$.alertPlus("操作失败!请注意检查图片大小是否超过限制!", 2, "提示");
		}
	});
}

function cutImg(){
	if($("#headImg").val()==undefined || $("#headImg").val()=="undefined" || $("#headImg").val()==""){
		$.alertPlus("请先上传图片！", 9, "提示");
		return false;
	}
	var formObj = $("#uploadImgForm");
	var basePath = $("#basePath").val();
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
		url: basePath+'info/infoCutImg.do',
		type: 'post',
		dataType: 'json',
		cache:false,
		async:false,
		success: function(data){
			if(data.msg == "success"){
				$.alertPlus("上传图片成功！", 1, "提示");
				$("#oldHeadImg").attr("src",".."+data.resultHeadImgUrl);
			} else{
				$.alertPlus(data.msg, 2, "提示");
			}
		},
		error: function(data){
			$.alertPlus("裁剪后上传图片出错！", 2, "提示");
		}
	});
}

function bigger(){
	cropzoom.image.width++;
	cropzoom.image.height++;
}

function littler(){
	cropzoom.image.width--;
	cropzoom.image.height--;
}
