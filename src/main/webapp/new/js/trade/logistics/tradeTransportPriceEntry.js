$(document).ready(function(){
	$("#priceInfo .carloadCoupon, #priceInfo .couponInput").each(function(){
		if($(this).val()){
			//必须先把复选框设为选中再触发click事件，不然修改时数据会被清空
			//先把复选框设为选中，然后触发click事件改变效果，但click会去掉复选框的选中状态，所以再设置一下复选框被选中
			$("#couponSwitch").attr("checked", true).trigger("click").attr("checked", true);
		}
	});
	$("#priceInfo .discountInput").each(function(){
		if($(this).val()){
			$("#discountSwitch").attr("checked", true).trigger("click").attr("checked", true);
		}
	});
	
	var beginAddressName = {
 		id : "beginAddressName", //要使用弹出层选择省市区功能的input文本框ID
 		countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
 		isShowProvince : false, //选择省份后是否立即显示到文本框
 		isShowCity : true, //选择城市后是否立即显示到文本框
 		proId : $("#beginProvinceId"),
		proName : $("#beginProvinceName"),
		cityId : $("#beginCityId"),
		cityName : $("#beginCityName"),
		countyId : $("#beginCountyId"),
		countyName : $("#beginCountyName"),
		hotCityBack: function(data){
			try{$("#beginAddressName").valid();} catch(e){}
		},
		proBack: function(data){
			try{$("#beginAddressName").valid();} catch(e){}
			$("#beginCountyCode").val("");
			$("#beginCountyName").val("");
		},
		cityBack: function(data){
			$("#beginProvinceCode").val(data.proCode);
			$("#beginCityCode").val(data.cityCode);
			$("#beginCountyCode").val("");
			$("#beginCountyName").val("");
			try{$("#beginAddressName").valid();} catch(e){}
		},
		countyBack: function(data){
			$("#beginProvinceCode").val(data.proCode);
			$("#beginCityCode").val(data.cityCode);
			$("#beginCountyCode").val(data.countyCode);
			try{$("#beginAddressName").valid();} catch(e){}
		}
 	};
	new $.district(beginAddressName).init();
	
	var endAddressName = {
 		id : "endAddressName", //要使用弹出层选择省市区功能的input文本框ID
 		countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
 		isShowProvince : false, //选择省份后是否立即显示到文本框
 		isShowCity : true, //选择城市后是否立即显示到文本框
 		proId : $("#endProvinceId"),
		proName : $("#endProvinceName"),
		cityId : $("#endCityId"),
		cityName : $("#endCityName"),
		countyId : $("#endCountyId"),
		countyName : $("#endCountyName"),
		hotCityBack: function(data){
			try{$("#endAddressName").valid();} catch(e){}
		},
		proBack: function(data){
			try{$("#endAddressName").valid();} catch(e){}
			$("#endCountyCode").val("");
			$("#endCountyName").val("");
		},
		cityBack: function(data){
			$("#endProvinceCode").val(data.proCode);
			$("#endCityCode").val(data.cityCode);
			$("#endCountyCode").val("");
			$("#endCountyName").val("");
			try{$("#endAddressName").valid();} catch(e){}
		},
		countyBack: function(data){
			$("#endProvinceCode").val(data.proCode);
			$("#endCityCode").val(data.cityCode);
			$("#endCountyCode").val(data.countyCode);
			try{$("#endAddressName").valid();} catch(e){}
		}
 	};
	new $.district(endAddressName).init();
});

//优惠活动选框
$("#couponSwitch").live("click", function(){
	var checked = $(this).attr("checked");
	$("#discountSwitch").attr("checked", false);
	$("#priceInfo").find(".discountInput").attr("value", "");
	$("#priceInfo").find(".couponInput").attr("disabled", !checked);
	$("#priceInfo").find(".discountInput").attr("disabled", checked);
	if(!checked){
		$("#priceInfo").find(".couponInput").attr("value", "");
	}
	$("#carCheck").trigger("change");
	if(checked){
		$("#priceInfo").find(".couponInput").removeClass("text_disable");
		$("#priceInfo").find(".discountInput").addClass("text_disable");
	} else{
		$("#priceInfo").find(".couponInput").addClass("text_disable");
		$("#priceInfo").find(".discountInput").addClass("text_disable");
	}
});

