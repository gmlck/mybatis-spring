var t = n =0, count;

function bannerLiClick(obj) {
	var i = $(obj).index();
	n = i;
	if (i >= count) return;
	$("#banner_list div").filter(":visible").fadeOut(1000).parent().children().eq(i).fadeIn(1000);
	document.getElementById("banner").style.background="";
	$(obj).toggleClass("on");
	$(obj).siblings().removeAttr("class");
}

$(function(){
	count=$("#banner_list div").length;

	$("#banner_list div:not(:first-child)").hide();

	$("#banner ul").css('left', ($("#banner").width() - $("#banner ul").width() + 20)/2);

	$("#banner li").click(function(){
		bannerLiClick(this);
	});
	
	t = setInterval("showAuto()", 4000);
	$("#banner").hover(function(){
		clearInterval(t);
	}, function(){
		t = setInterval("showAuto()", 4000);
	});
	
	$('input.myd').hover(function(){
		$(this).val('在线管业务');
	}, function(){
		$(this).val('进入满意达');
	});
	
	$('input.myp').hover(function(){
		$(this).val('在线管配送');
	}, function(){
		$(this).val('进入满意配');
	});
	
	//获取当前时间(王云鹤)
	weekToDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]; 
	var date=new Date();
	var vMon = date.getMonth() + 1;
	var vDay = date.getDate();
	vMon=vMon<10 ? "0" + vMon : vMon;
	vDay=vDay<10 ? "0"+ vDay : vDay;
	//alert(vYear+"年"+vMon+"月"+vDay+"日"+weekToDay[date.getDay()]);
	$("#month").text(vMon+"月");
	$("#day").text(vDay+"日");
	$("#week").text(weekToDay[date.getDay()]);
});

function showAuto(){
	n = n >=(count -1) ?0 : ++n;
	bannerLiClick($("#banner li").eq(n)[0]);
//	$("#banner li").eq(n).trigger('click');
};

var companyPage = 1;
var companyPageCount = 5; //每版放5个图片
function franchiseeRightClick(obj){    //绑定click事件
	var $parent = $(obj).parents("div.franchisee");//根据当前点击元素获取到父元素
	var $v_show = $parent.find("div.franchisees ul"); //找到“视频内容展示区域”
	var v_width = $parent.find(".ul_box").width()+30;
	var len = $v_show.find("li").length;
//	var page_count = len - companyPageCount + 1;
	var page_count = Math.ceil(len / companyPageCount) ;

	if( companyPage == page_count ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
		$v_show.animate({ left : '0px'}, 2000); //通过改变left值，跳转到第一个版面
		companyPage = 1;
	}else{
		$v_show.animate({ left : '-='+v_width }, 2000);  //通过改变left值，达到每次换一个版面
		companyPage++;
	}
//	$parent.find("span").eq((companyPage-1)).addClass("current").siblings().removeClass("current");
}

function franchiseeLeftClick(obj){
	var $parent = $(obj).parents("div.franchisee");//根据当前点击元素获取到父元素
	var $v_show = $parent.find("div.franchisees ul"); //寻找到“视频内容展示区域”
	var v_width = $parent.find(".ul_box").width()+30;
	var len = $v_show.find("li").length;
	var page_count = Math.ceil(len / companyPageCount) ;
	if( companyPage == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
		$v_show.animate({ left : '-='+v_width*(page_count-1) }, 2000);
		companyPage = page_count;
	}else{
		$v_show.animate({ left : '+='+v_width }, 2000);
		companyPage--;
	}
//	$parent.find("span").eq((companyPage-1)).addClass("current").siblings().removeClass("current");
}

$(function(){
	
	$(".franchisee").find('ul').width($(".franchisee").find('li').width() * $(".franchisee").find('li').length + $(".franchisee").find('li').length * 30);
	
	//向后 按钮
	$("div.franchisee div.right").click(function(){
		franchiseeRightClick(this);
	});
	//往前 按钮
	$("div.franchisee div.left").click(function(){
		franchiseeLeftClick(this);
	});
});

$(function(){
	var timer1 = '';
	var timer2 = '';
	var companyPage = 1;
	var companyPageCount = 5;
	var $parent = $("div.franchisee div.left").parents("div.franchisee");//根据当前点击元素获取到父元素
	var $v_show = $parent.find("div.franchisees ul"); //找到“视频内容展示区域”
	var len = $v_show.find("li").length;
	var page_count = Math.ceil(len / companyPageCount) ;
	timer1 = setInterval(function(){
//		$("div.to_right").trigger("click");
	}, 5000);
	var sroee=1;
	timer2 = setInterval(function(){
		if(companyPage<=page_count && sroee==1){
			companyPage++;
			if(companyPage==page_count){
				sroee=2;
			}
			franchiseeRightClick($("div.franchisee div.right")[0]);
//			$("div.franchisee div.right").trigger("click");
		}else if(companyPage>=1 && sroee==2){
			companyPage--;
			if(companyPage==1){
				sroee=1;
			}
			franchiseeLeftClick($("div.franchisee div.left")[0]);
//			$("div.franchisee div.left").trigger("click");
		}
	}, 
	5000);

	$(".franchisees").mouseover(function(){
		clearInterval(timer2);
	});

	$(".franchisees").mouseout(function(){
		timer2 = setInterval(function(){
			franchiseeRightClick($("div.right")[0]);
//			$("div.right").trigger("click");
		}, 5000);
	});
});


