$(document).ready(function(){
	$("#buyIns").trigger("change");
	
	//发货方式
	if($("#shipType").find("input[type='radio']:checked").length < 1){
		$("#shipType").find("input[type='radio']").eq(0).trigger("click");
	} else{
		$("#shipType").find("input[type='radio']:checked").trigger("change");
	}
	//送货方式
	if($("#receiptType").find("input[type='radio']:checked").length < 1){
		$("#receiptType").find("input[type='radio']").eq(0).trigger("click");
	} else{
		$("#receiptType").find("input[type='radio']:checked").trigger("change");
	}
	//支付方式
	if($("#payType").find("input[type='radio']:checked").length < 1){
		$("#payType").find("input[type='radio']").eq(0).trigger("click");
	}
	
	//如果货物价值有数据，则说明是修改或复制，显示信息
	if($("#cargoValue").val()){
		$("#buyIns").trigger("click");
	}
	
	//增值服务
	$(".servingText, .servingSelect, .servingInput").each(function(){
		if($(this).attr("checked")){
			$(this).trigger("change");
		}
	});
	
	
	var carloadPriceObj = $("#carloadPriceObj").text();
	carloadPriceObj = carloadPriceObj ? JSON.parse(carloadPriceObj) : [];
	if(!carloadPriceObj.length){
		$("#cargoCountDiv .list ul li[code='CARGO_COUNT_VEHICLE']").remove();
	}
	
	//如果有货物数量，则触发事件，以便计算货物运费
	if($("#cargoCountUnit").val()){
		var cargoCountUnit = $("#cargoCountUnit").val();
		var ulObj = $("#cargoCountDiv .list ul");
		if(ulObj.find("li[code='" + cargoCountUnit + "']")[0]){
			ulObj.find("li[code='" + cargoCountUnit + "']").trigger("click");
		} else{
			ulObj.find("li").eq(1).trigger("click");
		}
	}
});

(function(){
	//是否购买保险选框
	$("#buyIns").live("change", function(){
		var checked = $(this).attr("checked");
		if(checked){
			$("#cargoInsType").parents(".cargoInsDiv").find(".cargoInsItem").show().find("input").each(function(){
				$(this).removeAttr("disabled");
			});
			
			$("#cargoInsType").find(".spinner ul li").eq(0).hide();
			if(!$("#cargoInsRate").val()){
				$("#cargoInsType").find(".spinner ul li").eq(1).trigger("click");
			}
			
			calCargoInsFee();
			
			$("#cargoValue").rules("add", {
				required: true,
				maxlength: 10,
				number: true,
				toFilter: true,
				messages: {
					required: "请输入货物价值！",
					maxlength: "货物价值最大长度为{0}个字符！",
					number: "请输入数字！",
					toFilter: "请输入正确的货物价值！"
				}
			});
			$(".cargoInsName").rules("add", {
				required: true,
				maxlength: 30,
				toFilter: true,
				messages: {
					required: "请输入被保人姓名！",
					maxlength: "被保人姓名最大长度为{0}个字符！",
					toFilter: "请输入正确的被保人姓名！"
				}
			});
			$(".cargoInsMobile").rules("add", {
				required: true,
				maxlength: 20,
				toFilter: true,
				mobileOrTel: true,
				messages: {
					required: "请输入被保人联系电话！",
					maxlength: "被保人电话最大长度为{0}个字符！",
					toFilter: "请输入正确的电话号码！",
					mobileOrTel: "请输入正确的电话号码！"
				}
			});
		} else{
			$("#cargoInsType").parents(".cargoInsDiv").find(".cargoInsItem").hide().find("input").each(function(){
				$(this).attr("disabled", "diabled");
			});
			
			$("#cargoValue").rules("remove");
			$(".cargoInsName").rules("remove");
			$(".cargoInsMobile").rules("remove");
		}
	});
	
	//货物价格改变事件，计算保险费
	$("#cargoValue").live("change", function(){
		calCargoInsFee();
	});
})();


/**
 * 货物数量选择回调函数
 * @param obj
 */
