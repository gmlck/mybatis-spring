$(document).ready(function(){
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
		},
		cityBack: function(data){
			try{$("#beginAddressName").valid();} catch(e){}
		},
		countyBack: function(data){
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
		},
		cityBack: function(data){
			try{$("#endAddressName").valid();} catch(e){}
		},
		countyBack: function(data){
			try{$("#endAddressName").valid();} catch(e){}
		}
 	};
	new $.district(endAddressName).init();
});

$("#resetForm").live("click", function(){
	$("#selPriceForm").find("input").not("[type='button']").val("");
});

//查询运价信息
$("#selPrice").live('click',function (){
	selPrice();
	
});
//enter查询快捷键
$("#selPriceForm").find("input").keyup(function(event) {
	if (event.keyCode == '13')
		selPrice();
});

//查询数据
function selPrice(pageNum, pageSize){
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
		url: "selPrice.do",
		type: "post",
		dataType: "html",
		async: false,
		beforeSend: function(){
			$("#selPrice").attr("disabled", "disabled");
		},
		success: function(data){
			$("#priData").html(data);
			$("#selPrice").removeAttr("disabled");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询操作出错！", 2, "提示");
			$("#selPrice").removeAttr("disabled");
		}
	}
	
	$("#selPriceForm").ajaxSubmit(option);
}

//删除一条
$(".delOne").live("click", function(){
	var id = $(this).attr("id");
	$.confirmPlus("您确定要删除这条运价信息吗?",function(index){
		$.ajax( {
			url : "delOne.do?tradeTransportPrice.id="+id,
			cache : false,
			type : "post",
			dataType: "json",
			success : function(data) {
				if(data.msg =='success'){
					$.alertPlus("操作成功！", 1, "提示");
					selPrice();
				}else{
					$.alertPlus(data.msg, 2, "提示");
				}
			}, 
			error: function(err){
				$.alertPlus("删除操作出错！", 2, "提示");
			}
		});
		$.closePlus(index);
	}, "提示信息", function(index){
		$.closePlus(index);
	}); 
});

//批量删除
$("#delList").live('click', function() {
	var arry = [];
	var checks = $("#priData").find("input[type='checkbox']:checked");
	
	if(checks.length < 1){
		$.alertPlus("您至少要选中一条运价信息！", 9, "提示");
		return false;
	}
	$.each(checks, function(i, check){
		arry.push(checks.eq(i).val());
	});
	$.confirmPlus("您确定要删除这些运价信息吗?",function(index){
		$.ajax( {
			url : "delList.do?tradeTransportPrice.id="+arry,
			cache : false,
			type : "post",
			dataType: "json",
			success : function(data) {
				var msg =data.msg;
				if(data.msg =='success'){
					$.alertPlus("操作成功！", 1, "提示");
					selPrice();
				}else{
					$.alertPlus(data.msg, 2, "提示");
				}
			},
			error: function(err){
				$.alertPlus('网络繁忙,请稍后重试.....', 2, "提示");
			}
		});
		$.closePlus(index);
	}, "提示信息", function(index){
		$.closePlus(index);
	});
});

function getCheckedNos(){
	var checkedNos = [];
	var checks = $("#priData").find("input[type='checkbox']:checked")
	if(checks.length < 1){
		$.alertPlus("请选择要导出的运价！", 9, "提示");
		return false;
	}
	$.each(checks, function(i, check){
		checkedNos.push(checks.eq(i).val());
	});
	return checkedNos;
}

//导出选中运单
$("#exportSelected").live("click", function(){
	var checkedValue = getCheckedNos();
	if(!checkedValue || checkedValue.length < 1){
		return false;
	}
	location.href = "exportPrice.do?tradeTransportPrice.id=" + checkedValue;
});

//导出查询结果
$("#exportQueryed").live("click", function(){
//	if(!$("#conditionForm").valid()){
//		return false;
//	}
	if($(".nodata").text()=="没有查询到符合条件的数据！"){		
		$.alertPlus("您至少要选中一条运价信息！", 9, "提示");
		return false;
	}
	$("#selPriceForm").attr("action", "exportPrice.do");
	$("#selPriceForm").submit();
});
