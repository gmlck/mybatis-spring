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
		},
		cityBack : function(data) {
			 $("#senderAddressSelect").valid();
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
		},
		cityBack : function(data) {
			 $("#receiverAddressSelect").valid();
		},
		countyBack : function(data) {
			 $("#receiverAddressSelect").valid();
		}
	};
	new $.district(receiverAddress).init();

	$(".numInput").trigger("blur");
			
});
$("#resetForm").live("click", function(){
	$("#fuzzyMatching").find("input").not("[type='button']").val("");
	$("#vehicleTypeCode_spinner_text").html("请选择");
	
	$.ajax({
		url: "fuzzyMatching.do",
		type: "post",
		dataType: "html",
		async: false,
		beforeSend: function(){
			$("#fuzzyMatching").attr("disabled", "disabled");
		},
		success: function(data){
			$("#dataForm").html(data);
			$("#fuzzyMatching").removeAttr("disabled");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询操作出错！", 2, "提示");
			$("#fuzzyMatching").removeAttr("disabled");
		}
	});
});

//结束回程车
$(".endTradeTransportReturn").live("click", function(){
	var endId = $(this).attr("id");
	$("#"+endId).addClass("hiddenClass");
	$("#"+endId+"_edit").addClass("hiddenClass");
	$("#"+endId+"_end_label").removeClass("hiddenClass");
	$("#"+endId+"_edit_label").removeClass("hiddenClass");
	
	$.ajax({
		url: "endTradeTransportReturn.do",
		type: "post",
		dataType: "json",
		data:"endId="+endId,
		beforeSend: function(){
//				$(this).attr("disabled", true);
		},
		success: function(data){
			//alert($("#"+endId+"_span").html("dora.."));
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("结束回程车操作出错！", 2, "提示");
			$("#"+endId).removeClass("hiddenClass");
			$("#"+endId+"_edit").removeClass("hiddenClass");
			$("#"+endId+"_end_label").addClass("hiddenClass");
			$("#"+endId+"_edit_label").addClass("hiddenClass");
		}
	});
});


//批量删除
$("#delList").live('click', function() {
	var arry = [];
	var checks = $(".data_box").find("input[type='checkbox']:checked");
	
	if(checks.length < 1){
		$.alertPlus("您至少要选中一条回程车信息！", 9, "提示");
		return false;
	}
	$.each(checks, function(i, check){
		arry.push(checks.eq(i).val());
	});
	
	$.confirmPlus("您确定要删除这些回程车信息吗?",function(index){
		$.ajax( {
			url : "deleteTradeTransportReturn.do?delIds="+arry,
			cache : false,
			type : "post",
			dataType: "json",
			success : function(data) {
				$.alertPlus("操作成功！", 1, "提示");
				fuzzyMatchingTradeTransportReturn();
			},
			error: function(err){
				$.alertPlus('网络繁忙，请稍候！', 2, "提示");
			}
		});
		$.closePlus(index);
	}, "提示信息", function(index){
		$.closePlus(index);
	});

});

function getCheckedNos(){
	var checkedNos = [];
	var checks = $(".data_box").find("input[type='checkbox']:checked");
	if(checks.length < 1){
		$.alertPlus("请选择要导出的回程车！", 9, "提示");
		return false;
	}
	$.each(checks, function(i, check){
		checkedNos.push(checks.eq(i).val());
	});
	return checkedNos;
}

//导出查询结果
$("#exportQueryed").live("click", function(){
	if($(".nodata").text()=="没有查询到符合条件的数据！"){		
		$.alertPlus("您至少要选中一条回程车信息！", 9, "提示");
		return false;
	}
	$("#fuzzyMatching").attr("action", "exportReturnCars.do");
	$("#fuzzyMatching").submit();
});

//导出选中回程车
$("#exportSelected").live("click", function(){
	var checkedValue = getCheckedNos();
	if(!checkedValue || checkedValue.length < 1){
		return false;
	}
	location.href = "exportReturnCars.do?ids=" + checkedValue;
});

//查询数据
function fuzzyMatchingTradeTransportReturn(pageNum, pageSize){
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	$("#pageNum").val(pageNum);
	$("#pageSize").val(pageSize);
	
	//异步提交表单
	var option = {
		url: "fuzzyMatching.do",
		type: "post",
		dataType: "html",
		async: false,
		beforeSend: function(){
			$("#fuzzyMatching").attr("disabled", "disabled");
		},
		success: function(data){
			$("#dataForm").html(data);
			$("#fuzzyMatching").removeAttr("disabled");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询操作出错！", 2, "提示");
			$("#fuzzyMatching").removeAttr("disabled");
		}
	}
	
	$("#fuzzyMatching").ajaxSubmit(option);
}

//查询回程车信息
$("#fuzzyMatchingTradeTransportReturn").live('click',function (){
	fuzzyMatchingTradeTransportReturn();
});