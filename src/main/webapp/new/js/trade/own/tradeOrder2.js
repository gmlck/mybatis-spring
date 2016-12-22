
$('.filtrate').find("li:not([class = 'title'])").live('click',function(){
	$(this).parents('ul').find("li:not([class = 'title'])").removeClass('visited');
	$(this).addClass('visited');
});

//选择配送增值服务条件后设置到隐藏表单里
$("#eleCondition").find("li.deliveryServing").live("click", function(){
	$("#conditionForm #deliveryServing").val($(this).attr("id"));
	selPrice();
});

//选择增值服务条件后设置到隐藏表单里
$("#eleCondition").find("li.basicServing").live("click", function(){
	$("#conditionForm #basicServing").val($(this).attr("id"));
	selPrice();
});

//选择组货方式条件后设置到隐藏表单里
$("#eleCondition").find("li.goodsGroup").live("click", function(){
	$("#conditionForm #goodsGroup").val($(this).attr("id"));
	selPrice();
});

//排序条件
$("#sortCondition").find("dd").live("click", function(){
	var orderByIndex = $("#conditionForm #orderByIndex").val();
	if(orderByIndex == $(this).attr("id")){
		$("#conditionForm #liftIndex").val("2");
	} else{
		$("#conditionForm #orderByIndex").val($(this).attr("id"));
		$("#conditionForm #liftIndex").val("1");
	}
	selPrice();
});

//重置查询条件
$("#resetCondition").live("click", function(){
	$("#conditionForm #deliveryServing").val("");
	$("#conditionForm #basicServing").val("");
	$("#conditionForm #goodsGroup").val("");
	$("#conditionForm #orderByIndex").val("");
	$("#eleCondition").find("li:not([class = 'title'])").removeClass('visited');
	selPrice();
});

$(function(){
	/**
	 * 选择线路并到第三步
	
	$(".selectLine").live("click", function(){
		var tradeOrderId = $("#tradeOrderId").val();
		var tradeOrderLineId = $(this).attr("id");
		$.ajax({
			url: "addOrder2.do",
			type: "post",
			data: {"tradeOrderLine.tradeOrderId": tradeOrderId, "tradeOrderLine.lineId": tradeOrderLineId},
			dataType: "json",
			success: function(data){
				if(data.msg == "success"){
					//发货下单第2步操作跳转到第3步下单
					location.href = "toOrder3.do?tradeOrder.id=" + data.tradeOrderLine.tradeOrderId;
				} else{
					$("#msg").val(data.msg);
					$("#order2RedirectForm").attr("action", "toTips.do");
					$("#order2RedirectForm").submit();
				}
			},
			error: function(err){
				layer.alert("选择线路操作出错！", 2, "提示");
			}
		});
	}); */
	
	$(".selectLine").live("click", function(){
		var tradeOrderLineId = $(this).attr("id");
		$("#toOrder3Form").find("#lineId").val(tradeOrderLineId);
		$("#toOrder3Form").submit();
	});
	
	
	$('.lines').find('.div4').find('a').live('mouseover',function(){
		$(this).parents('.div4').find('.price').show();
	});
	$('.lines').find('.div4').find('a').live('mouseout',function(){
		$(this).parents('.div4').find('.price').hide();
	});
});

/**
 * 查询线路运价
 * @param pageNum
 * @param pageSize
 */
function selPrice(pageNum, pageSize){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	
	$("#pageSize").val(pageSize);
	$("#pageNum").val(pageNum);
	
	//异步提交表单
	var option = {
		url: "selPrice.do",
		type: "post",
		dataType: "html",
		async: false,
		success: function(data){
			$("#priceListDiv").html(data);
			$("#lineCount").text($("#priceListDiv #resultCount").val());
			$("#productCount").text($("#priceListDiv #resultProductCount").val());
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询操作出错！", 2, "提示");
		}
	}
	
	$("#conditionForm").ajaxSubmit(option);
}

/**
 * 加入收藏
 */
$(".addCollect").live("click", function(){
	var thisObj = $(this);
	var lineId = thisObj.attr("id");
	$.ajax({
		url: "addCollect.do",
		type: "post",
		dataType: "json",
		data: {"lineId": lineId},
		success: function(data){
			if(data.msg == "success"){
				layer.alert("收藏成功！", 1, "提示");
				thisObj.removeClass("collect").removeClass("addCollect").addClass("collectd");
				thisObj.text("已收藏");
			} else{
				layer.alert("加入收藏操作失败！", 2, "提示");
			}
		},
		error: function(err){
			layer.alert("加入收藏操作失败！", 2, "提示");
		}
	});
});
