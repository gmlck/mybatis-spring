$(".appraise div").live("click",function(){
	if($(this).hasClass("border_orange")){
		$(this).removeClass("border_orange");
	}else{
		$(this).addClass("border_orange");
	}
});

$(".hide_show_btn").live("click", function(){
	$(this).parents(".oneData").next().animate({height:"toggle"}, 1, function(){
		parent.dyniframesize();
	});
});

/**
 * 查询专线订单
 * @param pageNum
 * @param pageSize
 */
function selTradeOrderList(pageNum, pageSize){
	pageNum = !pageNum || pageNum < 1 ? 1 : pageNum;
	pageSize = !pageSize || pageSize < 1 ? 10 : pageSize;
	
	$("#pageSize").val(pageSize);
	$("#pageNum").val(pageNum);
	
	//异步提交表单
	var option = {
		url: "selTradeOrders.do",
		type: "post",
		dataType: "html",
		async: false,
		success: function(data){
			$("#tradeOrderListDiv").html(data);
			parent.dyniframesize();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询操作出错！", 2, "提示");
		}
	}
	
	$("#tradeOrderForm").ajaxSubmit(option);
}

/**
 * 查询
 */
$("#selTradeOrderBtn").live("click", function(){
	selTradeOrderList();
});

//重置按钮
$("#resetBtn").live("click", function(){
	$("#tradeOrderForm").find("input").not("[type='button']").each(function(){
		$(this).val("");
	});
	
	$("#tradeOrderForm").find(".spinner .list ul li").eq(0).trigger("click");
});

//查看详情
$(".toDetial").live("click", function(){
	var tradeOrderId = $(this).parents(".oneData").find(".tradeOrderId").text();
	location.href = 'toTradeOrderDetail.do?tradeOrder.id=' + tradeOrderId;
});

//删除
$(".delOne").live("click", function(){
	var tradeOrderId = $(this).parents(".oneData").find(".tradeOrderId").text();
	$.confirmPlus("是否确定删除选中订单！", function(index){
		$.ajax({
			url: "delTradeOrder.do",
			type: "post",
			dataType: "json",
			data: {"tradeOrder.id": tradeOrderId},
			success: function(data){
				if(data.msg == "success"){
					$.alertPlus("删除订单操作成功！", 1, "提示");
					selTradeOrderList();
				} else{
					$.alertPlus(data.msg, 2, "提示");
				}
			},
			error: function(err){
				$.alertPlus("删除订单操作出错！", 2, "提示");
			}
		});
		
		$.closePlus(index);
	}, "确认删除", function(index){
		$.closePlus(index);
	});
});

//撤销
$(".cancelOne").live("click", function(){
	var tradeOrderId = $(this).parents(".oneData").find(".tradeOrderId").text();
	$.confirmPlus("是否确定撤销选中订单！", function(index){
		$.ajax({
			url: "cancelTradeOrder.do",
			type: "post",
			dataType: "json",
			data: {"tradeOrder.id": tradeOrderId},
			success: function(data){
				if(data.msg == "success"){
					$.alertPlus("撤销订单操作成功！", 1, "提示");
					selTradeOrderList();
				} else{
					$.alertPlus(data.msg, 2, "提示");
				}
			},
			error: function(err){
				$.alertPlus("撤销订单操作出错！", 2, "提示");
			}
		});
		
		$.closePlus(index);
	}, "确认撤销", function(index){
		$.closePlus(index);
	});
});

//修改
$(".toUpdate").live("click", function(){
	var tradeOrderId = $(this).parents(".oneData").find(".tradeOrderId").text();
	parent.window.open("../trade/toUpOrder.do?tradeOrder.id=" + tradeOrderId);
});

//复制
$(".copyOne").live("click", function(){
	var tradeOrderId = $(this).parents(".oneData").find(".tradeOrderId").text();
	parent.window.open("../trade/toCopyOrder.do?tradeOrder.id=" + tradeOrderId);
});

//支付运费
var payTipDialog;
$(".payWaybillCost").live("click", function(){
	$.getDialog().html($("#payTipDiv").html());
	payTipDialog = $.layerPlus({
		type : 1,
		title : ['网上支付提示'],
		fix : true,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shade : [0.5 , '#000' , true],
		shadeClose : false,
		closeBtn : [0 , false],
		move : ['.xubox_title' , false],
		page : {dom : '#dialog'}
	});
	
	var tradeOrderId = $(this).parents(".oneData").find(".tradeOrderId").text();
	parent.window.open("../my/toPayWaybill.do?tradeOrder.id=" + tradeOrderId);
});

//支付保费
var payTipDialog;
$(".payInsFee").live("click", function(){
	$.getDialog().html($("#payTipDiv").html());
	payTipDialog = $.layerPlus({
		type : 1,
		title : ['网上支付提示'],
		fix : true,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shade : [0.5 , '#000' , true],
		shadeClose : false,
		closeBtn : [0 , false],
		move : ['.xubox_title' , false],
		page : {dom : '#dialog'}
	});
	
	var insuranceCode = $(this).parents(".oneData").find(".insuranceCode").text();
	parent.window.open("../my/toPayIns.do?tradeInsurance.insuranceCode=" + insuranceCode);
//	parent.window.open("../my/toPayWaybill.do?tradeOrder.id=" + tradeOrderId);
});

