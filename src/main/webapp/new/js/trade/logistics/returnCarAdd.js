$(function() {

	var senderAddress = {
		id : "senderAddressSelect", // 要使用弹出层选择省市区功能的input文本框ID
		countySync : true, // true:根据城市ID查询区县; false: 一次性查询所有区县
		isShowProvince : false, // 选择省份后是否立即显示到文本框
		isShowCity : true, // 选择城市后是否立即显示到文本框
		proId : $("#senderProvinceId"),
		proName : $("#senderProvince"),
		cityId : $("#senderCityId"),
		cityName : $("#senderCity"),
		countyId : $("#senderCountyId"),
		countyName : $("#senderCounty"),
		hotCityBack : function(data) {
			 $("#senderAddressSelect").valid();
		},
		proBack : function(data) {
			 $("#senderAddressSelect").valid();
			 $("#senderCountyId").val("");
			 $("#senderCounty").val("");	 
		},
		cityBack : function(data) {
			 $("#senderAddressSelect").valid();
			 $("#senderCountyId").val("");
			 $("#senderCounty").val("");
		},
		countyBack : function(data) {
			 $("#senderAddressSelect").valid();
		}
	};
	new $.district(senderAddress).init();

	var receiverAddress = {
		id : "receiverAddressSelect", // 要使用弹出层选择省市区功能的input文本框ID
		countySync : true, // true:根据城市ID查询区县; false: 一次性查询所有区县
		isShowProvince : false, // 选择省份后是否立即显示到文本框
		isShowCity : true, // 选择城市后是否立即显示到文本框
		proId : $("#receiverProvinceId"),
		proName : $("#receiverProvince"),
		cityId : $("#receiverCityId"),
		cityName : $("#receiverCity"),
		countyId : $("#receiverCountyId"),
		countyName : $("#receiverCounty"),
		hotCityBack : function(data) {
			 $("#receiverAddressSelect").valid();
		},
		proBack : function(data) {
			 $("#receiverAddressSelect").valid();
			 $("#receiverCountyId").val("");
			 $("#receiverCounty").val("");	
		},
		cityBack : function(data) {
			 $("#receiverAddressSelect").valid();
			 $("#receiverCountyId").val("");
			 $("#receiverCounty").val("");
		},
		countyBack : function(data) {
			 $("#receiverAddressSelect").valid();
		}
	};
	new $.district(receiverAddress).init();

	$(".numInput").trigger("blur");

	//保存按钮
	$("#saveBtn").live("click", function(){
		if(!dateValidate()){
			$.alertPlus("开始日期不能晚于结束日期！", 2, "提示");
			return false;
		}
		if(!$("#saveReturnCarForm").valid()){
			return false;
		}
		//去掉所有文本框里两边的空格
//		$("input").each(function(){
//			$(this).val($.trim($(this).val()));
//		});
		//处理金额数据
		$(".numInput").each(function(){
			$(this).val(NumInput.getValue($(this)));
		});
		
		if (!($("input[name='tradeTransportReturn.carloadPriceCheckBox']").is(
		":checked"))) {
			$("#carloadPriceInput").val("");
		}
		//组货方式
		 var groups ="";
		$("#goodsOrgInfo").find("input[type ='checkbox']").each(function(){
			if($(this).attr("checked")=="checked"){
				groups = groups + $(this).val() + ",";  
		    }
		});
		$("#goodsGroupId").val(groups);
		//增值服务
		var valueAdded = "";
		$("#addedServices").find("input[type ='checkbox']").each(function(){
			if($(this).attr("checked")=="checked"){
				valueAdded = valueAdded + $(this).val() + ",";  
		    }
		});
		$("#valueAddedServices").attr("value",valueAdded);
		
		//车辆类型
		var vehicleTypeCode = "";
		vehicleTypeCode = $("#").value;
		
		//效验文件上传
//		validateFileUpload($("logoFileid").value);
		
		$("#saveReturnCarForm").ajaxSubmit({
			url: "saveTradeTransportReturn.do",
			type: "post",
			dataType: "json",
			async: false,
			beforeSend: function(){
				$("#saveBtn").attr("disabled", "disabled");
			},
			success: function(data){
				$.alertPlus("操作成功", 1, "提示");
				$("#saveBtn").removeAttr("disabled");
				location.href = "initListTradeTransportReturn.do";
			},
			error: function(err){
				$.alertPlus("保存操作出错！", 2, "提示");
			}
		});
	});

	//编辑按钮
	$("#editBtn").live("click", function(){
		if(!dateValidate()){
			$.alertPlus("开始日期不能晚于结束日期！", 2, "提示");
			return false;
		}
		if(!$("#editReturnCarForm").valid()){
			return false;
		}
			
//		//去掉所有文本框里两边的空格
//		$("input").each(function(){
//			$(this).val($.trim($(this).val()));
//		});
		
		//处理金额数据
		$(".numInput").each(function(){
			$(this).val(NumInput.getValue($(this)));
		});
		
		if (!($("input[name='tradeTransportReturn.carloadPriceCheckBox']").is(
		":checked"))) {
			$("#carloadPriceInput").val("");			
		}
		
		//组货方式
		 var groups ="";
		$("#goodsOrgInfo").find("input[type ='checkbox']").each(function(){
			if($(this).attr("checked")=="checked"){
				groups = groups + $(this).val() + ",";  
		    }
		});
		$("#goodsGroupId").val(groups);
		
		//增值服务
		var valueAdded = "";
		$("#addedServices").find("input[type ='checkbox']").each(function(){
			if($(this).attr("checked")=="checked"){
				valueAdded = valueAdded + $(this).val() + ",";  
		    }
		});
		$("#valueAddedServices").attr("value",valueAdded);
		
		//车辆类型
		var vehicleTypeCode = "";
		vehicleTypeCode = $("#").value;
		
		$("#editReturnCarForm").ajaxSubmit({
			url: "editTradeTransportReturn.do",
			type: "post",
			dataType: "json",
			async: false,
			beforeSend: function(){
				$("#editBtn").attr("disabled", "disabled");
			},
			success: function(data){
				$.alertPlus("操作成功", 1, "提示");
				$("#editBtn").removeAttr("disabled");
				location.href = "initListTradeTransportReturn.do";
			},
			error: function(err){
				$.alertPlus("编辑操作出错！", 2, "提示");
			}
		});
	});
});

