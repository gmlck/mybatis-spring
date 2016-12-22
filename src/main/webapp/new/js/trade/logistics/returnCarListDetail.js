$(document).ready(function(){
	var infoTab = parseInt($("#infoTab").val());
	$("#infoTabDiv ul li").eq(infoTab).trigger("click");
});

//倒计时
function count_down(o){
	var obj = o.attr("value");
    var www_qsyz_net=/^[\d]{4}-[\d]{1,2}-[\d]{1,2}( [\d]{1,2}:[\d]{1,2}(:[\d]{1,2})?)?$/ig,str='',conn,s;
    if(!obj.match(www_qsyz_net)){
            //alert('参数格式为2012-01-01[ 01:01[:01]].\r其中[]内的内容可省略');
            return false;
    }
    var sec=((new Date(Date.parse( obj.replace(/-/ig,'/') ))).getTime()
    			- (new Date()).getTime())/1000 + 24*60*60;
    if(sec > 0){
            conn='还有';
    }else{
            conn='已';
            sec*=-1;
    }
    if(conn=="已"){
    	str = conn;
    }else{        	
    	s={'天':sec/24/3600,'小时':sec/3600%24,'分':sec/60%60,'秒':sec%60};
    	for(var i in s){
    		if(Math.floor(s[i])>0 ) str += '<span class="color_orange">'+Math.floor(s[i])+'</span>' + i;
    	}
    	if(Math.floor(sec)==0){ str='0秒'; }
    }
    o.html(str + '&nbsp;&nbsp;结束');  
    setTimeout(function(){count_down(o)},1000);
}

function refreshTimer(){
	var $allCountdown = $(".count_down");
	for (var i = 0; i < $allCountdown.length; i++) {	
		count_down($allCountdown.eq(i));
	}
}

refreshTimer();

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
	var id = $allVehicleImagesElements.attr("id");
	var _id = $allVehicleImagesElements.attr("_id");
	image_download_clip(_id, 301, 258, id);
}
setImages();

/**
 * 查询线路的用户评论列表
 */
function queryReview(pageNum, pageSize){
	pageNum = !pageNum || pageNum < 1 ? 1 : pageNum;
	pageSize = !pageSize || pageSize < 1 ? 10 : pageSize;
	$("#revPageNum").val(pageNum);
	$("#revPageSize").val(pageSize);
	var ttrId = $("#ttrId").val();
	
	$.ajax({
		url: "queryReview.do",
		type: "post",
		dataType: "html",
		data: {"pageNum": pageNum, "pageSize": pageSize, "ttr.id": ttrId},
		success: function(data){
			$("#ttrRevListDiv").html(data);
			$("#revTotalCount").val($("#revResultTotalCount").val());
		},
		error: function(err){
			layer.alert("查询用户评论记录出错！", 2, "提示");
		}
	});
}

/**
 * 查询线路的用户咨询列表
 */
function queryAdv(pageNum, pageSize){
	pageNum = !pageNum || pageNum < 1 ? 1 : pageNum;
	pageSize = !pageSize || pageSize < 1 ? 10 : pageSize;
	$("#revPageNum").val(pageNum);
	$("#revPageSize").val(pageSize);
	var ttrId = $("#ttrId").val();
	var advType = $("#advType").val();
	
	$.ajax({
		url: "queryAdv.do",
		type: "post",
		dataType: "html",
		data: {"advCondition.pageNum": pageNum, "advCondition.pageSize": pageSize, "advCondition.tradeAdvisory.advType": advType, "ttr.id": ttrId},
		success: function(data){
			$("#advListDiv").html(data);
		},
		error: function(err){
			layer.alert("查询咨询记录出错！", 2, "提示");
		}
	});
}

/**
 * 选择咨询分类回调函数
 */
function selAdvType(){
	$("input[name='tradeAdvisory.advType']").valid();
}


/**
 * 弹出发表咨询问题框
 */
var addAdvDialog;
$("#toAddAdv").live("click", function(){
	addAdvDialog = layer.layer({
		type : 1,
		title : '发表咨询',
		fix : false,
		offset:['50px' , '50%'],
		area : ['auto','auto'],
		shade : false,
		shadeClose : false,
		page : {dom : '#addAdvDiv'}
	});
});

/**
 * 取消发表咨询，关闭弹出层
 */
$("#cancelAddAdv").live("click", function(){
	layer.close(addAdvDialog);
});



/**
 * 发表咨询表单校验
 */
$("#addAdvForm").validate({
	rules: {
		"tradeAdvisory.advTitle": {
			required: true,
			maxlength: 60,
			toFilter: true
		},
		"tradeAdvisory.advType": {
			required: true
		},
		"tradeAdvisory.advContent": {
			required: true,
			minlength: 10,
			maxlength: 500,
			toFilter: true
		}
	},
	messages: {
		"tradeAdvisory.advTitle": {
			required: "请输入咨询标题！",
			maxlength: "咨询标题最大长度为{0}个字符！",
			toFilter: "请输入正确的咨询标题，勿包含特殊字符！"
		},
		"tradeAdvisory.advType": {
			required: "请选择咨询分类！"
		},
		"tradeAdvisory.advContent": {
			required: "请输入咨询内容！",
			minlength: "咨询内容最小长度为{0}个字符！",
			maxlength: "咨询内容最大长度为{0}个字符！",
			toFilter: "请输入正确的咨询内容，勿包含特殊字符！"
		}
	}
});

$("#advContent").live("focus", function(){
	if($(this).val() == $(this).attr("ov")){
		$(this).val("");
	}
});
$("#advContent").live("focusout", function(){
	if(!$(this).val()){
		$(this).val($(this).attr("ov"));
	}
});

/**
 * 发表咨询
 */
$("#addAdv").live("click", function(){
	if(!$("#addAdvForm").valid()){
		return false;
	}
	$("#addAdvForm").ajaxSubmit({
		url: "addReturnCarAdv.do",
		type: "post",
		dataType: "json",
		success: function(data){
			if(data.advMsg == "success"){
				layer.alert("发表咨询成功!", 1, "提示");
				queryAdv();
				layer.close(addAdvDialog);
				$("#addAdvForm").find("#advTitle").val("");
				$("#addAdvForm").find("#advContent").val("");
				$("#addAdvForm").find(".advType .list li").eq(0).trigger("click");
			} else{
				layer.alert(data.advMsg, 2, "提示");
			}
		},
		error: function(err){
			layer.alert("发表咨询出错！", 2, "提示");
		}
	});
});


/**
 * 切换咨询分类
 */
$("#advTypes dd").live("click", function(){
	var advType = $(this).attr("id");
	$("#advType").val(advType);
	$("#advTypes dd").removeClass("visited");
	$(this).addClass("visited");
	queryAdv();
});

//(function(){
//	
//})();
