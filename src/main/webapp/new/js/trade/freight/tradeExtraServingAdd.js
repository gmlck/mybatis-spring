$(document).ready(function(){
	addValidate();
	var servingPriceType = $("#typePrice").val();
	if(servingPriceType!=null && servingPriceType!=""){
		if(servingPriceType == 2){
			$("#typePrice").next().next().children().attr("checked","checked");
			$("#unit").text("元");
		}else{
			$("#unit").text("%");
			sureRate(); 
		}
	}
	if($("#SERVING_PRICE_TYPE1").attr("checked")=="checked"){
		sureRate();
	}
	var servingType = $("#servingType").val();
	if(servingType !=null && servingType!=""){
		$("#typeName").text("编辑增值业务");
		if(servingType == "TRANSPORT_VALUEADDED_BASIC_RECEIPT"){
			$("#spvr").addClass("display_none");
			$("#servingPriceValue").attr("value","");
			$("#SERVING_TYPE_004").removeClass("display_none");
			if($("#signOriginalValue").val() == "" || $("#signOriginalValue").val() == null){
				$("#signOriginalValueRule").click();
				$("#signOriginalValue").addClass("text_disable");
				$("#signOriginalValue").attr("readonly","readonly");
			}
			if($("#signFaxValue").val() == "" || $("#signFaxValue").val() == null){
				$("#signFaxValueRule").click();
				$("#signFaxValue").addClass("text_disable");
				$("#signFaxValue").attr("readonly","readonly");
			}
			if($("#signLinkingValue").val() == "" || $("#signLinkingValue").val() == null){
				$("#signLinkingValueRule").click();
				$("#signLinkingValue").addClass("text_disable");
				$("#signLinkingValue").attr("readonly","readonly");
			}
			parent.dyniframesize();
		}
		if(servingType != "TRANSPORT_VALUEADDED_BASIC_COLLECTION" && servingType != "TRANSPORT_VALUEADDED_BASIC_INSURED"){
			$("#SERVING_PRICE_TYPE1").attr("disabled",true);
			$("#SERVING_PRICE_TYPE2").click();
		}else{
			$("#SERVING_PRICE_TYPE1").removeAttr("disabled");
		}
		if($("#servingPriceValue").val() == ""|| $("#servingPriceValue").val() == null){
			$("#servingPriceValueRule").click();
			$("#servingPriceValue").addClass("text_disable");
			$("#servingPriceValue").attr("readonly","readonly");
		}
	}
});
$("#SERVING_PRICE_TYPE1").live("click", function(){
	$("#unit").text("%")
	removeLabel();
	sureRate();
});
$("#SERVING_PRICE_TYPE2").live("click", function(){
	$("#unit").text("元")
	removeLabel();
	surePrice();
});
function removeLabel(){
	$("#servingPriceValue").next("label").remove();
}
function surePrice(){
	if($("#servingType").val() != "TRANSPORT_VALUEADDED_BASIC_RECEIPT"){
		$("#servingPriceValue").rules("remove");
			$("#servingPriceValue").rules('add',{  
			    servingPriceValue:true,
				servingPriceValueRule:true, 
				max:99999999.99,
			    messages:{  
			        servingPriceValue: "请输入计价额度！",  
			        servingPriceValueRule:"请输入正数！",
					max:"输入范围{0~99999999.99}"
		    }  
		}); 
	}
}
function sureRate(){
	var servingType = $("#servingType").val();
	if(servingType != "TRANSPORT_VALUEADDED_BASIC_COLLECTION" && servingType != "TRANSPORT_VALUEADDED_BASIC_INSURED" && servingType !=null && servingType !=""){
//			$("#SERVING_PRICE_TYPE1").rules('add',{  
//				servingPriceType:true, 
//			    messages:{  
//			        servingPriceType:"计价方式请选择按价格！"
//		    }  
//		});
		$("#SERVING_PRICE_TYPE2").click();
	}else{
		$("#servingPriceValue").rules("remove");
		$("#servingPriceValue").rules('add',{  
		    servingPriceValue:true,
			servingPriceValueHund:true, 
		    messages:{  
		        servingPriceValue: "请输入计价额度！",  
		        servingPriceValueHund:"介于0~100之间的正数！"
	    }  
	});
	}
}
/**
 * 清空回收单中的值
 */
