$(function() {
	//显示列表视图
	$("#listView").trigger("click");
	
	$('.city_list').find('li').live('click', function() {
		$(this).parents('.city_list').find('li').removeClass('visited');
		$(this).addClass('visited');
	});

	$('.city_list').find('dt').live('click', function() {
		if ($(this).find('span').hasClass('show')) {
			$(this).next('dd').animate({
				height : 'hide'
			}, 200);
			$(this).find('span').removeClass('show');
		} else {
			$(this).next('dd').animate({
				height : 'show'
			}, 200);
			$(this).find('span').addClass('show');
		}
	});

	$('.select').find('dd').live('click', function() {	
		if($(this).hasClass('visited')){
			$(this).removeClass('visited');		
		}else{
			$(this).addClass('visited');
		}
	});

	$('.lines').find('.div4').find('a').live('mouseover', function() {
		$(this).parents('.div4').find('.price').show();
	});
	$('.lines').find('.div4').find('a').live('mouseout', function() {
		$(this).parents('.div4').find('.price').hide();
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
		hotCityBack: function(data){},
		proBack: function(data){},
		cityBack: function(data){
			queryDetailList();
		},
		countyBack: function(data){
			queryDetailList();
		},
		clearBack: function(){
			queryDetailList();
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
		hotCityBack: function(data){},
		proBack: function(data){},
		cityBack: function(data){
			queryDetailList();
		},
		countyBack: function(data){
			queryDetailList();
		},
		clearBack: function(){
			queryDetailList();
		}
	};
	new $.district(endAddressName).init();
	
	if($("#beginProvinceId")!=""||$("#endProvinceId")!=""){
		$("#switchBeginEnd").removeClass("none");
	}
});

//$(".list_style div").each(function(){
//	$(this).live("click", function(){
//		alert("clicking..");
////		$("#viewTabFlag").val($(this).attr("id"));
//		queryDetailList();			
//	});
//});

//$("#listView").live("click", function(){
//	alert("listViewClicking...");
////	var viewTab = $(this).attr("id");
////	$("#viewTabFlag").val(viewTab);
////	//控制显示的视图方式
////	queryDetailList();			
////	$("#ttrListDiv").find(".list_style div").removeClass("visited");
////	$("#ttrListDiv").find(".list_style " + viewTab).addClass("visited");
//});

//$("#largeView").live("click", function(){	
//	alert("largeViewClicking...");
//	setImages();
////	$("#viewTabFlag").val($(this).attr("id"));
////	//控制显示的视图方式
////	queryDetailList();			
////	$("#ttrListDiv").find(".list_style div").removeClass("visited");
////	$("#ttrListDiv").find(".list_style " + viewTab).addClass("visited");
//});


//图片处理算法
function image_download_clip(img_url, dst_width, dst_height, container_id) {
	var img = new Image();
	img.onload = function() {
		$("#" + container_id + " img").attr("src", img.src);// dst_img_container

		// 原图尺寸
		var src_image_width = img.width;
		var src_image_height = img.height;

		var display_width = dst_width;
		var display_height = dst_height;
		if (display_width <= 0 || display_height <= 0
				|| src_image_width <= 0 || src_image_height <= 0) {
			return;
		}

		// height归一化，求width
		var normal_image_width = src_image_width / src_image_height;
		var normal_display_width = display_width / display_height;

		// 比较normal_width，求缩放率
		var scale = display_height / src_image_height;
		if (normal_image_width < normal_display_width) {// 原图归一化后width不够，以width为准进行缩放
			scale = display_width / src_image_width;
		}

		// 目标图像尺寸
		var dst_image_width = src_image_width * scale;
		var dst_image_height = src_image_height * scale;

		// 计算居中平移量
		var dst_image_offset_left = (dst_image_width - display_width) / 2.0;
		var dst_image_offset_top = (dst_image_height - display_height) / 2.0;

		// 缩放、平移
		$("#" + container_id).width(display_width);
		$("#" + container_id).height(display_height);
		$("#" + container_id + " img").width(dst_image_width);
		$("#" + container_id + " img").height(dst_image_height);
		$("#" + container_id + " img").css(
				"margin",
				"-" + dst_image_offset_top + "px 0px 0px -"
						+ dst_image_offset_left + "px");
	};
	img.src = img_url;
}

//设置图片
function setImages() {
	var $allVehicleImagesElements = $(".vehicle_img");
	for (var i = 0; i < $allVehicleImagesElements.length; i++) {
		var id = $allVehicleImagesElements.eq(i).attr("id");
		var _id = $allVehicleImagesElements.eq(i).attr("_id");
		image_download_clip(_id, 177, 106, id);
	}
}
setImages();

//  查询列表
function queryDetailList(pageNum, pageSize){
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
//		if($("#viewTabFlag").val=="listView"){			
//			pageSize = 7;
//		}
//		if($("#viewTabFlag").val=="largeView"){			
//			pageSize = 16;
//		}
		pageSize = 20;
	}
	
	$("#pageSize").val(pageSize);
	$("#pageNum").val(pageNum);
	
	var viewTab = $("#listView").hasClass("visited") ? "#listView" : "#largeView";
	$("#viewTabFlag").val(viewTab);

	//异步提交表单
	var option = {
		url: "queryDetailList.do",
		type: "post",
		dataType: "html",
		async: false,
		success: function(data){
			$("#ttrListDiv").html(data);

			$("#lineCount").text($("#resultLineCount").val());
			$("#productCount").text($("#resultProductCount").val());
			
			//控制显示的视图方式
			$("#ttrListDiv").find(".list_style div").removeClass("visited");
			$("#ttrListDiv").find(".list_style " + viewTab).addClass("visited");
			$(viewTab + "TabSon").show();
			
			//处理，加载图片
			setImages();
			//刷新结束时间
			refreshTimer();
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alertPlus("查询操作出错！", 2, "提示");
		}
	}
	
	$("#filterForm").ajaxSubmit(option);
}

//点击侧边城市
$("ul.cityList li").live("click", function(){
	resetFilterUI();
	var id = $(this).attr("id");
	var name = $(this).attr("name");
	var proId = $(this).attr("proid");
	var proName = $(this).attr("proname");
	
	$("#beginProvinceId").val(proId);
	$("#beginCityId").val(id);
	$("#beginProvinceName").val(proName);
	$("#beginCityName").val(name);
	$("#beginAddressName").val(proName + "-" + name);
	queryDetailList();
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
	
	queryDetailList();
});

//重置查询条件
function resetFilterUI(){
	$("#filterForm #deliveryServing").val("");
	$("#filterForm #basicServing").val("");
	$("#filterForm #valueAddedServices").val("");
	$("#filterForm #goodsGroupId").val("");

	$("#filterForm #sortingColumn").val("");
	$("#filterForm #sorting").val("");
	
	$("#filterForm").find("dd").removeClass('visited');
	
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
	
	$('.select').find('dd').removeClass("visited");
	$("#filterForm #sortingColumn").val("");
	$("#filterForm #sorting").val("");
	$("#sortFilter dd span").text("");
}

//重置查询条件
$("#resetFilter").live("click", function(){
	resetFilterUI();
	queryDetailList();
});


function setValueAddedServices(){
	$("#filterForm #valueAddedServices").val($("#filterForm #deliveryServing").val()+$("#filterForm #basicServing").val());
}

//选择配送增值服务条件后设置到隐藏表单里
$("#eleFilter").find("dd.deliveryServing").live("click", function(){
	if($("#filterForm #deliveryServing").val()!=''){
		if($("#filterForm #deliveryServing").val().indexOf($(this).attr("id")) < 0){			
			$("#filterForm #deliveryServing").val($("#filterForm #deliveryServing").val()+$(this).attr("id")+",");
		}else{
			$("#filterForm #deliveryServing").val($("#filterForm #deliveryServing").val().replace($(this).attr('id')+',',""));
		}
	}else{
		$("#filterForm #deliveryServing").val($(this).attr("id")+",");
	}
	setValueAddedServices();
	queryDetailList();
});

//选择增值服务条件后设置到隐藏表单里
$("#eleFilter").find("dd.basicServing").live("click", function(){
	if($(this).attr("id")!="TRANSPORT_VALUEADDED_BASIC_SMS"){		
		if($("#filterForm #basicServing").val()!=''){
			if($("#filterForm #basicServing").val().indexOf($(this).attr("id")) < 0){			
				$("#filterForm #basicServing").val($("#filterForm #basicServing").val()+$(this).attr("id")+",");
			}else{
				$("#filterForm #basicServing").val($("#filterForm #basicServing").val().replace($(this).attr('id')+',',""));
			}
		}else{
			$("#filterForm #basicServing").val($(this).attr("id")+",");
		}
		setValueAddedServices();
		queryDetailList();
	}
});

//选择组货方式条件后设置到隐藏表单里
$("#eleFilter").find("dd.goodsGroup").live("click", function(){
	if($("#filterForm #goodsGroupId").val()!=''){
		if($("#filterForm #goodsGroupId").val().indexOf($(this).attr("id")) < 0){			
			$("#filterForm #goodsGroupId").val($("#filterForm #goodsGroupId").val()+$(this).attr("id")+",");
		}else{
			$("#filterForm #goodsGroupId").val($("#filterForm #goodsGroupId").val().replace($(this).attr('id')+',',""));
		}
	}else{
		$("#filterForm #goodsGroupId").val($(this).attr("id")+",");
	}
	queryDetailList();
});

//排序条件
$("#sortFilter").find("dd").live("click", function(){
	var sortingColumn = "";
	var sorting = "";	
	var id = $(this).attr("id");
	switch(id){
		case "sort1": sortingColumn = "ttr.weight_goods_price"; break;
		case "sort2": sortingColumn = "ttr.light_goods_price"; break;
		case "sort3": sortingColumn = "ttr.fail_date"; break;
		case "sort4": sortingColumn = "temp.tradingVolume"; break;
		case "sort5": sortingColumn = "temp.avgRating"; break;
		default: sortingColumn = ""; break;
	}
	
	if($(this).find('span').text()==""){
		sorting = "asc";
	}	
	if($(this).find('span').text()=="↓"){
		sorting = "asc";
	}	
	if($(this).find('span').text()=="↑"){
		sorting = "desc";
	}
	
	$("#filterForm #sortingColumn").val(sortingColumn);
	$("#filterForm #sorting").val(sorting);
	queryDetailList();
});