/**
 * 校验表单信息
 */

$("#saveReturnCarForm").validate({
	rules:{
		"tradeTransportReturn.name":{
			required : true,
			rangelength : [ 1, 60 ],
			toFilter : true
		},
		"tradeTransportReturn.startDate":{
			required : true,
			dateISO: true
		},
		"tradeTransportReturn.endDate":{
			required : true,
			dateISO: true
		},
		"tradeTransportReturn.beginName":{
			required : true,
			toFilter : true
		},
		"tradeTransportReturn.endName":{
			required : true,
			toFilter : true			
		},
		"tradeTransportReturn.returnComment":{
			toFilter : true,
			rangelength : [ 0, 120 ]
		},
		"tradeTransportReturn.vehicleTypeCode":{
			required : true
		},
		"tradeTransportReturn.weightGoodsPrice":{
			required : true
		},
//		"tradeTransportReturn.weightGoodsUnit":{
//			required : true			
//		},
		"tradeTransportReturn.lightGoodsPrice":{
			required : true		
		},
		"tradeTransportReturn.lastGoodsPrice":{
			required : true
		}
	},
	messages:{
		"tradeTransportReturn.name":{
			required : "请输入名称！",
			rangelength : "请输入正确的名称，长度为{0}-{1}个字符！",
			toFilter : "请输入正确的名称，勿包含特殊字符！"
		},
		"tradeTransportReturn.startDate":{
			required : "请选择日期！",
			dateISO : "请选择正确的日期！"
		},
		"tradeTransportReturn.endDate":{
			required : "请选择日期！",
			dateISO : "请选择正确的日期！"
		},
		"tradeTransportReturn.beginName":{
			required : "请选择出发地址！",
			toFilter : "请选择正确的出发地址！"
		},
		"tradeTransportReturn.endName":{
			required : "请选择到达地址！",
			toFilter : "请选择正确的到达地址！"		
		},
		"tradeTransportReturn.returnComment":{
			toFilter : "请输入正确的回程描述，勿包含特殊字符！",
			rangelength : "请输入正确的回程描述，长度为{0}-{1}个字符！"
		},
		"tradeTransportReturn.vehicleTypeCode":{
			required : "请选择车辆类型！"
		},
		"tradeTransportReturn.weightGoodsPrice":{
			required : "请输入重货价格！"
		},
//		"tradeTransportReturn.weightGoodsUnit":{
//			required : "请选择重货价格单位！"			
//		},
		"tradeTransportReturn.lightGoodsPrice":{
			required : "请输入轻货价格！"	
		},
		"tradeTransportReturn.lastGoodsPrice":{
			required : "请输入最低一票价格！"			
		}
	}
	
});


