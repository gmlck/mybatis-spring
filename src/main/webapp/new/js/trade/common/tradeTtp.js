$(document).ready(function(){
	//显示列表视图
	$("#listView").trigger("click");
	
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
		hotCityBack: function(data){},
		proBack: function(data){},
		cityBack: function(data){
			selLineList();
		},
		countyBack: function(data){
			selLineList();
		},
		clearBack: function(){
			selLineList();
		}
 	};
	var beginDistrict = new $.district(beginAddressName);
	beginDistrict.init();
	
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
		hotCityBack: function(data){},
		proBack: function(data){},
		cityBack: function(data){
			selLineList();
		},
		countyBack: function(data){
			selLineList();
		},
		clearBack: function(){
			selLineList();
		}
 	};
	new $.district(endAddressName).init();
	
	
	//显示侧边栏城市
	var cities = beginDistrict.getCities();
	
	$.each(cities, function(i, city){
		//热门城市
		if(city.hotCity){
			$("#hotCity").append("<li id=" + city.id + " name=" + city.name + " proid=" + city.provinceId + " proname=" + city.proName + " title=" + city.name + ">" + city.name + "</li>");
		} 
		
		var firstLetter = city.cityShortPY.substring(0, 1);
		var cityName = city.name.length > 3 ? city.name.substring(0, 3) : city.name;
		$(".cityList."+firstLetter).append("<li id=" + city.id + " name=" + city.name + " proid=" + city.provinceId + " proname=" + city.proName + " title=" + city.name + ">" + cityName + "</li>");
		
	});
	
	if($("#beginProvinceId").val() != "" || $("#endProvinceId").val() != ""){
		$("#switchBeginEnd").removeClass("none");
	}
});

//点击侧边城市
$("ul.cityList li").live("click", function(){
	var id = $(this).attr("id");
	var name = $(this).attr("name");
	var proId = $(this).attr("proid");
	var proName = $(this).attr("proname");
	
	$("#beginProvinceId").val(proId);
	$("#beginCityId").val(id);
	$("#beginProvinceName").val(proName);
	$("#beginCityName").val(name);
	$("#beginAddressName").val(proName + "-" + name);
	selLineList();
});

//切换出发地和到达地
$("#switchBeginEnd").live("click", function(){
	if($(this).hasClass("none")){
		return false;
	}
	var beginAddressName = $("#beginAddressName").val();
	var endAddressName = $("#endAddressName").val();
	
	var beginProvinceId = $("#beginProvinceId").val();
	var beginCityId = $("#beginCityId").val();
	var beginCountyId = $("#beginCountyId").val();
	var beginProvinceName = $("#beginProvinceName").val();
	var beginCityName = $("#beginCityName").val();
	var beginCountyName = $("#beginCountyName").val();
	
	var endProvinceId = $("#endProvinceId").val();
	var endCityId = $("#endCityId").val();
	var endCountyId = $("#endCountyId").val();
	var endProvinceName = $("#endProvinceName").val();
	var endCityName = $("#endCityName").val();
	var endCountyName = $("#endCountyName").val();
	
	$("#beginAddressName").val(endAddressName);
	$("#endAddressName").val(beginAddressName);
	
	$("#beginProvinceId").val(endProvinceId);
	$("#beginCityId").val(endCityId);
	$("#beginCountyId").val(endCountyId);
	$("#beginProvinceName").val(endProvinceName);
	$("#beginCityName").val(endCityName);
	$("#beginCountyName").val(endCountyName);
	
	$("#endProvinceId").val(beginProvinceId);
	$("#endCityId").val(beginCityId);
	$("#endCountyId").val(beginCountyId);
	$("#endProvinceName").val(beginProvinceName);
	$("#endCityName").val(beginCityName);
	$("#endCountyName").val(beginCountyName);
	
	selLineList();
});

//选择配送增值服务条件后设置到隐藏表单里
$("#eleCondition").find("dd.deliveryServing").live("click", function(){
	$("#conditionForm #deliveryServing").val($(this).attr("id"));
	selLineList();
});

//选择增值服务条件后设置到隐藏表单里
$("#eleCondition").find("dd.basicServing").live("click", function(){
	$("#conditionForm #basicServing").val($(this).attr("id"));
	selLineList();
});