function validateBillNos(billNos){
	if(!billNos){
		layer.alert("请输入运单号！", 2, "提示");
		return false;
	}
	if(billNos.length>70){
		layer.alert("运单号最大输入70位字符!", 2, "提示");
		return false;
	}
	billNos = billNos.replace(/，/g,',').replace(/\r\n/g,',').replace(/\n/g,",").replace(/,,/g,",");
	var data = billNos.split(",");
	if(data.length > 5){
		layer.alert("一次最多查询5个单号！", 2, "提示");
		return false;
	};
	
	if(data.length > 0){
		for(var i=0; i<data.length; i++){
			if(data[i].length != 12){
					layer.alert("请正确输入运单号,每个运单号的长度为12！", 2, "提示");
					return false;
			}
		}
	}
	var toFilter = new RegExp("[<|>|%|*]");
	var flag = true;
	for(i=0; i<data.length; i++){
		if (toFilter.test(data[i])) {
			layer.alert("请输入正确的运单号！", 2, "提示");
			flag = false;
		};
	} 
	
	return flag;
}

//运单跟踪 开始
function findWayBill(){
	var billNos = $("#allBills").val();
	if(!billNos || billNos == $("#allBills").attr("ov")){
		layer.alert("请输入您的运单号!",2,"提示");
		return;
	}
	var validateCodeRegex = /^[\w\d]{4}$/;
	var validateCode = $("#validateCode").val();
	if(validateCode=="" || validateCode=="undefined" || validateCode == undefined ){
		layer.alert("请输入验证码!",2,"提示");
		return;
	}
	if(!validateCodeRegex.test(validateCode)){
		layer.alert("验证码格式错误!",2,"提示");
		return;
	}
	var result = validateBillNos(billNos);
	if(result === true){
		window.open("queryTrajectorysWithCode.do?blNo="+billNos+"&validateCode="+validateCode);
	}
}

function findBillDataAjax(){
	var billNos = $("#allBills").val();
	if(!validateBillNos(billNos)){
		return;
	}
	var validateCodeRegex = /^[\w\d]{4}$/;
	var validateCode = $("#validateCode").val();
	if(validateCode==null || validateCode=="" || validateCode=="undefined" || validateCode==undefined){
		layer.alert("请输入验证码!",2,"提示");
		return;
	}
	if(!validateCodeRegex.test(validateCode)){
		layer.alert("验证码格式错误!",2,"提示");
		return;
	}
	$("#validateCode").val("");
	$.ajax({
		url:"queryTrajectorysWithCode.do",
		type:"post",
		data:{"blNo":billNos,"validateCode":validateCode,"trajectoryReturn":"billDataJsp"},
		cache:false,
		async:false,
		success:function(data){
			$("#billDataDiv").html(data);
			if($.trim($("#msg").val())!="success"){
				layer.alert($("#msg").val(),2,"提示");
			}else{
				$("#valdiateImgSelect").click();
			}
		},
		error:function(data){
			
		}
	});
	$.fn.tab_init();
}

function refresh(imgObj){
	var imgObject = $(imgObj)[0];
	imgObject.src = "makeValidateCode.do?ss="+Math.random();
}
//运单跟踪 结束