$("#editReturnCarForm").validate({
	rules:{
		"tradeTransportReturn.name":{
			required : true,
			rangelength : [ 1, 60 ],
			toFilter : true
		},
		"tradeTransportReturn.startDate":{
			required : true,
			dateISO: true
		},
		"tradeTransportReturn.endDate":{
			required : true,
			dateISO: true
		},
		"tradeTransportReturn.beginName":{
			required : true,
			toFilter : true
		},
		"tradeTransportReturn.endName":{
			required : true,
			toFilter : true			
		},
		"tradeTransportReturn.returnComment":{
			toFilter : true,
			rangelength : [ 0, 120 ]
		},
		"tradeTransportReturn.vehicleTypeCode":{
			required : true
		},
		"tradeTransportReturn.weightGoodsPrice":{
			required : true
		},
//		"tradeTransportReturn.weightGoodsUnit":{
//			required : true			
//		},
		"tradeTransportReturn.lightGoodsPrice":{
			required : true		
		},
		"tradeTransportReturn.lastGoodsPrice":{
			required : true
		}
	},
	messages:{
		"tradeTransportReturn.name":{
			required : "请输入名称！",
			rangelength : "请输入正确的名称，长度为{0}-{1}个字符！",
			toFilter : "请输入正确的名称，勿包含特殊字符！"
		},
		"tradeTransportReturn.startDate":{
			required : "请选择日期！",
			dateISO : "请选择正确的日期！"
		},
		"tradeTransportReturn.endDate":{
			required : "请选择日期！",
			dateISO : "请选择正确的日期！"
		},
		"tradeTransportReturn.beginName":{
			required : "请选择出发地址！",
			toFilter : "请选择正确的出发地址！"
		},
		"tradeTransportReturn.endName":{
			required : "请选择到达地址！",
			toFilter : "请选择正确的到达地址！"		
		},
		"tradeTransportReturn.returnComment":{
			toFilter : "请输入正确的回程描述，勿包含特殊字符！",
			rangelength : "请输入正确的回程描述，长度为{0}-{1}个字符！"
		},
		"tradeTransportReturn.vehicleTypeCode":{
			required : "请选择车辆类型！"
		},
		"tradeTransportReturn.weightGoodsPrice":{
			required : "请输入重货价格！"
		},
//		"tradeTransportReturn.weightGoodsUnit":{
//			required : "请选择重货价格单位！"			
//		},
		"tradeTransportReturn.lightGoodsPrice":{
			required : "请输入轻货价格！"	
		},
		"tradeTransportReturn.lastGoodsPrice":{
			required : "请输入最低一票价格！"			
		}
	}
	
});