function selCargoCount(obj){
	var cargoCountUnit = $(obj).attr("code");
	
	if("CARGO_COUNT_VEHICLE" == cargoCountUnit){
		$(".cargoWeightAndVolDiv").hide();
		if($(".cargoVehDiv ul li")){
			$(".cargoVehDiv ul li").eq(0).hide();
			$(".cargoVehDiv ul li").eq(1).trigger("click");
			$(".cargoVehDiv").show();
		}
		$("#vehPrice").show();
		$("#cargoWeight").attr("disabled", "disabled");
		$("#cargoWeightUnit").attr("disabled", "disabled");
		$("#cargoVolume").attr("disabled", "disabled");
	} else{
		$(".cargoWeightAndVolDiv").show();
		$(".cargoVehDiv").hide();
		$("#vehPrice").hide();
		$("#cargoWeight").removeAttr("disabled");
		$("#cargoWeightUnit").removeAttr("disabled");
		$("#cargoVolume").removeAttr("disabled");
		
		calCargoCharge();
	}
}

//货物体积改变时，计算货物运费
$("#cargoVolume").live("change", function(){
	calCargoCharge();
});

//货物数量改变时，计算货物运费
$("#cargoCount").live("change", function(){
	var cargoCount = parseFloat($(this).val());
	if(cargoCount){
		$(this).parent().find(".spinner ul li").eq(0).hide();
		if($("#cargoCountUnit").val()){
			calCargoCharge();
		} else{
			$(this).parent().find(".spinner ul li").eq(1).trigger("click");
		}
	} else{
		$(this).parent().find(".spinner ul li").eq(0).show().trigger("click");
	}
});

//货物重量改变时，计算货物运费
$("#cargoWeight").live("change", function(){
	var cargoWeight = parseFloat($(this).val());
	if(cargoWeight){
		$(this).parent().find(".spinner ul li").eq(0).hide();
		if($("#cargoWeightUnit").val()){
			calCargoCharge();
		} else{
			$(this).parent().find(".spinner ul li").eq(1).trigger("click");
		}
	} else{
		$(this).parent().find(".spinner ul li").eq(0).show().trigger("click");
	}
});

//计算货物保险费
function calCargoInsFee(){
	var cargoInsRate = parseFloat($("#cargoInsRate").val());
	var cargoValue = parseFloat($("#cargoValue").val());
	var cargoInsFee = cargoInsRate && cargoValue ? (cargoInsRate * cargoValue) / 1000 : 0;
	var cargoInsInfo = cargoValue ? (cargoInsFee && cargoInsFee>=10 ? "需支付保费：" + cargoInsRate + "‰×" + cargoValue + "=<span class='color_orange'>" + cargoInsFee.toFixed(2) + "</span> 元" : "10元") : "";
	cargoInsFee = cargoInsFee && cargoInsFee>=10 ? cargoInsFee : 10;
	
	cargoInsInfo = cargoInsFee ? cargoInsInfo : "";
	cargoInsFee = cargoInsFee ? cargoInsFee.toFixed(2) + "元" : "面议";
	$("#cargoInsInfo").html(cargoInsInfo);
	$("#chargeInfo .cargoIns").text(cargoInsFee);
	
	calTotalCharge();
}