//打折促销选框
$("#discountSwitch").live("click", function(){
	var checked = $(this).attr("checked");
	$("#couponSwitch").attr("checked", false);
	$("#priceInfo").find(".couponInput").attr("value", "");
	$("#priceInfo").find(".couponInput").attr("disabled", checked);
	$("#priceInfo").find(".discountInput").attr("disabled", !checked);
	if(!checked){
		$("#priceInfo").find(".discountInput").attr("value", "");
	}
	$("#carCheck").trigger("change");
	if(checked){
		$("#priceInfo").find(".couponInput").addClass("text_disable");
		$("#priceInfo").find(".discountInput").removeClass("text_disable");
	} else{
		$("#priceInfo").find(".couponInput").addClass("text_disable");
		$("#priceInfo").find(".discountInput").addClass("text_disable");
	}
});

//整车价格选框
$("#carCheck").live("change", function(){
	var carChecked = $(this).attr("checked");
	var couponChecked = $("#couponSwitch").attr("checked");
	if(carChecked){
		$("#carloadPrice").find("input").removeAttr("disabled").removeClass("text_disable");
		$("#carloadPrice").find(".carType").removeClass("text_disable");
		
		if(couponChecked){
			$("#carloadPrice").find(".carloadCoupon").removeAttr("disabled").removeClass("text_disable");
		} else{
			$("#carloadPrice").find(".carloadCoupon").attr("disabled", true).addClass("text_disable");
		}
		
		$("#addCarload").show();
		if($("#carloadPrice .carloadDiv").length > 1){
			$(".delOne").show();
		}
		$("#carloadPrice .carloadDiv .carloadPrice").next(".star").show();
		$("#carloadPrice .carloadDiv .carloadPrice").each(function(){
			$(this).attr("name", Math.random().toString()).rules("add", {
				required : true,
				number: true,
//				maxlength: 9,
				toFilter: true,
				messages: {
					required : "请输入整车价格！",
					number: "请输入数字！",
//					maxlength: "整车价格最多为{0}个字符！",
					toFilter: "请输入正确的整车价格！"
				}
			});
		});
		$("#carloadPrice .carloadDiv").each(function(){
			if(!$(this).find("#carloadType").val()){
				$(this).find(".carType ul li").eq(0).hide();
				$(this).find(".carType ul li").eq(1).trigger("click");
			}
			$(this).find(".carType").next(".star").show();
		});
	} else{
		$("#carloadPrice").find("input").attr("disabled", true).addClass("text_disable");
		$("#carloadPrice").find(".carType").addClass("text_disable");
		
		$("#addCarload").hide();
		$(".delOne").hide();
		
		$("#carloadPrice .carloadDiv").each(function(){
			$(this).find(".carloadPrice").attr("name", "").rules("remove");
			$(this).find(".carloadPrice").next(".error").remove();
			$(this).find(".carloadPrice").next(".star").hide();
			$(this).find(".carType").next(".star").hide();
		});
	}
	
	parent.dyniframesize();
});

//增加一个整车价格
$("#addCarload").live("click", function(){
	
	var carTypeCount = $("#carloadPrice .carType").eq(0).find(".list ul li").length - 1;
	var carloadPriceCount = $("#carloadPrice .carloadDiv").length;
//	if(carloadPriceCount >= carTypeCount){
	if(carloadPriceCount >= 5){
		return false;
	}
	
	var carContent = $("#carloadPrice .carloadDiv:last").outerHTML();
	$("#carloadPrice .carloadDiv:last").after(carContent);
	
	$(".delOne").show();
	
	var newInfo = $("#carloadPrice .carloadDiv:last");	
	newInfo.find("label.error").remove();
	newInfo.find("input").each(function(){
		$(this).val("");
	});
	newInfo.find(".carType ul li").eq(0).trigger("click");
	newInfo.find(".carloadPrice").attr("name", Math.random().toString()).rules("add", {
		required : true,
		number: true,
		maxlength: 7,
		toFilter: true,
		messages: {
			required : "请输入整车价格！",
			number: "请输入数字！",
			maxlength: "整车价格最多为{0}个字符！",
			toFilter: "请输入正确的整车价格！"
		}
	});
	if(!newInfo.find("#carloadType").val()){
		newInfo.find(".carType ul li").eq(0).hide();
		newInfo.find(".carType ul li").eq(1).trigger("click");
	}
	newInfo.find(".carType").next(".star").show();
	
	if(carloadPriceCount == 4){
		$(".add").hide();
	}
	parent.dyniframesize();
});