//线路发布需求开始
$(document).ready(function(){
	// 初始化地址控件
	try{
		var settingBegin = {
			id : "beginPlaceTopBeg", //要使用弹出层选择省市区功能的input文本框ID
			countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
			isShowProvince : true, //选择省份后是否立即显示到文本框
			isShowCity : true, //选择城市后是否立即显示到文本框
			proId : $("#beginProvinceIdTopBeg"), //要设置省份ID的文本框
			proName : $("#beginProvinceNameTopBeg"), //要设置省份名称的文本框
			cityId : $("#beginCityIdTopBeg"), //要设置城市ID的文本框
			cityName : $("#beginCityNameTopBeg"), //要设置城市名称的文本框
			countyId : $("#beginCountyIdTopBeg"), //要设置区县ID的文本框
			countyName : $("#beginCountyNameTopBeg"), //要设置区县名称的文本框
			proUrl : "common/queryProvince.action", //获取省份数据的访问地址
			cityUrl : "common/queryCities.action", //获取城市数据的访问地址
			countyUrl : "common/queryCounties.action", //获取区县数据的访问地址
			countyByCityUrl : "common/queryCountyByCity.action" //根据城市ID获取区县的访问地址
		}
		new $.district(settingBegin).init(); //创建对象并初始化
		var settingEnd = {
			id : "endPlaceTopBeg", //要使用弹出层选择省市区功能的input文本框ID
			countySync : true, //true:根据城市ID查询区县; false: 一次性查询所有区县
			isShowProvince : true, //选择省份后是否立即显示到文本框
			isShowCity : true, //选择城市后是否立即显示到文本框
			proId : $("#endProvinceIdTopBeg"), //要设置省份ID的文本框
			proName : $("#endProvinceNameTopBeg"), //要设置省份名称的文本框
			cityId : $("#endCityIdTopBeg"), //要设置城市ID的文本框
			cityName : $("#endCityNameTopBeg"), //要设置城市名称的文本框
			countyId : $("#endCountyIdTopBeg"), //要设置区县ID的文本框
			countyName : $("#endCountyNameTopBeg"), //要设置区县名称的文本框
			proUrl : "common/queryProvince.action", //获取省份数据的访问地址
			cityUrl : "common/queryCities.action", //获取城市数据的访问地址
			countyUrl : "common/queryCounties.action", //获取区县数据的访问地址
			countyByCityUrl : "common/queryCountyByCity.action" //根据城市ID获取区县的访问地址
		}
		new $.district(settingEnd).init(); //创建对象并初始化
	}catch(e){
		alert(e);
	}
});

/**
 * 线路申请
 * @returns {Boolean}
 */
function releaselinebeg(){
	var beginPlace = $("#beginPlaceTopBeg").val();
	if(beginPlace!=undefined && beginPlace.length <= 0){
		layer.alert("请选择出发地!",2,"提示");
		return false;
	}
	
	var endPlace = $("#endPlaceTopBeg").val();
	if(endPlace!=undefined && endPlace.length <= 0){
		layer.alert("请选择目的地!",2,"提示");
		return false;
	}
	$("#releaselinebegForm").ajaxSubmit({
		url:"releaselinebeg.do",
		type:"post",
		cache:false,
		async:false,
		success:function(data){
			if(data.isSuccess=="Y"){
				$("#beginPlaceTopBeg").val("");
				$("#beginProvinceIdTopBeg").val("");
				$("#beginCityIdTopBeg").val("");
				$("#beginCountyIdTopBeg").val("");
				$("#beginProvinceNameTopBeg").val("");
				$("#beginCityNameTopBeg").val("");
				$("#beginCountyNameTopBeg").val("");
				$("#endPlaceTopBeg").val("");
				$("#endProvinceIdTopBeg").val("");
				$("#endCityIdTopBeg").val("");
				$("#endCountyIdTopBeg").val("");
				$("#endProvinceNameTopBeg").val("");
				$("#endCityNameTopBeg").val("");
				$("#endCountyNameTopBeg").val("");
				layer.alert("我们已收到您的反馈，正在努力完善线路，谢谢支持！",1,"提示");
			}else{
				layer.alert("提交失败!",2,"提示");
			}
		},
		error:function(data){
			layer.alert("服务器正忙,请稍后再试!",1,"提示");
		} 
	});
}
//线路发布需求结束

//回程车
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

////倒计时
//function count_down(o){
//	var obj = o.attr("value");
//    var www_qsyz_net=/^[\d]{4}-[\d]{1,2}-[\d]{1,2}( [\d]{1,2}:[\d]{1,2}(:[\d]{1,2})?)?$/ig,str='',conn,s;
//    if(!obj.match(www_qsyz_net)){
//            //alert('参数格式为2012-01-01[ 01:01[:01]].\r其中[]内的内容可省略');
//            return false;
//    }
//    var sec=(new Date(obj.replace(/-/ig,'/')).getTime() - new Date().getTime())/1000;
//    if(sec > 0){
//            conn='还有';
//    }else{
//            conn='已';
//            sec*=-1;
//    }
//    if(conn=="已"){
//    	str = conn;
//    }else{        	
//    	s={'天':sec/24/3600,'小时':sec/3600%24,'分':sec/60%60,'秒':sec%60};
//    	for(var i in s){
//    		if(Math.floor(s[i])>0 ) str += '<span class="color_orange">'+Math.floor(s[i])+'</span>' + i;
//    	}
//    	if(Math.floor(sec)==0){ str='0秒'; }
//    }
//    o[0].innerHTML = str + '&nbsp;&nbsp;结束';  
//    setTimeout(function(){count_down(o)},1000);
//}
//
//function refreshTimer(){
//	var $allCountdown = $(".count_down");
//	for (var i = 0; i < $allCountdown.length; i++) {	
//		count_down($allCountdown.eq(i));
//	}
//}
//
//refreshTimer();

