/**
 * 选择保额级别回调函数
 * @param obj
 */
function insPlanSel(obj){
	$("#generalRate").val($(obj).attr("remark") + "%");
	$("#extraRate").val($(obj).attr("remarkTwo") + "%");
	
	calCharge();
}

/**
 * 计算总保费
 */
function calCharge(){
	var carCount = parseFloat($("#carCount").val());
	var generalRate = parseFloat($("#generalRate").val());
	var extraRate = parseFloat($("#extraRate").val());
	var insAmount = parseFloat($("#insAmount").val());
	
	if(carCount && generalRate && extraRate && insAmount){
		//计算并显示普通险费用
		var generalCharge = (carCount * generalRate * insAmount / 100).toFixed(2);
		var chargeStr = carCount + "×" + generalRate + "%×" + insAmount + " = " + generalCharge + "元";
		$("#generalCharge").text(chargeStr);
		//计算并显示附加险费用
		var extraCharge = (carCount * extraRate * insAmount / 100).toFixed(2);
		chargeStr = carCount + "×" + extraRate + "%×" + insAmount + " = " + extraCharge + "元";
		$("#extraCharge").text(chargeStr);
		//计算并显示总计费用
		var totalCharge = (parseFloat(generalCharge) + parseFloat(extraCharge)).toFixed(2);
		var check = $("#addExtra").attr("checked");
		if(check){
			chargeStr = generalCharge + " + " + extraCharge + " = " + totalCharge + "元";
		} else {
			chargeStr = generalCharge + "元";
		}
		$("#totalCharge").text(chargeStr);
	} else{
		$("#generalCharge").text("");
		$("#generalCharge").text("");
	}
}

/**
 * 是否附加盗抢险
 */
$("#addExtra").live("click", function(){
	var check = $(this).attr("checked");
	if(check){
		$(".extraIns").show();
	} else{
		$(".extraIns").hide();
	}
	calCharge();
});

/**
 * 校验
 */
$("#carInsForm").validate({
	rules: {
		"tradeCarIns.insPlanId": {
			required: true
		},
		"tradeCarIns.insCarCount": {
			required: true,
			digits: true,
			maxlength: 6,
			toFilter: true
		},
		"tradeCarIns.insRemark": {
			required: true,
			maxlength: 300,
			toFilter: true
		}
	},
	messages: {
		"tradeCarIns.insPlanId": {
			required: "请选择保额级别！"
		},
		"tradeCarIns.insCarCount": {
			required: "请输入车辆数量！",
			digits: "请输入整数！",
			maxlength: "车辆数量最大长度为{0}个字符！",
			toFilter: "请输入正确的车辆数量"
		},
		"tradeCarIns.insRemark": {
			required: "请输入申请说明！",
			maxlength: "申请说明最大长度为{0}个字符！",
			toFilter: "请输入正确的申请说明，不要包含特殊字符！"
		}
	}
});

/**
 * 提交定额车险申请
 */
$("#addCarIns").live("click", function(){
	if(!$("#carInsForm").valid()){
		return false;
	}
	$("#carInsForm").ajaxSubmit({
        url : "addCarIns.do",
        type : "post",
        dataType : "json",
        beforeSend: function(){
        	$("#addCarIns").addClass("btn_forbidden").attr("disabled","disabled");
        },
        success: function(data) {
            if (data.msg == "success") {
                $.alertPlus("提交申请成功", 1, "提示");
                window.self.location = 'toCarInsIndex.do';
            } else {
                $.alertPlus(data.msg, 2, "提示");
                $("#addCarIns").removeClass("btn_forbidden").removeAttr("disabled","disabled");
            }
        },
        error:function(){
        	$.alertPlus("服务忙，请稍后再试", 8, "提示");
        	$("#addCarIns").removeClass("btn_forbidden").removeAttr("disabled","disabled");
        }
    });
});