//计算货物运费
function calCargoCharge(){
	var cargoCountUnit = $("#cargoCountUnit").val();
	var cargoCharge = 0;
	if(cargoCountUnit == "CARGO_COUNT_VEHICLE"){
		var carloadPriceJson = $("#carloadPriceObj").text();
		if(!carloadPriceJson){
			$("#cargoCountDiv .list ul li[code='CARGO_COUNT_VEHICLE']").remove();
			$("#cargoCountDiv .list ul li").eq(1).trigger("click");
			return false;
		}
		var carloadPriceObj = JSON.parse(carloadPriceJson);
		var cargoVehType = $("#cargoVehType").val();
		$.each(carloadPriceObj, function(index, item) {
			if(item.carType == cargoVehType){
				var carloadPrice = item.salesCarloadPrice ? item.salesCarloadPrice : item.carloadPrice;
				$("#vehPrice s").text("");
				$("#salesVehPrice").text(carloadPrice);
				$("#vehPrice").show();
			}
		});
		
		var cargoCount = parseFloat($("#cargoCount").val());
		var vehPrice = parseFloat($("#vehPrice span").text());
		cargoCharge = cargoCount && vehPrice ? (cargoCount * vehPrice) : 0;
		$("#cargoFlag").hide();
	} else{
		var cargoWeight = parseFloat($("#cargoWeight").val());
		var cargoWeightUnit = $("#cargoWeightUnit").val();
		cargoWeight = cargoWeightUnit == "TON" ? cargoWeight * 1000 : cargoWeight;
		
		var cargoVolume = parseFloat($("#cargoVolume").val());
		
		var weightPrice = parseFloat($("#weightPrice s").text());
		var salesWeightPrice = parseFloat($("#weightPrice #salesWeightPrice").text());
		var weightDiscount = parseFloat($("#weightPrice #weightDiscount").text());
		weightPrice = salesWeightPrice ? salesWeightPrice : (weightDiscount ? weightPrice * weightDiscount / 10 : 0);
		
		var lightPrice = parseFloat($("#lightPrice s").text());
		var salesLightPrice = parseFloat($("#lightPrice #salesLightPrice").text());
		var lightDiscount = parseFloat($("#lightPrice #lightDiscount").text());
		lightPrice = salesLightPrice ? salesLightPrice : (lightDiscount ? lightPrice * lightDiscount / 10 : 0);
		
		var weightCharge = weightPrice && cargoWeight ? weightPrice * cargoWeight : 0;
		var lightCharge = lightPrice && cargoVolume ? lightPrice * cargoVolume : 0;
		cargoCharge = weightCharge > lightCharge ? weightCharge : lightCharge;
		var cargoFlag = (weightCharge || lightCharge) ? (weightCharge > lightCharge ? "重货" : "轻货") : "";
		if(cargoFlag){
			$("#cargoFlag").show().find("span").text(cargoFlag);
		}
	}
	
	var lowPrice = parseFloat($("#lowPrice s").text());
	var salesLowPrice = parseFloat($("#lowPrice #salesLowPrice").text());
	var lowDiscount = parseFloat($("#lowPrice #lowDiscount").text());
	lowPrice = salesLowPrice ? salesLowPrice : (lowDiscount ? lowPrice * lowDiscount / 10 : 0);
	
	//比较最低一票价格
	cargoCharge = cargoCharge ? (cargoCharge >= lowPrice ? cargoCharge : lowPrice) : 0;
	
	cargoCharge = cargoCharge ? cargoCharge.toFixed(2) + "元" : "面议";
	$("#chargeInfo .cargoCharge").text(cargoCharge);
	
	calTotalCharge();
}

//文本类型的增值服务改变事件
$(".servingText").live("change", function(){
	var servingPrice = $(this).attr("checked") ? $(this).parents(".servingDiv").find(".servingFee").text() : "";
	if(isNaN(parseFloat(servingPrice).toFixed(2))){
		servingPrice = "面议";
	}else{
		servingPrice = servingPrice;
	}
	//servingPrice = servingPrice ? parseFloat(servingPrice).toFixed(2) : "面议";
	$("#chargeInfo").find("." + $(this).attr("id")).text(servingPrice);
	
	calTotalCharge();
});

//带文本框类型的增值服务改变事件
$(".servingInput, .sum").live("change", function(){
	var servingDiv = $(this).parents(".servingDiv");
	calServingInputFee(servingDiv);
});

//带文本框类型的增值服务费用计算
function calServingInputFee(servingDiv){
	var servingPrice = 0;
	if(servingDiv.find(".servingInput").attr("checked")){
		var servingPriceType = servingDiv.find(".servingPriceType").val();
		var servingPriceValue = parseFloat(servingDiv.find(".servingPriceValue").val());
		var sum = parseFloat(servingDiv.find(".sum").val());
		servingPriceValue = servingPriceType == 2 ? servingPriceValue : (servingPriceValue * sum) / 100;
		servingPrice = servingPriceValue ? servingPriceValue.toFixed(2) + "元" : "面议";
	} else{
		servingPrice ="面议";
	}
	$("#chargeInfo").find("." + servingDiv.find(".servingInput").attr("id")).text(servingPrice);
	servingDiv.find(".servingFee").text(servingPrice);
	
	calTotalCharge();
}