//选择组货方式条件后设置到隐藏表单里
$("#eleCondition").find("dd.goodsGroup").live("click", function(){
	$("#conditionForm #goodsGroup").val($(this).attr("id"));
	selLineList();
});

//排序条件
$("#sortCondition").find("dd").live("click", function(){
	var orderByIndex = $("#conditionForm #orderByIndex").val();
	var liftIndex = $("#conditionForm #liftIndex").val();
	liftIndex = orderByIndex == $(this).attr("id") ? (liftIndex == "1" ? "2" : "1") : "1";
	
	$("#conditionForm #orderByIndex").val($(this).attr("id"));
	$("#conditionForm #liftIndex").val(liftIndex);
	selLineList();
});

//重置查询条件
$("#resetCondition").live("click", function(){
	$("#conditionForm #deliveryServing").val("");
	$("#conditionForm #basicServing").val("");
	$("#conditionForm #goodsGroup").val("");
	$("#conditionForm #orderByIndex").val("");
	$("#eleCondition").find("dd").removeClass('visited');
	
	$("#beginAddressName").val("");
	$("#endAddressName").val("");
	
	$("#beginProvinceId").val("");
	$("#beginCityId").val("");
	$("#beginCountyId").val("");
	$("#beginProvinceName").val("");
	$("#beginCityName").val("");
	$("#beginCountyName").val("");
	
	$("#endProvinceId").val("");
	$("#endCityId").val("");
	$("#endCountyId").val("");
	$("#endProvinceName").val("");
	$("#endCityName").val("");
	$("#endCountyName").val("");
	
	$("#sortCondition dd span").text("");
	selLineList();
});

/**
 * 查询线路运价
 * @param pageNum
 * @param pageSize
 */
function selLineList(pageNum, pageSize){
	var beginAddressName = $("#beginAddressName").val();
	var endAddressName = $("#endAddressName").val();
	if(beginAddressName || endAddressName){
		$("#switchBeginEnd").removeClass("none");
	} else{
		$("#switchBeginEnd").addClass("none");
	}
	
	if(!pageNum || pageNum < 1){
		pageNum = 1 ;
	}
	
	if(!pageSize || pageSize < 1){
		pageSize = 10;
	}
	
	$("#pageSize").val(pageSize);
	$("#pageNum").val(pageNum);
	
	var viewTab = $("#listView").hasClass("visited") ? "#listView" : "#largeView";
	
	//异步提交表单
	var option = {
		url: "selLineList.do",
		type: "post",
		dataType: "html",
		async: false,
		success: function(data){
			$("#ttpListDiv").html(data);
			$("#lineCount").text($("#resultCount").val());
			$("#productCount").text($("#resultProductCount").val());
			
			//控制显示的视图方式
			$("#ttpListDiv").find(".list_style div").removeClass("visited");
			$("#ttpListDiv").find(".list_style " + viewTab).addClass("visited");
			$(viewTab + "TabSon").show();
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
		url: "../trade/addCollect.do",
		type: "post",
		dataType: "json",
		data: {"lineId": lineId},
		success: function(data){
			if(data.msg == "success"){
				layer.alert("收藏成功！", 1, "提示");
				thisObj.removeClass("collect").removeClass("addCollect").addClass("collectd");
				thisObj.text("已收藏");
			} else{
				layer.alert(data.msg, 2, "提示");
			}
		},
		error: function(err){
			layer.alert("加入收藏操作失败！", 2, "提示");
		}
	});
});


$(function(){
	$('.city_list').find('li').live('click', function(){
		$(this).parents('.city_list').find('li').removeClass('visited');
		$(this).addClass('visited');
	});
	
	$('.city_list').find('dt').live('click', function(){
		if($(this).find('span').hasClass('show')){
			$(this).next('dd').animate({ height:'hide'},200);
			$(this).find('span').removeClass('show');
		}else{
			$(this).next('dd').animate({ height:'show'},200);
			$(this).find('span').addClass('show');
		}
	});
	
	$('.select').find('dd').live('click', function(){
		$(this).parents('dl').find('dd').removeClass('visited');
		$(this).addClass('visited');
	});
	
	$('.line').find('.div4').find('a').live('mouseover',function(){
		$(this).parents('.div4').find('.price').show();
	});
	$('.line').find('.div4').find('a').live('mouseout',function(){
		$(this).parents('.div4').find('.price').hide();
	});
});