function removeValue(){
	$("#SERVING_TYPE_004").find(".width295").each(function(){
		$(this).attr("value","");
	});
}
/**
 * 大文本输入框
 */
var productEditor;
KindEditor.options.cssData = 'body { font-size: 12px; font-family: "微软雅黑"; color: #666666; }';
KindEditor.ready(function(K) {
	productEditor = K.create('textarea[name="tradeExtraServing.servingProduce"]', {
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
/**
 * 业务名称点击事件
 */
function toServingType(){
	var servingType = $("#servingType").val();
	if(servingType !=null && servingType !=""){
		var labelEr = $("#servingType").next("label").text();
		if(labelEr == "请选择业务名称！"){
			$("#servingType").next("label").remove();
		}
	}
	if(servingType == "TRANSPORT_VALUEADDED_BASIC_RECEIPT"){
		$("#spvr").addClass("display_none");
		$("#SERVING_TYPE_004").removeClass("display_none");
		$('#servingPriceValue').rules('remove');
		$("#servingPriceValue").attr("value","");
		$('#signOriginalValue').rules('add',{  
		    signOriginalValue: true,
			signOriginalValueRule: true,
			max:99999999.99,  
		    messages:{  
		        signOriginalValue: "请输入原件价格！",
				signOriginalValueRule: "请输入正数！",
				max:"输入范围{0~99999999.99}" 
		    }  
		}); 
		$('#signFaxValue').rules('add',{  
		    signFaxValue: true,
			signFaxValueRule: true,  
			max:99999999.99,  
		    messages:{  
		        signFaxValue: "请输入传真价格！",
				signFaxValueRule: "请输入正数！" ,
				max:"输入范围{0~99999999.99}"
		    }  
		});
		$('#signLinkingValue').rules('add',{  
			signLinkingValueRule: true,  
			max:99999999.99,
		    messages:{  
				signLinkingValueRule: "请输入正数！",
				max:"输入范围{0~99999999.99}"
		    }  
		}); 
		parent.dyniframesize();
	}else{
		$("#spvr").removeClass("display_none");
		$("#SERVING_TYPE_004").addClass("display_none");
		$('#signOriginalValue').rules('remove');
		$('#signFaxValue').rules('remove');
		$('#signLinkingValue').rules('remove');
		$('#servingPriceValue').rules('add',{  
		   	servingPriceValue:true,
			servingPriceValueRule:true, 
			max:99999999.99,
		    messages:{  
		        servingPriceValue:"请输入计价额度！",
				servingPriceValueRule:"请输入正数！",
				max:"输入范围{0~99999999.99}"
		    }  
		}); 
		removeValue();
		parent.dyniframesize();
	}
	if(servingType != "TRANSPORT_VALUEADDED_BASIC_COLLECTION" && servingType != "TRANSPORT_VALUEADDED_BASIC_INSURED" && servingType !=null && servingType !=""){
		$("#SERVING_PRICE_TYPE1").attr("disabled",true);
		$("#SERVING_PRICE_TYPE2").click();
	}else{
		$("#SERVING_PRICE_TYPE1").removeAttr("disabled");
	}
}
/**
 * 提交表单 addOrUpdate新业务
 */
$(".btn_yellow").live("click", function(){
	$("#servingProduce").val(productEditor.html());
	if(!$("#addOrUpdateForm").valid()){
		return false;
	}else{
		var text = productEditor.text();
//		alert(text);
		if(!productEditor.text()){
			$.alertPlus("请填写业务介绍！", 9, "提示");
			return false;
		}
		else if(toFilter.test(text)){
			$.alertPlus("请填写正确的业务介绍，勿包含特殊字符！", 9, "提示");
			return false;
		}
		else{
			var flag = false;
			if($("#servingId").val()!=null && $("#servingId").val()!= "" ){
				$("#addOrUpdateForm").attr("action","renjia/addOrUpdate.do?tradeExtraServing.id="+$("#servingId").val());
				flag = true;
			}
			if(flag){
				$.alertPlus("增值业务编辑成功！", 9, "提示", function(index){//点击后再跳转
					$("#addOrUpdateForm").submit();
					$.closePlus(index);
				});
			}else{
				$.alertPlus("增值业务添加成功！", 9, "提示", function(index){//点击后再跳转
					$("#addOrUpdateForm").submit();
					$.closePlus(index);
				});
			}
		}
	}
});
function addValidate(){
	/**
	 * 表单验证
	 */
	$("#addOrUpdateForm").validate({
		rules:{
			"tradeExtraServing.servingType": {
				required:true,
				servingType:true
			},
			"tradeExtraServing.servingPriceValue": {
				servingPriceValue:true,
				servingPriceValueRule:true,
				max:99999999.99
			}
		},
		messages:{
			"tradeExtraServing.servingType": {
				required:"请选择业务名称！",
				servingType:"该业务已存在,不可重复添加！"
			},
			"tradeExtraServing.servingPriceValue": {
				servingPriceValue:"请输入计价额度！",
				servingPriceValueRule:"请输入正数！",
				max:"输入范围{0~99999999.99}"
			}
		}
	});
}
/**
 * 计价金额复选框点击事件
 */
$("#servingPriceValueRule").live("click", function(){
	if($(this).attr("checked") == "checked"){
		$("#servingPriceValue").rules("remove");
		$(this).parent().children("label").remove();
		$("#servingPriceValue").attr("value","");
		$("#servingPriceValue").addClass("text_disable");
		$("#servingPriceValue").attr("readonly","readonly");
	}else{
		$("#servingPriceValue").rules('add',{  
		    servingPriceValue:true,
			servingPriceValueRule:true,
			max:99999999.99, 
		    messages:{  
		        servingPriceValue: "请输入计价额度！",  
		        servingPriceValueRule: "请输入正数！",
				max:"输入范围{0~99999999.99}"
		    }  
		}); 
		if($("#SERVING_PRICE_TYPE1").attr("checked") == "checked"){
			$("#servingPriceValue").rules("remove");
				$("#servingPriceValue").rules('add',{  
					servingPriceValue:true,
					servingPriceValueRule:true, 
					servingPriceValueHund:true,
			    messages:{  
					servingPriceValue: "请输入计价额度！",  
			        servingPriceValueRule: "请输入正数！",
			    	servingPriceValueHund:"介于0~100之间的正数！"
			    }  
		});
		}
		$("#servingPriceValue").removeClass("text_disable");
		$("#servingPriceValue").removeAttr("readonly");
	}
});
/**
 * 回收单签收原件的复选框的点击事件
 */
$("#signOriginalValueRule").live("click", function(){
	if($(this).attr("checked") == "checked"){
		$("#signOriginalValue").rules("remove");
		$(this).parent().children("label").remove();
		$("#signOriginalValue").attr("value","");
		$("#signOriginalValue").addClass("text_disable");
		$("#signOriginalValue").attr("readonly","readonly");
	}else{
		$("#signOriginalValue").rules('add',{  
		    signOriginalValue:true,
			signOriginalValueRule:true, 
			max:99999999.99, 
		    messages:{  
		        signOriginalValue: "请输入原件单据价格！",  
		        signOriginalValueRule: "请输入正数！",
				max:"输入范围{0~99999999.99}"
		    }  
		}); 
		$("#signOriginalValue").removeClass("text_disable");
		$("#signOriginalValue").removeAttr("readonly");
	}
});
/**
 * 传真单据的复选框的点击事件
 */
$("#signFaxValueRule").live("click", function(){
	if($(this).attr("checked") == "checked"){
		$("#signFaxValue").rules("remove");
		$(this).parent().children("label").remove();
		$("#signFaxValue").attr("value","");
		$("#signFaxValue").addClass("text_disable");
		$("#signFaxValue").attr("readonly","readonly");
	}else{
		$("#signFaxValue").rules('add',{  
		    signFaxValue:true,
			signFaxValueRule:true,
			max:99999999.99, 
		    messages:{  
		        signFaxValue: "请输入传真单据价格！",  
		        signFaxValueRule: "请输入正数！",
				max:"输入范围{0~99999999.99}"
		    }  
		}); 
		$("#signFaxValue").removeClass("text_disable");
		$("#signFaxValue").removeAttr("readonly");
	}
});
/**
 * 运单签收联复选框的点击事件
 */
$("#signLinkingValueRule").live("click", function(){
	if($(this).attr("checked") == "checked"){
		$("#signLinkingValue").rules("remove");
		$(this).parent().children("label").remove();
		$("#signLinkingValue").attr("value","");
		$("#signLinkingValue").addClass("text_disable");
		$("#signLinkingValue").attr("readonly","readonly");
	}else{
		$("#signLinkingValue").rules('add',{  
			signLinkingValueRule:true, 
			max:99999999.99, 
		    messages:{  
		        signFaxValueRule: "请输入正数！",
				max:"输入范围{0~99999999.99}"
		    }  
		}); 
		$("#signLinkingValue").removeClass("text_disable");
		$("#signLinkingValue").removeAttr("readonly");
	}
});
jQuery.validator.addMethod("servingPriceValueHund",function(){
	return testFormatHund("servingPriceValue");
},"请输入正数！");
/**
 * 验证当前业务是否已经添加过
 */
jQuery.validator.addMethod("servingType",function(){
	var id = $("#servingId").val();
	var servingType = $("#servingType").val();
	var flag = false;
	$.ajax({
		url: "renjia/existOrNot.do",
		type: "post",
		data: {"tradeExtraServing.servingType" : servingType,"tradeExtraServing.id":id},
		dataType: "json",
		async: false,
		success: function(result){
			if(result.message == "true"){
//				var labelEr = $("#servingType").next("label").text();
//				alert(labelEr)
//				if(labelEr == "该业务已存在,不可重复添加！"){
//					$("#servingType").next("label").remove();
//				}
				flag = true;
			}else{
				flag = false;
			}
		},
		error: function(data) {
			$.alertPlus("网络繁忙，请稍后再试！", 8, "提示");
		}
	});
	return flag;
},"现有业务不能重复添加！");
/**
 * 运单签收联的检验方式
 */
jQuery.validator.addMethod("signLinkingValueRule",function(){
	if(getFlag()){
		return true;
	}else{
		return testFormat("signLinkingValue");
	}
},"请输入正数！");
/**
 * 传真单价格非空校验
 */
jQuery.validator.addMethod("signFaxValue",function(){
	if(getFlag()){
		return true;
	}else{
		return notNull("signFaxValue");
	}
},"请输入原件价格！");
/**
 * 传真单的价格的格式的校验
 */
jQuery.validator.addMethod("signFaxValueRule",function(){
	if(getFlag()){
		return true;
	}else{
		return testFormat("signFaxValue");
	}
},"请输入正数！");
/**
 * 运单原价你的非空的校验
 */
jQuery.validator.addMethod("signOriginalValue",function(){
	if(getFlag()){
		return true;
	}else{
		return notNull("signOriginalValue");
	}
},"请输入原件价格！");
/**
 *运单原件的价格的格式的校验 
 */
jQuery.validator.addMethod("signOriginalValueRule",function(){
	if(getFlag()){
		return true;
	}else{
		return testFormat("signOriginalValue");
	}
},"请输入正数！");
/**
 * 计价金额格式的校验
 */
jQuery.validator.addMethod("servingPriceValueRule",function(){
	return testFormat("servingPriceValue");
},"请输入正数！");
/**
 * 计价金额的非空值的校验
 */
jQuery.validator.addMethod("servingPriceValue",function(){
	return notNull("servingPriceValue");
},"请输入计价额度！");
function testFormatHund(id){
	var check = $("#"+id+"Rule").attr("checked");
	if(check == "checked"){
		$("#"+id).attr("value","");
		return true;
	}else{
		if(id=="signLinkingValue" && ($("#signLinkingValue").val() == "" || $("#signLinkingValue").val() == null)){
			return true;
		}else{
			var reg=/^([0-9]|[0-9]\.\d+|[1-9][0-9]|[1-9][0-9]\.\d+|100)$/;
			return reg.test($("#"+id).val());
		}
	}
}
function testFormat(id){
	var check = $("#"+id+"Rule").attr("checked");
	if(check == "checked"){
		$("#"+id).attr("value","");
		return true;
	}else{
		if(id=="signLinkingValue" && ($("#signLinkingValue").val() == "" || $("#signLinkingValue").val() == null)){
			return true;
		}else{
			var reg=/^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
			return reg.test($("#"+id).val());
		}
	}
}
function notNull(id){
	var check = $("#"+id+"Rule").attr("checked");
	if(check == "checked"){
		return true;
	}else{
		if($("#"+id).val() == ""){
			return false;
		}else{
			return true;
		}
	}
}
function getFlag(){
	var SERVING_TYPE_004 = $("#SERVING_TYPE_004").attr("class")
	if(SERVING_TYPE_004 == "display_none"){
		return true;
	}else{
		return false;
	}
}
jQuery.validator.addMethod("servingPriceType",function(){
	return false;
},"仅能按价格操作！");