//带下拉框类型的增值服务改变事件
$(".servingSelect").live("change", function(){
	var servingDiv = $(this).parents(".servingDiv");
	calServingSelectFee(servingDiv);
	
	if(servingDiv.find(".servingSelect").attr("checked")){
//		servingDiv.find(".spinner").removeClass("text_disable");
		
		servingDiv.find(".spinner ul li").eq(0).hide();
		if(!servingDiv.find(".returnBillType").val()){
			servingDiv.find(".spinner ul li").eq(1).trigger("click");
		}
		servingDiv.find(".returnBillType").removeAttr("disabled");
	} else{
//		servingDiv.find(".spinner").addClass("text_disable");
//		servingDiv.find(".spinner ul li").eq(0).trigger("click");
		servingDiv.find(".spinner ul li").eq(0).show();
		servingDiv.find(".returnBillType").attr("disabled", "disabled");
	}
});

/**
 * 选择签收回单类型时，显示价格
 * @param servingPriceValue
 * @param obj
 */
function selReceipt(servingPrice, obj, returnBillType){
	var servingDiv = $(obj).parents(".servingDiv");
	servingDiv.find(".servingPriceValue").val(servingPrice);
	servingDiv.find(".returnBillType").val(returnBillType);
	calServingSelectFee(servingDiv);
}

//带下拉框类型的增值服务费用计算
function calServingSelectFee(servingDiv){
	if(servingDiv.find(".servingSelect").attr("checked")){
		var servingPrice = parseFloat(servingDiv.find(".servingPriceValue").val());
		servingPrice = servingPrice ? servingPrice + "元" : "面议";
	} else{
		servingPrice = "面议";
	}
	$("#chargeInfo").find("." + servingDiv.find(".servingSelect").attr("id")).text(servingPrice);
	servingDiv.find(".servingFee").text(servingPrice);
	
	calTotalCharge();
}

//单选框类型的增值服务费用显示
$(".servingRadio").live("change", function(){
	$(".servingRadio").each(function(){
		var feeId = $(this).attr("id");
		if(feeId){
			feeId = $("#chargeInfo").find("." + feeId).text("面议");
			if($(this).attr("checked")){
				feeId.text(feeId.attr("id") + "元");
			}
		}
	});
	
	calTotalCharge();
});

//计算预估总费用
function calTotalCharge(){
	var totalCharge = 0;
	$(".charge").each(function(){
		var charge = parseFloat($(this).text());
		totalCharge = charge ? totalCharge + charge : totalCharge;
	});
	
	totalCharge = totalCharge ? totalCharge.toFixed(2) + "元" : "面议";
	$("#totalCharge").text(totalCharge);
}

/**
 * 校验表单
 */