//申请退款
var applyRefundDialog;
$(".toRefund").live("click", function(){
	var waybillCost = $(this).parents(".oneData").find(".waybillCost").text();
	var tradeOrderId = $(this).parents(".oneData").find(".tradeOrderId").text();
	
	$("#refundItemId").val(tradeOrderId);
	$("#waybillCost").attr("value", waybillCost);
	
	$.getDialog().html($("#applyRefundDiv").html());
	applyRefundDialog = $.layerPlus({
		type : 1,
		title : ['申请退款'],
		fix : false,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shade : false,
		shadeClose : false,
		page : {dom : '#dialog'}
	});
});

/**
 * 保存退款申请
 */
function addRefundInfo(){
	$.parentDom("#refundInfoForm").ajaxSubmit({
		url: "applyRefund.do",
		dataType: "json",
		type: "post",
		success: function(data){
			if(data.msg == "success"){
				$.alertPlus("退款申请提交成功！", 1, "提示");
				selTradeOrderList();
				$.closePlus(applyRefundDialog);
			} else{
				$.alertPlus(data.msg, 2, "提示");
			}
		},
		error: function(err){
			$.alertPlus("退款申请提交出错！", 2, "提示");
		}
	});
}

//关闭退款申请弹出框
function closeRefundDialog(){
	$.closePlus(applyRefundDialog);
}

//支付完成
function payBack(){
	selTradeOrderList();
	$.closePlus(payTipDialog);
}
//支付出现问题
function payError(){
	openUrl('service', '/service/aq_pay_problems.html?menuIndex=2&navIndex=2');
	$.closePlus(payTipDialog);
	selTradeOrderList();
}
/**
 * 提交评价
 */
$(".addReview").live("click", function(){
	var formObj = $(this).parents(".reviewForm");
	var flag = true;
	//校验选择评分
	formObj.find(".s_grade").each(function(){
		$(this).removeErrMsg();
		if(!parseInt($(this).find("span").text())){
			$(this).addErrMsg("请打分！");
			flag = false;
		} else{
			var points = parseInt($(this).find("span").text());
			formObj.find("." + $(this).attr("id")).val(points);
		}
	});
	//校验评价标题
	formObj.find(".revTitle").removeErrMsg();
	var revTitle = formObj.find(".revTitle").val();
	if(!revTitle || !$.trim(revTitle)){
		flag = false;
		formObj.find(".revTitle").addErrMsg("请输入评价标题！");
	} else if(toFilter.test(revTitle)){
		flag = false;
		formObj.find(".revTitle").addErrMsg("请输入正确的评价标题！");
	} else if(revTitle.length > 60){
		flag = false;
		formObj.find(".revTitle").addErrMsg("评价标题最大长度为60个字符！");
	}
	
	//评价标签
	formObj.find("div.revMark div").eq(0).removeErrMsg();
	if(formObj.find(".revMark .border_orange").length < 1){
		flag = false;
		formObj.find("div.revMark div").eq(0).addErrMsg("请选择评价标签！");
	} else{
		var revMark = "";
		formObj.find(".revMark .border_orange").each(function(){
			revMark += $(this).text() + ",";
		});
		revMark = revMark.substring(0, revMark.length - 1);
		formObj.find("input.revMark").val(revMark);
	}
	
	//评价内容
	formObj.find(".revContent").removeErrMsg();
	var revContent = formObj.find(".revContent").val();
	if(!revContent || toFilter.test(revContent) || revContent.length > 500){
		flag = false;
		formObj.find(".revContent").addErrMsg("请输入评价内容！");
	} else if(toFilter.test(revContent)){
		flag = false;
		formObj.find(".revContent").addErrMsg("请输入正确的评价内容！");
	} else if(revContent.length <10 || revContent.length > 500){
		flag = false;
		formObj.find(".revContent").addErrMsg("评价内容长度为10-500个字符！");
	}
	
	//提交
	if(flag){
		formObj.ajaxSubmit({
			url: "addReview.do",
			type: "post",
			dataType: "json",
			success: function(data){
				if(data.msg == "success"){
					$.alertPlus("评价操作成功！", 1, "提示");
					window.location.reload();
				} else{
					$.alertPlus(data.msg, 2, "提示");
				}
			},
			error: function(err){
				$.alertPlus("评价操作出错！", 2, "提示");
			}
		});
	}
});

//确认收货
$(".confirmOne").live("click", function(){
	var tradeOrderId = $(this).parents(".oneData").find(".tradeOrderId").text();
	$.confirmPlus("确认收货会将运费支付给商家，您确定对方已经收到货物了吗？", function(index){
		$.ajax({
			url: "confirmReceived.do",
			type: "post",
			dataType: "json",
			data: {"tradeOrder.id": tradeOrderId},
			success: function(data){
				if(data.msg == "success"){
					$.alertPlus("确认收货操作成功！", 1, "提示");
					selTradeOrderList();
				} else{
					$.alertPlus(data.msg, 2, "提示");
				}
			},
			error: function(err){
				$.alertPlus("确认收货操作出错！", 2, "提示");
			}
		});
		
		$.closePlus(index);
	}, "确认收货", function(index){
		$.closePlus(index);
	});
});