/**
 * 删除一条整车价格
 */
$(".delOne").live("click", function(){
	if($("#carloadPrice .info_box").size() <= 1){
		return false;
	}
	var carloadPriceCount = $("#carloadPrice .carloadDiv").length;
	if(carloadPriceCount <= 5){
		$(".add").show();
	}
	var obj = $(this);
	obj.parents(".info_box").remove();
	if($("#carloadPrice .carloadDiv").size()==1){
		$(".delOne").hide();
	}
	
	var vehicleTypeOptionCnt = $("#carType_spinnerId").find("li").size()-1;//去掉请选择
	var vehicleTypeRowCnt = $(".car_price").find(".info_box").size();
	if(vehicleTypeRowCnt < vehicleTypeOptionCnt){
		$("#addCarload").show();
	}
	parent.dyniframesize();
});

function couponValidate(){
	//活动价要小于原价
	
	var returnFlag = true;
	$("#priceInfo").find(".info_box").each(function(){
		if($(this).find(".couponInput").size()>0){			
			if(parseFloat($(this).find(".couponInput")[0].value) >= parseFloat($(this).find(".normalPrice")[0].value)){
				$.alertPlus("活动价  "+$(this).find(".couponInput")[0].value+"要小于原价 "+$(this).find(".normalPrice")[0].value+"！", 9, "提示");
				returnFlag = false;
				return false;
			}
		}
	});
	return returnFlag;
}

//保存
$("#saveBtn").live("click", function(){
	if(!$("#priceForm").valid()){
		return false;
	}
	
	//判断是否有整车价格
	if($("#carCheck").attr("checked")){
		//判断是否有选择重复的车型
		var arr = [];
		var carloadDiv = $("#carloadPrice .carloadDiv");
		$.each(carloadDiv, function(i, carload){
			arr.push(carloadDiv.eq(i).find("#carloadType").val());
		});
		if($.hasRepeat(arr)){
			$.alertPlus("请不要选择重复的车型！", 9, "提示");
			return false;
		}
		
		changeCarNames();
	}
			
	//处理金额数据
	$(".numInput").each(function(){
		$(this).val(NumInput.getValue($(this)));
	});
	
	if(!couponValidate()){
		return false;
	}
	
	var url = $("#priceId").val() ? "upPrice.do" : "addPrice.do";
	
	// 异步提交表单
	$("#priceForm").ajaxSubmit({
		url:url,
		type: "post",
		dataType: "json",
		success: function(data){
		   if(data.msg=="success"){
				$.alertPlus("操作成功", 1, "提示");
				location.href = "toPrice.do";
			}else {
				$.alertPlus(data.msg, 2, "提示");
			}
		},
		error: function(err){
			$.alertPlus("保存操作出错！", 2, "提示");
		}
	});
});

/**
 * 校验表单信息
 */

