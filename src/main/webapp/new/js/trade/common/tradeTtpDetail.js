$(document).ready(function(){
	var infoTab = parseInt($("#infoTab").val());
	$("#infoTabDiv ul li").eq(infoTab).trigger("click");
});

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
				thisObj.removeClass("addCollect").addClass("yet");
				thisObj.find(".arrows").remove();
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

/**
 * 查询线路的咨询回复列表
 */
function selAdv(pageNum, pageSize){
	pageNum = !pageNum || pageNum < 1 ? 1 : pageNum;
	pageSize = !pageSize || pageSize < 1 ? 10 : pageSize;
	$("#advPageNum").val(pageNum);
	$("#advPageSize").val(pageSize);
	var ttpId = $("#ttpId").val();
	var advType = $("#advType").val();
	
	$.ajax({
		url: "selAdv.do",
		type: "post",
		dataType: "html",
		data: {"advCondition.pageNum": pageNum, "advCondition.pageSize": pageSize, "advCondition.tradeAdvisory.advType": advType, "ttp.id": ttpId},
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

(function(){
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
			url: "addAdv.do",
			type: "post",
			dataType: "json",
			success: function(data){
				if(data.advMsg == "success"){
					layer.alert("发表咨询成功!", 1, "提示");
					selAdv();
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
		selAdv();
	});
})();

(function(){
	/**
	 * 查询线路的用户评论列表
	 */
	function selReview(pageNum, pageSize){
		pageNum = !pageNum || pageNum < 1 ? 1 : pageNum;
		pageSize = !pageSize || pageSize < 1 ? 10 : pageSize;
		$("#revPageNum").val(pageNum);
		$("#revPageSize").val(pageSize);
		var ttpId = $("#ttpId").val();
		
		$.ajax({
			url: "selReview.do",
			type: "post",
			dataType: "html",
			data: {"pageNum": pageNum, "pageSize": pageSize, "ttp.id": ttpId},
			success: function(data){
				$("#revListDiv").html(data);
				$("revTotalCount").val($("#revResultTotalCount").val());
			},
			error: function(err){
				layer.alert("查询用户评论记录出错！", 2, "提示");
			}
		});
	}
})();
