/**
 * 查询线路运价
 * @param pageNum
 * @param pageSize
 */
function selTransOrder(pageNum, pageSize){
	pageNum = !pageNum || pageNum < 1 ? 1 : pageNum;
	pageSize = !pageSize || pageSize < 1 ? 10 : pageSize;
	
	$("#pageSize").val(pageSize);
	$("#pageNum").val(pageNum);
	
	//异步提交表单
	var option = {
		url: "selTransOrder.do",
		type: "post",
		dataType: "html",
		async: false,
		success: function(data){
			$("#tradeTransOrderListDiv").html(data);
			parent.dyniframesize();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询操作出错！", 2, "提示");
		}
	}
	
	$("#transOrderForm").ajaxSubmit(option);
}

/**
 * 查询
 */
$("#selTransOrderBtn").live("click", function(){
	selTransOrder();
});

//重置按钮
$("#resetBtn").live("click", function(){
	$("#transOrderForm").find("input").not("[type='button']").each(function(){
		$(this).val("");
	});
	
	$("#transOrderForm").find(".spinner .list ul li").eq(0).trigger("click");
});

//查看详情
$(".toDetial").live("click", function(){
	var transOrderId = $(this).parents(".oneData").find(".transOrderId").text();
	location.href = 'toTransOrderDetial.do?transOrder.id=' + transOrderId;
});

//删除
$(".delOne").live("click", function(){
	var transOrderId = $(this).parents(".oneData").find(".transOrderId").text();
	$.confirmPlus("是否确定删除选中订单！", function(index){
		$.ajax({
			url: "delMyOrder.do",
			type: "post",
			dataType: "json",
			data: {"transOrder.id": transOrderId},
			success: function(data){
				if(data.msg == "success"){
					$.alertPlus("删除订单操作成功！", 1, "提示");
					selTransOrder();
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
	var transOrderId = $(this).parents(".oneData").find(".transOrderId").text();
	$.confirmPlus("是否确定撤销选中订单！", function(index){
		$.ajax({
			url: "cancelMyOrder.do",
			type: "post",
			dataType: "json",
			data: {"transOrder.id": transOrderId},
			success: function(data){
				if(data.msg == "success"){
					$.alertPlus("撤销订单操作成功！", 1, "提示");
					selTransOrder();
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
	var tradeOrderId = $(this).parents(".oneData").find(".transOrderId").text();
	var companyDomain = $(this).parents(".oneData").find(".companyDomain").text();
	if(companyDomain){
		var ourDomain = window.location.host;
		ourDomain = ourDomain.split(".").length == 2 ? ourDomain : ourDomain.substring(ourDomain.indexOf(".") + 1, ourDomain.length);
		parent.window.open("http://" + companyDomain + "." + ourDomain + "/cms/toUpCmsOrder.do?transOrder.id=" + tradeOrderId);
	} else{
		$.alertPlus("该商铺已被修改或不存在！", 9, "提示");
	}
});

//复制
$(".toCopy").live("click", function(){
	var tradeOrderId = $(this).parents(".oneData").find(".transOrderId").text();
	var companyDomain = $(this).parents(".oneData").find(".companyDomain").text();
	if(companyDomain){
		var ourDomain = window.location.host;
		ourDomain = ourDomain.split(".").length == 2 ? ourDomain : ourDomain.substring(ourDomain.indexOf(".") + 1, ourDomain.length);
		parent.window.open("http://" + companyDomain + "." + ourDomain + "/cms/toCopyOrder.do?transOrder.id=" + tradeOrderId);
	} else{
		$.alertPlus("该商铺已被修改或不存在！", 9, "提示");
	}
});