$("#priceForm").validate({
	rules:{
		"tradeTransportPrice.name":{
			required : true,
			rangelength : [1, 60],
			toFilter : true
		},
		"tradeTransportPrice.failDate": {
			number: true,
			maxlength: 10,
			toFilter: true
		},
		"tradeTransportPrice.productId": {
			required: true,
		},
		"beginName":{
			required : true,
			toFilter : true
		},
		"endName":{
			required : true,
			toFilter : true			
		},
		"tradeTransportPrice.remarks":{
			toFilter : true,
			rangelength : [0, 100]
		},
		"tradeTransportPrice.weightGoodsPrice":{
			required : true,
			number: true,
//			maxlength: 9,
			toFilter: true
		},
		"tradeTransportPrice.lightGoodsPrice":{
			required : true,
			number: true,
//			maxlength: 9,
			toFilter: true	
		},
		"tradeTransportPrice.lastGoodsPrice":{
			required : true,
			number: true,
//			maxlength: 9,
			toFilter: true	
		},
		"tradeTransportPrice.weightDiscount":{
			number: true,
//			maxlength: 5,
			toFilter: true	
		},
		"tradeTransportPrice.lightDiscount":{
			number: true,
//			maxlength: 5,
			toFilter: true	
		},
		"tradeTransportPrice.lastDiscount":{
			number: true,
//			maxlength: 5,
			toFilter: true	
		}
	},
	messages:{
		"tradeTransportPrice.name":{
			required : "请输入名称！",
			rangelength : "请输入正确的名称，长度为{0}-{1}个字符！",
			toFilter : "请输入正确的名称，勿包含特殊字符！"
		},
		"tradeTransportPrice.failDate": {
			number: "请输入数字！",
			maxlength: "运输时效最大长度为{0}个字符！",
			toFilter: "请输入正确的运输时效！"
		},
		"tradeTransportPrice.productId": {
			required: "请选择运输方式！",
		},
		"beginName":{
			required : "请选择出发地址！",
			toFilter : "请选择正确的出发地址！"
		},
		"endName":{
			required : "请选择到达地址！",
			toFilter : "请选择正确的到达地址！"		
		},
		"tradeTransportPrice.remarks":{
			toFilter : "请输入正确的特性描述，勿包含特殊字符！",
			rangelength : "请输入正确的特性描述，长度为{0}-{1}个字符！"
		},
		"tradeTransportPrice.weightGoodsPrice":{
			required : "请输入重货价格！",
			number: "请输入数字！",
//			maxlength: "重货价格最大长度为{0}个字符！",
			toFilter: "请输入正确的重货价格！"
		},
		"tradeTransportPrice.lightGoodsPrice":{
			required : "请输入轻货价格！",
			number: "请输入数字！",
//			maxlength: "轻货价格最大长度为{0}个字符！",
			toFilter: "请输入正确的轻货价格！"
		},
		"tradeTransportPrice.lastGoodsPrice":{
			required : "请输入最低一票价格！"	,
			number: "请输入数字！",
//			maxlength: "最低一票价格最大长度为{0}个字符！",
			toFilter: "请输入正确的最低一票价格！"		
		},
		"tradeTransportPrice.weightDiscount":{
			number: "请输入1-10的小数！",
//			maxlength: "最低折扣价格最大长度为{0}个字符！",
			toFilter: "请输入正确的折扣价格！"	
		},
		"tradeTransportPrice.lightDiscount":{
			number: "请输入1-10的小数！",
//			maxlength: "最低折扣价格最大长度为{0}个字符！",
			toFilter: "请输入正确的折扣价格！"	
		},
		"tradeTransportPrice.lastDiscount":{
			number: "请输入1-10的小数！",
//			maxlength: "最低折扣价格最大长度为{0}个字符！",
			toFilter: "请输入正确的折扣价格！"	
		}
		
	}
});

/**
 * 
 * */
function changeCarNames(){
	var carInfos = $("#carloadPrice .carloadDiv");
	for(var i = 0; i < carInfos.length; i++){
		carInfos.eq(i).find(".carloadPrice").attr("name", "tradeTransportPrice.tradeCarloadPrice[" + i + "].carloadPrice");
		carInfos.eq(i).find(".carloadSales").attr("name", "tradeTransportPrice.tradeCarloadPrice[" + i + "].salesCarloadPrice");
		carInfos.eq(i).find("#carloadType").attr("name", "tradeTransportPrice.tradeCarloadPrice[" + i + "].carType");
	}
}

function productsChoosingCallback(){
	$("#tradeTransportPrice_productId").valid();
}