/**
 * @author doraliu 调整整车价格必填还是选填。
 */
function adjustStar() {
	// 判断整车价格是否已经打勾
	if ($("input[name='tradeTransportReturn.carloadPriceCheckBox']").is(
			":checked")) {
		$("#carloadPriceInput").attr('readonly', false);
		$("#carloadPriceStar").show();
	} else {
		$("#carloadPriceInput").val(0);
		$("#carloadPriceInput").attr('readonly', true);
		$("#carloadPriceStar").hide();
	}
}

function vehicleChoosingCallback(){
	$("#vehicleTypeCode").valid();
}

function validateFileUpload(value) {	
    var FileUploadPath = value;
    if (FileUploadPath == '') {
        // There is no file selected 
        isValid = false;
    }else {
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" ||  Extension == "jpg") {
        	isValid = true; // Valid file type
            FileUploadPath == '';
        }
        else {
        	isValid = false; // Not valid file type
        }
    }
    
    if(!isValid){    	
    	var msg = "请选择合适的图片文件(gif, png, bmp, jpeg)!";
//    	$("#vehiclePhoto").val("");
    	alert(msg);
    }
    
    return isValid;
}

function uploadImg(obj){
	if(!validateFileUpload(obj.value)){
		return false;
	};
	document.getElementById("vehiclePhoto").value=obj.value; 
}

//图片处理算法
function image_download_clip(img_url, dst_width, dst_height, container_id) {
	var img = new Image();
	img.onload = function() {
		$("#" + container_id + " img").attr("src", img.src);// dst_img_container

		// 原图尺寸
		var src_image_width = img.width;
		var src_image_height = img.height;

		var display_width = dst_width;
		var display_height = dst_height;
		if (display_width <= 0 || display_height <= 0
				|| src_image_width <= 0 || src_image_height <= 0) {
			return;
		}

		// height归一化，求width
		var normal_image_width = src_image_width / src_image_height;
		var normal_display_width = display_width / display_height;

		// 比较normal_width，求缩放率
		var scale = display_height / src_image_height;
		if (normal_image_width < normal_display_width) {// 原图归一化后width不够，以width为准进行缩放
			scale = display_width / src_image_width;
		}

		// 目标图像尺寸
		var dst_image_width = src_image_width * scale;
		var dst_image_height = src_image_height * scale;

		// 计算居中平移量
		var dst_image_offset_left = (dst_image_width - display_width) / 2.0;
		var dst_image_offset_top = (dst_image_height - display_height) / 2.0;

		// 缩放、平移
		$("#" + container_id).width(display_width);
		$("#" + container_id).height(display_height);
		$("#" + container_id + " img").width(dst_image_width);
		$("#" + container_id + " img").height(dst_image_height);
		$("#" + container_id + " img").css(
				"margin",
				"-" + dst_image_offset_top + "px 0px 0px -"
						+ dst_image_offset_left + "px");
	};
	img.src = img_url;
}

//设置图片
function setImages() {
	var $allVehicleImagesElements = $(".vehicle_img");
	var id = $allVehicleImagesElements.attr("id");
	var _id = $allVehicleImagesElements.attr("_id");
	try{		
		image_download_clip(_id, 177, 106, id);
	}catch(e){
		alert(e);
	}
}
setImages();

function replacePhoto(){
	document.getElementById('vehiclePhoto').value = ''; 
	document.getElementById('logoFileid').value = '';
	//打开photofilebox
	$("#photofilebox").show();
	//隐藏
	$("#album").hide();
	
}

function resetPhoto(){
	document.getElementById('vehiclePhoto').value = 'defaultReturnCar'; 
	document.getElementById('logoFileid').value = '';
	//打开photofilebox
	$("#photofilebox").show();
	//隐藏
	$("#album").hide();
}

function dateValidate(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	return startDate <= endDate;
}