$("#lineOrderForm").validate({
	groups: {
		cargoNorm: "tradeOrder.tradeOrderCargo.cargoWeight tradeOrder.tradeOrderCargo.cargoVolume"
    },
	rules: {
		"tradeOrder.tradeOrderCargo.cargoName": {
			required: true,
			maxlength: 30,
			toFilter: true
		},
		"tradeOrder.tradeOrderCargo.cargoCount": {
			required: true,
			maxlength: 10,
			toFilter: true,
			digits: true
		},
		"tradeOrder.tradeOrderCargo.cargoWeight": {
			require_from_group: [1,".cargoNorm"],
			maxlength: 10,
			toFilter: true,
			number: true
		},
		"tradeOrder.tradeOrderCargo.cargoVolume": {
			require_from_group: [1,".cargoNorm"],
			maxlength: 10,
			toFilter: true,
			number: true
		},
		"tradeOrder.tradeOrderCargo.cargoCautions": {
			maxlength: 30,
			toFilter: true
		},
		"tradeOrder.tradeOrderCargo.cargoValue": {
			maxlength: 10,
			number: true,
			toFilter: true
		},
		"tradeOrder.tradeOrderCargo.cargoInsName": {
			maxlength: 30,
			toFilter: true
		},
		"tradeOrder.tradeOrderCargo.cargoInsMobile": {
			maxlength: 20,
			toFilter: true,
			mobileOrTel: true
		},
		"tradeOrder.tradeOrderCargo.cargoInsCompanyName": {
			maxlength: 30,
			toFilter: true
		},
		"tradeOrder.tradeOrderCargo.cargoInsAddress": {
			maxlength: 150,
			toFilter: true
		}
	},
	messages: {
		"tradeOrder.tradeOrderCargo.cargoName": {
			required: "请输入货物名称！",
			maxlength: "货物名称最大长度为{0}个字符！",
			toFilter: "请输入正确的货物名称！"
		},
		"tradeOrder.tradeOrderCargo.cargoCount": {
			required: "请输入货物数量！",
			maxlength: "货物数量最大长度为{0}个字符！",
			toFilter: "请输入正确的货物数量",
			digits: "请输入整数！"
		},
		"tradeOrder.tradeOrderCargo.cargoWeight": {
			require_from_group: "货物重量和体积请至少输入一项！",
			maxlength: "货物重量最大长度为{0}个字符！",
			toFilter: "请输入正确的货物重量！",
			number: "请输入数字！"
		},
		"tradeOrder.tradeOrderCargo.cargoVolume": {
			require_from_group: "货物重量和体积请至少输入一项！",
			maxlength: "货物体积最大长度为{0}个字符！",
			toFilter: "请输入正确的货物体积！",
			number: "请输入数字！"
		},
		"tradeOrder.tradeOrderCargo.cargoCautions": {
			maxlength: "注意事项最大长度为{0}个字符！",
			toFilter: "请输入正确的注意事项，勿包含特殊字符！"
		},
		"tradeOrder.tradeOrderCargo.cargoValue": {
			maxlength: "货物价值最大长度为{0}个字符！",
			number: "请输入数字！",
			toFilter: "请输入正确的货物价值！"
		},
		"tradeOrder.tradeOrderCargo.cargoInsName": {
			maxlength: "被保人姓名最大长度为{0}个字符！",
			toFilter: "请输入正确的被保人姓名！"
		},
		"tradeOrder.tradeOrderCargo.cargoInsMobile": {
			maxlength: "被保人电话最大长度为{0}个字符！",
			toFilter: "请输入正确的电话号码！",
			mobileOrTel: "请输入正确的电话号码！"
		},
		"tradeOrder.tradeOrderCargo.cargoInsCompanyName": {
			maxlength: "被保人公司名称最大长度为{0}个字符！",
			toFilter: "请输入正确的公司名称！"
		},
		"tradeOrder.tradeOrderCargo.cargoInsAddress": {
			maxlength: "被保人联系地址最大长度为{0}个字符！",
			toFilter: "请输入正确的联系人地址！"
		}
	}
});

//保价运输事件，改变校验
$("#insuredFee").live("change", function(){
	var checked = $(this).attr("checked");
	if(checked){
		$("input[name='tradeOrder.stateInsured']").rules("add", {
			required: true,
			number: true,
			maxlength: 10,
			toFilter: true,
			messages: {
				required: "请输入保价金额！",
				number: "请输入数字！",
				maxlength: "保价金额长度最大为{0}个字符！",
				toFilter: "请输入正确的保价金额！"
			}
		});
	} else{
		$("input[name='tradeOrder.stateInsured']").rules("remove");
		$("input[name='tradeOrder.stateInsured']").valid();
	}
});

//代收货款事件，改变校验
$("#amountFee").live("change", function(){
	var checked = $(this).attr("checked");
	if(checked){
		$("input[name='tradeOrder.amountPay']").rules("add", {
			required: true,
			number: true,
			maxlength: 10,
			toFilter: true,
			messages: {
				required: "请输入代收货款金额！",
				number: "请输入数字！",
				maxlength: "代收货款金额长度最大为{0}个字符！",
				toFilter: "请输入正确的代收货款金额！"
			}
		});
	} else{
		$("input[name='tradeOrder.amountPay']").rules("remove");
		$("input[name='tradeOrder.amountPay']").valid();
	}
});


//打开计算器
var calculatorDialog;
$("#openCalculator").live("click", function(){
	calculatorDialog = layer.layer({
		type : 1,
		title : '计算器',
		fix : false,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shade : false,
		shadeClose : false,
		page : {dom : '#calculatorDom'}
	});
	$("#calculatorDom").parents(".xubox_layer").css("z-index", "99999999");
});