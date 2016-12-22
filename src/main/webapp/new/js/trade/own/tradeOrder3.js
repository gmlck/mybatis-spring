
/**
 * 点击下一步按钮
 */
$(".subOrder3").live("click", function(){
	
	if(!$("#lineOrderForm").valid()){
		return false;
	}
	
	//增值服务处理
	var valueAdded = "";
	$("#pickUpFee, #deliverHomeFee, #deliverDoorFee").each(function(){
		if($(this).attr("checked")){
			valueAdded += $(this).attr("stc") + ",";
		}
	});
	
	valueAdded = valueAdded ? valueAdded.substring(0, valueAdded.length-1) : valueAdded;
	
	//保价运输和代收货款如果没选中则清空文本框里的内容
	var checked = $("#insuredFee") && $("#insuredFee").attr("checked");
	if(!checked && $("#stateInsured")){
		$("#stateInsured").val("");
	}
	var checked = $("#amountFee") && $("#amountFee").attr("checked");
	if(!checked && $("#amountPay")){
		$("#amountPay").val("");
	}
	
	var subBtn = $(this);
	var btnId = $(this).attr("id");
	
	var option = {
			url: "addOrder3.do",
			type: "post",
			dataType: "json",
			data: {"tradeOrder.tradeOrderLine.valueAddedServices": valueAdded},
			beforeSend: function(){
				subBtn.attr("disabled", "disabled");
			},
			success: function(data){
				if(data.msg == "success" && btnId == "addOrder3"){
					location.href = "toOrderSucc.do?tradeOrder.id=" + data.tradeOrder.id;
				} else{
					$("#msg").val(data.msg);
					$("#order3RedirectForm").attr("action", "toTips.do");
					$("#order3RedirectForm").submit();
				}
			},
			error: function(err){
				layer.alert("服务器异常！请稍后重试！", 2, "提示");
				subBtn.removeAttr("disabled");
			}
		};
	
	//异步提交表单
	$("#lineOrderForm").ajaxSubmit(option);
});